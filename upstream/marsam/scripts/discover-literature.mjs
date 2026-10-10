/** Candidate discovery only. Never imports into the public catalogue or changes review status. */
import {writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
export function candidates(payload){
 const seen=new Set();
 return (payload.resultList?.result||[]).filter(r=>{const key=r.doi?.toLowerCase()||`${r.source}:${r.id}`;if(seen.has(key))return false;seen.add(key);return true;}).map(r=>({title:r.title||null,authors:r.authorString||null,year:r.pubYear||null,doi:r.doi||null,identifier:{source:r.source,id:r.id},url:r.doi?'https://doi.org/'+r.doi:`https://europepmc.org/article/${encodeURIComponent(r.source)}/${encodeURIComponent(r.id)}`,state:'UNSCREENED_CANDIDATE',included:false,scientificApproval:false,scopeDecision:null,fullTextInspected:false}));
}
async function main(){
 const args=process.argv.slice(2),value=name=>{const i=args.indexOf(name);return i>=0?args[i+1]:null;};
 const output=value('--out');if(!output)throw Error('Provide --out /path/to/candidates.json. Output is for editorial screening only.');
 const target=resolve(output),root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
 if(['src','public','dist'].some(folder=>target===resolve(root,folder)||target.startsWith(resolve(root,folder)+'/')))throw Error('Candidate output cannot target src, public or dist.');
 const query=value('--query')||'(spirituality OR religiosity OR "religious coping") AND ("mental health" OR depression OR anxiety) AND FIRST_PDATE:[2025-01-01 TO 2026-10-03]';
 const url=new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');url.search=new URLSearchParams({query,format:'json',pageSize:'20',sort:'FIRST_PDATE_D desc'});
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`Discovery failed: HTTP ${response.status}`);
 const data=await response.json();const result={schemaVersion:1,queriedAt:new Date().toISOString(),query,url:url.href,totalHits:data.hitCount,limit:20,scope:'Europe PMC coverage only. This is not a systematic search or validated evidence set. Cross-check publisher, corrections, design, fit and rights before editorial inclusion.',records:candidates(data)};
 await mkdir(dirname(target),{recursive:true});await writeFile(target,JSON.stringify(result,null,2)+'\n');console.log(`${result.records.length} unscreened candidates written. Public catalogue unchanged.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=1;});
