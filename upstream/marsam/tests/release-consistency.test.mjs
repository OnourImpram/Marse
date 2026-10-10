import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {RELEASE} from '../src/release.mjs';

test('package and public release metadata agree',async()=>{
 const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
 assert.equal(RELEASE.version,pkg.version);
 assert.match(RELEASE.id,new RegExp(pkg.version.replaceAll('.','\\.')+'$'));
 assert.equal(RELEASE.status,'institutional-review');
 assert.equal(RELEASE.formalInstitutionalApproval,false);
 assert.equal(RELEASE.scientificApproval,false);
 assert.equal(RELEASE.humanLanguageApproval,false);
});
