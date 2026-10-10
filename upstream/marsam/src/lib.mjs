import {normalizeLoose} from '../public/search-core.js';
import {locales} from './languages.mjs';
/** Shared, side-effect-free contracts. All editorial text is escaped at render time. */
export function escapeHTML(value='') { return String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export function safeURL(value) { try { const u=new URL(value); return u.protocol==='https:'&&!u.username&&!u.password ? u.href : null; } catch { return null; } }
export function normalizeText(value='',locale='tr') {return normalizeLoose(value,locale);}
export function normalizeBase(base='/') { if(!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base)) throw new Error('BASE_PATH must be / or a slash-delimited safe path, e.g. /MARSAM/'); return base; }
export function route(locale,path='',base='/') { if(!locales.includes(locale))throw new Error('Unsupported locale'); if(path&&!/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/.test(path))throw new Error('Invalid content path');return `${normalizeBase(base)}${locale}/${path?path+'/':''}`; }
export function canPublish(record,expectedHash=null) { const a=record?.approval;return record?.review==='approved'&&['owned','permission-recorded','link-only'].includes(record?.rights)&&record?.translation==='approved'&&typeof a?.by==='string'&&!!a.by.trim()&&/^\d{4}-\d{2}-\d{2}$/.test(a?.date||'')&&/^[a-f0-9]{64}$/.test(a?.hash||'')&&(!expectedHash||a.hash===expectedHash); }
export function validateContent({locales,labels,sources,resources,sections,articles}) {
 const errors=[];const ids=new Set();
 for(const l of locales)if(!labels[l])errors.push(`missing label dictionary ${l}`);
 if(new Set(sources.map(x=>x.id)).size!==sources.length)errors.push('duplicate source id'); const sourceIds=new Set(sources.map(s=>s.id));const sectionIds=new Set(sections.map(s=>s.id));
 const translated=(obj,where)=>{for(const l of locales)if(typeof obj?.[l]!=='string'||!obj[l].trim())errors.push(`${where}: missing ${l}`);};
 for(const [l,dict]of Object.entries(labels))for(const[k,v]of Object.entries(dict))if(typeof v!=='string'||!v.trim())errors.push(`label ${l}.${k}`);
 for(const s of sources){if(!safeURL(s.url))errors.push(`source ${s.id}: unsafe URL`);if(!s.citation||!s.access||!s.limit||!s.checked)errors.push(`source ${s.id}: missing provenance`);if(!['V0','V1','V2','V3'].includes(s.level))errors.push(`source ${s.id}: invalid depth`);if(!['VERIFIED','PARTIALLY_VERIFIED','FAILED','UNVERIFIABLE'].includes(s.status))errors.push(`source ${s.id}: invalid status`);}
 for(const item of [...resources,...articles]){if(ids.has(item.id))errors.push(`duplicate ${item.id}`);ids.add(item.id);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id))errors.push(`bad id ${item.id}`);translated(item.title,`${item.id}.title`);translated(item.summary,`${item.id}.summary`);for(const sid of item.sources||[])if(!sourceIds.has(sid))errors.push(`${item.id}: unknown source ${sid}`);for(const cat of item.sections||[])if(!sectionIds.has(cat))errors.push(`${item.id}: unknown section ${cat}`);}
 for(const item of articles){if(!item.sources?.length)errors.push(`${item.id}: no sources`);for(const l of locales){const b=item.body?.[l];if(!Array.isArray(b)||b.length<3)errors.push(`${item.id}: missing body ${l}`);else for(const x of b)if(!x.heading||!x.text)errors.push(`${item.id}: incomplete section ${l}`);}translated(item.limit,`${item.id}.limit`);translated(item.prompt,`${item.id}.prompt`);}
 for(const s of sections){translated(s.title,`${s.id}.title`);translated(s.summary,`${s.id}.summary`);}
 return errors;
}
export function readingMinutes(text,locale){const n=locale==='zh'?String(text).replace(/\s/g,'').length/350:String(text).split(/\s+/).length/180;return Math.max(2,Math.ceil(n));}
function citeValue(value=''){return String(value).replace(/[\r\n]/g,' ').trim();}
export function exportRIS(source){
 const b=source.bibliography;const rows=[['TY',b?.type==='book'?'BOOK':b?.type==='article'||source.kind==='study'?'JOUR':'GEN'],['TI',source.title],['PY',source.year||''],['UR',source.url]];
 if(b){for(const author of b.authors||[])rows.push(['AU',author]);for(const editor of b.editors||[])rows.push(['ED',editor]);
  for(const[k,v]of [['DO',b.doi],['SN',b.isbn],['PB',b.publisher],['T2',b.journal],['VL',b.volume],['IS',b.issue],['ET',b.edition],['DA',b.date]])if(v)rows.push([k,v]);
  if(b.type==='article'&&b.pages){const pages=b.pages.split(/[–-]/);rows.push(['SP',pages[0]]);if(pages[1])rows.push(['EP',pages[1]]);}
  if(b.type==='book'&&b.pages)rows.push(['N1',b.pages+' pages']);
 }
 rows.push(['N1',source.citation],['ER','']);return rows.map(([k,v])=>{const value=citeValue(v);return value?k+'  - '+value:k+'  -';}).join('\n')+'\n';
}
export function exportBib(source){
 const clean=s=>citeValue(s).replace(/[{}]/g,'').replace(/\\/g,'');const b=source.bibliography;const fields={title:source.title,year:source.year||'',url:source.url};
 if(b){if(b.authors?.length)fields.author=b.authors.join(' and ');if(b.editors?.length)fields.editor=b.editors.join(' and ');for(const key of ['doi','isbn','publisher','journal','volume','edition'])if(b[key])fields[key]=b[key];if(b.issue)fields.number=b.issue;if(b.pages&&b.type==='article')fields.pages=b.pages.replace(/[–-]/g,'--');}
 fields.note=source.citation;return '@'+(b?.type==='book'?'book':b?.type==='article'?'article':'misc')+'{'+source.id.replace(/-/g,'')+',\n'+Object.entries(fields).map(([k,v])=>'  '+k+' = {'+clean(v)+'}').join(',\n')+'\n}\n';
}
