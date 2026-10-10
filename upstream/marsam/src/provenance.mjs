import {evidence,sc} from './scholarship.mjs';
import {catalogue,labels} from './catalogue.mjs';
import {digest,translationRecord,message} from './messages.mjs';
import {locales} from './languages.mjs';
import {escapeHTML as e,route,safeURL} from './lib.mjs';

/** Identifiers are extracted only from declared metadata or the identifier URL itself. */
export function identifiersFor(source) {
  const b=source.bibliography||{};
  const values=[b.doi,b.isbn];
  try {const url=new URL(source.url);if(/^(dx\.)?doi\.org$/.test(url.hostname))values.push(decodeURIComponent(url.pathname.slice(1)));}catch{}
  return [...new Set(values.filter(v=>typeof v==='string'&&v.trim()))];
}
export function validateRelationships(records) {
  const errors=[];
  for(const relation of records) {
    if(!['source','benchmark','publisher','partner','member','supervisor','employer'].includes(relation.role))errors.push('Unknown relationship role');
    if(['partner','member','supervisor','employer'].includes(relation.role)) {
      if(relation.approved!==true || !relation.approvedBy || !relation.evidenceURL || !safeURL(relation.evidenceURL))errors.push(`Unapproved institutional relationship: ${relation.role}`);
    }
  }
  return errors;
}
export function reviewDimensions(source,resource) {
  return {
    identity:{status:source.bibliography?.identityVerified?'matched':'partial',sources:source.bibliography?.identitySources||[source.url]},
    inspection:{status:source.inspection,level:source.level,scope:source.access,limit:source.limit,checked:source.checked},
    scientific:{status:'draft',approved:false,reviewedBy:null},
    currency:{status:'not-comprehensive',recordInspected:source.checked,retractionReviewComplete:false},
    translation:{status:'draft',humanReviewed:false},
    rights:{status:resource.rights,fullTextHosted:false,reusePermissionGranted:false},
    institutional:{status:'proposed',formalApprovalVerified:false}
  };
}
export function sourceReviewPanel(source,resource,l,base) {
  const t=labels[l],d=reviewDimensions(source,resource);
  const values={identity:message(d.identity.status==='matched'?'review.identityValue':'review.identityLimited',l),
    inspection:source.inspection==='fulltext'?sc('targetedFullText',l):source.inspection==='official'?t.officialPage:source.inspection==='metadata'?t.metadataOnly:t.abstractOnly,
    scientific:message('review.pending',l),currency:message('review.currencyValue',l),
    translation:message('review.languageDraft',l),rights:message('review.rightsValue',l)};
  return `<section class="source-review-panel" data-review-status="draft" aria-labelledby="source-review-title"><div class="section-heading"><h2 id="source-review-title">${e(message('review.title',l))}</h2></div><dl class="review-dimensions">${Object.entries(values).map(([key,value])=>`<div data-review-dimension="${key}"><dt>${e(message('review.'+key,l))}</dt><dd>${e(value)}</dd></div>`).join('')}</dl><p class="review-date">${e(message('review.checked',l))}. <time datetime="${e(source.checked)}" dir="ltr">${e(source.checked)}</time></p><a href="${route(l,'governance',base)}">${e(message('governance.title',l))}</a></section>`;
}
export function knowledgeLedger() {
  const works=catalogue.resources.map(resource=>{
    const source=catalogue.sources.find(s=>s.id===resource.sources[0]),b=source.bibliography||{};
    const versionId=resource.id+'-'+(b.edition?'edition-'+b.edition:'record');
    const mentions=['authors','editors','contributors'].flatMap(role=>(b[role]||[]).map((name,i)=>({id:`${source.id}-${role}-${i+1}`,name,role,identityResolution:'source-scoped-mention',externalPersonId:null,sourceId:source.id})));
    return {id:resource.id,sourceId:source.id,originalTitle:source.title,language:source.language||null,kind:source.kind,
      identifiers:identifiersFor(source),topic:resource.topic,sections:resource.sections,sourceRecordHash:digest(source),
      versions:[{id:versionId,edition:b.edition||null,date:b.date||source.year||null,publisher:b.publisher||null,identifier:identifiersFor(source),source:source.url}],
      accessLocations:[{url:source.url,type:'external-record',host:new URL(source.url).hostname,checked:source.checked,rights:'link-only',fullTextPermission:false}],
      contributorMentions:mentions,displayTitle:resource.title,description:resource.summary,review:reviewDimensions(source,resource)};
  });
  return {schemaVersion:2,scope:'Curated public catalogue, not a comprehensive field survey or institutional member roster.',
    identityPolicy:'Contributor mentions remain scoped to each source. Name equality does not establish person identity, supervision or membership.',
    scientificApproval:false,institutionalApproval:false,works,relationships:[],
    collections:[{id:'selected-catalogue',purpose:'Source-based research and learning selection',exhaustive:false,workIds:works.map(w=>w.id)}]};
}
export function translationLedger() {
  const records=[...catalogue.resources,...catalogue.articles,...catalogue.learningPaths];
  return records.flatMap(record=>locales.map(locale=>{
    // New scholarship binds to a shared factual brief. Legacy editions retain their seed binding explicitly.
    const scholarly=evidence.find(r=>r.id===record.id);
    const source=scholarly?.brief||{title:record.title.tr,summary:record.summary.tr,body:record.body?.tr||null};
    const target={title:record.title[locale],summary:record.summary[locale],body:record.body?.[locale]||null};
    return {...translationRecord(record.id,locale,source,target),sourceLanguage:scholarly?null:'tr',bindingModel:scholarly?'shared-factual-brief':'legacy-seed'};
  }));
}
