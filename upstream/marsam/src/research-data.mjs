/** Owner-supplied development reports are requirements, not completed research. */
import data from './research-guides.json' with {type:'json'};
import {locales} from './languages.mjs';
export const researchGuides=data.guides;
export const researchCopy=data.copy;
export const researchReferences=data.references;
export function validateResearchGuides(candidate=data){
 const errors=[];
 const check=(v,where)=>{for(const l of locales)if(typeof v?.[l]!=='string'||!v[l].trim())errors.push(`${where}: missing ${l}`);};
 const ids=new Set();
 for(const g of candidate.guides){
  if(ids.has(g.id)||!/^[a-z][a-z-]+$/.test(g.id))errors.push(`Invalid guide ${g.id}`);ids.add(g.id);
  for(const k of ['title','summary','prompt'])check(g[k],g.id+'.'+k);
  if(g.blocks.length<3)errors.push(g.id+': incomplete guide');
  for(const b of g.blocks){check(b.heading,g.id+'.heading');check(b.text,g.id+'.text');}
  if(g.objectType!=='teaching-guide'||g.review.scientific!=='draft'||g.review.humanLanguageReviewed!==false)errors.push(g.id+': invalid approval state');
  for(const id of g.references)if(!candidate.references[id])errors.push(g.id+': missing reference');
 }
 for(const [key,value]of Object.entries(candidate.copy))check(value,key);
 for(const r of Object.values(candidate.references)){try{if(new URL(r.url).protocol!=='https:')errors.push('Unsafe reference');}catch{errors.push('Invalid reference');}}
 return errors;
}
const errors=validateResearchGuides();if(errors.length)throw Error(errors.join('\n'));
