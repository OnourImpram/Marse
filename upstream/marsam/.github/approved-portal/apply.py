from pathlib import Path
import re,json,hashlib
from PIL import Image

def replace(path,old,new):
 p=Path(path);s=p.read_text();assert s.count(old)==1,(path,old[:80],s.count(old));p.write_text(s.replace(old,new))

p=Path('src/editorial.mjs');s=p.read_text()
start=s.index('  <div class="heritage-art"');end=s.index('\n',start)
assert 'manuscript-subline' in s[start:end]
new='''  <div class="heritage-art" aria-hidden="true"><div class="manuscript-frame approved-portal"><picture class="approved-portal-picture"><source media="(max-width: 650px)" srcset="${base}assets/heritage/approved-portal-480.webp"><img class="approved-portal-image" src="${base}assets/heritage/approved-portal-960.webp" srcset="${base}assets/heritage/approved-portal-480.webp 480w, ${base}assets/heritage/approved-portal-960.webp 960w" sizes="(max-width: 650px) 265px, (max-width: 900px) 32vw, (max-width: 1100px) 38vw, 480px" alt="" width="960" height="960" decoding="async" fetchpriority="low"></picture></div></div>'''
p.write_text(s[:start]+new+s[end:])

p=Path('public/site.css');s=p.read_text();a=s.index('/* MARSAM Iznik cini');b=s.index('/* End MARSAM Iznik cini */',a)
section=s[a:b]
values=iter(['.09','.11','.08','.06','.07','.06','.05','.05'])
count=len(re.findall(r'opacity:[.\d]+',section));assert count==8,count
section=re.sub(r'opacity:[.\d]+',lambda m:'opacity:'+next(values),section)
section=section.replace('#000 calc(var(--cini-gutter)*.25)','#000').replace('#000 calc(100% - var(--cini-gutter)*.25)','#000')
s=s[:a]+section+s[b:]
s+='''\n/* Owner-approved 3 October 2026 artwork. Exact square composition, no legacy overlay. */
.manuscript-frame.approved-portal{width:100%;height:auto;aspect-ratio:1;padding:0;border:0;background:transparent;overflow:visible}
.manuscript-frame.approved-portal::before,.manuscript-frame.approved-portal::after{display:none}
.approved-portal-picture{display:block;width:100%;line-height:0;pointer-events:none}
.approved-portal-image{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:contain;pointer-events:none}
'''
p.write_text(s)

dest=Path('public/assets/heritage');im=Image.open(dest/'approved-portal-960.webp').convert('RGB')
assert im.size==(960,960)
im.resize((480,480),Image.Resampling.LANCZOS).save(dest/'approved-portal-480.webp','WEBP',quality=82,method=6)
assets=[]
for size in [960,480]:
 f=dest/f'approved-portal-{size}.webp';data=f.read_bytes()
 assets.append({'path':str(f),'width':size,'height':size,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
Path('docs/design/APPROVED_PORTAL_ASSETS.json').write_text(json.dumps({'ownerApproval':'2026-10-03','originalPngSha256':'89d1a10b8320a252434d5cba8c982874c44772904e0575ecbcb8eb77fd8ece90','origin':'AI-generated artwork supplied and explicitly approved by the project owner in this conversation','depicts':'Imagined architectural graphic, not a real Marmara University building or a historical artifact','text':'MARSAM','permissions':'Owner requested this artwork to be used on the MARSAM website. No institutional approval is inferred.','processing':'Original PNG resized to 960 square with Lanczos, WebP quality 72 method 6. Mobile derived at 480 square quality 82. No crop, recolor, regenerated text or geometric overlay.','assets':assets},ensure_ascii=False,indent=2)+'\n')

replace('tests/bookplate.test.mjs','annotated bookplate uses the original rosette as a full interior background, without the crossed-out floral ornament','approved layered portal retains ebru and geometry without the removed subtitle or extra embellishments')
replace('tests/bookplate.test.mjs',"assert.ok(art.includes('class=\"manuscript-pattern\" aria-hidden=\"true\"'),locale+' full surface decorative layer');","assert.ok(art.includes('class=\"approved-portal-image\"'),locale+' exact approved composition');")
replace('tests/bookplate.test.mjs',"assert.ok(art.includes('manuscript-wordmark')&&art.includes('ebru-marbling.webp'),locale+' identity and border retained');","assert.ok(art.includes('approved-portal-960.webp')&&!art.includes('manuscript-subline'),locale+' approved image without subtitle');")
replace('tests/identity-restoration.test.mjs',"assert.ok(html.includes('class=\"manuscript-pattern\"'));","assert.ok(html.includes('class=\"approved-portal-image\"'));")
replace('tests/identity-restoration.test.mjs',"assert.ok(html.includes('ebru-marbling.webp'));","assert.ok(html.includes('approved-portal-960.webp'));")
replace('tests/heritage.test.mjs',"assert.ok(h.includes('ebru-marbling.webp'));","assert.ok(h.includes('approved-portal-960.webp'));")
replace('tests/design.test.mjs',"assert.ok(h.includes('ebru-marbling.webp'));assert.ok(h.includes('ebru-marbling-small.webp'));","assert.ok(h.includes('approved-portal-960.webp'));assert.ok(h.includes('approved-portal-480.webp'));")
replace('tests/design.test.mjs','class="hero-water"','class="approved-portal-image"')
p=Path('tests/cini.test.mjs');s=p.read_text()
s=s.replace('existing cini contours are visibly reinforced without opaque decoration','existing cini remains a subordinate background after owner approval')
s=s.replace('opacity >= .24 && opacity <= .4','opacity > 0 && opacity <= .12')
s=s.replace('must remain visible but subordinate','must stay subdued')
p.write_text(s)

p=Path('tests/browser_suite.py');s=p.read_text();a=s.index("                        inner = page.locator('.manuscript-inner')");b=s.index('                        if width < 650:',a)
s=s[:a]+'''                        art = page.locator('.approved-portal-image')
                        art.evaluate('(e)=>e.decode()')
                        box = art.bounding_box()
                        self.ck(f'{engine}/{locale}/{width} exact approved portal is square', abs(box['width']-box['height']) <= 1 and art.evaluate('e=>e.naturalWidth===e.naturalHeight&&e.naturalWidth>=480'))
                        self.ck(f'{engine}/{locale}/{width} decorative picture never captures input', art.evaluate('(e)=>getComputedStyle(e).pointerEvents') == 'none')
                        self.ck(f'{engine}/{locale}/{width} superseded subtitle and flat overlay absent', page.locator('.manuscript-subline,.manuscript-inner').count() == 0)
'''+s[b:];p.write_text(s)

p=Path('tests/cini_e2e.py');s=p.read_text()
s=re.sub(r"check\(([^\n]*?)float\(s\['opacity'\]\)>=\.24[^\n]*", "check(prefix+' subdued page and hero ornament',0<float(s['opacity'])<=.12 and 0<float(h['opacity'])<=.12 and 0<float(accent['opacity'])<=.12)",s)
old="check(prefix+' matte panel retained',page.locator('.manuscript-inner').evaluate('e=>getComputedStyle(e).backgroundImage')=='none')"
new="check(prefix+' exact approved portal decoded',page.locator('.approved-portal-image').evaluate('async e=>{await e.decode();return e.naturalWidth>=480&&e.naturalWidth===e.naturalHeight&&getComputedStyle(e).filter===\"none\"}'))\n                    check(prefix+' no superseded title overlay',page.locator('.manuscript-inner,.manuscript-subline').count()==0)"
assert old in s;s=s.replace(old,new);p.write_text(s)

p=Path('package.json');data=json.loads(p.read_text());assert data['version']=='0.8.2';data['version']='0.8.3';data['scripts']['test']+=' tests/approved-portal.test.mjs';p.write_text(json.dumps(data,indent=2)+'\n')
p=Path('src/release.mjs');s=p.read_text();s=re.sub(r"version:'[^']+'", "version:'0.8.3'",s);s=re.sub(r"id:'[^']+'","id:'marsam-approved-portal-0.8.3'",s);s=re.sub(r"date:'[^']+'","date:'2026-10-03'",s);p.write_text(s)

p=Path('AGENTS.md');p.write_text('''## Latest owner-approved visual, 3 October 2026

Use the exact supplied layered ebru portal artwork recorded in docs/design/APPROVED_PORTAL_ASSETS.json. It supersedes earlier requirements to retain the flat manuscript interior. Only MARSAM appears inside the picture. Do not restore the Arastirma / Ogrenme subtitle, old overlaid rosette, or independent wordmark. Preserve the warm palette, academic typography, Marmara masthead and existing scholarly content. Cini is a restrained background, not a foreground wall covering. The approved square artwork must never be stretched or regenerated. No institutional approval follows from this visual approval.

'''+p.read_text())
Path('docs/design/APPROVED_PORTAL_0_8_3.md').write_text('''# Approved layered MARSAM portal and subdued cini

The owner selected a supplied square artwork with nested ivory and teal ebru arches, existing geometric linework and only MARSAM in the center. This is an artwork replacement within the current hero component, not a new site design. The original PNG hash and optimized asset identities are recorded separately.

Existing source text, eight locales, typography, palette tokens, research downloads, identity, navigation and search remain unchanged. The noninteractive decorative picture has explicit square dimensions and a smaller mobile derivative. Existing print and forced-colour rules hide the decorative art. No animation, font or JavaScript dependency is added.

Page, hero and headspace cini use the existing original SVGs. Their alpha is reduced, with a gradual outward-edge mask. No glow, whitening layer or color change is introduced. Desktop values are 0.09, 0.11 and 0.08. Narrower breakpoints use 0.05 to 0.07. This is not a field Core Web Vitals or human language audit.

Candidate verification and actual public deployment are recorded separately. Until the exact release is checked at the public origin, this document does not assert that deployment is complete.
''')
print(json.dumps(assets))
