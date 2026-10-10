import {researchWorkbench} from './research-view.mjs';
import {shell} from './chrome.mjs';
import {icon} from './ui.mjs';
import {labels,sources,typeKeys,sections} from './catalogue.mjs';
import {message} from './messages.mjs';
import {escapeHTML as e,route} from './lib.mjs';
import {langTags} from './languages.mjs';
const intro=(l,title,lead,base)=>`<section class="wide page-intro"><nav class="breadcrumbs" aria-label="${e(labels[l].home)}"><a href="${route(l,'',base)}">${e(labels[l].home)}</a><span aria-hidden="true">/</span><span>${e(title)}</span></nav><span class="eyebrow">MARSAM</span><h1>${e(title)}</h1><p class="page-deck">${e(lead)}</p></section>`;
export function renderGovernance(l,base) {
 const title=message('governance.title',l),lead=message('governance.lead',l),t=labels[l];
 const parts=[['status','governance.status','site.context'],['review','review.title','governance.lead'],['language','review.translation','review.translationNotice'],['corrections','governance.corrections','governance.correctionText'],['accessibility','governance.accessibility','governance.accessText'],['privacy','governance.privacy','governance.privacyText']];
 const body=intro(l,title,lead,base)+`<div class="wide article-layout governance-layout"><aside class="article-toc"><nav aria-label="${e(t.contents)}">${parts.map(([id,key])=>`<a href="#${id}">${e(message(key,l))}</a>`).join('')}</nav></aside><article class="reading-body">${parts.map(([id,key,text])=>`<section id="${id}"><h2>${e(message(key,l))}</h2><p>${e(message(text,l))}</p>${id==='privacy'?`<p>${e(message('saved.storage',l))}</p>`:''}${id==='review'?`<p>${e(message('review.pending',l))} ${e(message('review.currencyValue',l))}</p><p>${e(message('review.rightsValue',l))}</p>`:''}${id==='corrections'?`<a class="text-link" href="${route(l,'contribute',base)}">${e(message('about.editor',l))}${icon('arrow')}</a>`:''}</section>`).join('')}</article></div>`;
 return shell(l,'governance',title,lead,body,base);
}
export function renderResearch(l,base) {
 const title=message('research.title',l),lead=message('research.lead',l),t=labels[l];
 const groups=Object.entries(sources.reduce((out,s)=>({...out,[s.kind]:(out[s.kind]||0)+1}),{}));
 const number=new Intl.NumberFormat(langTags[l]);
 const body=intro(l,title,lead,base)+researchWorkbench(l,base)+`<div class="wide section research-layout"><section class="collection-profile"><h2>${e(message('research.composition',l))}</h2><p>${e(message('research.scope',l))}</p><table class="collection-table"><caption>${e(message('collection.full',l))}. ${number.format(sources.length)} ${e(t.resources)}</caption><thead><tr><th scope="col">${e(t.sourceType)}</th><th scope="col">${e(message('research.count',l))}</th></tr></thead><tbody>${groups.map(([kind,count])=>`<tr><th scope="row"><a href="${route(l,'library',base)}?type=${kind}">${e(t[typeKeys[kind]])}</a></th><td>${number.format(count)}</td></tr>`).join('')}</tbody></table><p class="input-help">${e(message('review.currencyValue',l))}</p></section><aside class="research-methods"><span class="eyebrow">${e(message('nav.research',l))}</span><h2>${e(t.methods)}</h2><p>${e(sections.find(s=>s.id==='methods').summary[l])}</p><a class="button" href="${route(l,'methods',base)}">${e(t.methods)}${icon('arrow')}</a><h2>${e(t.participate)}</h2><p>${e(message('research.projectsNote',l))}</p><a class="text-link" href="${route(l,'participate',base)}">${e(t.participate)}${icon('arrow')}</a></aside></div>`;
 return shell(l,'research',title,lead,body,base);
}
