import '../src/campus.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {locales,langTags} from '../src/i18n.mjs';
import {articles} from '../src/catalogue.mjs';
import {resources,sources,sections} from '../src/catalogue.mjs';
import {learningPaths} from '../src/catalogue.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dist=resolve(root,'dist');
const manifest=JSON.parse(await readFile(resolve(dist,'build-manifest.json'),'utf8'));
const base=manifest.base;
const htmlFor=async path=>readFile(resolve(dist,path.slice(1),'index.html'),'utf8');
const pages=await Promise.all(manifest.paths.map(async path=>({path,html:await htmlFor(path)})));
test('exact route parity with no fabricated content counts',()=>{assert.equal(manifest.pages,(1+sections.length+articles.length+resources.length+learningPaths.length)*locales.length+1);assert.equal(manifest.sources,sources.length);assert.equal(manifest.contentRoutes,manifest.pages-1);});
test('all localized HTML has correct lang, navigation, single h1 and draft robots',()=>{for(const{path,html}of pages){const l=path.split('/')[1];if(!locales.includes(l))continue;assert.ok(html.includes(`lang="${langTags[l]}"`),path);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path);assert.ok(html.includes('noindex,nofollow'));assert.ok(html.includes('id="main"'));for(const other of locales)assert.ok(html.includes(`hreflang="${langTags[other]}"`));assert.ok(!html.includes('undefined'),path);}});
test('every generated internal link, asset, download and fragment resolves',async()=>{const missing=[];let checked=0;for(const{path,html}of pages){for(const m of html.matchAll(/(?:href|src)="([^"\s]+)"/g)){const value=m[1].replaceAll('&amp;','&');if(/^https:\/\//.test(value))continue;if(!value.startsWith('/')&&!value.startsWith('#')){missing.push([path,value]);continue;}const u=new URL(value,'https://preview.invalid'+base+path.slice(1));if(!u.pathname.startsWith(base)){missing.push([path,value,'base']);continue;}let target=resolve(dist,u.pathname.slice(base.length));try{const s=await stat(target);if(s.isDirectory())target=resolve(target,'index.html');await stat(target);if(u.hash&&target.endsWith('.html')){const destination=await readFile(target,'utf8');if(!destination.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`))missing.push([path,value,'fragment']);}checked++;}catch{missing.push([path,value]);}}}assert.deepEqual(missing,[]);assert.ok(checked>1000);});
test('localized content has no internal placeholders or chat citation tokens',()=>{for(const{path,html}of pages){for(const token of ['TODO','Lorem ipsum','','turn0file','[SOURCE','{{'])assert.ok(!html.includes(token),`${path}: ${token}`);}});
test('source records have real metadata and interoperable citation representations',async()=>{for(const s of sources){
 for(const ext of ['ris','bib']){const text=await readFile(resolve(dist,`citations/${s.id}.${ext}`),'utf8');assert.ok(text.includes(s.title.replace(/[{}]/g,'')),s.id);assert.ok(text.includes(s.url));}
 const csl=JSON.parse(await readFile(resolve(dist,`citations/${s.id}.json`),'utf8'));assert.equal(csl.id,s.id);assert.equal(csl.title,s.title);
 const jsonld=JSON.parse(await readFile(resolve(dist,`metadata/${s.id}.jsonld`),'utf8'));assert.equal(jsonld.name,s.title);assert.equal(jsonld.url,s.url);
}});
test('scholarly API exposes release identity review ledger and conservative identity relations',async()=>{
 const release=JSON.parse(await readFile(resolve(dist,'data/v1/release.json'),'utf8'));assert.equal(release.version,manifest.version);assert.equal(release.scientificApproval,false);
 const people=JSON.parse(await readFile(resolve(dist,'data/v1/people.json'),'utf8'));assert.ok(people.records.length>0);assert.ok(people.records.every(x=>x.identityResolution==='source-scoped-mention'&&x.externalPersonId===null));
 const organizations=JSON.parse(await readFile(resolve(dist,'data/v1/organizations.json'),'utf8'));assert.deepEqual(organizations.records,[]);
 const relations=JSON.parse(await readFile(resolve(dist,'data/v1/relations.json'),'utf8'));assert.ok(relations.records.every(x=>x.institutionalMembershipClaim===false));
 const reviews=JSON.parse(await readFile(resolve(dist,'data/v1/review-events.json'),'utf8'));assert.equal(reviews.appendOnly,true);assert.ok(reviews.records.length>=3);
});
test('all locale search indexes cover sections, dossiers and records without duplicates',async()=>{for(const l of locales){const data=JSON.parse(await readFile(resolve(dist,`data/search-${l}.json`),'utf8'));assert.equal(data.length,sections.length+articles.length+resources.length);assert.equal(new Set(data.map(x=>x.id)).size,data.length);assert.ok(data.every(x=>x.url.startsWith(`${base}${l}/`)));}});
test('preview contains no external embeds, fonts, trackers or submission endpoints',()=>{for(const{path,html}of pages){assert.ok(!/<(?:iframe|embed|object)\b/.test(html),path);assert.ok(!/<script[^>]+src="https?:\/\//.test(html),path);for(const link of html.matchAll(/<link\b[^>]*>/g)){if(/rel="(?:stylesheet|preload|modulepreload|prefetch)"/.test(link[0]))assert.ok(!/href="https?:\/\//.test(link[0]),path);}assert.ok(!/method="post"/i.test(html),path);}const forms=pages.filter(x=>x.path.endsWith('/contribute/'));assert.equal(forms.length,locales.length);for(const{html}of forms){assert.ok(html.includes('data-draft-form'));assert.ok(html.includes('data-requires-js hidden'));assert.ok(!/name="(?:email|note|message|name)"/.test(html));}});
test('non-publication defaults persist, publication flag fails closed',async()=>{assert.equal(manifest.publicationAuthorized,false);assert.equal(await readFile(resolve(dist,'robots.txt'),'utf8'),'User-agent: *\nDisallow: /\n');const result=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,env:{...process.env,PUBLISH:'true'},encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/PUBLICATION BLOCKED/);assert.equal(JSON.parse(await readFile(resolve(dist,'build-manifest.json'),'utf8')).mode,'preview');});
test('bibliography and IAPOS inspection ledger do not claim independent or full review',async()=>{const ledger=JSON.parse(await readFile(resolve(dist,'data/source-ledger.json'),'utf8'));assert.equal(ledger.review,'SEQUENTIAL_ROLE_REVIEW');assert.ok(ledger.sources.every(s=>s.level==='V1'&&s.status==='PARTIALLY_VERIFIED'));});

test('public pages contain no benchmark directory or fabricated partner relationship',async()=>{
 for(const{path,html}of pages){assert.ok(!html.includes('institution-grid'),path);assert.ok(!html.includes('data-partner='),path);}
 const ledger=JSON.parse(await readFile(resolve(dist,'data/knowledge-ledger.json'),'utf8'));assert.deepEqual(ledger.relationships,[]);
});
test('review records and emitted design use exact source-bound metadata',async()=>{
 const translations=JSON.parse(await readFile(resolve(dist,'data/translation-records.json'),'utf8'));
 assert.ok(translations.records.every(r=>r.humanReviewed===false&&r.sourceHash.length===64&&r.targetHash.length===64));
 for(const{html}of pages)assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1);
});
