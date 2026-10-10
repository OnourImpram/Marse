"""Test the matte panel and the research guides on a real local or public site."""
from pathlib import Path
from urllib.request import urlopen
from playwright.sync_api import sync_playwright, expect
import json
import os
import subprocess
import time
import traceback
import pwd
import unicodedata

os.environ['HOME'] = pwd.getpwuid(os.getuid()).pw_dir
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'dist/build-manifest.json').read_text())
base=manifest['base'];version=manifest['version'];locales=manifest['locales']
content=json.loads((ROOT/'src/research-guides.json').read_text())
origin=os.environ.get('PREVIEW_ORIGIN','http://127.0.0.1:4194').rstrip('/')
remote='PREVIEW_ORIGIN' in os.environ
out=ROOT/'.browser-results/research';out.mkdir(parents=True,exist_ok=True)
checks=[];errors=[];posts=[];server=None
(out/'failure.txt').unlink(missing_ok=True)

def check(name,condition):
    checks.append({'name':name,'passed':bool(condition)})
    (out/'progress.json').write_text(json.dumps({'lastCheck':name,'checksCompleted':len(checks),'passed':bool(condition)},ensure_ascii=False))
    if not condition:raise AssertionError(name)

def navigate(page,url):
    last=None
    for attempt in range(3):
        try:return page.goto(url,wait_until='load',timeout=45000)
        except Exception as exc:
            last=exc
            if attempt<2:time.sleep(.5)
    raise last

def go(page,locale,path='',wait_fonts=True):
    r=navigate(page,origin+base+locale+'/'+path)
    check(f'HTTP {locale}/{path}',r is not None and r.status==200)
    expect(page.locator('body')).to_have_attribute('data-release',version)
    if wait_fonts:page.wait_for_function("document.fonts.status === 'loaded'",timeout=8000)

def fit(page,label):
    dims=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})')
    if dims['scroll']>dims['width']+1:
        offenders=page.evaluate("()=>[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,cls:String(e.className),text:e.textContent.slice(0,90)}))")
        (out/'overflow.json').write_text(json.dumps({'label':label,'dims':dims,'offenders':offenders},ensure_ascii=False,indent=2))
    check(label,dims['scroll']<=dims['width']+1)

engines=[x for x in os.environ.get('BROWSERS','chromium,firefox,webkit').split(',') if x]
try:
    if not remote:
        server=subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,env={**os.environ,'PORT':'4194'},stdout=subprocess.DEVNULL)
        for _ in range(80):
            try:urlopen(origin+base+'tr/',timeout=1);break
            except Exception:time.sleep(.1)
    with sync_playwright() as p:
        for engine in engines:
            browser=getattr(p,engine).launch()
            ctx=browser.new_context(accept_downloads=True,viewport={'width':1440,'height':1000})
            ctx.on('request',lambda req:posts.append(req.url) if req.method=='POST' else None)
            page=ctx.new_page();page.on('pageerror',lambda err:errors.append(str(err)))
            for locale in locales:
                print(f'Research checks {engine}/{locale}',flush=True)
                for width in [320,390,768,1440]:
                    page.set_viewport_size({'width':width,'height':1000})
                    go(page,locale)
                    fit(page,f'{engine}/{locale}/home/{width}')
                    values=page.locator('.approved-portal').evaluate('e=>({image:getComputedStyle(e).backgroundImage,filter:getComputedStyle(e).filter,before:getComputedStyle(e,"::before").display,after:getComputedStyle(e,"::after").display,beforeImage:getComputedStyle(e,"::before").backgroundImage,beforeClip:getComputedStyle(e,"::before").clipPath,beforeTransform:getComputedStyle(e,"::before").transform,beforePointer:getComputedStyle(e,"::before").pointerEvents,afterImage:getComputedStyle(e,"::after").backgroundImage,afterClip:getComputedStyle(e,"::after").clipPath,afterTransform:getComputedStyle(e,"::after").transform,afterPointer:getComputedStyle(e,"::after").pointerEvents})')
                    check(f'{engine}/{locale}/{width} no first-layer runtime overlay',values['before']=='none')
                    check(f'{engine}/{locale}/{width} no rectangular foot overlay',values['after']=='none')
                    check(f'{engine}/{locale}/{width} no glow gradient on portal element',values['image']=='none' and values['filter']=='none')
                    check('no superseded wordmark or subtitle overlay',page.locator('.manuscript-wordmark,.manuscript-subline,.manuscript-pattern').count()==0)
                    check('continuous portal decoded',page.locator('.approved-portal-image').evaluate('async e=>{await e.decode();return /portal-continuous-v1\.svg/.test(e.currentSrc)&&e.naturalWidth>0}'))
                    check('Marmara restored',page.locator('.university-signature img').count()>0)
                    check('rejected hero search absent',page.locator('.hero-search-form,.hero-shortcuts,.heritage-floral,.preview-strip').count()==0)
                    if engine=='chromium' and locale=='tr' and width in [390,1440]:
                        page.screenshot(path=str(out/f'home-{width}.png'))
                        if width==1440:page.locator('.manuscript-frame').screenshot(path=str(out/'matte-panel.png'))
                for guide in content['guides']:
                    for width in [390,1440]:
                        page.set_viewport_size({'width':width,'height':1000})
                        go(page,locale,guide['id']+'/')
                        fit(page,f'{engine}/{locale}/{guide["id"]}/{width}')
                        check('one main heading',page.locator('h1').count()==1)
                        expect(page.locator('h1')).to_have_text(guide['title'][locale])
                        check('draft stays visible',page.locator('[data-review-status="draft"]').is_visible())
                        check('complete native downloads',page.locator('.research-downloads a[download]').count()==len(guide['downloads']))
                        check('page language',page.locator('html').get_attribute('lang')=={'zh':'zh-Hans'}.get(locale,locale))
                        check('reading direction',page.locator('html').get_attribute('dir')==('rtl' if locale=='ar' else 'ltr'))
                        if engine=='chromium' and locale in ['tr','ar']:
                            page.screenshot(path=str(out/f'{guide["id"]}-{locale}-{width}.png'),full_page=True)
                page.set_viewport_size({'width':1440,'height':1000});go(page,locale,'research/')
                check('workbench from research route',page.locator('.workbench-card').count()==4)
                if engine=='chromium' and locale=='tr':page.screenshot(path=str(out/'research-desktop.png'),full_page=True)
                go(page,locale,'research-guide/')
                with page.expect_download() as downloaded:page.locator('a[download][href$="research-summary.json"]').click()
                template=json.loads(Path(downloaded.value.path()).read_text())
                check('actual template has no invented result',template['study']['sampleSize'] is None and template['review']['approved'] is False)
                go(page,locale,'reproducible-lab/')
                expectedCount=page.evaluate('(x)=>new Intl.NumberFormat(x.locale).format(x.count)',{'locale':'zh-Hans' if locale=='zh' else locale,'count':manifest['resources']})
                captionNumber=page.locator('.lab-output caption').inner_text().split()[0]
                # Node and browser ICU may choose different valid Arabic digit systems.
                digits=''.join(str(unicodedata.decimal(ch)) for ch in captionNumber if ch.isdecimal())
                check('inventory table uses current catalogue',bool(digits) and int(digits)==manifest['resources'])
                if locale=='tr':
                    for filename in ['catalogue.csv','catalogue_lab.py','catalogue.ipynb','catalogue.qmd']:
                        with page.expect_download() as downloaded:page.locator(f'a[download][href$="{filename}"]').click()
                        raw=Path(downloaded.value.path()).read_bytes()
                        check(f'actual download {engine}/{filename}',raw==(ROOT/'dist/research-downloads'/filename).read_bytes())
                # Deep guide content is discoverable without a homepage search block.
                go(page,locale,'search/')
                page.locator('#page-search').fill(content['guides'][0]['title'][locale])
                expect(page.locator('.search-result[href$="/research-guide/"]')).to_have_count(1)
                check('guide in native search',True)
            ctx.close()
            nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':850})
            page=nojs.new_page();go(page,'tr','research-guide/',wait_fonts=False)
            check('guide readable without javascript',page.locator('.research-downloads a').count()==2)
            nojs.close();browser.close()
    check('no browser exceptions',not errors)
    check('no outgoing submissions',not posts)
except Exception:
    (out/'failure.txt').write_text(traceback.format_exc())
    raise
finally:
    if server:server.terminate();server.wait(timeout=10)
    receipt={'success':bool(checks) and all(c['passed'] for c in checks) and not errors and not posts and not (out/'failure.txt').exists(),'version':version,'origin':origin,'browsers':engines,'checks':checks,'consoleErrors':errors,'posts':posts}
    (ROOT/'verification').mkdir(exist_ok=True)
    (ROOT/'verification/research-browser.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2))
    print(json.dumps({'success':receipt['success'],'checks':len(checks),'browsers':engines}))
