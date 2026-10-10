import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {renderCampusHome} from '../src/campus.mjs';
import {resourcePage,searchIndex} from '../src/site.mjs';
import {locales} from '../src/languages.mjs';
import {resources} from '../src/content.mjs';
const optional=async path=>{try{return await import(path);}catch{return {};}};

test('restored institutional shell retains five primary routes, planned status, and search before decoration',()=>{
 for(const l of locales){const html=renderCampusHome(l,'/MARSAM/');
  assert.ok(html.includes('data-primary-nav'),l);
  assert.ok(html.includes('data-institution-status="planned"'),l);
  assert.ok(html.includes('university-signature'),l);
  assert.ok(html.includes('data-open-search')&&!html.includes('id="hero-search"'),l);
  for(const path of ['collections','library','learning','research','about'])assert.ok(html.includes(`/MARSAM/${l}/${path}/`));
 }
});
test('page shell uses a single versioned stylesheet rather than CSS or regex patch layers',()=>{
 const html=renderCampusHome('en','/MARSAM/');
 assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1);
 assert.ok(!html.includes('campus.css')&&!html.includes('editorial.css')&&!html.includes('heritage.css'));
 const campus=readFileSync(new URL('../src/campus.mjs',import.meta.url),'utf8');
 assert.ok(!campus.includes('html.replace('));
});
test('search indexes identify original works by DOI and ISBN, not merely editorial summaries',async()=>{
 const {searchRecords}=await optional('../public/search-core.js');assert.equal(typeof searchRecords,'function');
 const index=searchIndex('en','/MARSAM/');
 assert.equal(searchRecords(index,'https://doi.org/10.37898/spiritualpc.1793082','en')[0]?.id,'sipas');
 assert.equal(searchRecords(index,'978 625 8804 58 4','en')[0]?.id,'trauma-spirituality');
});
test('exact and tolerant normalization are distinct and script-aware',async()=>{
 const {normalizeExact,normalizeLoose,queryTerms}=await optional('../public/search-core.js');
 assert.equal(typeof normalizeExact,'function');
 assert.equal(normalizeExact('I İ ı i','tr'),'ı i ı i');
 assert.equal(normalizeExact('И Й и й','ru'),'и й и й');
 assert.equal(normalizeLoose('İnanç ÖLÇEĞİ ışık','tr'),'inanc olcegi isik');
 assert.equal(normalizeLoose('الإِرشـاد','ar'),normalizeLoose('الارشاد','ar'));
 assert.ok(queryTerms('灵性心理治疗','zh').length>1);
});
test('source detail exposes separate review dimensions without upgrading approval',()=>{
 const r=resources.find(r=>r.id==='sipas');const html=resourcePage(r,'ar','/MARSAM/');
 for(const key of ['identity','inspection','scientific','currency','translation','rights'])assert.ok(html.includes(`data-review-dimension="${key}"`),key);
 assert.ok(html.includes('data-review-status="draft"'));
});
test('stable-message contract supplies all eight languages, no fallback and exact review hashes',async()=>{
 const {message,translationRecord}=await optional('../src/messages.mjs');assert.equal(typeof message,'function');
 for(const l of locales)assert.ok(message('nav.explore',l));
 assert.throws(()=>message('no.such.key','ms'));
 const draft=translationRecord('item','en',{text:'source'},'translation');
 assert.equal(draft.humanReviewed,false);assert.match(draft.sourceHash,/^[a-f0-9]{64}$/);
 const stale=translationRecord('item','en',{text:'changed'},'translation',{status:'reviewed',sourceHash:draft.sourceHash,reviewedBy:'Reviewer',targetHash:draft.targetHash});
 assert.equal(stale.status,'outdated');assert.equal(stale.humanReviewed,false);
});
test('scholarly source roles allow real institutional citations but reject unsupported partnerships',async()=>{
 const {validateRelationships}=await optional('../src/provenance.mjs');assert.equal(typeof validateRelationships,'function');
 assert.deepEqual(validateRelationships([{role:'source',name:'Harvard',url:'https://example.org/paper'}]),[]);
 assert.ok(validateRelationships([{role:'partner',name:'Harvard',approved:false}]).length);
});
test('catalogue rendering imports do not mutate source content or base locale dictionaries',async()=>{
 const {labels}=await import('../src/i18n.mjs');
 const {articles}=await import('../src/articles.mjs');
 const {dossierTitles}=await import('../src/catalogue-copy.mjs');
 const {catalogue}=await optional('../src/catalogue.mjs');assert.ok(catalogue);
 assert.notStrictEqual(catalogue.articles,articles);
 assert.equal(catalogue.articles.find(a=>a.id==='theory-and-integration').title.en,dossierTitles['theory-and-integration'].en);
 assert.notStrictEqual(catalogue.labels,labels);
});
test('tokens define semantic colour roles and the stylesheet includes RTL, reduced motion and forced colours',()=>{
 const path=new URL('../src/tokens.json',import.meta.url);assert.ok(existsSync(path));
 const tokens=JSON.parse(readFileSync(path,'utf8'));assert.ok(tokens.color['text-primary']);assert.ok(tokens.color['surface-reading']);
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 for(const marker of ['prefers-reduced-motion','forced-colors','[dir="rtl"]','focus-visible','@media print'])assert.ok(css.includes(marker));
});
