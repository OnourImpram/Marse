// Index every localized copy unit in src/ as {file, kind, values:{tr..ms}} for review tooling.
// Usage: node scripts/copy-units.mjs > units.json
// Kinds: C (8 literals), L / array (5 literals + locale packs keyed by English), all (8 literals), json ({tr..ms}).
import fs from 'node:fs';
import path from 'node:path';
import {languagePacks} from '../src/translate.mjs';

const SRC = new URL('../src/', import.meta.url);
const LOCALES = ['tr','en','de','zh','ru','ar','id','ms'];
const LIT = String.raw`'((?:[^'\\]|\\.)*)'`;
const SEP = String.raw`\s*,\s*`;
const unesc = s => s.replace(/\\(.)/g, '$1');
const lits = n => new RegExp(String.raw`(?:\bC|\ball)\(\s*` + Array(n).fill(LIT).join(SEP) + String.raw`\s*\)`, 'g');
const five = String.raw`(?:\bL\(|\[)\s*` + Array(5).fill(LIT).join(SEP) + String.raw`\s*[\])]`;
const extra = en => Object.fromEntries(['ar','id','ms'].map(l => [l, languagePacks[l].translations[en] ?? null]));
const units = [];
const ROOT = SRC.pathname.replace(/^\/(\w:)/, '$1');
for (const name of fs.readdirSync(ROOT, {recursive: true}).map(String).filter(n => !n.startsWith('locales'))) {
  const file = path.join(ROOT, name);
  if (!fs.statSync(file).isFile()) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (name.endsWith('.mjs')) {
    for (const m of text.matchAll(lits(8))) units.push({file: name, kind: 'C', values: Object.fromEntries(LOCALES.map((l, i) => [l, unesc(m[i + 1])]))});
    for (const m of text.matchAll(new RegExp(five, 'g'))) {
      const v = Object.fromEntries(LOCALES.slice(0, 5).map((l, i) => [l, unesc(m[i + 1])]));
      units.push({file: name, kind: 'L', values: {...v, ...extra(v.en)}});
    }
  } else if (name.endsWith('.json') && !name.startsWith('locale')) {
    const walk = (node, at) => {
      if (Array.isArray(node)) return node.forEach((x, i) => walk(x, `${at}[${i}]`));
      if (!node || typeof node !== 'object') return;
      if (typeof node.tr === 'string' && typeof node.en === 'string') units.push({file: name, kind: 'json', at, values: Object.fromEntries(LOCALES.map(l => [l, node[l] ?? null]))});
      for (const [k, v] of Object.entries(node)) walk(v, `${at}.${k}`);
    };
    walk(JSON.parse(text), '$');
  }
}
process.stdout.write(JSON.stringify(units, null, 1));
