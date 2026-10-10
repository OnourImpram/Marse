import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('compact search labels stay on one line across scripts',()=>{
 const css=readFileSync(new URL('../public/site.css',import.meta.url),'utf8');
 assert.ok(css.includes('.hero-search-form .button'));assert.ok(css.includes('white-space:nowrap'));assert.ok(css.includes('[lang="zh-Hans"]'));assert.ok(css.includes('[dir="rtl"]'));
});
