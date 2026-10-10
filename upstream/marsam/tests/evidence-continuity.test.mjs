import test from 'node:test';
import assert from 'node:assert/strict';
import * as s from '../src/scholarship.mjs';
import {sources} from '../src/catalogue.mjs';
import {locales} from '../src/languages.mjs';
import audit from '../docs/research/SCOPE_AUDIT.json' with {type:'json'};
import {digest} from '../src/messages.mjs';

test('a changed edition cannot retain a fresh evidence status merely by preserving its brief hash',()=>{
 for(const l of locales){const records=structuredClone(s.evidence);records[0].editions[l].finding+=' CHANGED CLAIM';
 assert.ok(s.validateScholarship(records).some(e=>e.includes('edition')&&e.includes(l)),l);}
});
test('changed author order and bibliographic metadata require renewed evidence continuity',()=>{
 const records=structuredClone(s.evidence);records[0].bibliography.authors.push('Unverified Author');
 assert.ok(s.validateScholarship(records).some(e=>e.includes('source draft')));
});
test('case variants of the same DOI cannot become two scholarly records',()=>{
 const records=structuredClone(s.evidence);const r=structuredClone(records[0]);
 r.id='duplicate-case-fixture';r.sourceId='s-'+r.id;r.brief.doi=r.brief.doi.toUpperCase();r.bibliography.doi=r.brief.doi;r.url='https://doi.org/'+r.brief.doi;
 for(const l of locales)r.editions[l].briefHash=digest(r.brief);records.push(r);
 assert.ok(s.validateScholarship(records).some(e=>e.includes('Duplicate scholarly identity')));
});
test('an OUT_OF_SCOPE decision blocks public inclusion even when its action says retain',()=>{
 const r=audit.records.find(r=>r.sourceId===sources[0].id);const old=r.classification;
 try{r.classification='OUT_OF_SCOPE';assert.ok(s.validateScope(sources).some(e=>e.includes('OUT_OF_SCOPE')));}finally{r.classification=old;}
});
test('continuity matrix makes technical presence distinct from semantic and human review',()=>{
 assert.equal(typeof s.evidenceContinuityManifest,'function');
 const m=s.evidenceContinuityManifest(s.evidence);
 assert.equal(m.records.length,s.evidence.length*locales.length);
 assert.equal(m.semanticParityCertified,false);assert.equal(m.humanReviewed,false);
 assert.ok(m.records.every(r=>r.sourceMatches&&r.editionMatches&&r.fieldsPresent));
 const changed=structuredClone(s.evidence);changed[0].editions.ar.limit+=' CHANGED';
 const broken=s.evidenceContinuityManifest(changed);
 assert.equal(broken.records.find(r=>r.id===changed[0].id&&r.locale==='ar').editionMatches,false);
});
test('targeted full-text inspection is not described as abstract-only on the source page',async()=>{
 const {resourcePage}=await import('../src/site.mjs');
 const {resources,labels}=await import('../src/catalogue.mjs');
 const source=resources.find(r=>r.id==='swbs-eksi-kardas');
 for(const l of locales)assert.ok(!resourcePage(source,l,'/MARSAM/').match(/<main[\s\S]*?<\/main>/)[0].includes(labels[l].abstractOnly),l);
});
