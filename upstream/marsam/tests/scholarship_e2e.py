"""Real HTTP acceptance for scholarly content, source journeys and eight-locale parity."""
import json, os, subprocess, time, urllib.request, pwd
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'dist/build-manifest.json').read_text())
base=manifest['base']; origin=os.environ.get('PREVIEW_ORIGIN','http://127.0.0.1:4206').rstrip('/')
completed=False; server=None; checks=[]; errors=[]; engines={}; output=ROOT/'.browser-results/scholarship'; output.mkdir(parents=True,exist_ok=True)
def check(name,condition):
    checks.append({'name':name,'passed':bool(condition)})
    assert condition,name
def goto(page,url,wait_until='load',timeout=45000):
    last=None
    for attempt in range(3):
        try:return page.goto(url,wait_until=wait_until,timeout=timeout)
        except Exception as exc:
            last=exc
            if attempt<2:time.sleep(.5)
    raise last
try:
    if not os.environ.get('PREVIEW_ORIGIN'):
        server=subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,env={**os.environ,'PORT':'4206'},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        for attempt in range(50):
            try:
                urllib.request.urlopen(origin+base+'tr/',timeout=1);break
            except Exception:time.sleep(.1)
    with sync_playwright() as p:
        for engine in os.environ.get('BROWSERS','chromium,firefox,webkit').split(','):
            browser=getattr(p,engine).launch(headless=True,env={**os.environ,'HOME':pwd.getpwuid(os.getuid()).pw_dir});engines[engine]=browser.version
            context=browser.new_context(viewport={'width':1280,'height':900})
            page=context.new_page();page.on('pageerror',lambda error:errors.append(str(error)))
            for locale in manifest['locales']:
                prefix=origin+base+locale+'/'
                response=goto(page,prefix+'evidence/',wait_until='load')
                check(engine+locale+' evidence HTTP',response.status==200)
                check(engine+locale+' single title',page.locator('h1').count()==1)
                check(engine+locale+' claim and limit',page.locator('[data-claim="religious-cbt:finding"]').count()==1 and page.locator('[data-claim="religious-cbt:limit"]').count()==1)
                page.locator('a[href="'+base+locale+'/resource/religious-cbt/"]').first.click()
                check(engine+locale+' source journey',page.locator('.evidence-panel [data-claim="religious-cbt:limit"]').count()==1)
                check(engine+locale+' no false approval',page.locator('[data-review-status="draft"]').count()==1)
                goto(page,prefix+'search/?q=10.1097%2FNMD.0000000000000273',wait_until='load')
                page.locator('[data-search-results] a[href="'+base+locale+'/resource/religious-cbt/"]').first.wait_for()
                check(engine+locale+' new DOI search',page.locator('[data-search-results] a[href="'+base+locale+'/resource/religious-cbt/"]').count()>0)
                goto(page,prefix+'search/?q=Religious%20and%20Spiritual%20Struggles%20Scale',wait_until='load')
                page.locator('[data-search-results] a[href="'+base+locale+'/measure-rss-14/"]').first.wait_for()
                check(engine+locale+' full instrument name search',page.locator('[data-search-results] a[href="'+base+locale+'/measure-rss-14/"]').count()>0)
                goto(page,prefix+'measures/',wait_until='load')
                for id in ['brief-rcope','rss-14','meaning-questionnaire','durel','swbs-eksi-kardas','swbs-paloutzian-ellison']:
                    check(engine+locale+' measure link '+id,page.locator('a[href="'+base+locale+'/measure-'+id+'/"]').count()==1)
                page.locator('a[href="'+base+locale+'/measure-rss-14/"]').click()
                check(engine+locale+' measure population','495' in page.locator('main').inner_text())
                if locale=='ar':
                    token=page.get_by_text('0.60–0.82',exact=True).first
                    check(engine+' Arabic measurement range order',token.evaluate("e=>{const t=e.firstChild,a=document.createRange(),b=document.createRange();a.setStart(t,0);a.setEnd(t,1);b.setStart(t,t.length-1);b.setEnd(t,t.length);return a.getBoundingClientRect().left < b.getBoundingClientRect().left}"))
                    goto(page,prefix+'evidence/',wait_until='load')
                    token=page.locator('[data-claim="youth-evidence:population"] bdi').filter(has_text='10–24').first
                    check(engine+' Arabic population range order',token.evaluate("e=>{const t=e.firstChild,a=document.createRange(),b=document.createRange();a.setStart(t,0);a.setEnd(t,1);b.setStart(t,t.length-1);b.setEnd(t,t.length);return a.getBoundingClientRect().left < b.getBoundingClientRect().left}"))
                for profile in ['swbs-eksi-kardas','swbs-paloutzian-ellison']:
                    response=goto(page,prefix+'measure-'+profile+'/',wait_until='load')
                    check(engine+locale+profile+' HTTP',response.status==200)
                    check(engine+locale+profile+' release',page.locator('body').get_attribute('data-release')==manifest['version'])
                    limit=page.locator('[data-claim="'+profile+':limit"]').inner_text()
                    check(engine+locale+profile+' explicit scope limit',len(limit)>60)
                    if profile=='swbs-eksi-kardas':
                        check(engine+locale+' unresolved SRMR retained','.50' in limit and '.050' in limit)
                    else:check(engine+locale+' Turkish form distinct from validation','2022' in limit)
                    check(engine+locale+profile+' other instrument linked',page.locator('[data-instrument-distinction] a').count()==1)
                    for width in [320,390]:
                        page.set_viewport_size({'width':width,'height':900})
                        check(engine+locale+profile+str(width)+' fits',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
                    if engine=='chromium' and locale in ['tr','ar','zh']:
                        page.screenshot(path=str(output/(profile+'-'+locale+'-390.png')),full_page=True)
                    page.set_viewport_size({'width':1280,'height':900})
                goto(page,prefix+'search/?q=SWBS',wait_until='load')
                for profile in ['swbs-eksi-kardas','swbs-paloutzian-ellison']:
                    page.locator('[data-search-results] a[href="'+base+locale+'/measure-'+profile+'/"]').first.wait_for()
                    check(engine+locale+profile+' SWBS search disambiguation',True)
                goto(page,prefix+'about/#founder',wait_until='load')
                check(engine+locale+' founder',page.locator('#founder').count()==1 and 'Halil Ekşi' in page.locator('#founder').inner_text())
                page.set_viewport_size({'width':320,'height':800})
                for route in ['evidence/','measure-rss-14/','']:
                    goto(page,prefix+route,wait_until='load')
                    check(engine+locale+' mobile '+route,page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
                if locale in ['tr','ar','zh']:
                    goto(page,prefix+'evidence/',wait_until='load');page.screenshot(path=str(output/(engine+'-'+locale+'-320.png')),full_page=True)
                page.set_viewport_size({'width':1280,'height':900})
            goto(page,origin+base+'en/resource/brief-rcope/',wait_until='load')
            with page.expect_download() as download_info:
                page.locator('a[href="'+base+'citations/s-brief-rcope.ris"]').click()
            text=Path(download_info.value.path()).read_text()
            check(engine+' actual new article RIS download','TY  - JOUR' in text and 'SP  - 51' in text)
            nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':800});np=nojs.new_page();np.goto(origin+base+'ar/evidence/',wait_until='load')
            check(engine+' Arabic without JavaScript',np.locator('[data-claim="religious-cbt:limit"]').count()==1 and np.locator('html').get_attribute('dir')=='rtl')
            nojs.close();context.close();browser.close();print(engine+' scholarship complete',flush=True)
    check('No uncaught browser errors',not errors)
    completed=True
finally:
    if server:server.terminate();server.wait(timeout=10)
    receipt={'success':completed,'version':manifest['version'],'origin':origin,'realHTTP':True,'mockedIO':False,'engines':engines,'checks':checks,'errors':errors,'humanLanguageReview':False,'scientificApproval':False}
    (ROOT/'verification').mkdir(exist_ok=True)
    (ROOT/'verification/scholarship-browser.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2))
