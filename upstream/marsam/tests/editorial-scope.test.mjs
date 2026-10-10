import test from 'node:test';
import assert from 'node:assert/strict';
import {renderCampusHome,decorate,institutions,events,campusCopy} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';
import {labels} from '../src/catalogue.mjs';
import {sources,resources,sections} from '../src/catalogue.mjs';
import {searchIndex} from '../src/site.mjs';
const prohibitedPurpose=/institution-grid|data-partner=/;
test('design benchmarks are not public catalogue institutions',()=>{
 assert.equal(institutions.length,0);assert.equal(events.length,0);
 assert.ok(sources.every(s=>s.access&&s.limit));
});
test('centre name, not a personal research question, is the main headline',()=>{
 for(const l of locales){const h=renderCampusHome(l,'/MARSAM/');
 const title=h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g,'');
 assert.equal(title,labels[l].brand,l);
 assert.ok(!h.includes('hero-question'));assert.ok(!prohibitedPurpose.test(h));
 assert.ok(!h.includes('kimin tercihi'));assert.ok(!h.includes('institution-grid'));
 }
});
test('navigation and search do not promote reference institutions',()=>{
 for(const l of locales){const h=decorate(renderCampusHome(l,'/MARSAM/'),l,'','/MARSAM/');
 assert.ok(!h.includes(`/${l}/network/`));
 assert.ok(!prohibitedPurpose.test(JSON.stringify(searchIndex(l,'/MARSAM/'))));
 }
 assert.ok(!sections.some(s=>s.id==='network'));
});
test('homepage leads to centre research, education and publications',()=>{
 for(const l of locales){const h=renderCampusHome(l,'/MARSAM/');
 for(const page of ['collections','learning','library','projects','events','media'])assert.ok(h.includes(`/${l}/${page}/`),l+' '+page);
 const visible=h.replace(/<script[\s\S]*?<\/script>/g,'');assert.ok(!visible.includes('JSON'));assert.ok(!visible.includes('PARTIALLY_VERIFIED'));
 }
});

test('comparison summary row uses a concise field label',()=>{for(const l of locales)assert.ok(campusCopy[l].scope.length<35,l);});
