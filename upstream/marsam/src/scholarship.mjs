/** Independent, shared factual briefs. No locale is the source of another locale. */
import data from './scholarship-data.json' with {type:'json'};
import swbs from './swbs-data.json' with {type:'json'};
import cycle from './evidence-2026-10.json' with {type:'json'};
import {measureProfiles} from './measure-profiles.mjs';
import bindings from './narrative-bindings.json' with {type:'json'};
import audit from '../docs/research/SCOPE_AUDIT.json' with {type:'json'};
import copy from './scholarly-copy.json' with {type:'json'};
import themes from './scholarly-themes.json' with {type:'json'};
import {locales} from './languages.mjs';
import {digest} from './messages.mjs';
import {validateEvidenceContinuity,evidenceDraftState} from './evidence-continuity.mjs';
export {evidenceContinuityManifest,validateEvidenceContinuity} from './evidence-continuity.mjs';
export const evidence=[...data.records,...swbs.records,...cycle.records];
export const narrativeBindings=bindings;
export const scholarlyThemes=themes;
export const scholarlyCopy=copy;
export const archivedSourceIds=new Set(audit.records.filter(r=>r.action==='archive').map(r=>r.sourceId));
export const scopeDecision=id=>{const r=audit.records.find(r=>r.sourceId===id);if(!r)throw Error(`Missing scope decision ${id}`);return r;};
export function validateScope(sources){const errors=[];const ids=audit.records.map(r=>r.sourceId);if(new Set(ids).size!==ids.length)errors.push('Duplicate scope decision');for(const decision of audit.records)if(!['retain','add','archive'].includes(decision.action))errors.push(`Invalid scope action ${decision.sourceId}`);for(const source of sources){const decision=audit.records.find(r=>r.sourceId===source.id);if(!decision||!audit.classificationVocabulary.includes(decision.classification)||!decision.reason)errors.push(`Missing or invalid scope decision ${source.id}`);else if(decision.classification==='OUT_OF_SCOPE')errors.push(`OUT_OF_SCOPE source leaked ${source.id}`);else if(decision.action==='archive')errors.push(`Archived source leaked ${source.id}`);}return errors;}
export const sc=(key,l)=>{const value=copy[key]?.[l];if(!value)throw Error(`Missing scholarly copy ${key}/${l}`);return value;};
export function validateScholarship(records=evidence){
 const errors=validateEvidenceContinuity(records),ids=new Set(),dois=new Set(),sourceIds=new Set();
 for(const r of records){
  if(ids.has(r.id)||dois.has(r.brief.doi.toLowerCase()))errors.push(`Duplicate scholarly identity ${r.id}`);ids.add(r.id);dois.add(r.brief.doi.toLowerCase());
  if(sourceIds.has(r.sourceId)||r.sourceId!==`s-${r.id}`||r.bibliography.doi?.toLowerCase()!==r.brief.doi.toLowerCase()||r.url.toLowerCase()!==`https://doi.org/${r.brief.doi.toLowerCase()}`)errors.push(`Mismatched scholarly source identity ${r.id}`);
  sourceIds.add(r.sourceId);
  if(r.brief.usesMeasure&&!measureProfiles.some(p=>p.id===r.brief.usesMeasure))errors.push(`Invalid instrument link ${r.id}`);
  if(r.brief.relatedRecords!==undefined&&(!Array.isArray(r.brief.relatedRecords)||r.brief.relatedRecords.some(id=>id===r.id||!records.some(x=>x.id===id))))errors.push(`Invalid related evidence ${r.id}`);
  if(!r.brief.design||!r.brief.population||!r.brief.inspection||!r.brief.checked||!r.brief.limitationCodes?.length)errors.push(`Incomplete brief ${r.id}`);
  const hash=digest(r.brief);
  for(const l of locales){const edition=r.editions[l];
   if(!edition||['title','population','finding','limit'].some(k=>typeof edition[k]!=='string'||!edition[k].trim()))errors.push(`Missing scholarly edition ${r.id}/${l}`);
   if(edition?.briefHash!==hash)errors.push(`stale brief ${r.id}/${l}`);
   if(edition?.humanReviewed!==false||edition?.scientificApproval!==false)errors.push(`Unsupported approval ${r.id}/${l}`);
  }
 }
 for(const [key,values]of Object.entries(copy))for(const l of locales)if(!values[l]?.trim())errors.push(`Missing copy ${key}/${l}`);
 for(const t of themes)for(const l of locales)if(!t.title[l]||!t.text[l])errors.push(`Missing theme ${t.id}/${l}`);
 return errors;
}
export const scholarlyPublications=evidence.map(r=>({
 id:r.id,sourceId:r.sourceId,title:r.title,year:r.year,url:r.url,citation:r.citation,language:r.language,
 kind:r.brief.findingDirection==='measurement'?'measure':'study',checked:r.brief.checked,
 inspection:r.brief.inspection==='targeted-fulltext'?'fulltext':r.brief.inspection.startsWith('official')?'official':'abstract',
 access:r.brief.inspectionDetail||`${r.brief.inspection}. ${r.brief.inspectionURL||r.url}. No comprehensive full-text appraisal.`,
 display:Object.fromEntries(locales.map(l=>[l,r.editions[l].title])),
 summary:Object.fromEntries(locales.map(l=>[l,r.editions[l].finding+' '+r.editions[l].limit])),
 sections:['library',r.brief.findingDirection==='measurement'?'measures':'evidence'],topic:r.brief.findingDirection==='measurement'?'assessment':'evidence',
 bibliography:{...r.bibliography,identityVerified:true,collection:r.year>=2025?'recent-research':'foundational-research'}
}));
export function reviewManifest(){return {schemaVersion:1,humanReviewed:false,sourceLanguage:null,method:'Shared factual brief with independently authored locale editions. Persisted source and edition hashes establish continuity, not linguistic or scientific accuracy.',records:evidence.flatMap(r=>locales.map(l=>({id:r.id,locale:l,sourceLanguage:null,briefHash:digest(r.brief),editionHash:digest(r.editions[l]),claimIds:[`${r.id}:population`,`${r.id}:finding`,`${r.id}:limit`],sourceIds:[r.sourceId],status:Object.values(evidenceDraftState(r,l)).every(Boolean)?'AI_ASSISTED_DRAFT':'OUTDATED',humanReviewed:false,scientificApproval:false})))};}

/** Bind consequential narrative text to its own brief, sources and reviewed draft bytes.
 * A hash proves change detection, not truth, fluency or human review. */
export function narrativeMaterial(id,l,themeData,copyData){
 if(id==='founder')return {title:copyData.founderTitle?.[l],short:copyData.founderShort?.[l],text:copyData.founderText?.[l]};
 if(id==='rss-profile')return {text:copyData.rssNote?.[l]};
 const theme=themeData.find(t=>'theme-'+t.id===id);
 return theme?{title:theme.title[l],text:theme.text[l],sources:theme.sources}:null;
}
export function validateNarrativeBindings(sources,options={}){
 const ledger=options.bindings||bindings,themeData=options.themes||themes,copyData=options.copy||copy,errors=[];
 const expected=[...themeData.map(t=>'theme-'+t.id),'founder','rss-profile'];
 const ids=ledger.records.map(r=>r.id);
 if(ids.length!==new Set(ids).size)errors.push('Duplicate narrative binding');
 for(const id of expected)if(!ids.includes(id))errors.push('Missing narrative binding '+id);
 for(const record of ledger.records){
  if(!expected.includes(record.id))errors.push('Unexpected narrative binding '+record.id);
  if(!record.brief?.boundary||!record.sourceIds?.length)errors.push('Missing narrative scope '+record.id);
  for(const id of record.sourceIds||[]){const source=sources.find(s=>s.id===id);if(!source||record.sourceHashes?.[id]!==digest(source))errors.push('stale source '+record.id+'/'+id);}
  for(const l of locales){const edition=record.editions?.[l],material=narrativeMaterial(record.id,l,themeData,copyData);
   if(edition?.briefHash!==digest(record.brief))errors.push('stale brief '+record.id+'/'+l);
   if(!material||Object.values(material).some(v=>v===undefined||v==='')||edition?.editionHash!==digest(material))errors.push('stale narrative edition '+record.id+'/'+l);
   if(edition?.humanReviewed!==false||edition?.scientificApproval!==false)errors.push('Unsupported narrative approval '+record.id+'/'+l);
  }
 }
 return errors;
}
export function narrativeReviewManifest(sources){
 const errors=validateNarrativeBindings(sources);
 return {schemaVersion:1,sourceLanguage:null,humanReviewed:false,scientificApproval:false,errors,
 method:'Persisted shared briefs and source/edition fingerprints. Existing narrative prose is bound, not relabelled as newly human-reviewed or semantically certified.',
 records:bindings.records.flatMap(record=>locales.map(l=>({id:record.id,locale:l,sourceLanguage:null,sourceIds:record.sourceIds,briefHash:digest(record.brief),editionHash:record.editions[l].editionHash,status:errors.length?'REVIEW_REQUIRED':'AI_ASSISTED_DRAFT',humanReviewed:false,scientificApproval:false}))) };
}
