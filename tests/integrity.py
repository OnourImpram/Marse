from pathlib import Path
import hashlib,json,re,sys
from bs4 import BeautifulSoup as B
R=Path(__file__).resolve().parents[1]; O=R/'site'
assert (O/'index.html').is_file(), 'MARSE site has not been built'
lock=json.loads((R/'migration/source-lock.json').read_text())
for x in lock['files']:
 p=R/'upstream/marsam'/x['path']
 assert hashlib.sha256(p.read_bytes()).hexdigest()==x['sha256'],x['path']
assert hashlib.sha256((R/'design/approved-tr-iapos.html').read_bytes()).hexdigest()==lock['approvedDesignSHA256']
s=B((O/'index.html').read_text(),'lxml'); orig=B((R/'design/approved-tr-iapos.html').read_text(),'lxml')
assert len(s.select('.view'))==65
assert s.select_one('#anasayfa').get_text(' ',strip=True)==orig.select_one('#anasayfa').get_text(' ',strip=True)
assert len(s.select('#library-list .resource-row'))==81
manifest=json.loads((O/'migration-manifest.json').read_text())
assert len(manifest['routes'])==1048
assert all((O/x['target']).is_file() for x in manifest['routes'])
assert all(x['scienceTextPreserved'] for x in manifest['routes'] if not x['identityRevision'])
assert len(json.loads((O/'data/v1/sources.json').read_text())['records'])==79
assert len(list((O/'tr/resource').glob('*/index.html')))==79
assert len(list((O/'citations').glob('*.ris')))==79
assert s.select_one('#demo-download') and s.select_one('#demo-10')
assert not re.search(r'\bMARSAM\b', s.get_text(' ',strip=True)), 'Old public brand'
print('PASS input hashes, 65 approved views, 79 resources, 1048 localized routes and citation completeness')
