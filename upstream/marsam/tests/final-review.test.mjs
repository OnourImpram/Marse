import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {locales} from '../src/languages.mjs';
import {sources,sections} from '../src/catalogue.mjs';
import {sectionPage,searchIndex} from '../src/site.mjs';
import {centreRows} from '../src/centre-copy.mjs';
import {escapeHTML} from '../src/lib.mjs';
import * as scholarship from '../src/scholarship.mjs';
import {measureProfiles,instrumentProfile} from '../src/scholarly-view.mjs';

test('SWBS names resolve to two different instruments, not two versions of one tool',()=>{
 for(const [id,count,doi] of [['swbs-eksi-kardas',29,'10.12738/spc.2017.1.0022'],['swbs-paloutzian-ellison',20,'10.1177/009164718301100406']]){
  const profile=measureProfiles.find(p=>p.id===id);assert.ok(profile,'Missing distinct instrument '+id);
  const record=scholarship.evidence.find(r=>r.id===id);assert.equal(record.brief.instrument.items,count);assert.equal(record.brief.doi,doi);
  assert.equal(record.brief.instrument.scoreEquivalenceEstablished,false);
  for(const l of locales)for(const base of ['/','/MARSAM/']){
   const html=instrumentProfile(profile,l,base);assert.ok(html.includes('data-claim="'+id+':limit"'));
   assert.ok(html.includes(base+l+'/measure-'+(count===29?'swbs-paloutzian-ellison':'swbs-eksi-kardas')+'/'));
   assert.ok(searchIndex(l,base).some(r=>r.id==='section-measure-'+id));
  }
 }
});
test('primary-source discrepancy and translation-versus-validation distinction remain explicit',()=>{
 const a=scholarship.evidence.find(r=>r.id==='swbs-eksi-kardas');assert.ok(a,'29-item source absent');
 assert.deepEqual(a.brief.reportedDiscrepancies.srmr,{abstract:'.50',table6:'.050',tablePage:84,resolved:false});
 assert.equal(a.brief.instrument.validationSample.ageRange,'16–54');
 const b=scholarship.evidence.find(r=>r.id==='swbs-paloutzian-ellison');assert.equal(b.brief.instrument.turkishFormYear,2022);
 assert.equal(b.brief.instrument.turkishPsychometricValidationVerified,false);
 for(const l of locales){assert.match(a.editions[l].limit,/\.50/);assert.match(a.editions[l].limit,/\.050/);assert.match(b.editions[l].limit,/2022/);}
});
test('about introduction appears once in the rendered main content in all languages',()=>{
 for(const l of locales){const html=sectionPage('about',l,'/MARSAM/').match(/<main[\s\S]*?<\/main>/)[0];
 assert.equal(html.split(escapeHTML(centreRows.aboutText[l])).length-1,1,l+' duplicate about introduction');}
});
test('founder, RSS and themes have persisted source and edition bindings that reject stale changes',async()=>{
 assert.equal(typeof scholarship.validateNarrativeBindings,'function','Narrative validator missing');
 const {narrativeBindings,scholarlyCopy,scholarlyThemes,validateNarrativeBindings}=scholarship;
 assert.deepEqual(validateNarrativeBindings(sources),[]);
 const alteredSource=structuredClone(sources);alteredSource.find(s=>s.id==='s-spiritual-struggles').citation+=' changed';
 assert.ok(validateNarrativeBindings(alteredSource).some(e=>e.includes('stale source')));
 const copy=structuredClone(scholarlyCopy);copy.founderText.ar+=' changed';
 assert.ok(validateNarrativeBindings(sources,{copy}).some(e=>e.includes('ar')));
 const changed=structuredClone(narrativeBindings);changed.records[0].brief.boundary+=' changed';
 assert.ok(validateNarrativeBindings(sources,{bindings:changed}).some(e=>e.includes('stale brief')));
 const manifest=scholarship.narrativeReviewManifest(sources);assert.equal(manifest.records.length,(scholarlyThemes.length+2)*locales.length);
 assert.ok(manifest.records.every(r=>r.humanReviewed===false&&r.scientificApproval===false&&r.sourceLanguage===null));
});
test('new instrument source depth is not downgraded to abstract, items remain link-only',()=>{
 const source=sources.find(s=>s.id==='s-swbs-eksi-kardas');assert.ok(source,'Missing measurement source');
 assert.equal(source.inspection,'fulltext');
 const record=scholarship.evidence.find(r=>r.id==='swbs-eksi-kardas');assert.ok(!Object.hasOwn(record.brief.instrument,'itemText'));
 assert.ok(source.access.includes('Table 6'));assert.match(source.access,/targeted/i);
});
