const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const FONT_FILE = process.env.FONT_FILE || 'font.ttf';
const FONT_SIZE = Number(process.env.FONT_SIZE || 34);
const WIDTH = Number(process.env.WIDTH || 1000);
const TEXT_DIR = 'texts';
const OUT_DIR = 'out';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const files = fs
  .readdirSync(TEXT_DIR)
  .filter((f) => f.toLowerCase().endsWith('.txt'))
  .sort();

if (files.length === 0) {
  console.error(`No .txt files found in ./${TEXT_DIR}`);
  process.exit(1);
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const FONT_URL = pathToFileURL(path.resolve(FONT_FILE)).href;

(async () => {
  const launchOptions = process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {};
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: 400 });

  for (const file of files) {
    const stem = path.basename(file, path.extname(file)).replace(/[^\w-]/g, '_');
    const text = fs
      .readFileSync(path.join(TEXT_DIR, file), 'utf8')
      .replace(/\s*\r?\n\s*/g, ' ')
      .trim();
    if (!text) continue;

    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @font-face { font-family: K; src: url('${FONT_URL}'); }
      body { margin: 0; background: #fff; }
      #t { box-sizing: border-box; width: ${WIDTH}px; padding: 40px;
           direction: rtl; text-align: justify; font-family: K;
           font-size: ${FONT_SIZE}px; line-height: 2.2; color: #000; }
    </style></head><body><div id="t">${esc(text)}</div></body></html>`;

    const htmlPath = path.resolve(OUT_DIR, 'tmp.html');
    fs.writeFileSync(htmlPath, html, 'utf8');
    await page.goto(pathToFileURL(htmlPath).href);
    await page.evaluate(() => document.fonts.ready);

    const el = await page.$('#t');
    await el.screenshot({ path: path.join(OUT_DIR, `sample_${stem}.png`) });
    fs.writeFileSync(path.join(OUT_DIR, `sample_${stem}.txt`), text, 'utf8');
    console.log(`rendered sample_${stem}`);
  }

  await browser.close();
  fs.rmSync(path.resolve(OUT_DIR, 'tmp.html'), { force: true });
  console.log(`Done: ${files.length} samples in ./${OUT_DIR}`);
})();