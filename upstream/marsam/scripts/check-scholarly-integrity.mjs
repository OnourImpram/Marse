import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {sources} from '../src/catalogue.mjs';
const out=[];
const mail=process.env.CROSSREF_MAILTO||'';
for(const s of sources.filter(x=>x.bibliography?.doi)){
 const doi=s.bibliography.doi;
 const qs=mail?'?mailto='+encodeURIComponent(mail):'';
 try{
  const res=await fetch('https://api.crossref.org/works/'+encodeURIComponent(doi)+qs,{headers:{'User-Agent':'MARSAM-Scholarly-Integrity/0.11.0'+(mail?' (mailto:'+mail+')':'')}});
  if(!res.ok){out.push({sourceId:s.id,doi,state:'CHECK_FAILED',httpStatus:res.status,requiresHumanReview:true});continue}
  const w=(await res.json()).message||{};
  const updates=(w['update-to']||[]).map(x=>({type:x.type||null,doi:x.DOI||null,label:x.label||null,updated:x.updated||null}));
  out.push({sourceId:s.id,doi,checkedAt:new Date().toISOString(),state:updates.length?'POST_PUBLICATION_UPDATE_FOUND':'NO_UPDATE_FOUND',updates,requiresHumanReview:updates.length>0,publisher:w.publisher||null,journal:w['container-title']?.[0]||null});
 }catch(error){out.push({sourceId:s.id,doi,state:'CHECK_FAILED',error:String(error),requiresHumanReview:true});}
}
await mkdir(resolve('verification'),{recursive:true});
const target=resolve('verification','scholarly-integrity.json');
await writeFile(target,JSON.stringify({schemaVersion:1,policy:'Detection only. Never rewrites public scholarly claims automatically.',generatedAt:new Date().toISOString(),records:out},null,2));
console.log('Wrote',target,'for',out.length,'DOI records');
