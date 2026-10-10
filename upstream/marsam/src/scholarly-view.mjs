import {evidence,scholarlyThemes,sc} from './scholarship.mjs';
import {labels,sourceById,resources} from './catalogue.mjs';
import {shell} from './chrome.mjs';
import {escapeHTML as e,route} from './lib.mjs';
import {resourceURL,icon} from './ui.mjs';
import {measureProfiles} from './measure-profiles.mjs';
export {measureProfiles};
/** Scientific LTR tokens must not reverse inside Arabic sentences. Escape prose first by segments. */
export function scholarlyText(value,locale){
 if(locale!=='ar')return e(value);
 const text=String(value),tokens=/[A-Za-z]\s*[=<>≤≥]\s*[+−-]?\d+(?:[.,]\d+)?|\d+(?:[.,]\d+)?(?:\s*[–−-]\s*\d+(?:[.,]\d+)?)?|[A-Za-z]+(?:[-\d][A-Za-z\d]*)*/g;
 let html='',offset=0;
 for(const match of text.matchAll(tokens)){html+=e(text.slice(offset,match.index))+`<bdi dir="ltr">${e(match[0])}</bdi>`;offset=match.index+match[0].length;}
 return html+e(text.slice(offset));
}
const sourceLinks=(ids,l,b)=>`<ul class="scholar-sources">${ids.map(id=>{const r=resources.find(r=>r.sources.includes(id));if(!r)throw Error(`Missing scholarly source ${id}`);return `<li><a href="${resourceURL(l,r.id,b)}">${e(r.title[l])}</a></li>`;}).join('')}</ul>`;
const intro=(title,lead,l,b)=>`<div class="wide page-intro"><nav class="breadcrumbs" aria-label="${e(labels[l].home)}"><a href="${route(l,'',b)}">${e(labels[l].home)}</a><span aria-hidden="true">/</span><span>${e(title)}</span></nav><h1>${e(title)}</h1><p class="page-deck">${e(lead)}</p></div>`;
const review=l=>`<p class="scholar-review">${e(sc('review',l))}</p>`;
export function evidenceRecordPanel(source,l,b){
 const record=evidence.find(r=>r.sourceId===source.id);if(!record)return '';
 const d=record.editions[l];
 return `<section class="evidence-panel" data-evidence="${e(record.id)}"><h2>${e(sc('selected',l))}</h2><dl><dt>${e(sc('design',l))}</dt><dd>${e(sc(record.brief.design,l))}</dd><dt>${e(sc('population',l))}</dt><dd data-claim="${e(record.id)}:population">${scholarlyText(d.population,l)}</dd><dt>${e(sc('finding',l))}</dt><dd data-claim="${e(record.id)}:finding">${scholarlyText(d.finding,l)}</dd><dt>${e(sc('limit',l))}</dt><dd data-claim="${e(record.id)}:limit">${scholarlyText(d.limit,l)}</dd></dl>${b?relatedEvidence(record,l,b):''}${review(l)}</section>`;
}
export function evidenceGateway(l,b){return `<section class="wide section scholarly-gateway"><div class="editorial-section-heading"><div><span class="eyebrow">MARSAM</span><h2><a href="${route(l,'evidence',b)}">${e(sc('evidence',l))} ${icon('arrow')}</a></h2></div><p>${e(sc('lead',l))}</p></div><div class="two-grid">${scholarlyThemes.slice(0,2).map(t=>`<article><h3><a href="${route(l,'evidence',b)}#${t.id}">${e(t.title[l])}</a></h3><p>${scholarlyText(t.text[l],l)}</p></article>`).join('')}</div></section>`;}
export function evidencePage(l,b){
 const title=sc('evidence',l),lead=sc('lead',l);
 const body=`${intro(title,lead,l,b)}<div class="wide section scholarly-page">${review(l)}<p class="prose">${e(sc('selectionNote',l))}</p><nav class="collection-jumps" aria-label="${e(title)}">${scholarlyThemes.map(t=>`<a href="#${t.id}">${e(t.title[l])}</a>`).join('')}<a href="#selected-evidence">${e(sc('selected',l))}</a></nav><div class="scholar-theme-grid">${scholarlyThemes.map(t=>`<section class="scholar-theme" id="${t.id}"><h2>${e(t.title[l])}</h2><p>${scholarlyText(t.text[l],l)}</p>${sourceLinks(t.sources,l,b)}</section>`).join('')}</div><section id="selected-evidence"><h2>${e(sc('selected',l))}</h2><div class="scholar-evidence-list">${evidence.filter(r=>r.brief.findingDirection!=='measurement').map(r=>`<article data-evidence="${r.id}"><span class="eyebrow">${e(sc(r.brief.design,l))} · ${r.year}</span><h3><a href="${resourceURL(l,r.id,b)}">${e(r.editions[l].title)}</a></h3><p data-claim="${r.id}:population">${scholarlyText(r.editions[l].population,l)}</p><p data-claim="${r.id}:finding">${scholarlyText(r.editions[l].finding,l)}</p><p data-claim="${r.id}:limit"><strong>${e(sc('limit',l))}:</strong> ${scholarlyText(r.editions[l].limit,l)}</p><a class="text-link" href="${resourceURL(l,r.id,b)}">${e(sc('source',l))} ${icon('arrow')}</a></article>`).join('')}</div></section><p><a href="${route(l,'research',b)}">${e(sc('readingQuestions',l))} ${icon('arrow')}</a></p></div>`;
 return shell(l,'evidence',title,lead,body,b);
}
export function instrumentOverview(l,b){return `<section class="measure-overview"><h2>${e(sc('measures',l))}</h2><p class="prose">${scholarlyText(sc('measureLead',l),l)}</p><div class="two-grid">${measureProfiles.map(p=>`<article class="scholar-theme"><h3><a href="${route(l,'measure-'+p.id,b)}"><bdi>${e(p.title)}</bdi> ${icon('arrow')}</a></h3><p>${scholarlyText(p.id==='rss-14'?sc('rssNote',l):evidence.find(r=>r.id===p.record).editions[l].finding,l)}</p></article>`).join('')}</div><p class="prose">${scholarlyText(sc('permission',l),l)}</p></section>`;}
export function instrumentProfile(p,l,b){
 const title=p.title,lead=sc('measureLead',l),record=evidence.find(r=>r.id===p.record);
 const body=intro(title,lead,l,b)+`<div class="wide section"><article class="prose measure-profile">${review(l)}${record?evidenceRecordPanel(sourceById[record.sourceId],l,b):`<h2>RSS-14</h2><p>${scholarlyText(sc('rssNote',l),l)}</p>`}<h2>${e(sc('limit',l))}</h2><p>${scholarlyText(sc('measureLead',l),l)}</p><p>${scholarlyText(sc('permission',l),l)}</p>${sourceLinks(['s-'+p.record],l,b)}${instrumentUseCases(p,l,b)}${record?.brief.primaryDocuments?`<h2>${e(sc('primaryDocuments',l))}</h2><p>${scholarlyText(sc('sourceRoles',l),l)}</p><ol>${record.brief.primaryDocuments.map(d=>`<li><a href="${e(d.url)}" target="_blank" rel="noopener noreferrer"><bdi>${e(sc(d.labelKey,l))}</bdi></a>${d.pages?` <bdi dir="ltr">${e(d.pages)}</bdi>`:''}</li>`).join('')}</ol>`:''}${p.related?`<section data-instrument-distinction><h2>SWBS</h2><p>${scholarlyText(sc('swbsDistinction',l),l)}</p><a href="${route(l,'measure-'+p.related,b)}"><bdi>${e(measureProfiles.find(m=>m.id===p.related).title)}</bdi></a></section>`:''}<p><a href="${route(l,'measurement-guide',b)}">${e(sc('readingQuestions',l))} ${icon('arrow')}</a></p></article></div>`;
 return shell(l,'measure-'+p.id,title,lead,body,b);
}
export function founderSection(l,b,compact=false){return `<section class="${compact?'wide section founder-section':'founder-section'}" id="founder"><span class="eyebrow">${e(sc('founderTitle',l))}</span><h2><bdi>Prof. Dr. Halil Ekşi</bdi></h2><p class="prose">${e(sc(compact?'founderShort':'founderText',l))}</p><a class="text-link" href="${compact?route(l,'about',b)+'#founder':'https://avesis.marmara.edu.tr/halileksi'}"${compact?'':' target="_blank" rel="noopener noreferrer"'}>${e(sc('profile',l))} ${icon('arrow')}</a>${compact?'':`<h3>${e(sc('selectedWorks',l))}</h3>${sourceLinks(['s-spiritual-counselling-book','s-spiritual-struggles'],l,b)}<p><a href="${route(l,'governance',b)}">${e(labels[l].governance)}</a></p>`}</section>`;}
export const scholarlyRenderers={evidence:evidencePage,...Object.fromEntries(measureProfiles.map(p=>['measure-'+p.id,(l,b)=>instrumentProfile(p,l,b)]))};

/** Editorial connections are not replication, equivalence or treatment rankings. */
function relatedEvidence(record,l,b){
 const ids=(record.brief.relatedRecords||[]).map(id=>evidence.find(r=>r.id===id)?.sourceId).filter(Boolean);
 if(!ids.length)return '';
 return `<div data-related-evidence><h3>${e(sc('relatedEvidence',l))}</h3><p>${scholarlyText(sc('relatedEvidenceNote',l),l)}</p>${sourceLinks(ids,l,b)}</div>`;
}
function instrumentUseCases(profile,l,b){
 const ids=evidence.filter(r=>r.brief.usesMeasure===profile.id).map(r=>r.sourceId);
 if(!ids.length)return '';
 return `<section data-instrument-use><h2>${e(sc('instrumentUse',l))}</h2><p>${scholarlyText(sc('instrumentUseNote',l),l)}</p>${sourceLinks(ids,l,b)}</section>`;
}
