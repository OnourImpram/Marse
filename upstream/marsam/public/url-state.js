/** Preserve only meaningful, bounded state when changing language on the same route. */
export function syncLocaleLinks() {
  const allowed=['q','type','topic','author','year','view','ids'];
  const source=new URL(location.href);
  document.querySelectorAll('.language-panel a').forEach(anchor=>{
    const url=new URL(anchor.href,location.href);
    for(const key of allowed){const value=source.searchParams.get(key);value?url.searchParams.set(key,value.slice(0,key==='q'?160:600)):url.searchParams.delete(key);}
    url.hash=source.hash;
    anchor.href=url.href;
  });
}
