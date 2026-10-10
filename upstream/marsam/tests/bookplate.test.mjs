import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampusHome} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';

test('approved layered portal retains ebru and geometry without the removed subtitle or extra embellishments',()=>{
 for(const locale of locales){
  const html=renderCampusHome(locale,'/MARSAM/');
  const art=html.match(/<div class="heritage-art"[\s\S]*?<\/section>/)?.[0];
  assert.ok(art,locale);
  assert.ok(!art.includes('heritage-floral')&&!art.includes('floral.svg'),locale+' floral ornament removed from markup');
  assert.ok(!art.includes('class="heritage-rosette"'),locale+' no independent top emblem');
  assert.ok(art.includes('class="approved-portal-image"'),locale+' exact approved composition');
  assert.ok(art.includes('portal-continuous-v1.svg')&&!art.includes('manuscript-subline'),locale+' approved image without subtitle');
 }
});
test('previously rejected hero paragraph, search block and shortcut row are absent, while global search is preserved',()=>{
 for(const locale of locales){
  const html=renderCampusHome(locale,'/MARSAM/');
  const hero=html.match(/<section class="editorial-hero[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero,locale);
  for(const forbidden of ['hero-search-form','id="hero-search"','class="hero-deck"','class="hero-actions"']) assert.ok(!hero.includes(forbidden),locale+' '+forbidden);
  assert.ok(html.includes('data-open-search')&&html.includes('id="global-search"'),locale+' working site-wide search remains');
 }
});
test('full-surface pattern and restrained page margins have noninteractive, print-safe and high-contrast alternatives',()=>{
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 const rule=css.match(/\.manuscript-pattern\{([^}]+)\}/)?.[1]||'';
 assert.match(rule,/inset:0/);
 assert.match(rule,/pointer-events:none/);
 assert.match(rule,/rosette\.svg/);
 assert.match(rule,/background-repeat:repeat/);
 assert.ok(css.includes('body::before'));
 assert.ok(css.includes('@media print')&&css.includes('forced-colors:active'));
});
