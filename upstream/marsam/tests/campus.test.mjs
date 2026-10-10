import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
const path=new URL('../src/campus.mjs',import.meta.url);
test('institutional enhancement module is implemented',()=>assert.ok(existsSync(path),'campus module is required'));
if(existsSync(path)){
 const {campusCopy,institutions,comparisonRows,parseSelection,eventState,decorate,renderCampusHome,renderCompare}=await import(path);
 const {locales}=await import('../src/languages.mjs');
 const {sources,resources}=await import('../src/catalogue.mjs');
 test('campus copy has exact eight-language coverage',()=>{const keys=Object.keys(campusCopy.tr).sort();for(const l of locales){assert.deepEqual(Object.keys(campusCopy[l]).sort(),keys);for(const v of Object.values(campusCopy[l]))assert.ok(typeof v==='string'&&v.trim());}});
 test('design benchmarks are excluded from the public content',()=>assert.deepEqual(institutions,[]));
 test('comparison selection validates IDs and caps four',()=>{assert.deepEqual(parseSelection('a,b,a,unknown,c,d,e',['a','b','c','d','e']),['a','b','c','d']);assert.deepEqual(parseSelection('../secret,<img>', ['a']),[]);});
 test('event status uses dates, not evergreen registrations',()=>{assert.equal(eventState('2025-08-22','2026-10-01'),'past');assert.equal(eventState('2026-10-03','2026-10-01'),'upcoming');assert.equal(eventState('2026-10-01','2026-10-01'),'today');assert.throws(()=>eventState('garbage','2026-10-01'));});
 test('source comparison is descriptive, no efficacy ranking',()=>{const rows=comparisonRows(resources.slice(0,2),'tr');assert.equal(rows.length,2);assert.ok(rows[0].citation);assert.ok(rows[0].review);assert.ok(!('score' in rows[0]));});
 test('planned institutional status accompanies the owner-requested Marmara masthead',()=>{for(const l of locales){const h=renderCampusHome(l,'/MARSAM/');assert.ok(h.includes('data-institution-status="planned"'));assert.ok(h.includes('university-signature'));assert.ok(h.includes('site.css'));assert.ok(h.includes('noindex'));assert.ok(h.includes('data-campus'));assert.ok(!h.includes('href="/tr/'));}});
 test('comparison page and source IDs present in every locale',()=>{for(const l of locales){const h=renderCompare(l,'/MARSAM/');assert.ok(h.includes('data-compare-page'));assert.ok(h.includes('data-comparison-records'));assert.ok(h.includes(campusCopy[l].compare));}});
 test('source records require explicit scope rather than inferred institutional membership',()=>{assert.ok(sources.every(s=>s.access&&s.limit));assert.deepEqual(institutions,[]);});
}
