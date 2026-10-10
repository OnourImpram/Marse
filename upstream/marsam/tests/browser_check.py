"""Optional browser checks. Run a real preview server first for default mode.
The --offline-fixture mode renders local HTML with embedded assets and mocked browser
I/O. It does NOT verify navigation, network CSP enforcement, or native persistence.
Those limits are recorded in the output. No machine/browser policy is altered.
"""
from __future__ import annotations
import argparse, json, mimetypes, re, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:4173')
parser.add_argument('--offline-fixture', action='store_true')
parser.add_argument('--browser', default='/usr/bin/chromium')
args = parser.parse_args()
DIST = ROOT / 'dist'
manifest = json.loads((DIST / 'build-manifest.json').read_text())
base = manifest['base']
output = ROOT / '.browser-results'
output.mkdir(exist_ok=True)
checks = []
errors = []

def record(name, passed=True):
    checks.append({'name': name, 'passed': bool(passed)})
    assert passed, name

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, executable_path=args.browser, args=['--no-sandbox'])
    def page_for(route, width=1440, storage=None, denied=False, scripting=True):
        locale = route.strip('/').split('/')[0]
        context = browser.new_context(viewport={'width':width,'height':960 if width>600 else 844}, java_script_enabled=True if args.offline_fixture else scripting)
        page = context.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        if args.offline_fixture:
            html=(DIST/route.strip('/')/'index.html').read_text()
            html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>','',html)
            html=re.sub(r'<link rel="stylesheet"[^>]*>',lambda _: '<style>'+(DIST/'site.css').read_text()+'</style>',html)
            html=re.sub(r'<script type="module" src="[^"]+"></script>','',html)
            page.set_content(html,wait_until='domcontentloaded')
            if scripting:
                # Browser I/O mocks only. All UI logic is the shipped unmodified app.js.
                data=json.loads((DIST/f'data/search-{locale}.json').read_text())
                page.evaluate('''({data,storage,denied})=>{
                  window.__stored={...(storage||{})};
                  Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>{if(denied)throw Error('denied');return window.__stored[k]||null},setItem:(k,v)=>{if(denied)throw Error('denied');window.__stored[k]=v}}});
                  window.fetch=async()=>({ok:true,json:async()=>data});
                  history.replaceState=()=>{};
                  window.__downloads=[];
                  URL.createObjectURL=blob=>{blob.text().then(t=>window.__downloads.push(JSON.parse(t)));return 'blob:offline-fixture';};
                  URL.revokeObjectURL=()=>{};
                  const click=HTMLAnchorElement.prototype.click;
                  HTMLAnchorElement.prototype.click=function(){if(!this.download)click.call(this);};
                }''',{'data':data,'storage':storage,'denied':denied})
                page.add_script_tag(content=(DIST/'app.js').read_text())
        else:
            if denied:
                context.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('denied')}})")
            response=page.goto(args.base_url+base+route.lstrip('/'))
            record('HTTP '+route,response.status==200)
        page.wait_for_timeout(80)
        return context,page
    # All configured home pages and representative deep pages: layout, language and interactions.
    for locale in manifest['locales']:
        for width in [1440,390]:
            ctx,page=page_for(f'{locale}/',width)
            record(f'{locale} home width {width}',page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
            record(f'{locale} one main heading',page.locator('h1').count()==1)
            record(f'{locale} HTML direction',page.locator('html').get_attribute('dir')==('rtl' if locale=='ar' else 'ltr'))
            record(f'{locale} eight language links',page.locator('.language-panel a').count()==len(manifest['locales']))
            page.screenshot(path=str(output/f'{locale}-home-{width}.png'),full_page=True)
            if width==390:
                page.locator('.mobile-nav > summary').click()
                record(f'{locale} mobile navigation opens',page.locator('.mobile-nav').get_attribute('open') is not None)
                page.keyboard.press('Escape')
                record(f'{locale} mobile navigation closes with Escape',page.locator('.mobile-nav').get_attribute('open') is None)
            else:
                page.locator('[data-open-search]').click()
                record(f'{locale} search dialog opens',page.locator('dialog').get_attribute('open') is not None)
                record(f'{locale} search receives focus',page.locator('#global-search').evaluate('(e)=>e===document.activeElement'))
                page.keyboard.press('Escape')
                record(f'{locale} search dialog closes',page.locator('dialog').get_attribute('open') is None)
            ctx.close()
        for route in ['library/','dossier/understanding-spiritual-experience/','resource/clinical-fica-tool/','editorial/']:
            # The actual FICA resource slug is resolved by index metadata, never guessed.
            if route.startswith('resource/clinical'):
                data=json.loads((DIST/f'data/search-{locale}.json').read_text())
                record_=next(x for x in data if x['id']=='fica-directory')
                route=record_['url'].split('/'+locale+'/',1)[1]
            ctx,page=page_for(locale+'/'+route,390)
            record(f'{locale} {route} mobile no overflow',page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
            if route.startswith('dossier/'):
                hrefs=page.locator('.language-panel a').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))')
                record(f'{locale} deep locale links preserve page',all('dossier/understanding-spiritual-experience/' in u for u in hrefs))
            if locale in ['tr','ar','id','ms']:page.screenshot(path=str(output/('tr-'+route.replace('/','-')+'390.png')),full_page=True)
            ctx.close()
    # Real catalogue DOM filtering, case/diacritic handling, empty and reset states.
    ctx,page=page_for('tr/library/')
    page.locator('[data-filter-q]').fill('FICA')
    record('catalogue search narrows records',page.locator('[data-filter-count]').inner_text()=='1')
    page.locator('[data-filter-q]').fill('<img src=x onerror=alert(1)>')
    record('catalogue hostile search remains literal',page.locator('[data-filter-count]').inner_text()=='0' and page.locator('[data-filter-empty]').is_visible())
    page.locator('button[type=reset]').click();page.wait_for_timeout(80)
    record('reset restores all records',page.locator('[data-filter-count]').inner_text()==str(manifest['sources']))
    page.locator('[data-filter-type]').select_option('measure')
    record('type filter works',page.locator('[data-filter-scope] [data-card]:visible').count()==3)
    page.screenshot(path=str(output/'tr-library-filter.png'),full_page=True);ctx.close()
    for locale,q in [('tr','inanc'),('zh','精神'),('ru','духов'),('ar','الارشاد'),('id','konseling'),('ms','kaunseling')]:
        ctx,page=page_for(locale+'/search/')
        page.locator('#page-search').fill(q);page.wait_for_timeout(400)
        record(f'{locale} full-text search finds records',page.locator('[data-search-results] .search-result').count()>0)
        page.locator('#page-search').fill('<svg onload=alert(1)>');page.wait_for_timeout(350)
        record(f'{locale} search does not inject HTML',page.locator('[data-search-results] svg').count()==0)
        ctx.close()
    ctx,page=page_for('tr/dossier/preferences-and-boundaries/')
    page.locator('[data-save]').click()
    record('save button toggles state',page.locator('[data-save]').get_attribute('aria-pressed')=='true')
    if args.offline_fixture:
        storage=page.evaluate('window.__stored');ctx.close()
        ctx,page=page_for('en/saved/',storage=storage)
        record('reading list works across languages with shared storage',page.locator('.saved-item').count()==1)
        page.locator('[data-clear-saved]').click();page.wait_for_timeout(100)
        record('reading list can be cleared',page.locator('.saved-item').count()==0)
    ctx.close()
    ctx,page=page_for('tr/dossier/preferences-and-boundaries/',denied=True)
    page.locator('[data-save]').click()
    record('blocked storage gives feedback and preserves page',page.locator('.toast').is_visible() and page.locator('[data-save]').get_attribute('aria-pressed')=='false');ctx.close()
    ctx,page=page_for('tr/contribute/')
    page.locator('#draft-title').fill('Kaynak değerlendirmesi')
    page.locator('#draft-url').fill('javascript:alert(1)')
    page.locator('#draft-note').fill('Klinik veri içermeyen bir kaynak önerisi.')
    page.locator('#draft-confirm').check()
    page.locator('[data-requires-js]').click()
    record('unsafe submission URL rejected',not page.locator('#draft-url').evaluate('(e)=>e.checkValidity()'))
    page.locator('#draft-url').fill('https://doi.org/10.1037/amp0000821')
    page.locator('[data-requires-js]').click();page.wait_for_timeout(200)
    record('local draft confirmation is explicit',len(page.locator('[data-form-status]').inner_text())>20)
    if args.offline_fixture:
        data=page.evaluate('window.__downloads')
        record('downloaded draft is not a server submission',len(data)==1 and data[0]['submission']=='not-sent')
    ctx.close()
    ctx,page=page_for('de/dossier/reading-evidence/',scripting=False)
    record('content and references remain without application script',page.locator('.reading-body p').count()>5 and page.locator('.references a').count()>0)
    ctx.close()
    browser.close()

# HTTP service verified separately from the offline visual fixture.
for suffix,status in [('tr/',200),('tr/library/',200),('de/dossier/reading-evidence/',200),('not-a-route/',404)]:
    try:
        r=urllib.request.urlopen(args.base_url+base+suffix)
        code=r.status
        if code==200:record('HTTP robots header '+suffix,r.headers.get('X-Robots-Tag')=='noindex, nofollow')
    except urllib.error.HTTPError as ex:code=ex.code
    record('HTTP status '+suffix,code==status)
record('no uncaught application errors in tested fixtures',not errors)
report={'mode':'offline DOM and visual fixture + separate HTTP checks' if args.offline_fixture else 'live local browser','fixtureLimitations':['Browser navigation policy blocked local URLs in this runtime. Browser policy was not changed.','Offline fixture embeds CSS, loads the actual app script, mocks localStorage/fetch/download I/O and omits CSP for fixture rendering.','Native persistence, end-to-end navigation, clipboard permissions, screen-reader testing, CSP browser enforcement and real downloads still need live-browser review.'] if args.offline_fixture else [],'checks':checks,'count':len(checks),'errors':errors,'browser':'Chromium','viewportWidths':[390,1440],'scientificApproval':False}
(ROOT/'verification/browser-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'passed':len(checks),'mode':report['mode'],'errors':errors},indent=2))
