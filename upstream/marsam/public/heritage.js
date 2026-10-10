/** Progressive, local-only bibliography filters. No analytics or submitted personal data. */
import {normalizeLoose,searchRecords} from './search-core.js';
import {syncLocaleLinks} from './url-state.js';
const locale=document.documentElement.lang==='zh-Hans'?'zh':document.documentElement.lang;
const normalizeText=value=>normalizeLoose(value,locale);
const root=document.querySelector('[data-bibliography]');
if(root){
 const form=root.querySelector('[data-bib-form]'),q=root.querySelector('[data-bib-query]'),author=root.querySelector('[data-bib-author]'),year=root.querySelector('[data-bib-year]'),cards=[...root.querySelectorAll('[data-bib-record]')];
 const params=new URLSearchParams(location.search);
 q.value=(params.get('q')||'').slice(0,160);
 for(const [control,key]of [[author,'author'],[year,'year']])if([...control.options].some(o=>o.value===params.get(key)))control.value=params.get(key);
 function update(sync=false){
  const query=normalizeText(q.value.trim());let count=0;
  for(const card of cards){
   let names=[];try{names=JSON.parse(card.dataset.authors);}catch{}
   const show=(!query||searchRecords([{title:card.querySelector('h3')?.textContent||'',rawText:card.dataset.search,identifiers:JSON.parse(card.dataset.identifiers||'[]')}],q.value,locale).length>0)&&(!author.value||names.includes(author.value))&&(!year.value||card.dataset.year===year.value);
   card.hidden=!show;if(show)count++;
  }
  root.querySelector('[data-bib-count]').textContent=count+' '+root.dataset.resultsLabel;
  root.querySelector('[data-bib-empty]').hidden=count!==0;
  if(sync){const next=new URL(location.href);for(const key of ['q','author','year'])next.searchParams.delete(key);if(q.value.trim())next.searchParams.set('q',q.value.trim());if(author.value)next.searchParams.set('author',author.value);if(year.value)next.searchParams.set('year',year.value);history.replaceState(null,'',next);syncLocaleLinks();}
 }
 const switcher=root.querySelector('[data-view-switch]'),gallery=root.querySelector('.books-full');
 if(switcher&&gallery){
  switcher.hidden=false;
  const setView=(value,sync=false)=>{const view=value==='list'?'list':'covers';gallery.dataset.view=view;switcher.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));if(sync){const next=new URL(location.href);view==='list'?next.searchParams.set('view',view):next.searchParams.delete('view');history.replaceState(null,'',next);syncLocaleLinks();}};
  setView(params.get('view'));switcher.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view,true)));
 }
 syncLocaleLinks();
 form.addEventListener('input',()=>update(true));form.addEventListener('change',()=>update(true));form.addEventListener('submit',ev=>{ev.preventDefault();update(true);});form.addEventListener('reset',()=>{requestAnimationFrame(()=>update(true));});update();
}
