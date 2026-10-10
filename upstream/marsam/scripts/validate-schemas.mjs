import {strategicSources,instruments,claims} from '../src/roadmap/platform.mjs';
import {sources} from '../src/catalogue.mjs';

const fail=[];
const all=[...sources];
const doi=new Map();
for(const s of all){
 if(!s.id||!s.title||!s.url||!s.kind||!s.inspection||!s.checked) fail.push('incomplete source '+(s.id||'?'));
 const d=s.bibliography?.doi?.toLowerCase();
 if(d){if(doi.has(d)&&doi.get(d)!==s.id)fail.push('duplicate DOI '+d+' '+doi.get(d)+' '+s.id);doi.set(d,s.id);}
}
for(const s of strategicSources){
 if(!s.bibliography?.identityVerified)fail.push('unverified roadmap bibliography '+s.id);
 if(!Array.isArray(s.bibliography?.authors)||!s.bibliography.authors.length)fail.push('missing authors '+s.id);
 if(!s.bibliography?.journal)fail.push('missing journal '+s.id);
 if(s.bibliography?.doi){const d=s.bibliography.doi.toLowerCase();if(doi.has(d)&&doi.get(d)!==s.id)fail.push('duplicate roadmap DOI '+d);doi.set(d,s.id);}
}
const instrumentIds=new Set();
for(const x of instruments){
 if(instrumentIds.has(x.id))fail.push('duplicate instrument '+x.id);instrumentIds.add(x.id);
 if(!['development','adaptation','validation','independent-validation'].includes(x.status))fail.push('invalid instrument status '+x.id);
 if(/item text not republished|permission must be checked/.test(x.rights)===false)fail.push('unclear instrument rights '+x.id);
}
for(const c of claims){
 if(!c.sourceIds?.length||!['source-bound-edition','editorial-synthesis'].includes(c.support))fail.push('invalid claim '+c.id);
}
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log('Scholarly schema contracts OK:',all.length,'catalogue sources,',strategicSources.length,'roadmap sources,',instruments.length,'instruments,',claims.length,'claims');
