"""Actual HTTP, browser interaction and downloads for the October evidence cycle."""
import json, os, pwd, subprocess, time, urllib.request
from pathlib import Path
from urllib.parse import quote
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parents[1]
M = json.loads((ROOT/'dist/build-manifest.json').read_text())
RECORDS = json.loads((ROOT/'src/evidence-2026-10.json').read_text())['records']
BASE = M['base']
ORIGIN = os.environ.get('PREVIEW_ORIGIN', 'http://127.0.0.1:4301').rstrip('/')
OUTPUT = ROOT/'.browser-results/evidence-cycle'
OUTPUT.mkdir(parents=True, exist_ok=True)
checks, errors, engines = [], [], {}
server, completed = None, False

def check(name, condition):
    checks.append({'name':name, 'passed':bool(condition)})
    assert condition, name

def fits(page, name):
    check(name+' horizontal fit', page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))

try:
    if not os.environ.get('PREVIEW_ORIGIN'):
        server = subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,env={**os.environ,'PORT':'4301'},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        for attempt in range(50):
            try: urllib.request.urlopen(ORIGIN+BASE+'tr/',timeout=1); break
            except OSError: time.sleep(.1)
        else: raise RuntimeError('Preview server did not start')
    with sync_playwright() as pw:
        for engine in os.environ.get('BROWSERS','chromium,firefox,webkit').split(','):
            options = {'headless':True,'env':{**os.environ,'HOME':pwd.getpwuid(os.getuid()).pw_dir}}
            if engine=='chromium' and os.environ.get('CHROMIUM_EXECUTABLE'):
                options.update(executable_path=os.environ['CHROMIUM_EXECUTABLE'],args=['--no-sandbox'])
            browser = getattr(pw,engine).launch(**options)
            engines[engine] = browser.version
            context = browser.new_context(viewport={'width':1280,'height':900},accept_downloads=True)
            page = context.new_page(); page.set_default_timeout(15000)
            page.on('pageerror',lambda error:errors.append(str(error)))
            for locale in M['locales']:
                prefix = ORIGIN+BASE+locale+'/'
                response = page.goto(prefix+'evidence/',wait_until='load')
                tag = engine+'/'+locale
                check(tag+' actual release',response.status==200 and page.locator('body').get_attribute('data-release')==M['version'])
                for theme in ['longitudinal-questions','harm-and-clinical-context']:
                    check(tag+' synthesis '+theme,page.locator('#'+theme+' p').count()==1)
                    check(tag+' cited synthesis '+theme,page.locator('#'+theme+' .scholar-sources a').count()>=3)
                for record in RECORDS:
                    rid = record['id']
                    page.goto(prefix+'resource/'+rid+'/',wait_until='load')
                    check(tag+'/'+rid+' source review separate',page.locator('[data-review-status="draft"]').count()==1)
                    for field in ['population','finding','limit']:
                        found = page.locator('[data-claim="'+rid+':'+field+'"]')
                        check(tag+'/'+rid+'/'+field,found.count()==1 and found.inner_text()==record['editions'][locale][field])
                    fits(page,tag+'/'+rid)
                    for query in [record['brief']['doi'],record['title']]:
                        page.goto(prefix+'search/?q='+quote(query,safe=''),wait_until='load')
                        link = page.locator('[data-search-results] a[href="'+BASE+locale+'/resource/'+rid+'/"]').first
                        link.wait_for(state='visible')
                        check(tag+'/'+rid+' searchable '+('DOI' if query==record['brief']['doi'] else 'original title'),True)
                page.goto(prefix+'resource/within-person-attendance/',wait_until='load')
                page.locator('[data-related-evidence] a[href="'+BASE+locale+'/resource/attendance-cohorts/"]').click()
                check(tag+' contrasting evidence actual navigation',page.locator('[data-evidence="attendance-cohorts"]').count()==1)
                page.goto(prefix+'measure-durel/',wait_until='load')
                check(tag+' instrument use has caveat',len(page.locator('[data-instrument-use] p').inner_text())>25)
                page.locator('[data-instrument-use] a').click()
                check(tag+' instrument use actual navigation',page.locator('[data-evidence="brazil-medical-students"]').count()==1)
                for width in [320,390]:
                    page.set_viewport_size({'width':width,'height':900})
                    for route in ['evidence/','resource/turkish-bereavement/','resource/clergy-abuse-harm/','measure-durel/']:
                        page.goto(prefix+route,wait_until='load'); fits(page,tag+'/'+route+'/'+str(width))
                    if width==390 and locale in ['tr','de','ar','zh']:
                        page.goto(prefix+'evidence/#longitudinal-questions',wait_until='load')
                        page.screenshot(path=str(OUTPUT/(engine+'-'+locale+'-390.png')))
                page.set_viewport_size({'width':1280,'height':900})
                if locale=='ar': check(tag+' RTL remains',page.locator('html').get_attribute('dir')=='rtl')
                print(tag+' October journeys complete',flush=True)
            for record in RECORDS:
                page.goto(ORIGIN+BASE+'en/resource/'+record['id']+'/',wait_until='load')
                for extension in ['ris','bib']:
                    with page.expect_download() as pending:
                        page.locator('a[href="'+BASE+'citations/'+record['sourceId']+'.'+extension+'"]').click()
                    data = Path(pending.value.path()).read_text()
                    check(engine+'/'+record['id']+' actual '+extension+' download',record['brief']['doi'] in data)
                    check(engine+'/'+record['id']+' article export '+extension,'TY  - JOUR' in data if extension=='ris' else '@article{' in data)
            response = context.request.get(ORIGIN+BASE+'data/locale-parity.json'); matrix=response.json()
            check(engine+' technical matrix',response.status==200 and len(matrix['records'])==len(json.loads((ROOT/'src/evidence-bindings.json').read_text())['records'])*len(M['locales']))
            check(engine+' no semantic certification',matrix['semanticParityCertified'] is False and matrix['humanReviewed'] is False)
            check(engine+' persisted continuity',all(r['sourceMatches'] and r['editionMatches'] and r['briefMatches'] and r['fieldsPresent'] for r in matrix['records']))
            page.goto(ORIGIN+BASE+'tr/',wait_until='load')
            page.locator('.approved-portal-image').evaluate('(e)=>e.decode()')
            page.locator('.approved-portal').screenshot(path=str(OUTPUT/(engine+'-portal.png')))
            nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':900});np=nojs.new_page()
            for locale in ['tr','ar','zh']:
                np.goto(ORIGIN+BASE+locale+'/evidence/',wait_until='load')
                check(engine+'/'+locale+' new limits without JS',all(np.locator('[data-claim="'+r['id']+':limit"]').count()==1 for r in RECORDS))
                fits(np,engine+'/'+locale+'/nojs')
            nojs.close();context.close();browser.close()
    check('No uncaught browser exceptions',not errors)
    completed=True
finally:
    if server: server.terminate();server.wait(timeout=10)
    receipt={'success':completed,'version':M['version'],'origin':ORIGIN,'realHTTP':True,'mockedIO':False,'engines':engines,'checks':checks,'errors':errors,'humanLanguageReview':False,'scientificApproval':False}
    (ROOT/'verification').mkdir(exist_ok=True)
    (ROOT/'verification/evidence-cycle-browser.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2))
