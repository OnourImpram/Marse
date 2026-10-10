import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {evidence,validateScholarship,scholarlyThemes} from '../src/scholarship.mjs';
import {sources,resources} from '../src/catalogue.mjs';
import {searchIndex} from '../src/site.mjs';
import {searchRecords} from '../public/search-core.js';
import {exportRIS,exportBib} from '../src/lib.mjs';
import {evidencePage,evidenceRecordPanel,instrumentProfile,measureProfiles} from '../src/scholarly-view.mjs';
import {locales} from '../src/languages.mjs';
const ids=['within-person-attendance','bidirectional-alspac','brazil-medical-students','turkish-bereavement','psychosis-spirituality','clergy-abuse-harm'];
test('new selection balances null evidence, a non-Western cohort, Turkish bereavement and adverse experience',()=>{
 for(const id of ids)assert.ok(evidence.find(r=>r.id===id),'Missing '+id);
 assert.equal(evidence.find(r=>r.id==='turkish-bereavement').brief.temporalDesignVerified,false);
 assert.equal(evidence.find(r=>r.id==='clergy-abuse-harm').brief.qualityAppraisalPerformed,false);
 assert.equal(evidence.find(r=>r.id==='brazil-medical-students').brief.usesMeasure,'durel');
});
test('six new original works retain source identity and actual journal export fields',()=>{
 for(const id of ids){const r=evidence.find(r=>r.id===id);assert.ok(r,id);const s=sources.find(s=>s.id===r.sourceId);
 assert.equal(resources.filter(p=>p.sources.includes(s.id)).length,1);
 assert.ok(exportRIS(s).includes('DO  - '+r.brief.doi));assert.match(exportRIS(s),/TY  - JOUR/);assert.match(exportBib(s),/@article\{/);
 assert.ok(r.bibliography.authors.length>0);assert.ok(r.bibliography.journal&&r.bibliography.volume);}
});
test('new records are retrievable by DOI and original title in every language',()=>{
 for(const l of locales)for(const id of ids){const r=evidence.find(r=>r.id===id);assert.ok(r,id);const index=searchIndex(l,'/MARSAM/');
 for(const query of [r.brief.doi,r.title])assert.ok(searchRecords(index,query,l).some(p=>p.id===id),l+'/'+id+'/'+query);}
});
test('connected reading and instrument use are explicit and base aware in all editions',()=>{
 const r=evidence.find(r=>r.id==='within-person-attendance');assert.ok(r);
 for(const l of locales)for(const b of ['/','/MARSAM/']){
 const panel=evidenceRecordPanel(sources.find(s=>s.id===r.sourceId),l,b);
 assert.ok(panel.includes('data-related-evidence'));assert.ok(panel.includes(b+l+'/resource/attendance-cohorts/'));
 const profile=instrumentProfile(measureProfiles.find(p=>p.id==='durel'),l,b);
 assert.ok(profile.includes('data-instrument-use'));assert.ok(profile.includes(b+l+'/resource/brazil-medical-students/'));
 const page=evidencePage(l,b);for(const id of ids)assert.ok(page.includes('data-claim="'+id+':limit"'));
 }
});
test('related readings cannot point to undeclared records or nonexistent measures',()=>{
 const changed=structuredClone(evidence);const r=changed.find(r=>r.id==='brazil-medical-students');assert.ok(r);
 r.brief.usesMeasure='made-up';assert.ok(validateScholarship(changed).some(e=>e.includes('instrument link')));
 r.brief.relatedRecords=['made-up'];assert.ok(validateScholarship(changed).some(e=>e.includes('related evidence')));
});
test('new synthesis questions are present without replacing the existing heritage layer',()=>{
 for(const id of ['longitudinal-questions','harm-and-clinical-context'])assert.ok(scholarlyThemes.find(t=>t.id===id));
 const sha=p=>createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex');
 assert.equal(sha('public/assets/heritage/approved-portal-960.webp'),'00a058dc8f737d73d9bfbd49ef9e541fe54defb2f8d0015efa3ad77cfaa6c66b');
 assert.equal(sha('public/assets/heritage/approved-portal-480.webp'),'9c5ddeceaea1b1e76a127cd38281ce07205f55bebac19c9aaaab7ec3f8268f9d');
});
