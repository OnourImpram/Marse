import {RELEASE} from '../src/release.mjs';
import {books as recordsBooks,recentPapers} from '../src/publications-data.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {sources,resources} from '../src/catalogue.mjs';
import {locales} from '../src/languages.mjs';
import {labels} from '../src/catalogue.mjs';
import {renderCampusHome,decorate,campusRenderers} from '../src/campus.mjs';
import {exportRIS,exportBib} from '../src/lib.mjs';

test('curated publication programme matches the canonical book and paper collection without duplicate sources',()=>{
 const books=sources.filter(s=>s.bibliography?.type==='book');
 const papers=sources.filter(s=>s.bibliography?.collection==='recent-research');
 assert.equal(books.length,recordsBooks.length);assert.equal(papers.length,recentPapers.length);
 assert.equal(new Set(books.map(s=>s.bibliography.isbn)).size,books.length);
 assert.equal(new Set(papers.map(s=>s.bibliography.doi)).size,papers.length);
 for(const s of [...books,...papers]){
  assert.ok(s.bibliography.date<=RELEASE.date);assert.ok(s.bibliography.identityVerified);
  assert.ok(s.bibliography.authors.length||s.bibliography.editors.length);
  assert.equal(s.status,'PARTIALLY_VERIFIED');
  const r=resources.find(r=>r.sources.includes(s.id));assert.ok(r);
  for(const l of locales){assert.ok(r.title[l]);assert.ok(r.summary[l]);assert.ok(s.bibliography.note[l]);}
 }
 assert.equal(new Set(resources.map(r=>r.id)).size,resources.length);
});
test('book editions, contributor roles and September 2026 research remain distinct',()=>{
 const get=id=>sources.find(s=>s.id===id)?.bibliography;
 assert.equal(get('s-trauma-spirituality')?.date,'2026-09');
 assert.equal(get('s-spiritual-counselling-book')?.edition,'3');
 assert.equal(get('s-spiritual-burnout')?.date,'2026-09-21');
 assert.deepEqual(get('s-sipas')?.authors,['Halil Eksi','Havvanur Akyol','Neslihan Aydın','Fatma Betül Karalı','Mehmet Özalp','M. Furkan Tunç','Ebru Talibe Turgut']);
 assert.deepEqual(get('s-cbt-spiritual')?.authors,['Tuğba Turgut','Halil Ekşi']);
 assert.deepEqual(get('s-group-counselling')?.editors,['Halil Ekşi','Osman Hatun']);
});
test('new books and papers have correct portable citations',()=>{
 const book=sources.find(s=>s.id==='s-trauma-spirituality');assert.ok(book);
 assert.match(exportRIS(book),/TY  - BOOK/);assert.match(exportRIS(book),/ED  - Halil Ekşi/);assert.match(exportRIS(book),/SN  - 978-625-8804-58-4/);
 assert.match(exportBib(book),/@book\{/);assert.match(exportBib(book),/editor = \{Halil Ekşi\}/);
 const paper=sources.find(s=>s.id==='s-sipas');assert.match(exportRIS(paper),/DO  - 10.37898\/spiritualpc.1793082/);
 assert.match(exportBib(paper),/@article\{/);assert.ok(exportBib(paper).includes('Karalı'));
});
test('heritage design and useful publication pages are implemented in all eight languages',()=>{
 for(const l of locales){const h=decorate(renderCampusHome(l,'/MARSAM/'),l,'','/MARSAM/');
  assert.ok(h.includes('heritage-hero'));assert.ok(h.includes('portal-continuous-v1.svg'));
  assert.ok(h.includes('book-gallery'));assert.ok(h.includes('recent-research'));
  assert.ok(h.includes(`/${l}/books/`));assert.ok(h.includes(`/${l}/publications/`));
  assert.ok(h.includes(`data-release="${RELEASE.version}"`));
  assert.equal(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g,''),labels[l].brand);
  assert.ok(!/institution-grid|hero-question|kimin tercihi/i.test(h));
  for(const id of ['books','publications'])assert.ok(campusRenderers[id](l,'/MARSAM/').includes('data-bibliography'));
 }
});
test('decoration remains locally served, optional to reading and motion safe',()=>{
 assert.ok(existsSync(new URL('../public/site.css',import.meta.url)));
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 for(const text of ['prefers-reduced-motion','@media print','focus-visible','[dir="rtl"]'])assert.ok(css.includes(text));
 assert.ok(!/https?:|@import/.test(css));
});
