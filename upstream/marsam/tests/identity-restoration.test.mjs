import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampusHome} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';
import {labels} from '../src/catalogue.mjs';

test('owner-requested Marmara identity is restored in every locale without inventing completed establishment',()=>{
 for(const l of locales){
  const html=renderCampusHome(l,'/MARSAM/');
  assert.ok(html.includes('class="university-signature"'),l);
  assert.ok(html.includes('data-academic-unit="guidance-counselling"'),l);
  assert.ok(html.includes('data-institution-status="planned"'),l);
  assert.ok(html.includes('marmara-'+(l==='tr'?'tr':'en')+'.png'),l);
  assert.equal(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g,''),labels[l].brand);
 }
});
test('unwanted public homepage warning promotions are removed, not merely CSS hidden',()=>{
 for(const l of locales){const html=renderCampusHome(l,'/MARSAM/');
  assert.ok(!html.includes('class="preview-strip"'),l);
  assert.ok(!html.includes('trust-entry'),l);
  assert.ok(html.includes('/governance/'),l);
 }
});
test('restored hero keeps header search, patterned artwork and version 0.7 source records',()=>{
 const html=renderCampusHome('tr','/MARSAM/');
 assert.ok(html.includes('class="approved-portal-image"'));
 assert.ok(html.includes('data-open-search'));
 assert.ok(html.includes('portal-continuous-v1.svg'));
 assert.ok(html.includes('Atatürk Eğitim Fakültesi'));
 assert.ok(html.includes('Eğitim Bilimleri Bölümü'));
 assert.ok(html.includes('Rehberlik ve Psikolojik Danışmanlık Anabilim Dalı'));
 const build=readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
 assert.ok(!build.includes('marmara-(?:tr|en)'));
});
