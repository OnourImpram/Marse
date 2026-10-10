"""Deterministic MARSE migration. Frozen scholarship; approved Turkish shell."""
from pathlib import Path
from copy import deepcopy
import base64, hashlib, json, os, re, shutil, subprocess
from urllib.parse import urlsplit, unquote
from html import escape
import tinycss2
from bs4 import BeautifulSoup as BS, NavigableString

ROOT=Path(__file__).resolve().parents[1]
UP=ROOT/'upstream/marsam'; OUT=ROOT/'site'; BASE='/Marse/'
LOCALES=['tr','en','de','zh','ru','ar','id','ms']
NAMES=['Türkçe','English','Deutsch','简体中文','Русский','العربية','Bahasa Indonesia','Bahasa Melayu']
TITLE='Maneviyat ve Ruh Sağlığı Araştırma ve Uygulama Enstitüsü'
D=ROOT/'design/approved-tr-iapos.html'
sha=lambda b:hashlib.sha256(b).hexdigest()
lock=json.loads((ROOT/'migration/source-lock.json').read_text())
assert sha(D.read_bytes())==lock['approvedDesignSHA256']
for x in lock['files']:
 assert sha((UP/x['path']).read_bytes())==x['sha256'],x['path']
subprocess.run(['node','scripts/build.mjs'],cwd=UP,env={**os.environ,'BASE_PATH':BASE},check=True)
SRC=UP/'dist'
if OUT.exists():shutil.rmtree(OUT)
OUT.mkdir()
# Copy all generated research data, citations and downloads, never discard a scientific file.
for p in SRC.iterdir():
 if p.is_dir() and p.name not in LOCALES:shutil.copytree(p,OUT/p.name)
 elif p.is_file() and p.suffix!='.html':shutil.copy2(p,OUT/p.name)
(OUT/'assets').mkdir(exist_ok=True)
soup=lambda s:BS(s,'lxml')
fragment=lambda s:soup('<div>'+s+'</div>').body.div
approved=soup(D.read_text())
logo=approved.select_one('#protected-portal')
if not logo:logo=approved.select_one('.marse-hero-logo img') or approved.select_one('img[src^="data:image/png"]')
assert logo and logo['src'].startswith('data:')
logo_bytes=base64.b64decode(logo['src'].split(',',1)[1])
(OUT/'assets/marse-logo.png').write_bytes(logo_bytes)
css='\n'.join(s.get_text() for s in approved.select('style'))
(OUT/'assets/marse.css').write_text(css)
# Scope the legacy reading styles. The approved homepage/header never inherits the old theme.
def scoped_rules(rules):
 out=[]
 for r in rules:
  if r.type=='qualified-rule':
   groups=[];g=[]
   for t in r.prelude:
    if t.type=='literal' and t.value==',':groups.append(g);g=[]
    else:g.append(t)
   groups.append(g);sels=[]
   for group in groups:
    text=tinycss2.serialize(group).strip()
    if not text:continue
    text=re.sub(r'(^|[\s>+~])(?:html|body)(?=[\s>+~:.\[#]|$)',r'\1.archive-reading',text)
    text=text.replace(':root','.archive-reading')
    sels.append(text if text.startswith('.archive-reading') else '.archive-reading '+text)
   out.append(','.join(sels)+'{'+tinycss2.serialize(r.content)+'}')
  elif r.type=='at-rule':
   pre='@'+r.at_keyword+' '+tinycss2.serialize(r.prelude)
   if r.content is None:out.append(pre+';')
   elif r.lower_at_keyword in ['media','supports','layer','container']:
    out.append(pre+'{'+scoped_rules(tinycss2.parse_rule_list(r.content,skip_comments=True,skip_whitespace=True))+'}')
   elif 'keyframes' in r.lower_at_keyword:out.append(tinycss2.serialize([r]))
 return '\n'.join(out)
legacy=scoped_rules(tinycss2.parse_stylesheet((SRC/'site.css').read_text(),skip_comments=True,skip_whitespace=True))
legacy=legacy.replace('url("assets/','url("'+BASE+'assets/')
(OUT/'assets/reading.css').write_text(legacy+'\n'+(ROOT/'scripts/reading.css').read_text())
for name in ['app.js','campus.js','campus-core.js','heritage.js','search-core.js','url-state.js']:
 text=(SRC/name).read_text().replace('marsam-reading-list-v1','marse-reading-list-v1').replace('marsam-source-comparison-v1','marse-source-comparison-v1').replace('MARSAM-','MARSE-').replace("'MARSAM'","'MARSE'").replace("mode:'institutional-preview'","mode:'review-preview'").replace('marsam-source-suggestion','marse-source-suggestion')
 (OUT/name).write_text(text)
# A shared menu enhancement, without the single-file prototype's route handler on reading pages.
(OUT/'assets/shell.js').write_text("""(()=>{const b=document.getElementById('menu-toggle'),n=document.getElementById('primary-nav');if(!b||!n)return;b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus();}});})();""")

# These new shell translations describe only the identity approved by the owner.
I={
 'tr':[TITLE,'MARSE, maneviyatın ruh sağlığıyla ilişkisine odaklanan bilimsel kaynaklara ve mesleki uygulama bilgisine erişimi kolaylaştırmak amacıyla geliştirilen bağımsız bir enstitü girişimidir.','Prof. Dr. Halil Ekşi’nin akademik öncülüğünde geliştirilmektedir.','Uygulama','Ölçme Araçları','Eğitimlerimiz','Kütüphane','Hakkımızda','İçindekiler'],
 'en':['Institute for Research and Practice in Spirituality and Mental Health','MARSE is an independent institute initiative being developed to facilitate access to scientific resources and professional practice information on spirituality and mental health.','Developed under the academic leadership of Prof. Dr. Halil Ekşi.','Practice','Measurement','Learning','Library','About','Contents'],
 'de':['Institut für Forschung und Praxis zu Spiritualität und psychischer Gesundheit','MARSE ist eine unabhängige Institutsinitiative im Aufbau, die wissenschaftliche Ressourcen und Informationen zur beruflichen Praxis im Bereich Spiritualität und psychische Gesundheit zugänglich macht.','Entwickelt unter der wissenschaftlichen Leitung von Prof. Dr. Halil Ekşi.','Praxis','Messinstrumente','Lernen','Bibliothek','Über uns','Inhalte'],
 'zh':['灵性与心理健康研究及实践研究所','MARSE是正在建设中的独立研究所倡议，旨在促进人们获取灵性与心理健康领域的科学资源和专业实践信息。','在Halil Ekşi教授的学术指导下开展建设。','实践','测量工具','学习','资源库','关于我们','目录'],
 'ru':['Институт исследований и практики в области духовности и психического здоровья','MARSE — развивающаяся независимая институтская инициатива, облегчающая доступ к научным ресурсам и информации о профессиональной практике в области духовности и психического здоровья.','Развивается под академическим руководством профессора Халила Экши.','Практика','Измерение','Обучение','Библиотека','О нас','Содержание'],
 'ar':['معهد البحث والممارسة في الروحانية والصحة النفسية','MARSE مبادرة مستقلة لمعهد قيد التطوير، تهدف إلى تيسير الوصول إلى المصادر العلمية ومعلومات الممارسة المهنية في مجال الروحانية والصحة النفسية.','يجري تطوير المبادرة بقيادة أكاديمية من الأستاذ الدكتور خليل إكشي.','الممارسة','القياس','التعلم','المكتبة','عن المبادرة','المحتويات'],
 'id':['Institut Penelitian dan Praktik Spiritualitas dan Kesehatan Mental','MARSE adalah inisiatif institut independen yang sedang dikembangkan untuk memudahkan akses ke sumber ilmiah dan informasi praktik profesional tentang spiritualitas dan kesehatan mental.','Dikembangkan di bawah kepemimpinan akademik Prof. Dr. Halil Ekşi.','Praktik','Pengukuran','Pembelajaran','Pustaka','Tentang','Isi'],
 'ms':['Institut Penyelidikan dan Amalan Kerohanian dan Kesihatan Mental','MARSE ialah inisiatif institut bebas yang sedang dibangunkan untuk memudahkan akses kepada sumber ilmiah dan maklumat amalan profesional tentang kerohanian dan kesihatan mental.','Dibangunkan di bawah pimpinan akademik Prof. Dr. Halil Ekşi.','Amalan','Pengukuran','Pembelajaran','Perpustakaan','Tentang','Kandungan']
}
def brand(text):return re.sub(r'\bMARSAM\b','MARSE',text)
def rebrand_dom(node):
 for t in list(node.find_all(string=True)):
  if t.parent.name not in ['script','style'] and 'MARSAM' in t:t.replace_with(NavigableString(brand(str(t))))
 for e in node.find_all(True):
  for a in ['alt','title','aria-label']:
   if a in e.attrs:e[a]=brand(e[a])

def change_links(node):
 for e in node.find_all(True):
  for attr in ['href','src','action','poster']:
   if attr not in e.attrs:continue
   s=e[attr]
   if s.startswith('https://onourimpram.github.io/MARSAM/'):
    s=BASE+s.split('/MARSAM/',1)[1]
   elif s.startswith('/MARSAM/'):s=BASE+s[len('/MARSAM/'):]
   e[attr]=s

def locale_links(l,rel=''):
 links=[]
 for code,label in zip(LOCALES,NAMES):
  url=BASE+code+'/'+rel
  links.append(f'<a href="{url}" lang="{code}" hreflang="{code}"'+(' aria-current="true"' if l==code else '')+'>'+label+'</a>')
 return '<nav class="marse-languages language-panel" aria-label="Languages">'+''.join(links)+'</nav>'

def shell_header(l):
 h=deepcopy(approved.header); anchors=h.select('#primary-nav a')
 urls=['practice/','measures/','learning/','library/','about/']
 for n,(a,route) in enumerate(zip(anchors,urls)):
  a['href']=(BASE+['#uygulama','#olcme','#egitimler','#kutuphane','#enstitu'][n]) if l=='tr' else BASE+l+'/'+route
  a.string=I[l][3+n]
 h.select_one('.brand')['href']=BASE if l=='tr' else BASE+l+'/'
 h.select_one('.brand')['aria-label']='MARSE'
 d=h.select_one('.brand-description');d.string=I[l][0]
 search=h.select_one('[data-open-search]');search.name='a';search['href']=BASE+l+'/search/'
 search['aria-label']=I[l][6];search['title']=I[l][6]
 return str(h)

def shell_footer(l,rel=''):
 if l=='tr':
  f=deepcopy(approved.footer)
  for a in f.select('a[href^="#"]'):a['href']=BASE+a['href']
  html=str(f)
 else:
  html='<footer class="site-footer"><div class="wrap footer-inner"><span class="footer-brand">MARSE</span><span>'+escape(I[l][0])+'</span></div></footer>'
 return html+'<div class="wrap marse-directory"><a href="'+BASE+l+'/contents/">'+I[l][8]+'</a>'+locale_links(l,rel)+'</div>'

heads=deepcopy(approved.head)
for n in heads.select('style,script,link[rel=canonical],meta[http-equiv],meta[property^="og:"],meta[name^="twitter:"]'):n.decompose()
for name,url in [('stylesheet',BASE+'assets/marse.css'),('stylesheet',BASE+'assets/reading.css'),('icon',BASE+'assets/marse-logo.png')]:
 heads.append(soup(f'<link rel="{name}" href="{url}">').link)
HEAD=str(heads)

def page(content,l,title,path,tail='',extra_body=''):
 h=soup(HEAD).head;h.title.string=brand(title)+' · MARSE'
 h.append(soup('<link rel="canonical" href="https://onourimpram.github.io'+BASE+path+'">').link)
 direction='rtl' if l=='ar' else 'ltr'
 rel=path.split('/',1)[1] if '/' in path else ''
 for m in h.select('meta[name=description]'):m['content']=I[l][1]
 html='<!doctype html><html lang="'+('zh-Hans' if l=='zh' else l)+'" dir="'+direction+'">'+str(h)+'<body class="source-body" data-locale="'+l+'" data-base="'+BASE+'" '+extra_body+'><div class="reading-progress" aria-hidden="true"></div><a class="skip" href="#main">'+I[l][8]+'</a>'+shell_header(l)+'<main id="main" tabindex="-1" class="archive-reading" dir="'+direction+'"><div id="migrated-main">'+content+'</div></main>'+shell_footer(l,rel)+tail+'<script src="'+BASE+'assets/shell.js" defer></script></body></html>'
 return html

routes=[];source_index={};all_sources=json.loads((SRC/'data/v1/sources.json').read_text())['records']
for l in LOCALES:
 source_index[l]=json.loads((SRC/f'data/search-{l}.json').read_text())
 for item in source_index[l]:
  if item['id']=='section-about':item['summary']=I[l][1];item['rawText']=I[l][1]
  for key in ['title','summary','rawText','text']:
   if key in item:item[key]=brand(item[key])
 for p in sorted((SRC/l).rglob('index.html')):
  rel=p.relative_to(SRC).as_posix();sub=p.relative_to(SRC/l).parent.as_posix()
  orig=soup(p.read_text());m=orig.main
  before=brand(m.get_text(' ',strip=True))
  identity=False;notes=[]
  if sub=='.':
   # Preserve every academic home section in the overview, without the obsolete institution hero.
   identity=True;notes.append('Original institutional hero superseded; scientific homepage sections retained in overview.')
   hero=m.select_one('.editorial-hero')
   if hero:hero.decompose()
   for el in m.select('.site-context'):el.decompose()
   intro=fragment('<div class="wide page-intro"><p class="eyebrow">MARSE</p><h1>'+escape(I[l][0])+'</h1><p>'+escape(I[l][1])+'</p></div>')
   m.insert(0,intro)
  elif sub=='about':
   identity=True;notes.append('Superseded university-centre identity replaced by owner-approved independent initiative identity.')
   if l=='tr':
    a=deepcopy(approved.select_one('#enstitu > div'));m.clear();m.append(a)
   else:
    m.clear();m.append(fragment('<div class="wide page-intro"><h1>'+I[l][7]+'</h1><p>'+escape(I[l][1])+'</p></div><article class="wide section reading-body"><h2>MARSE</h2><p>'+escape(I[l][0])+'</p><p>'+escape(I[l][2])+'</p><a class="button" href="'+BASE+l+'/library/">'+I[l][6]+'</a></article>'))
  elif sub=='governance':
   identity=True;notes.append('Institutional-status paragraph updated; all scientific review and governance sections retained.')
   el=m.select_one('#status')
   if el:
    for q in el.select('p'):q.string=I[l][1]
  if sub=='about':
   founder=next((el for el in m.find_all(['h2','h3','p']) if 'Halil' in el.get_text() or 'خليل' in el.get_text() or 'Халил' in el.get_text()),None)
   if founder:founder['id']='founder'
  rebrand_dom(m);change_links(m)
  # About copy came from the single-file design: its local views are on the root page.
  if sub=='about' and l=='tr':
   for a in m.select('a[href^="#"]'):a['href']=BASE+a['href']
  content=m.decode_contents();after=m.get_text(' ',strip=True)
  extra=[]
  dialog=orig.select_one('dialog.search-dialog')
  if dialog:
   rebrand_dom(dialog);change_links(dialog);extra.append(str(dialog))
  for sc in orig.select('script[type="application/json"]'):
   payload=json.loads(sc.string or sc.get_text())
   def clean(x):
    if isinstance(x,dict):
     result={k:clean(v) for k,v in x.items()}
     for k in ['previewNote','institutionalBody','committeeNote']:
      if k in result:result[k]=I[l][1]
     if 'institutionalTitle' in result:result['institutionalTitle']='MARSE'
     if 'brand' in result:result['brand']=I[l][0]
     return result
    if isinstance(x,list):return [clean(v) for v in x]
    return brand(x) if isinstance(x,str) else x
   sc.string=json.dumps(clean(payload),ensure_ascii=False).replace('</','<\\/');extra.append(str(sc))
  extra.append('<div class="toast" role="status" aria-live="polite"></div>')
  for name in ['app.js','campus.js','heritage.js']:extra.append('<script type="module" src="'+BASE+name+'"></script>')
  dest=(f'{l}/overview/index.html' if sub=='.' else rel)
  path=dest.removesuffix('index.html')
  target=OUT/dest;target.parent.mkdir(parents=True,exist_ok=True)
  target.write_text(page(content,l,orig.h1.get_text(' ',strip=True) if orig.h1 else I[l][0],path,''.join(extra)))
  routes.append({'source':rel,'target':dest,'title':orig.h1.get_text(' ',strip=True) if orig.h1 else I[l][0],'locale':l,'identityRevision':identity,'notes':notes,'scienceTextPreserved':before==after,'sourceTextSHA256':sha(before.encode()),'targetTextSHA256':sha(after.encode())})

# Upgrade the approved design in place: same homepage and Turkish prose, complete local catalogue.
home=deepcopy(approved)
for s in home.select('style'):s.decompose()
home.head.append(soup('<link rel="stylesheet" href="'+BASE+'assets/marse.css">').link)
home.head.append(soup('<link rel="stylesheet" href="'+BASE+'assets/reading.css">').link)
for im in home.select('img[src^="data:image/png"]'):
 if im['src']==logo['src']:im['src']=BASE+'assets/marse-logo.png'
change_links(home)
# Match each revised summary to its canonical resource page by DOI/URL.
def urlkey(u):return unquote(u).replace('https://','').replace('http://','').removeprefix('www.').rstrip('/').lower()
canonical={}
sourcecards=[c for c in soup((SRC/'tr/library/index.html').read_text()).select('[data-card]') if '/resource/' in c.select_one('h3 a')['href']]
resource_urls={x['id']:x['url'] for x in source_index['tr'] if '/resource/' in x['url']}
for card in sourcecards:
 a=card.select_one('h3 a');cpath=a['href'];rid=cpath.rstrip('/').split('/')[-1]
 detail=soup((SRC/'tr/resource'/rid/'index.html').read_text())
 for a2 in detail.select('a[href^="https://"]'):
  if 'onourimpram.github.io' not in a2['href']:canonical.setdefault(urlkey(a2['href']),cpath)
oldrows=list(home.select('#library-list .resource-row'));covered=set()
for row in oldrows:
 target=home.select_one(row['href']) if row['href'].startswith('#') else None
 matches=[]
 if target:
  matches=[canonical[urlkey(a['href'])] for a in target.select('a[href^="https://"]') if urlkey(a['href']) in canonical]
 if not matches and row.get('href') in {'#kaynak-101','#kaynak-mesleki-kimlik'}:
  matches=[BASE+'tr/resource/'+{'#kaynak-101':'techniques-101','#kaynak-mesleki-kimlik':'sacred-tensions'}[row['href']]+'/']
 if matches:
  path=max(set(matches),key=matches.count);covered.add(path)
  row['data-canonical']=path
  holder=target.select_one('.button-row') or target.select_one('.page-heading')
  holder.append(fragment('<a class="button secondary migration-detail" href="'+path+'">Ayrıntılı kaynak dosyası</a>').a)
 else:
  assert row['href'] in ['#arsiv-kaynak-03','#arsiv-kaynak-04'],row['href']
kindmap={'study':'Araştırma','book':'Kitap','guide':'Rehber','theory':'Makale','method':'Rehber','measure':'Ölçme'}
extra_rows=[]
for card in sourcecards:
 a=card.select_one('h3 a');url=a['href']
 if url in covered:continue
 kind=kindmap.get(card.get('data-kind'),'Dizin')
 title=a.get_text(' ',strip=True);summary=card.select_one('p').get_text(' ',strip=True)
 raw=card.get('data-search','')
 text='<a class="resource-row" data-kind="'+kind+'" data-search="'+escape(raw,quote=True)+'" data-canonical="'+url+'" href="'+url+'"><span class="resource-kind">'+kind+'</span><span class="resource-text"><strong>'+escape(title)+'</strong><span>'+escape(summary)+'</span></span><span class="row-arrow" aria-hidden="true">↗</span></a>'
 node=fragment(text).a;home.select_one('#library-list').append(node);extra_rows.append(node)
actual=len(home.select('#library-list .resource-row'))
assert actual==81,(actual,len(covered),len(oldrows))
home.select_one('#library-count').string=f'{actual} kaynak'
home.select_one('.library-topline span:last-child').string='Kütüphanenin tamamı'
filters=home.select_one('#kutuphane .filters')
filters.append(fragment('<button class="filter" type="button" data-filter="Ölçme" aria-pressed="false">Ölçme</button>').button)
links={
 'kutuphane':[('library/','Kaynakları ayrıntılı inceleyin'),('books/','Kitaplar'),('publications/','Araştırma makaleleri'),('contents/','Bütün içerikler'),('saved/','Okuma listem'),('compare/','Kaynakları karşılaştırın')],
 'olcme':[('measurement-observatory/','Ölçme araçları ve uyarlamalar'),('measurement-guide/','Ölçme kanıtını değerlendirme rehberi')],
 'olcek-katalogu':[('measurement-observatory/','Tüm ölçme araçlarını inceleyin')],
 'arastirma':[('evidence/','Bulgular ve yorum sınırları'),('evidence-bridges/','Türkiye ve uluslararası araştırmalar'),('research/','Araştırma kaynakları')],
 'kavramlar':[('concepts/','Kavramların ayrıntılı açıklamaları'),('construct-dictionary/','Yapı ve kavram sözlüğü')],
 'yaklasimlar':[('approaches/','Kuramlar ve yaklaşım dosyaları')],
 'yontemler':[('methods/','Yöntem okumaları'),('datasets/','Veri setleri'),('research-guide/','Araştırma okuma rehberi'),('reproducible-lab/','Katalog envanteri laboratuvarı')],
 'uygulama':[('practice/','Danışma süreci üzerine okumalar'),('ethics/','Etik ve mesleki yeterlik')],
 'egitimler':[('learning/','Okuma ve öğrenme yolları'),('media/','Video ve seminer kaynakları')],
 'yayin-ilkeleri':[('editorial/','Yayın ve inceleme süreci'),('governance/','Yönetişim ve kullanım ilkeleri')]
}
for vid,entries in links.items():
 h=home.select_one('#'+vid+' .page-heading')
 if not h:continue
 bar=fragment('<nav class="migration-links" aria-label="İlgili içerikler">'+''.join('<a href="'+BASE+'tr/'+route+'">'+label+' <span aria-hidden="true">↗</span></a>' for route,label in entries)+'</nav>').nav
 h.insert_after(bar)
# The 65 curated views remain, with the complete corpus added to global search without duplicate URLs.
seen=set()
for row in home.select('#global-results .resource-row'):
 if row.get('href','').startswith('#'):
  old=next((r for r in oldrows if r.get('href')==row.get('href')),None)
  if old and old.get('data-canonical'):seen.add(old['data-canonical'])
for item in source_index['tr']:
 if item['url'] in seen:continue
 raw=' '.join([item.get('originalTitle',''),item['title'],item['summary'],item.get('rawText','')])
 node=fragment('<a class="resource-row" data-search="'+escape(raw,quote=True)+'" href="'+item['url']+'"><span class="resource-kind">'+escape(item['kind'])+'</span><span class="resource-text"><strong>'+escape(item['title'])+'</strong><span>'+escape(item['summary'])+'</span></span><span class="row-arrow" aria-hidden="true">↗</span></a>').a
 home.select_one('#global-results').append(node)
# Footer-only language control: no extra homepage decision cards.
home.footer.insert_after(fragment('<div class="wrap marse-directory"><a href="'+BASE+'tr/contents/">İçindekiler</a>'+locale_links('tr')+'</div>').div)
home.head.append(soup('<link rel="icon" href="'+BASE+'assets/marse-logo.png">').link)
home.head.append(soup('<link rel="canonical" href="https://onourimpram.github.io'+BASE+'">').link)
for prop,content in [('og:title','MARSE | '+TITLE),('og:description',I['tr'][1]),('og:image','https://onourimpram.github.io'+BASE+'assets/marse-logo.png'),('og:type','website')]:
 home.head.append(soup('<meta property="'+prop+'" content="'+escape(content,quote=True)+'">').meta)
rebrand_dom(home)
(OUT/'index.html').write_text(str(home));(OUT/'tr/index.html').write_text(str(home))
# Visible language homes share the approved hero composition; source scholarship stays in original editions.
for l in LOCALES[1:]:
 content='<section class="localized-hero wrap"><div><p class="eyebrow">'+escape(I[l][0])+'</p><h1>MARSE</h1><p class="localized-intro">'+escape(I[l][1])+'</p><p>'+escape(I[l][2])+'</p><a class="button" href="'+BASE+l+'/library/">'+I[l][6]+'</a></div><img src="'+BASE+'assets/marse-logo.png" alt="MARSE" width="798" height="798"></section><nav class="wrap migration-links">'+''.join('<a href="'+BASE+l+'/'+url+'/">'+label+'</a>' for url,label in [('practice',I[l][3]),('measures',I[l][4]),('learning',I[l][5]),('overview',I[l][8])])+'</nav>'
 (OUT/l/'index.html').write_text(page(content,l,'MARSE',l+'/'))
# All original routes are directly navigable in an index, not orphaned files in a repository.
for l in LOCALES:
 entries=[x for x in routes if x['locale']==l and x['source']!=l+'/index.html']
 groups={}
 for x in entries:
  rel=x['target'];h=x['title']
  category='resource' if '/resource/' in rel else 'dossier' if '/dossier/' in rel else 'pages'
  groups.setdefault(category,[]).append((rel,h))
 content='<div class="wide page-intro"><p class="eyebrow">MARSE</p><h1>'+I[l][8]+'</h1></div><div class="wide section contents-list">'
 for kind,items in groups.items():
  label=I[l][6] if kind=='resource' else ("Okuma dosyaları" if l=='tr' and kind=='dossier' else I[l][8])
  content+='<details'+(' open' if kind=='pages' else '')+'><summary>'+escape(label)+' · '+str(len(items))+'</summary><ul>'
  content+=''.join('<li><a href="'+BASE+rel.removesuffix('index.html')+'">'+escape(brand(t))+'</a></li>' for rel,t in items)
  content+='</ul></details>'
 content+='</div>'
 (OUT/l/'contents').mkdir(exist_ok=True)
 (OUT/l/'contents/index.html').write_text(page(content,l,I[l][8],l+'/contents/'))
# Keep source data checks/provenance verbatim. Only rewrite runtime navigation and brand strings in search indices.
for l in LOCALES:
 data=source_index[l]
 for item in data:
  for key in ['title','summary','rawText','text']:
   if key in item:item[key]=brand(item[key])
  if item['id']=='section-about':item['summary']=I[l][1];item['rawText']=I[l][1]
 (OUT/f'data/search-{l}.json').write_text(json.dumps(data,ensure_ascii=False))
# Old images and generated metadata remain archived; all rendered logos point to the approved MARSE asset.
manifest={'sourceCommit':lock['commit'],'approvedDesignSHA256':lock['approvedDesignSHA256'],'logoSHA256':sha(logo_bytes),'trackedSourceFiles':len(lock['files']),'sourceRecords':len(all_sources),'locales':LOCALES,'routes':routes,'institutionalRevision':'Independent initiative; the superseded university-centre identity is retained only in the immutable upstream history.','scientificApproval':False}
(OUT/'migration-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(OUT/'release.json').write_text(json.dumps({'name':'MARSE','version':'1.0.0-review','mode':'review-preview','sourceCommit':lock['commit'],'approvedDesignSHA256':lock['approvedDesignSHA256'],'logoSHA256':sha(logo_bytes),'sourceFiles':284,'sourceRecords':len(all_sources),'rootLibraryRecords':actual,'localizedSourceRoutes':len(routes),'newReadingPages':len(list(OUT.glob('*/**/index.html'))),'approvedLocalViews':65,'languages':LOCALES,'scientificApproval':False,'humanLanguageApproval':False,'formalInstitutionalApproval':False},ensure_ascii=False,indent=2))
(OUT/'build-manifest.json').write_text((OUT/'release.json').read_text())
(OUT/'404.html').write_text(page('<div class="wide page-intro"><h1>Sayfa bulunamadı</h1><p>İçeriğe ana sayfadan veya kütüphaneden ulaşabilirsiniz.</p><a class="button" href="'+BASE+'">Ana sayfa</a></div>','tr','Sayfa bulunamadı','404.html'))
# A complete output inventory, excluding the self-referential inventory file.
files=[{'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p.read_bytes())} for p in sorted(OUT.rglob('*')) if p.is_file()]
(OUT/'file-manifest.json').write_text(json.dumps(files,ensure_ascii=False,indent=2))
print(json.dumps({'outputFiles':len(files)+1,'sourceFiles':len(lock['files']),'sources':len(all_sources),'routes':len(routes),'rootLibrary':actual,'unmodifiedScientificPages':sum(x['scienceTextPreserved'] for x in routes),'identityRevisions':sum(x['identityRevision'] for x in routes)},indent=2))
