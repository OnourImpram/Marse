import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderCampusHome} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';
const root=new URL('../',import.meta.url);
test('approved receding-arch artwork, first-layer symmetry repair and lower-left seam closure are used in each locale and under both deployment roots',()=>{
 for(const base of ['/','/MARSAM/'])for(const locale of locales){
  const html=renderCampusHome(locale,base);
  const art=html.match(/<div class="heritage-art"[\s\S]*?<\/section>/)?.[0];
  assert.ok(art,locale);
  assert.ok(art.includes('aria-hidden="true"'));
  assert.ok(art.includes(base+'assets/heritage/portal-continuous-v1.svg'),base+locale);
  assert.ok(!art.includes('srcset='),base+locale);
  assert.ok(art.includes('width="960" height="960"'));
  assert.ok(art.includes('alt=""'));
  for(const name of ['manuscript-subline','manuscript-wordmark','manuscript-inner','manuscript-pattern'])assert.ok(!art.includes(name),'Do not overlay the superseded flat panel '+name);
  assert.ok(html.includes('class="university-signature"'));
  assert.ok(html.includes('data-open-search'));
 }
});
test('approved original composition remains byte-identical inside the continuous rendering asset',()=>{
 const desktop=readFileSync(new URL('public/assets/heritage/approved-portal-960.webp',root));
 assert.equal(createHash('sha256').update(desktop).digest('hex'),'00a058dc8f737d73d9bfbd49ef9e541fe54defb2f8d0015efa3ad77cfaa6c66b');
 assert.ok(desktop.length<=90000);
 const css=readFileSync(new URL('public/site.css',root),'utf8');
 const mobile=readFileSync(new URL('public/assets/heritage/approved-portal-480.webp',root));
 assert.ok(mobile.length<=40000);
 for(const image of [desktop,mobile])assert.equal(image.subarray(8,12).toString(),'WEBP');
});
test('approved picture is undistorted and cini recedes at every breakpoint',()=>{
 const css=readFileSync(new URL('public/site.css',root),'utf8');
 const rule=css.match(/\.manuscript-frame\.approved-portal\{([^}]+)\}/)?.[1]||'';
 assert.match(rule,/aspect-ratio:1/);assert.match(rule,/height:auto/);assert.match(rule,/padding:0/);assert.match(rule,/position:relative/);assert.match(rule,/overflow:hidden/);
 assert.match(css,/\.approved-portal-image\{[^}]*height:auto[^}]*object-fit:contain/);
 const cini=css.slice(css.indexOf('/* MARSAM Iznik cini'),css.indexOf('/* End MARSAM Iznik cini */'));
 const values=[...cini.matchAll(/opacity:([.\d]+)/g)].map(m=>Number(m[1]));
 assert.ok(values.length>=7);assert.ok(values.every(v=>v>0&&v<=.12),JSON.stringify(values));
 assert.ok(!/filter:|animation:|mix-blend-mode:|text-shadow:/.test(cini));
 assert.ok(css.includes('@media print')&&css.includes('forced-colors:active'));
});
