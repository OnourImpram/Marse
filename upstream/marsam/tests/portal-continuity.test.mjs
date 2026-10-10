import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderCampusHome} from '../src/campus.mjs';
import {locales} from '../src/languages.mjs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
test('portal has one self-contained image and no breakpoint-dependent repair overlay',()=>{
 const css=read('public/site.css');
 assert.match(css,/\.manuscript-frame\.approved-portal::before,\.manuscript-frame\.approved-portal::after\{content:none;display:none\}/);
 for(const l of locales) for(const b of ['/','/MARSAM/']){
  const html=renderCampusHome(l,b),picture=html.match(/<picture class="approved-portal-picture">([\s\S]*?)<\/picture>/)[1];
  assert.ok(picture.includes(b+'assets/heritage/portal-continuous-v1.svg'));
  assert.ok(!picture.includes('srcset=')&&!picture.includes('<source'));
 }
});
test('single portal embeds the exact approved source once and has no scripts or external dependency',()=>{
 const path=new URL('public/assets/heritage/portal-continuous-v1.svg',root);
 assert.ok(existsSync(path),'continuous portal asset is required');
 const svg=readFileSync(path,'utf8');
 assert.ok(Buffer.byteLength(svg)<110000);
 assert.equal((svg.match(/<image\s/g)||[]).length,1);
 assert.ok(!/<(?:script|foreignObject|animate|filter)\b/.test(svg));
 assert.ok(!/(?:href|xlink:href)="https?:/.test(svg));
 const embedded=Buffer.from(svg.match(/data:image\/webp;base64,([^"]+)/)[1],'base64');
 assert.equal(createHash('sha256').update(embedded).digest('hex'),'00a058dc8f737d73d9bfbd49ef9e541fe54defb2f8d0015efa3ad77cfaa6c66b');
 assert.match(svg,/viewBox="0 0 960 960"/);
 assert.match(svg,/L845 879 L828 867 L790 843/);
 assert.ok(!svg.includes('<rect'));
});
