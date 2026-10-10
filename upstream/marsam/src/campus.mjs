import {scholarlyRenderers} from './scholarly-view.mjs';
import {researchPages} from './research-view.mjs';
import {roadmapRenderers} from './roadmap/view.mjs';
/** Explicit institutional-preview page renderers. No mutations or HTML decoration. */
import {locales,langTags,sourceNotes} from './i18n.mjs';
import {labels,sources,resources,sections,articles,learningPaths,overview,typeKeys,campusCopy,sourceById} from './catalogue.mjs';
import {h} from './heritage-copy.mjs';
import {bibliographyPage} from './publications-view.mjs';
import {renderEditorialHome} from './editorial.mjs';
import {renderGovernance,renderResearch} from './governance.mjs';
import {shell} from './chrome.mjs';
import {icon,articleURL,resourceURL,compareButton as sourceCompareButton} from './ui.mjs';
import {dossierCard,resourceCard} from './site.mjs';
import {escapeHTML as e,route,safeURL} from './lib.mjs';
import {centreRows as n} from './centre-copy.mjs';
import {institutions,collections,events} from './campus-data.mjs';
import {parseSelection,eventState} from '../public/campus-core.js';
export {campusCopy,institutions,collections,events,parseSelection,eventState};
const ext=(url,title,cls='text-link')=>`<a href="${e(safeURL(url)||'')}" class="${cls}" target="_blank" rel="noopener noreferrer">${e(title)} ${icon('external')}</a>`;
const link=(url,title,cls='text-link')=>`<a class="${cls}" href="${url}">${e(title)} ${icon('arrow')}</a>`;
const json=x=>JSON.stringify(x).replace(/</g,'\\u003c');
const heading=(title,desc='',eyebrow='MARSAM')=>`<div class="section-heading"><div><span class="eyebrow">${e(eyebrow)}</span><h2>${e(title)}</h2>${desc?`<p>${e(desc)}</p>`:''}</div></div>`;
const intro=(l,title,text,b)=>`<div class="wide page-intro"><nav class="breadcrumbs" aria-label="${e(labels[l].home)}"><a href="${route(l,'',b)}">${e(labels[l].home)}</a><span aria-hidden="true">/</span><span>${e(title)}</span></nav><span class="eyebrow">MARSAM</span><h1>${e(title)}</h1><p class="page-deck">${e(text)}</p></div>`;
function compareButton(id,l){const c=campusCopy[l];return `<button type="button" class="compare-toggle" data-compare-id="${e(id)}" aria-pressed="false" title="${e(c.compareAdd)}">${icon('layers')}<span>${e(c.compareAdd)}</span></button>`;}
export function comparisonRows(items,l){return items.map(r=>{const s=sourceById[r.sources[0]];return {id:r.id,title:r.title[l],summary:r.summary[l],type:labels[l][typeKeys[s.kind]],language:s.language||null,citation:s.citation,inspection:labels[l][s.inspection==='official'?'officialPage':s.inspection==='metadata'?'metadataOnly':'abstractOnly'],limit:sourceNotes[s.id]?.[l]||labels[l].verificationNote,rights:s.id==='s-fica'?r.summary[l]:s.id==='s-flourish'?sourceNotes[s.id][l]:labels[l].rightsNote,review:`${s.level} / ${s.status}`,checked:s.checked,url:s.url};});}

function collectionTiles(l,b){return `<div class="theme-grid">${collections.map((x,i)=>`<a class="theme-tile" href="${route(l,'collections',b)}#${x.id}"><div class="tile-top"><span class="folio">0${i+1}</span>${icon(i%2?'book':'layers')}</div><h3>${e(x.title[l])}</h3><p>${e(x.description[l])}</p><span class="theme-bottom">${e(labels[l].open)} ${icon('arrow')}</span></a>`).join('')}</div>`;}
export const renderCampusHome=renderEditorialHome;
export function renderCollections(l,b){const c=campusCopy[l],t=labels[l];return shell(l,'collections',n.areas[l],n.areasLead[l],intro(l,n.areas[l],n.areasLead[l],b)+`<div class="wide section"><nav class="collection-jumps" aria-label="${e(n.areas[l])}">${collections.map(x=>`<a href="#${x.id}">${e(x.title[l])}</a>`).join('')}</nav>${collections.map((x,i)=>`<section class="collection-section" id="${x.id}">${heading(x.title[l],x.description[l],`0${i+1}`)}<div class="collection-columns"><div><h3 class="collection-label">${e(t.readings)}</h3>${x.readings.map(id=>{const a=articles.find(z=>z.id===id);return `<article class="collection-reading"><h3>${link(articleURL(l,id,b),a.title[l])}</h3><p>${e(a.summary[l])}</p></article>`;}).join('')}</div><div><h3 class="collection-label">${e(t.references)}</h3><div class="source-list">${x.resources.map(id=>resourceCard(resources.find(z=>z.id===id),l,b)).join('')}</div>${link(route(l,'compare',b)+'?ids='+x.resources.join(','),c.compare)}</div></div></section>`).join('')}</div>`,b);}
function emptyPage(id,l,b,title,lead,message,target,targetLabel){return shell(l,id,title,lead,intro(l,title,lead,b)+`<div class="wide section"><section class="centre-empty"><span class="eyebrow">MARSAM</span><p>${e(message)}</p>${link(route(l,target,b),targetLabel)}</section></div>`,b);}
export const renderEvents=(l,b)=>emptyPage('events',l,b,n.events[l],n.eventLead[l],n.emptyEvent[l],'learning',n.viewEducation[l]);
const renderMedia=(l,b)=>emptyPage('media',l,b,n.media[l],n.mediaLead[l],n.emptyMedia[l],'learning',n.viewEducation[l]);
const renderNews=(l,b)=>emptyPage('news',l,b,n.news[l],'',n.emptyNews[l],'events',n.events[l]);
const renderProjects=(l,b)=>emptyPage('projects',l,b,n.projects[l],n.projectsLead[l],n.emptyProjects[l],'collections',n.viewAreas[l]);
export function renderCompare(l,b){const c=campusCopy[l],t=labels[l];const rows=comparisonRows(resources,l);
 return shell(l,'compare',c.compare,c.compareLead,intro(l,c.compare,c.compareLead,b)+`<div class="wide section" data-compare-page><div class="notice">${icon('circle')}<p>${e(c.reviewNote)} ${e(t.verificationNote)}</p></div><form class="comparison-picker">${[1,2,3,4].map(i=>`<div><label for="compare-${i}">${e(c.choose)} ${i}</label><select id="compare-${i}" data-compare-slot><option value="">${e(c.none)}</option>${resources.map(r=>`<option value="${r.id}">${e(r.title[l])}</option>`).join('')}</select></div>`).join('')}</form><div class="comparison-actions"><a class="text-link" data-comparison-share href="${route(l,'compare',b)}">${e(c.share)} ${icon('external')}</a><button type="button" class="button secondary" data-comparison-export>${e(c.export)}</button></div><div data-compare-results aria-live="polite"></div><noscript><div class="source-list">${resources.slice(0,4).map(r=>resourceCard(r,l,b)).join('')}</div><p>${e(t.needsJS)}</p></noscript><script type="application/json" data-comparison-records>${json(rows)}</script></div>`,b);
}

export const campusRenderers={...scholarlyRenderers,...researchPages,...roadmapRenderers,research:renderResearch,governance:renderGovernance,books:(l,b)=>bibliographyPage(l,b,'books'),publications:(l,b)=>bibliographyPage(l,b,'publications'),collections:renderCollections,compare:renderCompare,events:renderEvents,media:renderMedia,news:renderNews,projects:renderProjects};

/** Compatibility alias for historical callers. All rendering is already composed by shell. */
export function decorate(html){return html;}
