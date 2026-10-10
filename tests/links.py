"""Validate every local link and static fragment in the generated release."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from lxml import html
from collections import Counter
import json
R=Path(__file__).resolve().parents[1];S=R/'site';ids={};links=[];fail=[]
for p in sorted(S.rglob('*.html')):
 tree=html.fromstring(p.read_bytes());found=tree.xpath('//@id');ids[p]=set(found)
 duplicate=[x for x,n in Counter(found).items() if n>1]
 if duplicate:fail.append({'page':p.relative_to(S).as_posix(),'duplicateIds':duplicate})
 for val in tree.xpath('//@href|//@src|//@action|//@poster'):
  u=urlsplit(val)
  if not val or u.scheme or u.netloc:continue
  if u.path.startswith('/Marse/'):dest=S/unquote(u.path[7:])
  elif u.path.startswith('/'):
   fail.append({'page':p.relative_to(S).as_posix(),'unmigratedURL':val});continue
  else:dest=p.parent/unquote(u.path) if u.path else p
  if dest.is_dir():dest=dest/'index.html'
  links.append((p,dest,u.fragment,val))
for p,dest,frag,val in links:
 if not dest.exists():fail.append({'page':p.relative_to(S).as_posix(),'missing':val})
 elif frag and dest.suffix=='.html' and unquote(frag) not in ids.get(dest,set()):fail.append({'page':p.relative_to(S).as_posix(),'missingAnchor':val})
report={'pages':len(ids),'localLinksChecked':len(links),'failures':fail}
(R/'qa').mkdir(exist_ok=True);(R/'qa/links.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'pages':len(ids),'links':len(links),'failures':len(fail),'examples':fail[:12]},ensure_ascii=False))
assert not fail
