"""Check actual rendered notice cleanup without hiding research or source context."""
import json,os,pwd,time,subprocess,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'dist/build-manifest.json').read_text())
ORIGIN=os.environ.get('PREVIEW_ORIGIN','http://127.0.0.1:4312').rstrip('/')
OUT=ROOT/'verification/notice-cleanup'; OUT.mkdir(parents=True,exist_ok=True)
server=None; checks=0; errors=[]; success=False

def check(ok,label):
    global checks
    checks+=1
    assert ok,label

try:
    if not os.environ.get('PREVIEW_ORIGIN'):
        server=subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,env={**os.environ,'PORT':'4312'},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        for _ in range(50):
            try: urllib.request.urlopen(ORIGIN+M['base']+'tr/',timeout=1);break
            except OSError: time.sleep(.1)
        else: raise RuntimeError('Preview server unavailable')
    with sync_playwright() as pw:
        for engine in os.environ.get('BROWSERS','chromium,firefox,webkit').split(','):
            browser=getattr(pw,engine).launch(env={**os.environ,"HOME":pwd.getpwuid(os.getuid()).pw_dir})
            context=browser.new_context(viewport={'width':1440,'height':960})
            page=context.new_page();page.on('pageerror',lambda error:errors.append(str(error)))
            for l in M['locales']:
                prefix=ORIGIN+M['base']+l+'/'
                for width in [390,1440]:
                    page.set_viewport_size({'width':width,'height':960})
                    response=page.goto(prefix,wait_until='networkidle')
                    check(response.status==200 and page.locator('body').get_attribute('data-release')==M['version'],engine+l+' current home')
                    check(page.locator('.footer-notice,.review-notice').count()==0,engine+l+' no blanket warning panels')
                    check(page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),engine+l+' horizontal fit')
                    check(page.locator('.site-footer .visual-credits').count()==1,engine+l+' attribution present')
                    check(page.locator('.approved-portal-image').get_attribute('src').endswith('portal-continuous-v1.svg'),engine+l+' approved art retained')
                    if l=='tr':
                        page.locator('.site-footer').screenshot(path=str(OUT/(engine+'-footer-'+str(width)+'.png')))
                for route in ['dossier/understanding-spiritual-experience/','contribute/','learning/','resource/aservic-principles/']:
                    response=page.goto(prefix+route,wait_until='load')
                    check(response.status==200,engine+l+route+' route exists')
                    check(page.locator('.footer-notice,.review-notice').count()==0,engine+l+route+' no repeated panels')
                    check(page.evaluate('!Object.hasOwn(JSON.parse(document.querySelector("#ui-data").textContent).labels,"notClinical")'),engine+l+route+' retired UI label')
                page.goto(prefix+'editorial/',wait_until='load')
                check(page.locator('.info-aside').count()==1,engine+l+' review policy retained')
                page.goto(prefix+'measures/',wait_until='load')
                check(page.locator('.notice').count()>0,engine+l+' contextual instrument rights retained')
            context.close();browser.close()
        check(not errors,'No uncaught browser exceptions')
        success=True
finally:
    if server:server.terminate();server.wait(timeout=10)
    receipt={'success':success,'version':M['version'],'origin':ORIGIN,'checks':checks,'errors':errors}
    (OUT/'receipt.json').write_text(json.dumps(receipt,indent=2));print(json.dumps(receipt))
