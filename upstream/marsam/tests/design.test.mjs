import {RELEASE} from '../src/release.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {renderCampusHome,decorate} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';
import {labels} from '../src/catalogue.mjs';
import {resources} from '../src/catalogue.mjs';

test('refined home has an explicit editorial hierarchy rather than the former repeated grid',()=>{
 for(const l of locales){const h=renderCampusHome(l,'/MARSAM/');
  for(const c of ['editorial-hero','study-index','research-feature-layout','audience-paths','reading-selection'])assert.ok(h.includes(c),l+' '+c);
  assert.equal(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g,''),labels[l].brand);
  assert.ok(!/institution-grid|hero-question|kimin tercihi/i.test(h));
 }
});
test('hero artwork is responsive and decorative, not falsely attributed campus photography',()=>{
 const h=renderCampusHome('tr','/MARSAM/');
 assert.ok(h.includes('portal-continuous-v1.svg'));assert.ok(h.includes('portal-continuous-v1.svg'));
 assert.match(h,/<img[^>]+class="approved-portal-image"[^>]+alt=""/);
 assert.ok(h.includes('data-open-search')&&!h.includes('id="hero-search"'));assert.ok(h.includes('width="960" height="960"'));
});
test('design keeps the real sources, pathways and direct comparison controls',()=>{
 for(const l of locales){const h=decorate(renderCampusHome(l,'/MARSAM/'),l,'','/MARSAM/');
  for(const path of ['collections','library','learning','projects','events','media','compare'])assert.ok(h.includes(`/${l}/${path}/`));
  assert.ok(h.includes('data-compare-nav'));assert.ok(h.includes(`data-release="${RELEASE.version}"`));
  assert.equal((h.match(/class="audience-path"/g)||[]).length,3);
  assert.ok(h.includes('site.css'));
 }
 assert.ok(resources.length>0);
});
test('refinement has reduced-motion, print and RTL rules without hidden content tricks',()=>{
 assert.ok(existsSync(new URL('../public/site.css',import.meta.url)));
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 for(const x of ['prefers-reduced-motion','@media print','[dir="rtl"]','focus-visible'])assert.ok(css.includes(x));
 assert.ok(!css.includes('body{overflow-x:hidden'));
});

test('publication-selection cards preserve the source type rather than calling every source a study',()=>{const h=renderCampusHome('tr','/');assert.ok(h.includes('Kuramsal çalışma'));});

test('preview server serves WebP and university PNG with image MIME types',()=>{const s=readFileSync(new URL('../scripts/serve.mjs',import.meta.url),'utf8');assert.ok(s.includes("'.webp':'image/webp'"));assert.ok(s.includes("'.png':'image/png'"));});
