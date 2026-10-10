import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {searchRecords,normalizedIdentifier} from '../public/search-core.js';
import {searchIndex,sectionPage} from '../src/site.mjs';
import {sourceById} from '../src/catalogue.mjs';
import {knowledgeLedger,translationLedger} from '../src/provenance.mjs';
import {tokenCSS} from '../scripts/styles.mjs';

test('browser and build share the retrieval contract without an old cache version',()=>{
 const js=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
 assert.ok(js.includes('searchRecords'));assert.ok(!js.includes('?v=0.4.0'));assert.ok(js.includes('version'));
});
test('query preservation and accessible list controls are explicitly implemented',()=>{
 const app=readFileSync(new URL('../public/app.js',import.meta.url),'utf8'),bib=readFileSync(new URL('../public/heritage.js',import.meta.url),'utf8');
 assert.ok(app.includes('syncLocaleLinks'));assert.ok(bib.includes('data-view-switch'));assert.ok(bib.includes('aria-pressed'));
});
test('invalid local contribution forms have an accessible error summary anchor',()=>{
 const html=sectionPage('contribute','tr','/MARSAM/');assert.ok(html.includes('data-error-summary'));assert.ok(html.includes('tabindex="-1"'));
});
test('each work preserves source identity, uses scoped contributor mentions and has separate review states',()=>{
 const ledger=knowledgeLedger();assert.ok(ledger.works.length>0);
 for(const w of ledger.works){assert.equal(w.originalTitle,sourceById[w.sourceId].title);assert.equal(w.review.scientific.approved,false);assert.equal(w.review.currency.retractionReviewComplete,false);assert.equal(w.review.institutional.formalApprovalVerified,false);assert.ok(w.contributorMentions.every(m=>m.externalPersonId===null));}
 assert.deepEqual(ledger.relationships,[]);
});
test('translation records are tied to original and localized text without human approval',()=>{
 const records=translationLedger();assert.ok(records.length>200);assert.ok(records.every(r=>r.sourceHash.length===64&&r.targetHash.length===64&&r.humanReviewed===false));
});
test('identifier retrieval is exact and stable across all eight locales',()=>{
 for(const l of ['tr','en','de','zh','ru','ar','id','ms']){
  const index=searchIndex(l,'/MARSAM/');
  assert.equal(searchRecords(index,'DOI: 10.37898/spiritualpc.1793082',l)[0]?.id,'sipas');
  assert.equal(searchRecords(index,'ISBN 978-625-8804-58-4',l)[0]?.id,'trauma-spirituality');
  assert.equal(searchRecords(index,'10.99999/not-a-source',l).length,0);
 }
 assert.equal(normalizedIdentifier('ISBN-13: 978-625-8804-58-4'),'9786258804584');
});
test('semantic foreground roles meet their intended contrast combinations',()=>{
 const tokens=JSON.parse(readFileSync(new URL('../src/tokens.json',import.meta.url),'utf8')).color;
 const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
 const ratio=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 for(const [fg,bg]of [['text-primary','surface-reading'],['text-secondary','surface-page'],['status-text','status-surface'],['text-on-dark','footer']])assert.ok(ratio(tokens[fg],tokens[bg])>=4.5,fg+' '+bg);
 assert.ok(ratio(tokens['border-control'],tokens['surface-reading'])>=3);
 assert.ok(tokenCSS().includes('--text-primary'));
});
