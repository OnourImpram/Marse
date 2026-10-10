"""Apply exact localized copy replacements across src/.

Input JSON: [{"old": "...", "new": "...", "lang": "en", "note": "..."}].
Each `old` must occur at least once in src/ (as raw text, JS single-quote escaped, or JSON escaped);
otherwise the fix is rejected and the run fails. When lang == "en", locale pack keys
(src/locales/*.json, keyed by English source) are renamed in the same pass, so translate() keeps working.
Usage: python scripts/apply-copy-fixes.py fixes.json [--dry]
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src"


def variants(s):
    return {s, s.replace("\\", "\\\\").replace("'", "\\'"), json.dumps(s, ensure_ascii=False)[1:-1]}


def main():
    fixes = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    dry = "--dry" in sys.argv
    files = {p: p.read_text(encoding="utf-8") for p in ROOT.rglob("*") if p.suffix in (".mjs", ".json")}
    original = "\n".join(files.values())
    report, failed, superseded = [], [], []
    # Longest first: a whole-sentence rewrite must win over a word-level fix inside the same sentence.
    for f in sorted(fixes, key=lambda f: -len(f["old"])):
        old, new = f["old"], f["new"]
        if old == new or not old.strip():
            failed.append((f, "no-op or empty")); continue
        hits = 0
        for p, text in files.items():
            # Escape `new` for the container it lands in: JSON string or single-quoted JS literal.
            # (2026-10-05: inserting an unescaped apostrophe into a JS literal broke three modules.)
            if p.suffix == ".json":
                o, repl = json.dumps(old, ensure_ascii=False)[1:-1], json.dumps(new, ensure_ascii=False)[1:-1]
            else:
                o, repl = old.replace("\\", "\\\\").replace("'", "\\'"), new.replace("\\", "\\\\").replace("'", "\\'")
            if o in text:
                hits += text.count(o)
                text = text.replace(o, repl)
            files[p] = text
        if hits == 0 and any(o in original for o in variants(old)):
            superseded.append(f)  # an earlier fix in this run already rewrote this text
        elif hits == 0:
            failed.append((f, "old text not found"))
        else:
            report.append((f.get("lang", "?"), hits, old[:70]))
    for lang, hits, old in report:
        print(f"OK   {lang:3s} x{hits}  {old}")
    for f in superseded:
        print(f"SUP  {f.get('lang', '?'):3s} already rewritten earlier in run: {f['old'][:80]}")
    for f, why in failed:
        print(f"FAIL {f.get('lang', '?'):3s} {why}: {f['old'][:90]}")
    if failed:
        print(f"{len(failed)} fix(es) rejected; nothing written."); return 1
    for p, text in files.items():  # refuse to write a file that no longer parses
        if p.suffix == ".json":
            json.loads(text)
    import subprocess, tempfile
    for p, text in files.items():
        if p.suffix == ".mjs" and p.read_text(encoding="utf-8") != text:
            with tempfile.NamedTemporaryFile("w", suffix=".mjs", delete=False, encoding="utf-8") as tmp:
                tmp.write(text)
            if subprocess.run(["node", "--check", tmp.name], capture_output=True).returncode:
                print(f"FAIL syntax after fixes: {p.name}; nothing written."); return 1
    if not dry:
        for p, text in files.items():
            if p.read_text(encoding="utf-8") != text:
                p.write_text(text, encoding="utf-8")
    print(f"{len(report)} fixes {'checked' if dry else 'applied'}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
