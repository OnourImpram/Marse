import {shell} from './chrome.mjs';
import {labels,sources,resources,typeKeys} from './catalogue.mjs';
import {researchGuides,researchCopy as c,researchReferences} from './research-data.mjs';
import {escapeHTML as e,route,safeURL} from './lib.mjs';
import {icon} from './ui.mjs';
import {langTags} from './languages.mjs';
import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../research/lab/catalogue_lab.py',import.meta.url),'utf8');
const link=(url,text)=>`<a class="text-link" href="${e(url)}">${e(text)} ${icon('arrow')}</a>`;
export function researchWorkbench(l,base){
 return `<section class="wide section research-workbench" aria-labelledby="workbench-title"><div class="section-heading"><div><span class="eyebrow">MARSAM</span><h2 id="workbench-title">${e(c.title[l])}</h2><p>${e(c.lead[l])}</p></div></div><div class="workbench-grid">${researchGuides.map((g,i)=>`<article class="workbench-card"><span class="folio">0${i+1}</span><h3>${link(route(l,g.id,base),g.title[l])}</h3><p>${e(g.summary[l])}</p></article>`).join('')}</div></section>`;
}
function inventory(l){
 const counts={};for(const s of sources)counts[s.kind]=(counts[s.kind]||0)+1;
 const nf=new Intl.NumberFormat(langTags[l]);
 return `<section class="lab-output"><h2>${e(c.title[l])}</h2><p>${e(c.inventoryNote[l])}</p><table class="collection-table"><caption>${nf.format(sources.length)} ${e(labels[l].resources)}</caption><thead><tr><th scope="col">${e(labels[l].sourceType)}</th><th scope="col">n</th></tr></thead><tbody>${Object.entries(counts).sort(([a],[b])=>a.localeCompare(b)).map(([kind,n])=>`<tr><th scope="row">${e(labels[l][typeKeys[kind]]||kind)}</th><td>${nf.format(n)}</td></tr>`).join('')}</tbody></table></section>`;
}
export function researchGuidePage(id,l,base){
 const g=researchGuides.find(x=>x.id===id);if(!g)throw Error('Unknown research guide');
 const title=g.title[l],summary=g.summary[l],t=labels[l];
 const intro=`<div class="wide page-intro"><nav class="breadcrumbs" aria-label="${e(t.home)}">${link(route(l,'research',base),t.research)}<span aria-hidden="true">/</span><span>${e(title)}</span></nav><span class="eyebrow">MARSAM</span><h1>${e(title)}</h1><p class="page-deck">${e(summary)}</p></div>`;
 const body=`<div class="wide article-layout" data-research-guide="${e(id)}"><aside class="article-toc"><span class="eyebrow">${e(t.contents)}</span><nav>${g.blocks.map((b,i)=>`<a href="#guide-${i+1}">${e(b.heading[l])}</a>`).join('')}<a href="#working-files">${e(c.downloads[l])}</a><a href="#method-references">${e(c.references[l])}</a></nav></aside><article class="reading-body"><p class="guide-review" data-review-status="draft">${e(c.review[l])}</p>${g.blocks.map((b,i)=>`<section id="guide-${i+1}"><h2>${e(b.heading[l])}</h2><p>${e(b.text[l])}</p></section>`).join('')}${id==='reproducible-lab'?inventory(l):''}<section id="working-files"><h2>${e(c.downloads[l])}</h2><p>${e(id==='reproducible-lab'?c.run[l]:c.templateNote[l])}</p><ul class="research-downloads">${g.downloads.map(f=>`<li><a href="${base}research-downloads/${e(f)}" download><bdi dir="ltr">${e(f)}</bdi> ${icon('file')}</a></li>`).join('')}</ul>${id==='reproducible-lab'?`<pre class="lab-command" dir="ltr"><code>python catalogue_lab.py</code></pre><details class="lab-code"><summary>${e(c.code[l])}</summary><pre dir="ltr"><code>${e(code)}</code></pre></details>`:''}</section><section class="reflection-box"><h2>${e(c.prompt[l])}</h2><p>${e(g.prompt[l])}</p></section>${g.related.length?`<section><h2>${e(c.related[l])}</h2>${g.related.map(id=>{const r=resources.find(x=>x.id===id);return r?`<p>${link(route(l,'resource/'+id,base),r.title[l])}</p>`:'';}).join('')}</section>`:''}<section id="method-references"><h2>${e(c.references[l])}</h2><ol class="references">${g.references.map(id=>{const r=researchReferences[id];return `<li><a href="${e(safeURL(r.url))}" target="_blank" rel="noopener noreferrer" dir="auto">${e(r.title)} ${icon('external')}</a>${r.terms?`<p><a href="${e(safeURL(r.terms))}" target="_blank" rel="noopener noreferrer">${e(t.rights)}</a></p>`:''}</li>`;}).join('')}</ol></section></article></div>`;
 return shell(l,id,title,summary,intro+body+researchWorkbench(l,base),base);
}
export const researchPages=Object.fromEntries(researchGuides.map(g=>[g.id,(l,b)=>researchGuidePage(g.id,l,b)]));
