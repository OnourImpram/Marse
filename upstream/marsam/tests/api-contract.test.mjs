import test from 'node:test';
import assert from 'node:assert/strict';
import {sources} from '../src/catalogue.mjs';
import {RELEASE} from '../src/release.mjs';

test('scholarly source API inputs expose correction state without rewriting claims',()=>{
 const corrected=sources.find(s=>s.id==='s-sexual-minority-rs-meta');
 assert.equal(corrected.correctionState,'correction');
 assert.equal(corrected.correctionDoi,'10.1037/bul0000339');
 assert.equal(RELEASE.version,'0.12.0');
});
