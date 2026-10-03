import glob
import os
import re

TOKEN_RE = re.compile(r"hf_[A-Za-z0-9]{20,}")
PLACEHOLDER = "YOUR_HF_TOKEN"
EXTS = (".ipynb", ".py", ".js", ".md", ".json", ".txt")

files = []
for root, dirs, names in os.walk("."):
    dirs[:] = [d for d in dirs if d not in (".git", "node_modules")]
    for n in names:
        if n.endswith(EXTS):
            files.append(os.path.join(root, n))

total = 0
for f in sorted(files):
    with open(f, encoding="utf-8", errors="ignore") as fh:
        text = fh.read()
    new_text, count = TOKEN_RE.subn(PLACEHOLDER, text)
    if count:
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(new_text)
        print(f"{f}: replaced {count} token(s)")
        total += count

print(f"\nTotal replaced: {total}")

# second pass: anything that still looks like a secret
LEFTOVER = re.compile(r"(hf_[A-Za-z0-9]{10,}|api[_-]?key\s*=\s*['\"][^'\"]+['\"]|ngrok|wandb\.login)", re.I)
for f in sorted(files):
    with open(f, encoding="utf-8", errors="ignore") as fh:
        hits = LEFTOVER.findall(fh.read())
    if hits:
        print(f"CHECK MANUALLY: {f} ({len(hits)} match)")