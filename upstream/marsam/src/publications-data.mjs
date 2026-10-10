import {scholarlyPublications,archivedSourceIds} from './scholarship.mjs';
import data from './publications-data.json' with {type:'json'};
export const books=data.books.filter(p=>!archivedSourceIds.has(p.sourceId));
export const publicationRecords=[...books,...data.papers,...scholarlyPublications];
export const recentPapers=publicationRecords.filter(p=>p.bibliography.collection==='recent-research').sort((a,b)=>b.bibliography.date.localeCompare(a.bibliography.date));
/** Enrich records, never duplicate an existing DOI or turn coauthorship into membership. */
export function applyPublications(sources,resources){
 for(const p of publicationRecords){
  const existing=sources.find(s=>s.id===p.sourceId);
  const value={id:p.sourceId,title:p.title,year:p.year,url:p.url,citation:p.citation,kind:p.kind,language:p.language,inspection:p.inspection||(p.kind==='book'?'metadata':'abstract'),checked:p.checked||data.checked,level:'V1',status:'PARTIALLY_VERIFIED',access:p.access||(p.kind==='book'?'Publisher catalogue and edition metadata. No book chapters republished.':'Published article metadata and accessible abstract. No complete methods or findings review.'),limit:'Identity verified against the linked record. Full text, comprehensive correction/retraction surveillance, clinical applicability and reuse rights are not cleared.',bibliography:p.bibliography};
  if(existing)Object.assign(existing,value);else sources.push(value);
  const r=resources.find(r=>r.id===p.id);
  const record={id:p.id,title:p.display,summary:p.summary,sections:p.sections,topic:p.topic,sources:[p.sourceId],kind:p.kind,review:'draft',translation:'draft',rights:'link-only',approval:null};
  if(r)Object.assign(r,record);else resources.push(record);
 }
}
