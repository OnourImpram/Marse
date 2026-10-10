import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
const root = new URL('../', import.meta.url);
const assetNames = ['iznik-corner-a.svg', 'iznik-corner-b.svg'];
const css = () => readFileSync(new URL('public/site.css', root), 'utf8');

test('two original scalable Iznik compositions replace generic repeating page decoration', () => {
  let size = 0;
  for (const name of assetNames) {
    const path = new URL('public/assets/cini/' + name, root);
    assert.ok(existsSync(path), `Missing original cini composition ${name}`);
    const svg = readFileSync(path, 'utf8');
    assert.match(svg, /viewBox="0 0 600 800"/);
    assert.match(svg, /data-origin="marsam-original"/);
    assert.ok((svg.match(/<path\b/g) || []).length > 12, 'A composed botanical drawing, not a generic star');
    assert.ok(!/<(?:script|image|foreignObject|filter|animate|text)\b|on\w+=|(?:href|src)="https?:/i.test(svg), 'Static local vector shapes only');
    size += gzipSync(svg).length;
  }
  assert.ok(size <= 8192, `Compressed artwork ${size} exceeds the 8 KiB budget`);
});

test('page and hero margins use sparse non-repeating cini rather than a tiled wallpaper', () => {
  const source = css();
  const page = source.match(/body::before\{(content:[^}]+)\}/)?.[1] || '';
  const hero = source.match(/\.editorial-hero::before\{([^}]+)\}/)?.[1] || '';
  for (const [name, rule] of [['page', page], ['hero', hero]]) {
    assert.match(rule, /assets\/cini\/iznik-corner-/, `${name} must use the approved artwork`);
    assert.match(rule, /background-repeat:no-repeat/);
    assert.match(rule, /pointer-events:none/);
    assert.match(rule, /mask-image:/);
    assert.ok(!rule.includes('geometry.svg'), 'No double-stacked old wallpaper');
  }
  assert.match(source, /--cini-gutter:/);
  assert.match(source, /\.editorial-hero-copy::before/);
});

test('cini has explicit mobile, print and forced-colour fallbacks and no movement or glow', () => {
  const source = css();
  const start = source.indexOf('/* MARSAM Iznik cini');
  const end = source.indexOf('/* End MARSAM Iznik cini */', start);
  assert.ok(start >= 0 && end > start, 'Bounded cini presentation rules required');
  const rules = source.slice(start, end);
  assert.match(rules, /max-width:650px/);
  assert.match(rules, /forced-colors:active/);
  assert.match(rules, /@media print/);
  assert.ok(!/filter:|backdrop-filter:|mix-blend-mode:|animation:|transition:|position:fixed|@keyframes|text-shadow:/i.test(rules));
  assert.match(rules, /overflow:clip/);
});

test('unsupported masks omit ornament',()=>{assert.ok(css().includes('@supports not (mask-image:linear-gradient(#000,transparent)){body::before,.editorial-hero::before,.editorial-hero-copy::before{display:none!important}}'));});

// Owner refinement. Increase visibility of existing artwork, not its density.
test('existing cini remains a subordinate background after owner approval', () => {
  const source = css();
  for (const selector of ['body::before', '.editorial-hero::before', '.editorial-hero-copy::before']) {
    const start = source.indexOf(selector + '{', source.indexOf('/* MARSAM Iznik cini'));
    const rule = source.slice(start, source.indexOf('}', start));
    const opacity = Number(rule.match(/opacity:([.\d]+)/)?.[1]);
    assert.ok(opacity > 0 && opacity <= .12, `${selector} must stay subdued, got ${opacity}`);
    assert.match(rule, /background-repeat:no-repeat/);
    assert.match(rule, /pointer-events:none/);
  }
});
test('stronger cini still fades completely before the reading container', () => {
  const source = css();
  const rules = source.slice(source.indexOf('/* MARSAM Iznik cini'));
  assert.match(rules, /transparent calc\(var\(--cini-gutter\) - 10px\)/);
  assert.match(rules, /transparent calc\(var\(--cini-gutter\) - 8px\)/);
  assert.ok(!rules.includes('background-repeat:repeat'));
  assert.ok(!/filter:|backdrop-filter:|mix-blend-mode:|animation:|text-shadow:/.test(rules));
});
