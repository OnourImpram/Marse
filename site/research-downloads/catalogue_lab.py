"""Reproduce the selected catalogue inventory. No participant data or network calls.
Python 3.10 or later. Standard library only. Keep catalogue.csv and
lab-manifest.json beside this file, or in the notebook working directory.
"""
from pathlib import Path
from collections import Counter
import csv
import hashlib
import io
import json

def analyze(directory: Path) -> dict:
    manifest = json.loads((directory / 'lab-manifest.json').read_text(encoding='utf-8'))
    raw = (directory / 'catalogue.csv').read_bytes()
    if hashlib.sha256(raw).hexdigest() != manifest['dataSHA256']:
        raise ValueError('Catalogue checksum mismatch. Restore the original data and matching manifest.')
    rows = list(csv.DictReader(io.StringIO(raw.decode('utf-8-sig'))))
    ids = [row['source_id'] for row in rows]
    if len(ids) != len(set(ids)) or any(not item for item in ids):
        raise ValueError('Source identifiers must be non-empty and unique.')
    counts = dict(sorted(Counter(row['kind'] for row in rows).items()))
    result = {'records': len(rows), 'by_type': counts}
    if result != manifest['expectedResult']:
        raise ValueError('Computed result does not match the release manifest.')
    return result

if __name__ == '__main__':
    directory = Path(__file__).resolve().parent if '__file__' in globals() else Path.cwd()
    try:
        result = analyze(directory)
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (OSError, ValueError, KeyError) as exc:
        raise SystemExit(f'Catalogue check failed. {exc}') from exc
