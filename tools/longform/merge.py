"""Copy finished pages that pass check.js into the repo (src/long)."""
import json, pathlib, shutil, subprocess, sys
L = pathlib.Path(__file__).parent; OUT = L / "out"; SEED = L / "seed"
DST = pathlib.Path("/home/claude/buildwithvish/src/long")
for sub in ("guides", "projects", "issues"): (DST / sub).mkdir(parents=True, exist_ok=True)
slugs = [l.split()[0].replace("#read-", "") for l in (L / "slugs.txt").read_text().splitlines() if l.strip()] + [f"issue-{i}" for i in range(1, 7)]
done, skipped = [], []
for s in slugs:
    typ = "issue" if s.startswith("issue-") else json.loads((SEED / f"{s}.json").read_text())["type"]
    src = OUT / (f"{s}.json" if typ == "project" else f"{s}.html")
    if not src.exists(): continue
    r = subprocess.run(["node", str(L / "check.js"), s], capture_output=True, text=True)
    if r.returncode != 0: skipped.append(s); continue
    if typ == "project": shutil.copy(src, DST / "projects" / src.name)
    else:
        sub = "issues" if typ == "issue" else "guides"
        shutil.copy(src, DST / sub / src.name); shutil.copy(OUT / f"{s}.meta.json", DST / sub / f"{s}.meta.json")
    done.append(s)
print("merged", len(done), done); print("failing check (not merged)", skipped)
