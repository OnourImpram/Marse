import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {locales} from '../src/languages.mjs';
import {resources,sources} from '../src/catalogue.mjs';

test('scope projection archives self-help while retaining explicitly spiritual professional books',()=>{
 for(const id of ['discovering-spirituality','spiritual-practices'])assert.ok(!resources.some(r=>r.id===id),`${id} must leave public scholarly discovery`);
 for(const id of ['cbt-spiritual','group-counselling','theories-book'])assert.ok(resources.some(r=>r.id===id));
});
test('evidence includes international synthesis, prospective observation, null trial and Turkish qualitative research',async()=>{
 const {evidence}=await import('../src/scholarship.mjs');
 for(const design of ['systematic-review','meta-analysis','prospective-cohort','pilot-rct','qualitative'])assert.ok(evidence.some(r=>r.brief.design===design),design);
 assert.ok(evidence.some(r=>r.id==='religious-cbt'&&r.brief.findingDirection==='no-overall-difference'));
 for(const r of evidence){assert.ok(sources.some(s=>s.id===r.sourceId));for(const l of locales)assert.ok(r.editions[l].finding&&r.editions[l].limit)}
});
test('shared brief freshness rejects outdated or incomplete language editions',async()=>{
 const {evidence,validateScholarship}=await import('../src/scholarship.mjs');
 assert.deepEqual(validateScholarship(),[]);
 const changed=structuredClone(evidence);changed[0].brief.population='changed population';
 assert.ok(validateScholarship(changed).some(x=>x.includes('stale')));
 const missing=structuredClone(evidence);delete missing[0].editions.ar;
 assert.ok(validateScholarship(missing).some(x=>x.includes('ar')));
});
test('scope audit is exhaustive and does not promote machine review to human approval',async()=>{
 const audit=JSON.parse(await readFile(new URL('../docs/research/SCOPE_AUDIT.json',import.meta.url)));
 const {evidence,reviewManifest}=await import('../src/scholarship.mjs');
 assert.equal(audit.originalSourceCount,27);
 assert.equal(audit.records.filter(r=>r.origin==='0.8.3').length,27);
 for(const s of sources)assert.ok(audit.records.some(r=>r.sourceId===s.id));
 const review=reviewManifest();assert.equal(review.humanReviewed,false);
 assert.equal(review.records.length,evidence.length*locales.length);
 assert.ok(review.records.every(r=>r.sourceLanguage===null&&r.status==='AI_ASSISTED_DRAFT'));
});
test('new evidence and measure content is searchable in every locale',async()=>{
 const {searchIndex}=await import('../src/site.mjs');
 for(const l of locales){const index=searchIndex(l,'/MARSAM/');assert.ok(index.some(r=>r.id==='section-evidence'));assert.ok(index.some(r=>r.id==='section-measure-brief-rcope'));}
});

test('candidate discovery deduplicates DOI identity and never approves or publishes',async()=>{
 const {candidates}=await import('../scripts/discover-literature.mjs');
 const rows=candidates({resultList:{result:[{doi:'10.1/ABC',title:'A'},{doi:'10.1/abc',title:'duplicate'},{source:'MED',id:'123',title:'B'}]}});
 assert.equal(rows.length,2);assert.ok(rows.every(r=>r.state==='UNSCREENED_CANDIDATE'&&!r.included&&!r.scientificApproval));
});
test('scholarly renderers preserve claim limits, source routes and native direction',async()=>{
 const {evidencePage,instrumentOverview,founderSection}=await import('../src/scholarly-view.mjs');
 for(const l of locales){const html=evidencePage(l,'/MARSAM/');assert.ok(html.includes('data-claim="religious-cbt:limit"'));assert.ok(html.includes(`/${l}/resource/religious-cbt/`));assert.ok(html.includes(`dir="${l==='ar'?'rtl':'ltr'}"`));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(instrumentOverview(l,'/').includes(`/measure-durel/`));assert.ok(founderSection(l,'/').includes('id="founder"'));}
});

test('publication rejects missing scope decisions and unbound populations or limits',async()=>{
 const {validateScope,validateScholarship,evidence,scopeDecision}=await import('../src/scholarship.mjs');
 assert.deepEqual(validateScope(sources),[]);
 assert.ok(validateScope([...sources,{id:'unreviewed-source'}]).length);
 assert.throws(()=>scopeDecision('unreviewed-source'),/Missing scope/);
 const missing=structuredClone(evidence);delete missing[0].editions.zh.population;assert.ok(validateScholarship(missing).some(x=>x.includes('zh')));
 const changed=structuredClone(evidence);changed[0].brief.limitationCodes.push('new-limit');assert.ok(validateScholarship(changed).some(x=>x.includes('stale')));
});

test('new study and psychometric articles export complete journal citations',async()=>{
 const {exportRIS,exportBib}=await import('../src/lib.mjs');
 for(const id of ['s-religious-cbt','s-brief-rcope','s-meaning-questionnaire','s-durel']){const source=sources.find(s=>s.id===id);assert.match(exportBib(source),/@article\{/);assert.match(exportRIS(source),/TY  - JOUR/);assert.match(exportRIS(source),/SP  - /);assert.ok(!source.citation.includes('&amp;'));}
 const german=sources.find(s=>s.id==='s-german-meta');assert.equal(german.year,2026);assert.equal(german.bibliography.onlineDate,'2025-08-12');
});

test('source identity cannot be rebound beneath fresh scholarly editions',async()=>{
 const {evidence,validateScholarship}=await import('../src/scholarship.mjs');
 for(const change of [r=>r.sourceId='s-brief-rcope',r=>r.bibliography.doi='10.3390/rel2010051',r=>r.url='https://doi.org/10.3390/rel2010051']){
  const changed=structuredClone(evidence);change(changed[0]);
  assert.ok(validateScholarship(changed).some(x=>x.includes('identity')),JSON.stringify(changed[0].bibliography));
 }
});

test('an invalid scope action fails closed rather than restoring archived works',async()=>{
 const {validateScope}=await import('../src/scholarship.mjs');
 const audit=(await import('../docs/research/SCOPE_AUDIT.json',{with:{type:'json'}})).default;
 const decision=audit.records.find(r=>r.sourceId==='s-discovering-spirituality');
 const action=decision.action;
 try{
  for(const invalid of [undefined,'ARCHIVE','retian']){
   decision.action=invalid;
   assert.ok(validateScope(sources).some(x=>x.includes('scope action')),String(invalid));
  }
 }finally{decision.action=action;}
});

test('RSS full original instrument name retrieves its profile in all eight editions',async()=>{
 const {searchIndex}=await import('../src/site.mjs');
 const {searchRecords}=await import('../public/search-core.js');
 for(const l of locales){
  const found=searchRecords(searchIndex(l,'/MARSAM/'),'Religious and Spiritual Struggles Scale',l);
  assert.ok(found.some(r=>r.id==='section-measure-rss-14'),l);
 }
});

test('Arabic scholarly numeric ranges and Latin formulas retain their reading order',async()=>{
 const {evidencePage,instrumentProfile,measureProfiles}=await import('../src/scholarly-view.mjs');
 const page=evidencePage('ar','/MARSAM/');
 assert.ok(page.includes('<bdi dir="ltr">10–24</bdi>'));
 assert.ok(page.includes('<bdi dir="ltr">r = 0.083</bdi>'));
 const profile=instrumentProfile(measureProfiles.find(p=>p.id==='rss-14'),'ar','/MARSAM/');
 assert.ok(profile.includes('<bdi dir="ltr">0.60–0.82</bdi>'));
});
