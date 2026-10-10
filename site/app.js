import {normalizeLoose,searchRecords} from './search-core.js';
import {syncLocaleLinks} from './url-state.js';
/* Progressive enhancement. No analytics, account, remote form submission or clinical data. */
const node = document.getElementById('ui-data');
if (node) {
  let config;
  try { config = JSON.parse(node.textContent); } catch { config = null; }
  if (config) start(config);
}
function start({locale, base, labels: t, version, errors: formErrors}) {
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];
  const normalize = value => normalizeLoose(value,locale);
  const safeURL = value => { try { const u=new URL(value); return u.protocol==='https:'&&!u.username&&!u.password?u.href:null; } catch{return null;} };
  const toast = $('.toast'); let toastTimer;
  const announce = message => { if(!toast)return; toast.textContent=message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('visible'),4400); };
  const localKey='marse-reading-list-v1';
  let storageAvailable=true;
  function readSaved() {try { const ids=JSON.parse(localStorage.getItem(localKey)||'[]');return Array.isArray(ids)?[...new Set(ids.filter(x=>typeof x==='string'&&/^[a-z0-9-]{1,100}$/.test(x)))].slice(0,200):[]; }catch{storageAvailable=false;return [];} }
  let saved=readSaved();
  const writeSaved = next => {try {localStorage.setItem(localKey,JSON.stringify(next));saved=next;return true;}catch{storageAvailable=false;announce(t.storageError);return false;} };
  function syncButtons(){for(const btn of $$('[data-save]')){const active=saved.includes(btn.dataset.save);btn.setAttribute('aria-pressed',String(active));const label=$('.save-label',btn);if(label)label.textContent=active?t.bookmarked:t.bookmark;const name=(btn.getAttribute('aria-label')||'').split(': ').slice(1).join(': ');btn.setAttribute('aria-label',`${active?t.bookmarked:t.bookmark}${name?': '+name:''}`);btn.title=active?t.bookmarked:t.bookmark;}}
  syncButtons();
  for(const btn of $$('[data-save]'))btn.addEventListener('click',()=>{const id=btn.dataset.save;const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];if(writeSaved(next)){syncButtons();announce(saved.includes(id)?t.bookmarked:t.remove);}});
  let indexPromise;
  async function getIndex(){if(!indexPromise)indexPromise=fetch(`${base}data/search-${locale}.json?v=${encodeURIComponent(version)}`,{credentials:'omit'}).then(r=>{if(!r.ok)throw Error('Index unavailable');return r.json();}).then(data=>{if(!Array.isArray(data))throw Error('Invalid index');return data.filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.summary==='string'&&typeof x.text==='string'&&typeof x.url==='string'&&x.url.startsWith(`${base}${locale}/`)&&!x.url.includes('..')&&!x.url.includes('\\'));});return indexPromise;}
  function resultLink(item){const a=document.createElement('a');a.className='search-result';a.href=item.url;const label=document.createElement('span');label.className='eyebrow';label.textContent=item.kind;const h=document.createElement('h2');h.textContent=item.title;h.dir='auto';const p=document.createElement('p');p.textContent=item.summary;p.dir='auto';a.append(label,h,p);return a;}
  function empty(message){const p=document.createElement('p');p.className='empty-state';p.textContent=message;return p;}
  async function renderSaved(){const mount=$('[data-saved-list]');if(!mount)return;const clear=$('[data-clear-saved]');try{const items=(await getIndex()).filter(x=>saved.includes(x.id));mount.replaceChildren();if(!items.length)mount.append(empty(storageAvailable?t.savedEmpty:t.storageError));for(const item of items){const row=document.createElement('div');row.className='saved-item';const remove=document.createElement('button');remove.type='button';remove.textContent=t.remove;remove.setAttribute('aria-label',`${t.remove}: ${item.title}`);remove.addEventListener('click',()=>{if(writeSaved(saved.filter(x=>x!==item.id)))renderSaved();});row.append(resultLink(item),remove);mount.append(row);}clear.hidden=!items.length;}catch{mount.replaceChildren(empty(t.searchError));}}
  renderSaved();
  $('[data-clear-saved]')?.addEventListener('click',()=>{if(writeSaved([])){syncButtons();renderSaved();announce(t.clearConfirm);}});
  addEventListener('storage',event=>{if(event.key===localKey){saved=readSaved();syncButtons();renderSaved();}});
  const dialog=$('.search-dialog');let previousFocus;
  for(const a of $$('[data-open-search]'))a.addEventListener('click',event=>{if(typeof dialog?.showModal!=='function')return;event.preventDefault();previousFocus=document.activeElement;dialog.showModal();$('#global-search').focus();});
  $('[data-close-search]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('close',()=>previousFocus?.focus());
  dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')for(const d of $$('details[open]'))d.open=false;if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)&&!document.activeElement?.isContentEditable){const open=$('[data-open-search]');if(open){event.preventDefault();open.click();}}});
  for(const d of $$('.nav-group,.language-select'))d.addEventListener('toggle',()=>{if(d.open)for(const other of $$('.nav-group,.language-select'))if(other!==d)other.open=false;});
  document.addEventListener('click',event=>{for(const d of $$('.nav-group[open],.language-select[open]'))if(!d.contains(event.target))d.open=false;});
  // Catalogue filters operate on existing HTML: all records remain readable without JavaScript.
  for(const scope of $$('[data-filter-scope]')){const form=$('[data-filter-form]',scope),query=$('[data-filter-q]',form),type=$('[data-filter-type]',form),topic=$('[data-filter-topic]',form),cards=$$('[data-card]',scope),count=$('[data-filter-count]',scope),no=$('[data-filter-empty]',scope);const params=new URLSearchParams(location.search);query.value=params.get('q')?.slice(0,160)||'';for(const[field,key]of[[type,'type'],[topic,'topic']])if([...field.options].some(o=>o.value===params.get(key)))field.value=params.get(key);const update=(url=true)=>{const q=normalize(query.value.trim());let n=0;for(const c of cards){const match=(!q||searchRecords([{title:c.querySelector('h3')?.textContent||'',rawText:c.dataset.search,identifiers:JSON.parse(c.dataset.identifiers||'[]')}],query.value,locale).length>0)&&(!type.value||type.value===c.dataset.kind)&&(!topic.value||topic.value===c.dataset.topic);c.hidden=!match;if(match)n++;}count.textContent=String(n);no.hidden=n>0;if(url){const u=new URL(location.href);for(const[k,v]of[['q',query.value.trim()],['type',type.value],['topic',topic.value]])v?u.searchParams.set(k,v):u.searchParams.delete(k);history.replaceState(null,'',u);syncLocaleLinks();}};form.addEventListener('submit',event=>{event.preventDefault();update();});form.addEventListener('input',()=>update());form.addEventListener('change',()=>update());form.addEventListener('reset',()=>setTimeout(()=>update(),0));update(false);}
  const searchForm=$('[data-search-form]');let request=0;
  if(searchForm){const input=$('#page-search'),status=$('[data-search-status]'),out=$('[data-search-results]');input.value=new URLSearchParams(location.search).get('q')?.slice(0,160)||'';async function search(){const serial=++request,q=normalize(input.value.trim());if(!q){out.replaceChildren();status.textContent=t.searchStart;return;}status.textContent=t.searchStart;try{const data=await getIndex();if(serial!==request)return;const found=searchRecords(data,input.value.trim(),locale);status.textContent=`${found.length} ${t.results}`;out.replaceChildren(...(found.length?found.map(resultLink):[empty(t.searchEmpty)]));}catch{if(serial===request){status.textContent=t.searchError;out.replaceChildren();}}}searchForm.addEventListener('submit',e=>{e.preventDefault();const u=new URL(location.href);input.value.trim()?u.searchParams.set('q',input.value.trim()):u.searchParams.delete('q');history.replaceState(null,'',u);syncLocaleLinks();search();});let timer;input.addEventListener('input',()=>{clearTimeout(timer);const u=new URL(location.href);input.value.trim()?u.searchParams.set('q',input.value.trim()):u.searchParams.delete('q');history.replaceState(null,'',u);syncLocaleLinks();timer=setTimeout(search,180);});search();}
  $('[data-copy-citation]')?.addEventListener('click',async()=>{const value=$('[data-citation]')?.textContent;if(!value)return;try{if(!navigator.clipboard)throw Error('No clipboard');await navigator.clipboard.writeText(value);announce(t.copied);}catch{const range=document.createRange();range.selectNodeContents($('[data-citation]'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);announce(t.copyFailed);}});
  for(const btn of $$('[data-print]'))btn.addEventListener('click',()=>print());
  syncLocaleLinks();
  const draftForm=$('[data-draft-form]');
  if(draftForm){
    const summary=$('[data-error-summary]',draftForm),list=$('ul',summary);
    let pending=false;
    const showErrors=()=>{
      const invalid=[...draftForm.elements].filter(el=>el.willValidate&&!el.validity.valid);
      list.replaceChildren();summary.hidden=invalid.length===0;
      for(const el of invalid){
        el.setAttribute('aria-invalid','true');
        const text=draftForm.querySelector(`label[for="${el.id}"]`)?.textContent||el.closest('label')?.textContent||el.id;
        const li=document.createElement('li'),a=document.createElement('a');a.href='#'+el.id;
        a.textContent=text.trim()+'. '+(el.validity.valueMissing?formErrors.required:el.validity.customError?el.validationMessage:formErrors.invalid);
        a.addEventListener('click',event=>{event.preventDefault();el.focus();});li.append(a);list.append(li);
      }
      if(invalid.length)summary.focus();pending=false;
    };
    draftForm.addEventListener('invalid',event=>{event.preventDefault();if(!pending){pending=true;requestAnimationFrame(showErrors);} },true);
    draftForm.addEventListener('input',event=>{event.target.removeAttribute('aria-invalid');if(summary&&!summary.hidden){summary.hidden=true;list.replaceChildren();}});
  }
  
  if(draftForm){$('[data-requires-js]',draftForm).hidden=false;const input=$('#draft-url');input.addEventListener('input',()=>input.setCustomValidity(''));draftForm.addEventListener('submit',e=>{e.preventDefault();const url=safeURL(input.value.trim());if(!url){input.setCustomValidity(t.invalidURL);input.reportValidity();return;}if(!draftForm.reportValidity())return;const record={schemaVersion:1,type:'source-suggestion',status:'local-draft',locale,title:$('#draft-title').value.trim(),sourceURL:url,note:$('#draft-note').value.trim(),noIdentifiableDataConfirmed:$('#draft-confirm').checked,createdAt:new Date().toISOString(),submission:'not-sent'};const blob=new Blob([JSON.stringify(record,null,2)+'\n'],{type:'application/json;charset=utf-8'});const link=document.createElement('a');const objectURL=URL.createObjectURL(blob);link.href=objectURL;link.download='marse-source-suggestion.json';link.click();setTimeout(()=>URL.revokeObjectURL(objectURL),1000);$('[data-form-status]').textContent=t.draftReady;});}
  if($('.reading-body')){const progress=$('.reading-progress');let ticking=false;const paint=()=>{const top=$('.reading-body').getBoundingClientRect().top+scrollY;const length=$('.reading-body').scrollHeight-innerHeight*.5;progress.style.width=`${Math.max(0,Math.min(100,(scrollY-top+innerHeight*.2)/Math.max(1,length)*100))}%`;ticking=false;};addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(paint);ticking=true;}},{passive:true});paint();}
}
