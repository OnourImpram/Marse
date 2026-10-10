import {founderSection,evidenceGateway} from './scholarly-view.mjs';
import {labels,resources,articles,learningPaths} from './catalogue.mjs';
import {centreRows as n} from './centre-copy.mjs';
import {collections} from './campus-data.mjs';
import {shell} from './chrome.mjs';
import {icon,resourceURL} from './ui.mjs';
import {dossierCard} from './site.mjs';
import {recentFeature,booksFeature} from './publications-view.mjs';
import {message} from './messages.mjs';
import {escapeHTML as e,route} from './lib.mjs';
const link=(url,text,cls='text-link')=>`<a class="${cls}" href="${url}">${e(text)} ${icon('arrow')}</a>`;
export function renderEditorialHome(l,base) {
 const t=labels[l];
 const body=`
 <section class="editorial-hero heritage-hero" aria-labelledby="centre-title"><div class="wide editorial-hero-grid">
  <div class="editorial-hero-copy"><span class="eyebrow">${e(message('institution.university',l))} · MARSAM</span><h1 id="centre-title">${e(t.brand)}</h1>
  </div>
  <div class="heritage-art" aria-hidden="true"><div class="manuscript-frame approved-portal"><picture class="approved-portal-picture"><img class="approved-portal-image" src="${base}assets/heritage/portal-continuous-v1.svg" alt="" width="960" height="960" decoding="async" fetchpriority="low"></picture></div></div>
 </div></section>
 <section class="wide audience-section" aria-labelledby="audience-title"><div class="section-heading compact-heading"><h2 id="audience-title">${e(message('paths.title',l))}</h2><a href="${route(l,'learning',base)}">${e(t.learning)} ${icon('arrow')}</a></div><div class="audience-paths">${learningPaths.map((p,i)=>`<a class="audience-path" href="${route(l,'learning/'+p.id,base)}"><span class="folio" aria-hidden="true">0${i+1}</span><div><h3>${e(t[p.audience])}</h3><p>${e(p.summary[l])}</p></div>${icon('arrow')}</a>`).join('')}</div></section>
 ${recentFeature(l,base)}
 ${evidenceGateway(l,base)}
 ${booksFeature(l,base)}
 <section class="wide section editorial-studies"><div class="editorial-section-heading"><div><span class="eyebrow">${e(message('nav.explore',l))}</span><h2>${e(n.areas[l])}</h2></div><p>${e(n.areasLead[l])}</p></div><div class="study-index">${collections.map((x,i)=>`<a class="study-row" href="${route(l,'collections',base)}#${x.id}"><span class="study-number" aria-hidden="true">0${i+1}</span><div><h3>${e(x.title[l])}</h3><p>${e(x.description[l])}</p></div>${icon('arrow')}</a>`).join('')}</div></section>
 <section class="reading-selection"><div class="wide section"><div class="editorial-section-heading"><div><span class="eyebrow">${e(message('nav.learn',l))}</span><h2>${e(n.readings[l])}</h2></div><p>${e(n.readingsLead[l])}</p></div><div class="three-grid">${['theory-and-integration','culture-and-worldviews','assessment-and-permission'].map((id,i)=>dossierCard(articles.find(a=>a.id===id),l,base,i)).join('')}</div></div></section>
 ${founderSection(l,base,true)}
`;
 return shell(l,'',t.home,n.lead[l],body,base);
}
