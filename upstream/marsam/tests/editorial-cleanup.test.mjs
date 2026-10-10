import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {labels,articles,learningPaths,resources} from '../src/catalogue.mjs';
import {locales} from '../src/languages.mjs';
import {renderCampusHome} from '../src/campus.mjs';
import {sectionPage,dossierPage,pathPage,resourcePage} from '../src/site.mjs';
import {escapeHTML as e} from '../src/lib.mjs';
const roots=['/','/MARSAM/'];
test('site footer no longer emits the blanket clinical disclaimer in any locale',()=>{
 for(const base of roots)for(const l of locales){
  const html=renderCampusHome(l,base);
  const footer=html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
  assert.ok(footer,l);
  assert.ok(!footer.includes('footer-notice'),base+l+' generic footer notice');
  assert.ok(footer.includes('visual-credits')&&footer.includes('CC BY-SA 4.0'),l+' attribution remains');
  assert.ok(!footer.includes('institution-stage'),l+' establishment-stage label retired (owner, 2026-10-05)');
 }
});
test('retired blanket disclaimer labels are not shipped as unused UI payload',()=>{
 for(const l of locales)for(const key of ['notClinical','noProgram'])assert.ok(!(key in labels[l]),l+'/'+key);
});
test('reading and contribution pages omit repeated warning panels without dropping their content',()=>{
 for(const base of roots)for(const l of locales){
  for(const a of articles){
   const html=dossierPage(a,l,base);
   assert.ok(!html.includes('review-notice'),l+'/'+a.id+' redundant draft banner');
   assert.ok(html.includes(e(a.limit[l])),l+'/'+a.id+' real interpretive boundary');
   assert.ok(html.includes('id="source-list"'),l+'/'+a.id+' citations');
  }
  for(const id of ['practice','ethics','methods','approaches','contribute']){
   const html=sectionPage(id,l,base);
   assert.ok(!html.includes('review-notice'),l+'/'+id);
   assert.ok(!html.includes('undefined'),l+'/'+id+' no dangling labels');
  }
  for(const p of learningPaths){
   const html=pathPage(p,l,base);
   assert.ok(!html.includes('<div class="notice">'),l+'/'+p.id+' no blanket course disclaimer');
   assert.ok(html.includes('learning-steps'),l+'/'+p.id+' reading steps');
  }
 }
});
test('source permissions and review records stay explicit in their own context',()=>{
 for(const l of locales){
  assert.ok(sectionPage('editorial',l,'/').includes(e(labels[l].translationNote)),l+' editorial review state');
  assert.ok(sectionPage('measures',l,'/').includes(e(labels[l].rightsNote)),l+' instrument rights');
  for(const r of resources){
   const html=resourcePage(r,l,'/');
   assert.ok(!html.includes('review-notice'),l+'/'+r.id+' redundant banner');
   assert.ok(html.includes('data-copy-citation'),l+'/'+r.id+' citation');
   assert.ok(html.includes(e(labels[l].rightsNote)),l+'/'+r.id+' rights');
  }
 }
});
test('removed notice components leave no unused CSS selectors',()=>{
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 assert.ok(!css.includes('footer-notice'),'retired footer rules');
 assert.ok(!css.includes('review-notice'),'retired draft banner rules');
});
