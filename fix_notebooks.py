import glob
import json

for f in sorted(glob.glob("notebooks/*.ipynb")):
    with open(f, encoding="utf-8") as fh:
        nb = json.load(fh)

    removed = nb.get("metadata", {}).pop("widgets", None) is not None
    for cell in nb.get("cells", []):
        cell.get("metadata", {}).pop("widgets", None)

    with open(f, "w", encoding="utf-8") as fh:
        json.dump(nb, fh, ensure_ascii=False, indent=1)

    print(f, "- widgets metadata removed" if removed else "- no widgets metadata")