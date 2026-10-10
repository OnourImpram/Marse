import test from 'node:test';
import assert from 'node:assert/strict';
import {sources,resources,sections} from '../src/catalogue.mjs';
import {strategicSources,instruments,datasets,constructs,bridges,claims} from '../src/roadmap/platform.mjs';

test('roadmap sources are public, unique and source-checked drafts',()=>{
 assert.equal(strategicSources.length,17);
 const dois=strategicSources.map(s=>s.bibliography.doi.toLowerCase());
 assert.equal(new Set(dois).size,dois.length);
 for(const s of strategicSources){
  assert.ok(sources.some(x=>x.id===s.id));
  assert.ok(resources.some(x=>x.sources.includes(s.id)));
  assert.equal(s.status,'PARTIALLY_VERIFIED');
  assert.equal(s.checked,'2026-10-05');
  assert.ok(s.bibliography?.journal!==undefined);
  assert.ok(Array.isArray(s.bibliography?.authors));
 }
});
test('research roadmap surfaces are first-class sections',()=>{
 for(const id of ['measurement-observatory','evidence-bridges','datasets','construct-dictionary'])assert.ok(sections.some(s=>s.id===id),id);
});
test('measurement observatory preserves instrument identity and rights boundaries',()=>{
 assert.ok(instruments.some(x=>x.id==='rss-ff-tr'&&x.family==='religious-spiritual-struggles'));
 assert.ok(instruments.some(x=>x.id==='swbs-eksi-kardas'));
 assert.ok(instruments.some(x=>x.id==='swbs-paloutzian-ellison'));
 assert.notEqual(instruments.find(x=>x.id==='swbs-eksi-kardas').family,instruments.find(x=>x.id==='swbs-paloutzian-ellison').family);
 for(const x of instruments)assert.match(x.rights,/permission|not republished|link-only/i);
});
test('datasets and construct dictionary state inferential boundaries',()=>{
 assert.deepEqual(new Set(datasets.map(x=>x.id)),new Set(['ess','evs','wvs','midus']));
 assert.ok(datasets.every(x=>x.scope&&x.access&&x.url.startsWith('https://')));
 assert.ok(constructs.length>=8);
 assert.ok(constructs.every(x=>x.boundary.length>40));
});
test('editorial bridges retain source provenance without pretending human approval',()=>{
 assert.ok(bridges.length>=7);
 for(const b of bridges)assert.ok(b.sourceIds.every(id=>sources.some(s=>s.id===id)));
 assert.ok(claims.every(c=>c.reviewStatus==='AI_ASSISTED_DRAFT'&&c.sourceIds.length));
});
