import {shell} from '../chrome.mjs';
import {labels,resources} from '../catalogue.mjs';
import {escapeHTML as e,route,safeURL} from '../lib.mjs';
import {resourceURL,icon} from '../ui.mjs';
import {instruments,datasets,constructs,bridges,q} from './platform.mjs';
import {road,datasetText} from './copy.mjs';
import trData from './tr-data.json' with {type:'json'};
// Shared English data fields are shown in Turkish on Turkish pages; other locales keep the source value.
const d=(l,v)=>l==='tr'&&trData[v]||v;
const tx=(x,l)=>x?.[l]||x?.en||x;
const intro=(l,b,title,lead)=>`<div class="wide page-intro"><nav class="breadcrumbs" aria-label="${e(labels[l].home)}"><a href="${route(l,'',b)}">${e(labels[l].home)}</a><span aria-hidden="true">/</span><span>${e(tx(title,l))}</span></nav><span class="eyebrow">MARSAM</span><h1>${e(tx(title,l))}</h1><p class="page-deck">${e(tx(lead,l))}</p></div>`;
const sourceList=(ids,l,b)=>`<ul class="scholar-sources">${ids.map(id=>{const r=resources.find(x=>x.sources.includes(id));return r?`<li><a href="${resourceURL(l,r.id,b)}">${e(r.title[l])}</a></li>`:'';}).join('')}</ul>`;
const review=l=>`<p class="scholar-review">${e(road(l,'review'))}</p>`;
export function measurementObservatoryPage(l,b){
 const title={ [l]:road(l,'measurementTitle') },lead={ [l]:road(l,'measurementLead') };
 const cards=instruments.map(x=>`<article class="scholar-theme"><span class="eyebrow">${e(d(l,x.status))} · <bdi>${e(x.language)}</bdi></span><h2><bdi>${e(x.title)}</bdi></h2><dl><dt>${e(road(l,'construct'))}</dt><dd>${e(d(l,x.construct))}</dd><dt>${e(road(l,'evidence'))}</dt><dd>${e(x.properties.map(v=>d(l,v)).join(' · '))}</dd><dt>${e(road(l,'invariance'))}</dt><dd>${e(d(l,x.invariance))}</dd><dt>${e(road(l,'cosmin'))}</dt><dd>${e(road(l,'notAppraised'))}</dd><dt>${e(labels[l].rights)}</dt><dd>${e(d(l,x.rights))}</dd><dt>${e(road(l,'rightsItems'))}</dt><dd>${e(road(l,'notCleared'))}</dd></dl>${sourceList([x.sourceId],l,b)}</article>`).join('');
 return shell(l,'measurement-observatory',tx(title,l),tx(lead,l),intro(l,b,title,lead)+`<div class="wide section scholarly-page">${review(l)}<div class="two-grid">${cards}</div><p class="prose">${e(road(l,'consistency'))}</p></div>`,b);
}
export function evidenceBridgesPage(l,b){
 const title={ [l]:road(l,'bridgesTitle') },lead={ [l]:road(l,'bridgesLead') };
 const cards=bridges.map(x=>`<section class="scholar-theme" id="${e(x.id)}"><h2>${e(tx(x.title,l))}</h2><p>${e(tx(x.text,l))}</p>${sourceList(x.sourceIds,l,b)}</section>`).join('');
 return shell(l,'evidence-bridges',tx(title,l),tx(lead,l),intro(l,b,title,lead)+`<div class="wide section scholarly-page">${review(l)}<div class="scholar-theme-grid">${cards}</div></div>`,b);
}
export function datasetRegistryPage(l,b){
 const title={ [l]:road(l,'datasetsTitle') },lead={ [l]:road(l,'datasetsLead') };
 const cards=datasets.map(x=>`<article class="scholar-theme"><h2>${e(x.title)}</h2><p>${e(datasetText(x.id,l,0))}</p><p class="muted">${e(datasetText(x.id,l,1))}</p><a class="text-link" href="${e(safeURL(x.url))}" target="_blank" rel="noopener noreferrer">${e(labels[l].openSource)} ${icon('external')}</a></article>`).join('');
 return shell(l,'datasets',tx(title,l),tx(lead,l),intro(l,b,title,lead)+`<div class="wide section scholarly-page">${review(l)}<div class="two-grid">${cards}</div></div>`,b);
}
export function constructDictionaryPage(l,b){
 const title={ [l]:road(l,'constructsTitle') },lead={ [l]:road(l,'constructsLead') };
 const cards=constructs.map(x=>`<article class="scholar-theme" id="${e(x.id)}"><h2>${e(l==='tr'?x.tr:x.en)}</h2><p>${e(d(l,x.boundary))}</p></article>`).join('');
 return shell(l,'construct-dictionary',tx(title,l),tx(lead,l),intro(l,b,title,lead)+`<div class="wide section scholarly-page">${review(l)}<div class="two-grid">${cards}</div></div>`,b);
}
export const roadmapRenderers={'measurement-observatory':measurementObservatoryPage,'evidence-bridges':evidenceBridgesPage,datasets:datasetRegistryPage,'construct-dictionary':constructDictionaryPage};
