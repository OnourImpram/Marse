/** Progressive enhancement. Only source IDs, never participant information, are persisted. */
import {parseSelection,eventState} from './campus-core.js';
const configNode=document.getElementById('campus-data');
if(configNode){
 const config=JSON.parse(configNode.textContent);const {locale,base,copy:c,labels:t,resourceIds}=config;
 const key='marse-source-comparison-v1';const allowed=new Set(resourceIds);
 const say=message=>{const toast=document.querySelector('.toast');if(!toast)return;toast.textContent=message;toast.classList.add('visible');clearTimeout(say.timer);say.timer=setTimeout(()=>toast.classList.remove('visible'),3600);};
 const read=()=>{try{return parseSelection(JSON.parse(localStorage.getItem(key)||'[]').join(','),resourceIds);}catch{return [];}};
 let selected=read();
 const store=()=>{try{localStorage.setItem(key,JSON.stringify(selected));}catch{say(t.storageError);}};
 const urlFor=ids=>`${base}${locale}/compare/${ids.length?'?ids='+ids.join(','):''}`;
 const updateButtons=()=>{
   document.querySelectorAll('[data-compare-id]').forEach(button=>{const active=selected.includes(button.dataset.compareId);button.setAttribute('aria-pressed',String(active));const span=button.querySelector('span');if(span)span.textContent=active?c.compareAdded:c.compareAdd;button.title=active?c.compareAdded:c.compareAdd;});
   document.querySelectorAll('[data-compare-count]').forEach(node=>node.textContent=String(selected.length));
   document.querySelectorAll('[data-compare-nav]').forEach(node=>node.href=urlFor(selected));
 };
 document.querySelectorAll('[data-compare-id]').forEach(button=>button.addEventListener('click',()=>{
   const id=button.dataset.compareId;if(!allowed.has(id))return;
   if(selected.includes(id))selected=selected.filter(x=>x!==id);
   else if(selected.length<4)selected.push(id);else return say(c.compareLimit);
   store();updateButtons();say(`${c.selected}. ${selected.length}`);
 }));
 const page=document.querySelector('[data-compare-page]');
 if(page){
  const rows=JSON.parse(page.querySelector('[data-comparison-records]').textContent);const byId=new Map(rows.map(r=>[r.id,r]));
  const params=new URLSearchParams(location.search);if(params.has('ids'))selected=parseSelection(params.get('ids'),resourceIds);
  const slots=[...page.querySelectorAll('[data-compare-slot]')];
  const container=page.querySelector('[data-compare-results]');const share=page.querySelector('[data-comparison-share]');
  const cells=[['summary',c.scope],['type',t.sourceType],['citation',t.references],['inspection',t.sourceAccess],['limit',t.limit],['rights',t.rights],['review',t.verification],['checked',t.checked]];
  const element=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
  function draw(){
    container.replaceChildren();slots.forEach((slot,i)=>slot.value=selected[i]||'');
    share.href=urlFor(selected);page.querySelector('[data-comparison-export]').disabled=!selected.length;
    if(!selected.length){container.append(element('p',c.choose,'empty-state'));}
    else{
      const wrapper=element('div',undefined,'comparison-scroll');wrapper.tabIndex=0;wrapper.setAttribute('role','region');wrapper.setAttribute('aria-label',c.compare);
      const table=element('table',undefined,'comparison-table');table.append(element('caption',c.selected));
      const head=element('thead');const header=element('tr');const corner=element('th',c.compare);corner.scope='col';header.append(corner);
      selected.forEach(id=>{const r=byId.get(id);const cell=element('th');cell.scope='col';const a=element('a',r.title);a.href=`${base}${locale}/resource/${id}/`;cell.append(a);header.append(cell);});head.append(header);table.append(head);
      const body=element('tbody');cells.forEach(([field,label])=>{const tr=element('tr');const th=element('th',label);th.scope='row';tr.append(th);selected.forEach(id=>{const td=element('td',byId.get(id)[field]);if(['citation','review','checked'].includes(field)){td.dir='ltr';if(field==='citation'&&byId.get(id).language)td.lang=byId.get(id).language;}tr.append(td);});body.append(tr);});table.append(body);wrapper.append(table);container.append(wrapper);
    }
    document.querySelectorAll('.language-panel a').forEach(a=>{const u=new URL(a.href,location.href);if(selected.length)u.searchParams.set('ids',selected.join(','));else u.searchParams.delete('ids');a.href=u.href;});
    updateButtons();
  }
  slots.forEach(slot=>slot.addEventListener('change',()=>{selected=parseSelection(slots.map(x=>x.value).join(','),resourceIds);store();draw();history.replaceState(null,'',urlFor(selected));}));
  page.querySelector('[data-comparison-export]').addEventListener('click',()=>{
   if(!selected.length)return;
   const output={schemaVersion:1,site:'MARSE',mode:'review-preview',locale,exportedAt:new Date().toISOString(),clinicalRanking:false,scientificApproval:false,items:selected.map(id=>byId.get(id))};
   const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`MARSE-${locale}-source-comparison.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  });draw();
 }
 updateButtons();
 window.addEventListener('storage',event=>{if(event.key===key&&!page){selected=read();updateButtons();}});
 const eventCards=[...document.querySelectorAll('[data-event-end]')];
 if(eventCards.length){
   const today=new Date().toISOString().slice(0,10);
   eventCards.forEach(card=>{try{const status=eventState(card.dataset.eventEnd,today);card.dataset.eventState=status;card.querySelector('[data-event-status]').textContent=c[status];}catch{card.hidden=true;}});
   document.querySelectorAll('[data-event-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.eventFilter;let visible=0;eventCards.forEach(card=>{card.hidden=filter!=='all'&&(filter==='upcoming'?!['upcoming','today'].includes(card.dataset.eventState):card.dataset.eventState!=='past');if(!card.hidden)visible++;});document.querySelectorAll('[data-event-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('[data-events-empty]').hidden=visible!==0;}));
 }
}
