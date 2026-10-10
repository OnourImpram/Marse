import test from 'node:test';
import assert from 'node:assert/strict';
import {strategicSections,bridges} from '../src/roadmap/platform.mjs';
import {datasetCopy} from '../src/roadmap/copy.mjs';
const locales=['tr','en','de','zh','ru','ar','id','ms'];

test('roadmap public section and bridge records expose every locale',()=>{
 for(const record of [...strategicSections,...bridges]){
  for(const field of record.summary?['title','summary']:['title','text']){
   for(const locale of locales) assert.ok(record[field]?.[locale]?.trim(),record.id+'/'+field+'/'+locale);
  }
 }
});

test('public scholarly section navigation does not silently fall back to English',()=>{
 for(const record of strategicSections){
  for(const locale of locales.filter(x=>!['tr','en'].includes(x))){
   assert.notEqual(record.title[locale],record.title.en,record.id+'/title/'+locale);
   assert.notEqual(record.summary[locale],record.summary.en,record.id+'/summary/'+locale);
  }
 }
});

test('dataset registry exposes native draft scope and access text in every locale',()=>{
 for(const [id,record] of Object.entries(datasetCopy)){
  for(const locale of locales){assert.equal(record[locale].length,2,id+'/'+locale);assert.ok(record[locale].every(x=>x.trim().length>20),id+'/'+locale);}
  for(const locale of locales.filter(x=>!['tr','en'].includes(x))) assert.notEqual(record[locale][0],record.en[0],id+'/'+locale);
 }
});

test('roadmap locale state does not imply human review',()=>{
 for(const record of [...strategicSections,...bridges]) assert.equal(record.humanReviewed??false,false);
});
