"""Real HTTP navigation/function tests, run on the GitHub hosted runner."""
from pathlib import Path
import json,os,shutil,threading,atexit
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from playwright.sync_api import sync_playwright,expect
from PIL import Image,ImageChops
R=Path(__file__).resolve().parents[1];qa=R/'qa';qa.mkdir(exist_ok=True)
serve=R/'qa-server';serve.mkdir(exist_ok=True)
for name,target in [('Marse',R/'site'),('baseline.html',R/'design/approved-tr-iapos.html')]:
 p=serve/name
 if p.is_symlink():p.unlink()
 p.symlink_to(target)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',8765),partial(Quiet,directory=str(serve)))
threading.Thread(target=server.serve_forever,daemon=True).start()
origin=os.environ.get('LIVE_ORIGIN','http://127.0.0.1:8765')
manifest=json.loads((R/'site/migration-manifest.json').read_text())
errors=[];overflows=[];http_errors=[];tests=[];count=0;finished=False
@atexit.register
def record_evidence():
 report={'completed':finished,'navigationChecks':count,'successfulFunctions':tests,'jsErrors':errors,'overflow':overflows,'httpErrors':http_errors}
 (qa/'browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report,ensure_ascii=False,indent=2))
with sync_playwright() as p:
 exe=shutil.which('google-chrome') or shutil.which('chromium')
 browser=p.chromium.launch(**({'executable_path':exe} if exe else {}),args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
 page.on('pageerror',lambda e:errors.append({'url':page.url,'error':str(e)}))
 page.on('response',lambda r:http_errors.append({'url':r.url,'status':r.status}) if r.status>=400 and origin in r.url else None)
 def go(path):
  global count
  response=page.goto(origin+path,wait_until='load');page.wait_for_timeout(25);count+=1
  if response:assert response.status==200,(path,response.status)
  if page.evaluate('document.documentElement.scrollWidth>innerWidth+1'):
   overflows.append({'url':path,'width':page.viewport_size['width']})
 routes=sorted({x['target'] for x in manifest['routes']})
 for width in [390,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  for route in routes:go('/Marse/'+route.removesuffix('index.html'))
  for lang in ['tr','en','de','zh','ru','ar','id','ms']:go('/Marse/'+lang+'/')
  print('Reading routes:',width,len(routes),flush=True)
 for width in [320,390,768,1440]:
  page.set_viewport_size({'width':width,'height':1000});go('/Marse/')
  ids=page.locator('[data-view]').evaluate_all('(els)=>els.map(e=>e.id)')
  assert len(ids)==65
  for route in ids:
   page.evaluate('(r)=>location.hash=r',route);page.wait_for_timeout(12);count+=1
   assert page.locator('#'+route).is_visible()
   if page.evaluate('document.documentElement.scrollWidth>innerWidth+1'):overflows.append({'url':'#'+route,'width':width})
  print('Approved views:',width,len(ids),flush=True)
 if not os.environ.get('LIVE_ORIGIN'):
  for width in [390,1440]:
   page.set_viewport_size({'width':width,'height':1000});go('/baseline.html')
   page.screenshot(path=str(qa/f'baseline-{width}.png'))
   go('/Marse/');page.screenshot(path=str(qa/f'home-{width}.png'))
   assert ImageChops.difference(Image.open(qa/f'baseline-{width}.png').convert('RGB'),Image.open(qa/f'home-{width}.png').convert('RGB')).getbbox() is None,'Homepage visual regression'
  tests.append('Approved homepage pixels match at 390 and 1440 px')
 page.set_viewport_size({'width':1440,'height':1000})
 go('/Marse/#kutuphane');expect(page.locator('#library-list .resource-row')).to_have_count(81)
 page.fill('#library-search','SIPAS');expect(page.locator('#library-list .resource-row:visible')).to_have_count(1)
 page.fill('#library-search','');page.click('[data-filter="Kitap"]');expect(page.locator('#library-list .resource-row:visible')).to_have_count(9)
 page.click('[data-open-search]');page.fill('#global-search','SRMR');assert page.locator('#global-results .resource-row:visible').count()>0;page.click('#close-search')
 tests.append('Complete library, nine-book filter and full-corpus search')
 go('/Marse/#olcek-demo');page.locator('#demo-1').evaluate("e=>{e.value='5';e.dispatchEvent(new Event('input',{bubbles:true}))}")
 expect(page.locator('#demo-num-1')).to_have_text('5,0')
 with page.expect_download() as dl:page.click('#demo-download')
 assert 'kurgusal' in Path(dl.value.path()).read_text().lower()
 tests.append('Synthetic report updates and download carries fictional-data label')
 go('/Marse/#materyal-gorusme');page.fill('#w1','QA <script>test</script>')
 with page.expect_download() as dl:page.click('#download-worksheet')
 assert '&lt;script&gt;' in Path(dl.value.path()).read_text()
 tests.append('Worksheet download escapes user-supplied HTML')
 # The source page also has one independent dossier card outside the 79-record filter.
 # Filter assertions must target the controlled catalogue rather than that separate guide.
 go('/Marse/tr/library/');expect(page.locator('[data-filter-scope] [data-card]')).to_have_count(79)
 page.fill('[data-filter-q]','SIPAS');expect(page.locator('[data-filter-scope] [data-card]:visible')).to_have_count(1)
 expect(page.locator('.dossier-card')).to_be_visible()
 page.click('[data-filter-scope] [data-card]:visible h3 a');assert '/resource/sipas/' in page.url
 page.click('[data-save]');expect(page.locator('[data-save]')).to_have_attribute('aria-pressed','true')
 go('/Marse/tr/saved/');expect(page.locator('[data-saved-list]')).to_contain_text('SIPAS')
 go('/Marse/tr/compare/?ids=sipas,brief-rcope');expect(page.locator('.comparison-table')).to_have_count(1)
 with page.expect_download() as dl:page.click('[data-comparison-export]')
 assert json.loads(Path(dl.value.path()).read_text())['site']=='MARSE'
 go('/Marse/tr/search/?q=SIPAS');expect(page.locator('[data-search-results]')).to_contain_text('SIPAS')
 tests.append('Imported filters, bookmarks, comparison, export and search')
 page.set_viewport_size({'width':390,'height':1000});go('/Marse/tr/resource/sipas/');page.click('#menu-toggle');expect(page.locator('#primary-nav')).to_be_visible();page.keyboard.press('Escape');expect(page.locator('#primary-nav')).not_to_be_visible()
 tests.append('Mobile navigation and keyboard close')
 for width in [390,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  for url,name in [('/Marse/','home'),('/Marse/#kutuphane','library'),('/Marse/#olcek-demo','demo'),('/Marse/tr/resource/sipas/','resource'),('/Marse/tr/measurement-observatory/','measures'),('/Marse/ar/library/','arabic')]:
   go(url);page.screenshot(path=str(qa/f'{name}-{width}.png'))
 browser.close()
server.shutdown()
assert not errors and not overflows and not http_errors
finished=True
