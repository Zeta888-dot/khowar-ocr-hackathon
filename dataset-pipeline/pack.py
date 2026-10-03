import glob
import os
import sys
import zipfile

OUT_DIR = "out"
ZIP_NAME = "cer-test.zip"

files = sorted(glob.glob(os.path.join(OUT_DIR, "sample_*")))
if not files:
    sys.exit(f"No sample files found in ./{OUT_DIR}. Run `node render.js` first.")

with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as z:
    for f in files:
        # basename only, so the zip holds flat entries with no path separators
        z.write(f, os.path.basename(f))

images = sum(f.endswith(".png") for f in files)
texts = sum(f.endswith(".txt") for f in files)
print(f"Wrote {ZIP_NAME}: {images} images, {texts} text files")
if images != texts:
    print("Warning: image and text counts differ")