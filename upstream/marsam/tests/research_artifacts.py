"""Execute the downloadable example, including its notebook and failure cases.
No network requests, participant data or external survey files are used.
"""
from pathlib import Path
import copy
import csv
import hashlib
import io
import json
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'dist/research-downloads'

def execute(path: Path):
    return subprocess.run([sys.executable, str(path / 'catalogue_lab.py')], capture_output=True, text=True, timeout=20)

class ResearchArtifacts(unittest.TestCase):
    def test_inventory_reproduces_and_exports_preserve_source_identity(self):
        manifest = json.loads((DATA / 'lab-manifest.json').read_text())
        result = execute(DATA)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout), manifest['expectedResult'])
        rows = list(csv.DictReader(io.StringIO((DATA / 'catalogue.csv').read_text())))
        csl = json.loads((DATA / 'catalogue.csl.json').read_text())
        self.assertEqual([r['source_id'] for r in rows], [r['id'] for r in csl])
        self.assertEqual([r['original_title'] for r in rows], [r['title'] for r in csl])
        self.assertEqual(hashlib.sha256((DATA / 'catalogue_lab.py').read_bytes()).hexdigest(), manifest['codeSHA256'])
        self.assertFalse(manifest['participantData'])
        self.assertFalse(manifest['scientificApproval'])

    def test_changed_bytes_are_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            d=Path(temp);shutil.copytree(DATA, d, dirs_exist_ok=True)
            with (d / 'catalogue.csv').open('ab') as f:f.write(b'\n')
            result=execute(d)
            self.assertNotEqual(result.returncode,0)
            self.assertIn('checksum mismatch',result.stderr)

    def test_duplicate_ids_are_rejected_even_with_a_matching_checksum(self):
        with tempfile.TemporaryDirectory() as temp:
            d=Path(temp);shutil.copytree(DATA,d,dirs_exist_ok=True)
            lines=(d/'catalogue.csv').read_text().splitlines(keepends=True)
            content=''.join(lines+[lines[1]]).encode()
            (d/'catalogue.csv').write_bytes(content)
            manifest=json.loads((d/'lab-manifest.json').read_text())
            manifest['dataSHA256']=hashlib.sha256(content).hexdigest()
            (d/'lab-manifest.json').write_text(json.dumps(manifest))
            result=execute(d)
            self.assertNotEqual(result.returncode,0)
            self.assertIn('unique',result.stderr)

    def test_empty_templates_never_assert_a_finding_or_permission(self):
        for name in ['research-summary','measurement-evidence']:
            item=json.loads((DATA/f'{name}.json').read_text())
            self.assertFalse(item['completed']);self.assertFalse(item['review']['approved'])
            self.assertTrue(all(v is None for v in item['study'].values()))
            self.assertIsNone(item['rights']['redistributionAllowed'])
            rows=list(csv.DictReader(io.StringIO((DATA/f'{name}.csv').read_text())))
            self.assertGreater(len(rows),10)
            self.assertTrue(all(not row['value'] for row in rows))

    def test_actual_jupyter_kernel_reproduces_notebook_output(self):
        import nbformat
        from nbclient import NotebookClient
        notebook=nbformat.read(DATA/'catalogue.ipynb',as_version=4)
        nbformat.validate(notebook)
        executed=NotebookClient(copy.deepcopy(notebook), timeout=60, kernel_name='python3',resources={'metadata':{'path':str(DATA)}}).execute()
        outputs=[o.get('text','') for c in executed.cells if c.cell_type=='code' for o in c.get('outputs',[]) if o.output_type=='stream']
        result=json.loads(''.join(outputs))
        self.assertEqual(result,json.loads((DATA/'lab-manifest.json').read_text())['expectedResult'])
        (ROOT/'verification').mkdir(exist_ok=True)
        nbformat.write(executed,ROOT/'verification/research-notebook-executed.ipynb')

if __name__=='__main__':
    suite=unittest.defaultTestLoader.loadTestsFromTestCase(ResearchArtifacts)
    outcome=unittest.TextTestRunner(verbosity=2).run(suite)
    (ROOT/'verification').mkdir(exist_ok=True)
    (ROOT/'verification/research-artifacts.json').write_text(json.dumps({'success':outcome.wasSuccessful(),'testsRun':outcome.testsRun,'failures':len(outcome.failures),'errors':len(outcome.errors),'execution':'local Python process and actual Jupyter kernel','dataScope':'Selected public catalogue metadata only'},indent=2))
    raise SystemExit(0 if outcome.wasSuccessful() else 1)
