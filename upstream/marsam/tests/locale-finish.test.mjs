import test from 'node:test';
import assert from 'node:assert/strict';
import {statSync, readFileSync} from 'node:fs';
import {strategicResources} from '../src/roadmap/platform.mjs';
import {renderCampusHome} from '../src/campus.mjs';
import {locales} from '../src/i18n.mjs';

const nonEnglish = locales.filter(l => !['tr', 'en'].includes(l));

test('strategic resources are localized in every language instead of falling back to English', () => {
  for (const r of strategicResources) {
    for (const field of ['title', 'summary']) {
      for (const l of nonEnglish) {
        assert.ok(r[field][l]?.trim(), `${r.id}.${field}.${l} present`);
        assert.notEqual(r[field][l], r[field].en, `${r.id}.${field}.${l} is not the English text`);
      }
    }
  }
});

test('strategic resource titles are short catalogue labels, not full article titles', () => {
  for (const r of strategicResources) for (const l of locales) assert.ok(r.title[l].length <= 110, `${r.id}.${l}: ${r.title[l].length}`);
});

test('every page head carries a social preview image with dimensions', () => {
  for (const base of ['/', '/MARSAM/']) for (const l of locales) {
    const html = renderCampusHome(l, base);
    assert.match(html, /<meta property="og:image" content="[^"]*assets\/og-card\.jpg">/, `${base}${l} og:image`);
    assert.match(html, /<meta property="og:image:width" content="1200">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.match(html, /<meta property="og:image:type" content="image\/jpeg">/);
    assert.match(html, /<meta property="og:locale" content="[a-z]{2}_[A-Z]{2}">/, `${base}${l} og:locale`);
    assert.match(html, /<meta property="og:title" content="MARSAM · [^"]{10,}">/, `${base}${l} home og:title carries the full centre name`);
  }
});

test('shared English data fields on observatory and construct pages have a Turkish rendering', async () => {
  const {instruments, constructs} = await import('../src/roadmap/platform.mjs');
  const trData = JSON.parse(readFileSync(new URL('../src/roadmap/tr-data.json', import.meta.url), 'utf8'));
  const values = new Set();
  for (const x of instruments) [x.status, x.construct, x.invariance, x.rights, ...x.properties].forEach(v => values.add(v));
  for (const x of constructs) values.add(x.boundary);
  const missing = [...values].filter(v => v && !trData[v]);
  assert.deepEqual(missing, [], 'add these values to src/roadmap/tr-data.json');
});

test('the ebru dark surface keeps light text at AAA contrast', () => {
  const {color} = JSON.parse(readFileSync(new URL('../src/tokens.json', import.meta.url), 'utf8'));
  const lum = hex => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  assert.ok(ratio(color['text-on-dark'], color.footer) >= 7, `footer ${color.footer} on ${color['text-on-dark']}`);
  const css = readFileSync(new URL('../public/site.css', import.meta.url), 'utf8');
  const glow = css.match(/\.site-footer\{background:radial-gradient\(ellipse at 12% 0%,(#[0-9a-f]{6})/)[1];
  const texts = [css.match(/\.site-footer\{[^}]*?color:(#[0-9a-f]{6})/)[1], css.match(/\.site-footer a\{color:(#[0-9a-f]{6})/)[1]];
  for (const t of texts) assert.ok(ratio(t, glow) >= 4.5, `footer text ${t} on glow ${glow}: ${ratio(t, glow).toFixed(2)}`);
});

test('the social preview card stays under the size messengers will fetch', () => {
  const size = statSync(new URL('../public/assets/og-card.jpg', import.meta.url)).size;
  assert.ok(size < 300_000, `og-card.jpg ${size} bytes`);
});

test('visible copy no longer announces a planned, preview or establishment-stage centre', () => {
  const banned = /Kuruluş hazırlığı|kurulması planlanan|planlanan merkez|Dijital önizleme|Geliştirme önizlemesi|web taslağı|henüz resmî olarak kurulmuş|Digital preview|Development preview|planned within|not yet a formally established|In Vorbereitung|geplant|Vorschau|筹建|预览|Подготовка к созданию|планируем|Предварительная версия|قيد التأسيس|مزمع|معاينة|Dalam persiapan|direncanakan|Pratinjau|Dalam persediaan|dirancang|Pratonton/i;
  for (const base of ['/', '/MARSAM/']) for (const l of locales) {
    const visible = renderCampusHome(l, base).replace(/<script[\s\S]*?<\/script>|<[^>]+>/g, ' ');
    assert.doesNotMatch(visible, banned, `${base}${l}`);
  }
});
