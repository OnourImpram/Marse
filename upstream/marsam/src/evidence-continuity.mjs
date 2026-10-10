/** Draft continuity, not a certificate of truth, fluency, semantic parity or approval. */
import ledger from './evidence-bindings.json' with {type:'json'};
import {digest} from './messages.mjs';
import {locales} from './languages.mjs';
export const evidenceDraftBindings=ledger;
export function sourceDraftMaterial(record){
 const {id,sourceId,title,language,year,url,citation,brief,bibliography}=record;
 return {id,sourceId,title,language,year,url,citation,brief,bibliography};
}
export function editionDraftMaterial(record,locale){
 const edition=record.editions?.[locale];
 return edition?{title:edition.title,population:edition.population,finding:edition.finding,limit:edition.limit}:null;
}
export function evidenceDraftState(record,locale,bindings=ledger){
 const pin=bindings.records?.find(p=>p.id===record.id),material=editionDraftMaterial(record,locale);
 return {sourceMatches:!!pin&&pin.sourceHash===digest(sourceDraftMaterial(record)),
  editionMatches:!!pin&&!!material&&pin.editionHashes?.[locale]===digest(material),
  fieldsPresent:!!material&&Object.values(material).every(v=>typeof v==='string'&&!!v.trim()),
  briefMatches:record.editions?.[locale]?.briefHash===digest(record.brief)};
}
export function validateEvidenceContinuity(records,bindings=ledger){
 const errors=[];
 if(bindings.schemaVersion!==1||!Array.isArray(bindings.records))return ['Invalid evidence draft ledger'];
 const ids=bindings.records.map(p=>p.id),expected=new Set(records.map(r=>r.id));
 if(new Set(ids).size!==ids.length)errors.push('Duplicate evidence draft binding');
 for(const pin of bindings.records){
  if(!expected.has(pin.id))errors.push('Unexpected evidence draft binding '+pin.id);
  if(pin.humanReviewed!==false||pin.scientificApproval!==false||!pin.reason?.trim())errors.push('Unsupported evidence draft review '+pin.id);
 }
 for(const record of records){
  for(const locale of locales){const state=evidenceDraftState(record,locale,bindings);
   if(!state.sourceMatches)errors.push('stale source draft '+record.id+'/'+locale);
   if(!state.editionMatches||!state.fieldsPresent)errors.push('stale evidence edition '+record.id+'/'+locale);
   if(!state.briefMatches)errors.push('stale evidence brief '+record.id+'/'+locale);
  }
 }
 return errors;
}
export function evidenceContinuityManifest(records){
 return {schemaVersion:1,scope:'Shared-brief evidence records only. Legacy editions retain their separately labelled legacy-seed model.',
  method:'Persisted source and locale draft fingerprints. Presence and unchanged bytes are not semantic or scientific review.',
  humanReviewed:false,scientificApproval:false,semanticParityCertified:false,
  records:records.flatMap(record=>locales.map(locale=>({id:record.id,sourceId:record.sourceId,locale,
   ...evidenceDraftState(record,locale),sourceHash:digest(sourceDraftMaterial(record)),editionHash:digest(editionDraftMaterial(record,locale)),
   claimIds:[record.id+':population',record.id+':finding',record.id+':limit'],humanReviewed:false,scientificApproval:false}))) };
}
