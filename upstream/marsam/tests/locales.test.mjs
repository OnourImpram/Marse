import {renderCampusHome as home} from '../src/campus.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {locales,L} from '../src/i18n.mjs';
import {labels} from '../src/catalogue.mjs';
import {route,normalizeText,validateContent} from '../src/lib.mjs';
import {resources,sources,sections} from '../src/catalogue.mjs';
import {articles} from '../src/catalogue.mjs';
import {learningPaths,overview} from '../src/catalogue.mjs';
import {dossierPage,resourcePage,searchIndex} from '../src/site.mjs';
const expected=['tr','en','de','zh','ru','ar','id','ms'];
test('Arabic, Indonesian and Malay are real additional locales',()=>assert.deepEqual(locales,expected));
test('all eight labels and full reading bodies exist without fallback',()=>{
 const keys=Object.keys(labels.en).sort();
 for(const l of expected){assert.ok(labels[l],l);assert.deepEqual(Object.keys(labels[l]).sort(),keys,l);for(const v of Object.values(labels[l]))assert.ok(typeof v==='string'&&v.trim());for(const a of articles){assert.equal(a.body[l]?.length,a.body.en.length,a.id+' '+l);for(const [i,b]of a.body[l].entries()){assert.ok(b.heading);assert.ok(b.text.length>(l==='zh'?40:80),`${a.id} ${l}`);if(['ar','id','ms'].includes(l))assert.notEqual(b.text,a.body.en[i].text);}}}
});
test('new locales have distinct safe routes and are searchable',()=>{
 for(const l of ['ar','id','ms']){assert.equal(route(l,'library','/MARSAM/'),`/MARSAM/${l}/library/`);const data=searchIndex(l,'/');assert.equal(data.length,sections.length+articles.length+resources.length);assert.ok(data.every(x=>x.url.startsWith('/'+l+'/')));}
 assert.equal(normalizeText('الإِرشـاد','ar'),normalizeText('الارشاد','ar'));assert.equal(normalizeText('ى','ar'),normalizeText('ي','ar'));
});
test('Arabic pages declare RTL, original citations remain LTR',()=>{
 const html=resourcePage(resources[1],'ar','/');assert.match(html,/<html lang="ar" dir="rtl"/);assert.match(html,/<p[^>]*dir="ltr"[^>]*data-citation|<p[^>]*data-citation[^>]*dir="ltr"/);assert.match(html,/<bdi[^>]*>Bahasa Indonesia<\/bdi>/);
 for(const l of ['id','ms'])assert.match(home(l,'/'),new RegExp(`<html lang="${l}" dir="ltr"`));
});
test('content updates without translations fail closed',()=>assert.throws(()=>L('Yeni doğrulanmamış metin','Untranslated new source sentence','Text','文本','Текст'),/translation/i));
test('all metadata and source notes remain valid after extension',()=>assert.deepEqual(validateContent({locales,labels,sources,resources,sections,articles}),[]));
test('eight-language switching preserves the reading page',()=>{
 for(const l of ['ar','id','ms']){const html=dossierPage(articles[0],l,'/MARSAM/');for(const other of expected)assert.ok(html.includes(`/MARSAM/${other}/dossier/${articles[0].id}/`));}
});

test('Javanese and Sundanese remain outside the agreed academic language scope',()=>{for(const l of ['jv','su']){assert.ok(!locales.includes(l));assert.throws(()=>route(l,'library'));}});
