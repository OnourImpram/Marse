// Re-pin edition hashes after an intentional copy change, so the freshness gates keep guarding the new text.
// Only stale editions are re-pinned; humanReviewed and scientificApproval stay false (re-pinning is not review).
// Usage: node scripts/rebind-editions.mjs [--write]   (dry run lists what would change)
import fs from 'node:fs';
import {digest} from '../src/messages.mjs';
import {locales} from '../src/languages.mjs';
import {evidence, narrativeBindings, scholarlyThemes, scholarlyCopy, narrativeMaterial} from '../src/scholarship.mjs';
import {evidenceDraftBindings, editionDraftMaterial} from '../src/evidence-continuity.mjs';

const write = process.argv.includes('--write');
const changes = [];
for (const record of narrativeBindings.records) for (const l of locales) {
  const edition = record.editions?.[l]; const material = narrativeMaterial(record.id, l, scholarlyThemes, scholarlyCopy);
  if (edition && material && edition.editionHash !== digest(material)) {
    changes.push(`narrative ${record.id}/${l}`); edition.editionHash = digest(material);
  }
}
for (const pin of evidenceDraftBindings.records) {
  const record = evidence.find(r => r.id === pin.id);
  if (!record) continue;
  for (const l of locales) {
    const material = editionDraftMaterial(record, l);
    if (material && pin.editionHashes?.[l] !== digest(material)) { changes.push(`evidence ${pin.id}/${l}`); pin.editionHashes[l] = digest(material); }
  }
}
// Source identity is never re-pinned implicitly. --rebind-source=<id> re-pins exactly that source after an
// owner-approved change to its own record (record the approval in DELIVERY_STATUS.md).
const sourceArg = process.argv.find(a => a.startsWith('--rebind-source='));
if (sourceArg) {
  const id = sourceArg.split('=')[1];
  const {sources} = await import('../src/content.mjs');
  const {sourceDraftMaterial} = await import('../src/evidence-continuity.mjs');
  const source = sources.find(s => s.id === id);
  if (!source) { console.error(`unknown source ${id}`); process.exit(1); }
  for (const record of narrativeBindings.records) if (record.sourceHashes?.[id] && record.sourceHashes[id] !== digest(source)) {
    changes.push(`source ${record.id}/${id}`); record.sourceHashes[id] = digest(source);
  }
  for (const pin of evidenceDraftBindings.records) {
    const record = evidence.find(r => r.id === pin.id);
    if (record?.sourceId === id && pin.sourceHash !== digest(sourceDraftMaterial(record))) {
      changes.push(`evidence-source ${pin.id}`); pin.sourceHash = digest(sourceDraftMaterial(record));
    }
  }
}
console.log(changes.length ? changes.join('\n') : 'no stale editions');
if (write && changes.length) {
  fs.writeFileSync(new URL('../src/narrative-bindings.json', import.meta.url), JSON.stringify(narrativeBindings, null, 2) + '\n');
  fs.writeFileSync(new URL('../src/evidence-bindings.json', import.meta.url), JSON.stringify(evidenceDraftBindings, null, 2) + '\n');
  console.log('written');
}
