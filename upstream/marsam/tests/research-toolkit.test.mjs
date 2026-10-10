import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {locales} from '../src/languages.mjs';
import {renderCampusHome,campusRenderers} from '../src/campus.mjs';
import {sections} from '../src/catalogue.mjs';
import {searchIndex} from '../src/site.mjs';
const ROOT=new URL('../',import.meta.url);
const ids=['research-guide','measurement-guide','data-access','reproducible-lab'];
test('matte bookplate has no white overlay, gradient or glowing wordmark',()=>{
 const css=readFileSync(new URL('public/site.css',ROOT),'utf8');
 const inner=css.match(/\.manuscript-inner\{([^}]+)\}/)[1];
 const type=css.match(/\.manuscript-wordmark\{([^}]+)\}/)[1];
 assert.ok(!inner.includes('gradient'),'inner surface must be matte');
 assert.match(type,/text-shadow:none/);
 assert.ok(!css.includes('.manuscript-inner::after'),'remove the overlay at its source');
 assert.match(css,/\.manuscript-pattern\{[^}]+rosette\.svg/);
});
test('source-grounded research guides are full, distinct localized pages, searchable without restoring rejected hero',()=>{
 for(const locale of locales){
  for(const id of ids){
   assert.ok(sections.some(s=>s.id===id),id);
   assert.equal(typeof campusRenderers[id],'function',id);
   const html=campusRenderers[id](locale,'/MARSAM/');
   assert.ok(html.includes('data-research-guide="'+id+'"'));
   assert.ok(html.includes('data-review-status="draft"'));
   assert.ok(html.includes('class="university-signature"'));
   assert.ok(searchIndex(locale,'/MARSAM/').some(x=>x.url===`/MARSAM/${locale}/${id}/`));
   assert.ok(!html.includes('undefined'));
  }
  const home=renderCampusHome(locale,'/MARSAM/');
  assert.ok(!home.includes('class="hero-search-form"'));
 }
});
test('research templates are explicit empty drafts, not invented findings or permissions',()=>{
 for(const name of ['research-summary','measurement-evidence']){
  const p=new URL(`research/templates/${name}.json`,ROOT);
  assert.ok(existsSync(p),name);
  const d=JSON.parse(readFileSync(p,'utf8'));
  assert.equal(d.objectType,'template');assert.equal(d.review.approved,false);
  assert.equal(d.study.sampleSize,null);assert.equal(d.study.effectSize,null);
  assert.equal(d.rights.redistributionAllowed,null);
 }
});
