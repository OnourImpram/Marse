"""Regression for the owner's real portal seam, not merely its previous screenshot."""
import json,os,pwd,subprocess,time,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'dist/build-manifest.json').read_text())
origin=os.environ.get('PREVIEW_ORIGIN','http://127.0.0.1:4307').rstrip('/')
base=manifest['base'];out=ROOT/'verification/portal-continuity';out.mkdir(parents=True,exist_ok=True)
checks=[];errors=[];server=None;completed=False

def check(name,passed):
 checks.append({'name':name,'passed':bool(passed)})
 assert passed,name

try:
 if not os.environ.get('PREVIEW_ORIGIN'):
  server=subprocess.Popen(['node','scripts/serve.mjs'],cwd=ROOT,env={**os.environ,'PORT':'4307'},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  for _ in range(50):
   try: urllib.request.urlopen(origin+base+'tr/',timeout=1);break
   except OSError: time.sleep(.1)
 with sync_playwright() as pw:
  for engine in os.environ.get('BROWSERS','chromium,firefox,webkit').split(','):
   browser=getattr(pw,engine).launch(headless=True,env={**os.environ,'HOME':pwd.getpwuid(os.getuid()).pw_dir})
   for dpr in [1,3]:
    ctx=browser.new_context(viewport={'width':390,'height':1000},device_scale_factor=dpr)
    page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    for locale in (manifest['locales'] if dpr==1 else ['tr','ar']):
     page.goto(origin+base+locale+'/',wait_until='networkidle')
     for width in [320,390,650,651,900,1440]:
      page.set_viewport_size({'width':width,'height':1000})
      page.locator('.approved-portal-image').evaluate('(e)=>e.decode()')
      tag=f'{engine}/{locale}/{dpr}/{width}'
      actual=page.locator('.approved-portal').evaluate('e=>({before:getComputedStyle(e,"::before").display,after:getComputedStyle(e,"::after").display,rect:e.getBoundingClientRect().toJSON(),src:e.querySelector("img").currentSrc})')
      check(tag+' single decoded image',actual['src'].endswith('portal-continuous-v1.svg'))
      check(tag+' independent overlays absent',actual['before']=='none' and actual['after']=='none')
      check(tag+' square',abs(actual['rect']['width']-actual['rect']['height'])<.5)
      check(tag+' page fits',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
      if locale=='tr' and ((dpr==3 and width==390) or (dpr==1 and width==1440)):
       portal=page.locator('.approved-portal');portal.screenshot(path=str(out/f'{engine}-{width}-dpr{dpr}.png'))
       page.screenshot(path=str(out/f'{engine}-page-{width}-dpr{dpr}.png'))
    # Compare protected original areas and the corrected foot against original pixel authority.
    result=page.evaluate('''async ({base})=>{
     const fixed=document.querySelector('.approved-portal-image');await fixed.decode();
     const original=new Image();original.src=base+'assets/heritage/approved-portal-960.webp';await original.decode();
     const pixels=img=>{const c=document.createElement('canvas');c.width=c.height=960;const x=c.getContext('2d');x.drawImage(img,0,0,960,960);return x.getImageData(0,0,960,960).data};
     const a=pixels(fixed),b=pixels(original);
     const diff=(box,mirror=false)=>{let max=0,sum=0,n=0;for(let y=box[1];y<box[3];y++)for(let x=box[0];x<box[2];x++)for(let k=0;k<3;k++){const d=Math.abs(a[(y*960+x)*4+k]-b[(y*960+(mirror?959-x:x))*4+k]);max=Math.max(max,d);sum+=d;n++}return {max,mean:sum/n}};
     return {rail:diff([135,882,465,918]),centre:diff([290,405,670,730]),right:diff([495,110,940,912]),foot:diff([134,786,154,842],true)};
    }''',{'base':base})
    for name,value in result.items():check(f'{engine}/{dpr}/{name} original pixel authority',value['max']<=3)
    (out/f'{engine}-dpr{dpr}-pixels.json').write_text(json.dumps(result,indent=2))
    ctx.close()
   browser.close()
 check('no page errors',not errors);completed=True
finally:
 if server:server.terminate();server.wait(timeout=10)
 report={'version':manifest['version'],'origin':origin,'success':completed,'checks':checks,'errors':errors,'pixelAuthority':'original approved WebP, not previous defective CSS screenshot'}
 (out/'receipt.json').write_text(json.dumps(report,indent=2))
 print(json.dumps({'success':completed,'checks':len(checks),'origin':origin}))
