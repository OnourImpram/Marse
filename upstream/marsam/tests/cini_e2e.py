"""Native-browser verification of the bounded Iznik surface enhancement.

No request interception, CSP removal, fake responses or clinical data.
Optional baseline comparison uses the original application on a second HTTP server.
"""
from pathlib import Path
import json, os, subprocess, time, urllib.request, traceback, pwd
from playwright.sync_api import sync_playwright
os.environ['HOME'] = pwd.getpwuid(os.getuid()).pw_dir
ROOT=Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'dist/build-manifest.json').read_text())
OUT=ROOT/'.browser-results/cini';OUT.mkdir(parents=True,exist_ok=True)
ORIGIN=os.environ.get('PREVIEW_ORIGIN','http://127.0.0.1:4195').rstrip('/')
checks=[];errors=[];servers=[]
def check(name,value):
    checks.append({'name':name,'passed':bool(value)})
    assert value,name

def start_server(source,port):
    proc=subprocess.Popen(['node',str(source/'scripts/serve.mjs')],cwd=source,env={**os.environ,'PORT':str(port)},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    servers.append(proc)
    for _ in range(100):
        try:
            with urllib.request.urlopen(f'http://127.0.0.1:{port}'+M['base']+'tr/',timeout=2) as r:
                if r.status==200:return
        except Exception:time.sleep(.1)
    raise RuntimeError('Preview server failed')

def style(page,selector,pseudo=None):
    return page.locator(selector).evaluate('''(e,pseudo)=>{const s=getComputedStyle(e,pseudo);return {display:s.display,image:s.backgroundImage,repeat:s.backgroundRepeat,mask:s.maskImage,pointer:s.pointerEvents,opacity:s.opacity,bottom:s.bottom,height:s.height,position:s.position}}''',pseudo)

def settle_reading_layout(page):
    # Compare fully loaded covers in both origins using native scrolling and load state.
    for image in page.locator('.book-cover,.new-book-cover img').all():
        image.scroll_into_view_if_needed()
        page.wait_for_function('(image)=>image.complete && image.naturalWidth>0',arg=image.element_handle(),timeout=10000)
    page.evaluate('window.scrollTo(0,0)')
    page.wait_for_function("document.fonts.status === 'loaded'")
    page.evaluate('()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))')

def metrics(page):
    return page.evaluate('''() => Object.fromEntries(['.institution-lockup','.editorial-hero-copy','.manuscript-frame','.audience-paths','.research-feature-layout','.book-gallery'].map(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect(),c=getComputedStyle(e);return [s,{x:r.x,y:r.y,w:r.width,h:r.height,font:c.fontFamily,size:c.fontSize,color:c.color,background:c.backgroundColor}]}))''')

success=False
try:
    if 'PREVIEW_ORIGIN' not in os.environ:start_server(ROOT,4195)
    baseline=os.environ.get('BASELINE_SOURCE')
    if baseline:start_server(Path(baseline),4196)
    engines=os.environ.get('BROWSERS','chromium').split(',')
    with sync_playwright() as p:
        for engine in engines:
            browser=getattr(p,engine).launch()
            ctx=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1)
            ctx.on('page',lambda page:page.on('pageerror',lambda e:errors.append(str(e))))
            page=ctx.new_page()
            for locale in M['locales']:
                for width in [320,390,768,1440,1920]:
                    page.set_viewport_size({'width':width,'height':1000})
                    response=page.goto(ORIGIN+M['base']+locale+'/',wait_until='networkidle')
                    prefix=f'{engine}/{locale}/{width}'
                    check(prefix+' release',response.status==200 and page.locator('body').get_attribute('data-release')==M['version'])
                    check(prefix+' no horizontal overflow',page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
                    s=style(page,'body','::before');h=style(page,'.editorial-hero','::before');accent=style(page,'.editorial-hero-copy','::before')
                    if width>1100:
                        check(prefix+' subdued page and hero ornament',0<float(s['opacity'])<=.12 and 0<float(h['opacity'])<=.12 and 0<float(accent['opacity'])<=.12)
                    if width>900:
                        for label,item in [('page',s),('hero',h)]:
                            check(prefix+' '+label+' original cini active','assets/cini/iznik-corner' in item['image'] and 'repeat' not in item['repeat'].replace('no-repeat',''))
                            check(prefix+' '+label+' pointer safe',item['pointer']=='none')
                            check(prefix+' '+label+' faded periphery','transparent' in item['mask'] or 'rgba(0, 0, 0, 0)' in item['mask'])
                    if width<=650:check(prefix+' no mobile wallpaper',s['display']=='none' and h['display']=='none')
                    check(prefix+' single noninteractive headspace fragment',accent['pointer']=='none' and 'assets/cini/' in accent['image'])
                    # The additional headspace ornament ends ABOVE the copy box.
                    check(prefix+' no motif over title',float(accent['bottom'].removesuffix('px'))>0)
                    check(prefix+' exact approved portal decoded',page.locator('.approved-portal-image').evaluate('async e=>{await e.decode();const i=new Image();i.src=e.currentSrc;await i.decode();return [480,960].includes(i.naturalWidth)&&i.naturalWidth===i.naturalHeight&&getComputedStyle(e).filter==="none"}'))
                    check(prefix+' no superseded title overlay',page.locator('.manuscript-inner,.manuscript-subline').count()==0)
                    check(prefix+' Marmara retained',page.locator('.university-signature img').count()==1)
                    check(prefix+' locale direction',page.locator('html').get_attribute('dir')==('rtl' if locale=='ar' else 'ltr'))
                    if engine=='chromium' and ((locale=='tr' and width in [390,1440,1920]) or (locale in ['en','ar','zh'] and width==1440)):
                        page.screenshot(path=str(OUT/f'live-{locale}-{width}.png'))
                        if locale=='tr' and width==1440:
                            page.screenshot(path=str(OUT/'live-tr-full.png'),full_page=True)
                            page.locator('.editorial-hero').screenshot(path=str(OUT/'live-hero.png'))
                            page.locator('.manuscript-frame').screenshot(path=str(OUT/'live-panel.png'))
            # Real asset requests validate SVG parse and accepted same-origin content.
            for name in ['iznik-corner-a.svg','iznik-corner-b.svg']:
                response=ctx.request.get(ORIGIN+M['base']+'assets/cini/'+name)
                check(engine+' same-origin SVG '+name,response.ok and 'image/svg+xml' in response.headers.get('content-type','') and 'marsam-original' in response.text())
            page.set_viewport_size({'width':1440,'height':1000})
            page.goto(ORIGIN+M['base']+'tr/',wait_until='networkidle')
            base_color=page.locator('body').evaluate('e=>getComputedStyle(e).backgroundColor')
            page.emulate_media(color_scheme='dark')
            check(engine+' no invented dark theme',page.locator('body').evaluate('e=>getComputedStyle(e).backgroundColor')==base_color)
            page.emulate_media(color_scheme='light',reduced_motion='reduce')
            check(engine+' static ornament',page.locator('.editorial-hero-copy').evaluate("e=>getComputedStyle(e,'::before').animationName")=='none')
            page.locator('[data-open-search]').click()
            check(engine+' search not intercepted',page.locator('#global-search').evaluate('e=>e===document.activeElement'))
            page.keyboard.press('Escape')
            check(engine+' focus restored',page.locator('[data-open-search]').evaluate('e=>e===document.activeElement'))
            for media in ['print','forced']:
                if media=='print':page.emulate_media(media='print')
                else:page.emulate_media(media='screen',forced_colors='active')
                for sel in ['body','.editorial-hero','.editorial-hero-copy']:
                    check(engine+' '+media+' removes cini '+sel,style(page,sel,'::before')['display']=='none')
            page.emulate_media(media='screen',forced_colors='none',reduced_motion='no-preference')
            for route in ['research/','books/','resource/sipas/','dossier/preferences-and-boundaries/']:
                page.goto(ORIGIN+M['base']+'tr/'+route,wait_until='networkidle')
                check(engine+' content page fits '+route,page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'))
                if engine=='chromium':page.screenshot(path=str(OUT/('live-'+route.replace('/','-').strip('-')+'.png')))
            if baseline:
                for width in [390,1440]:
                    page.set_viewport_size({'width':width,'height':1000});page.goto(ORIGIN+M['base']+'tr/',wait_until='networkidle');settle_reading_layout(page);after=metrics(page)
                    panel_after=page.locator('.manuscript-frame').screenshot()
                    page.goto('http://127.0.0.1:4196'+M['base']+'tr/',wait_until='networkidle');settle_reading_layout(page);before=metrics(page)
                    if engine=='chromium':page.screenshot(path=str(OUT/f'before-{width}.png'))
                    (OUT/f'baseline-metrics-{engine}-{width}.json').write_text(json.dumps({'before':before,'after':after},indent=2))
                    for selector in before:check(f'{engine}/{width} existing layout and text style unchanged '+selector,before[selector]==after[selector])
                    # Exact panel pixels, not merely a selector-presence check.
                    from PIL import Image,ImageChops
                    import io
                    a=Image.open(io.BytesIO(panel_after)).convert('RGB');b=Image.open(io.BytesIO(page.locator('.manuscript-frame').screenshot())).convert('RGB')
                    check(f'{engine}/{width} panel dimensions unchanged',a.size==b.size)
                    crop=(1,1,a.width-1,a.height-1)
                    check(f'{engine}/{width} panel inside rounding edge pixel-identical',ImageChops.difference(a.crop(crop),b.crop(crop)).getbbox() is None)
            ctx.close();browser.close()
    check('no browser JavaScript errors',not errors)
    success=True
except Exception as e:
    errors.append(str(e));traceback.print_exc()
finally:
    for process in servers:
        process.terminate()
        try:process.wait(timeout=5)
        except subprocess.TimeoutExpired:process.kill()
    result={'version':M['version'],'success':success,'origin':ORIGIN,'browsers':os.environ.get('BROWSERS','chromium').split(','),'passed':sum(c['passed'] for c in checks),'total':len(checks),'baselineCompared':bool(os.environ.get('BASELINE_SOURCE')),'errors':errors,'checks':checks,'limitations':['Not human language review or independent accessibility certification','No field Core Web Vitals measurement']}
    (ROOT/'verification/cini-browser.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
    print(json.dumps({k:v for k,v in result.items() if k!='checks'}))
if not success:raise SystemExit(1)
