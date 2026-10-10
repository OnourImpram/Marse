/** Shared static/browser retrieval. Display strings are never normalized in place. */
const supported = new Set(['tr','en','de','zh','ru','ar','id','ms']);
const tags = {zh:'zh-Hans'};
const language = locale => supported.has(locale) ? (tags[locale] || locale) : 'en';
export function normalizeExact(value = '', locale = 'tr') {
  return String(value).normalize('NFC').toLocaleLowerCase(language(locale)).replace(/\s+/gu,' ').trim();
}
export function normalizeLoose(value = '', locale = 'tr') {
  let text=normalizeExact(value,locale);
  // Tolerant Latin-script matching does not erase Cyrillic distinctions such as и / й.
  text=text.replace(/([\p{Script=Latin}])\p{M}*/gu, char=>char.normalize('NFD').replace(/\p{M}/gu,''))
    .replace(/[ıİ]/g,'i').replace(/ß/g,'ss');
  if(locale==='ar')text=text.replace(/[\u0640\u064b-\u065f\u0670]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
  return text;
}
export function queryTerms(query,locale) {
  const text=normalizeLoose(query,locale);
  if(locale==='zh' && typeof Intl.Segmenter==='function') {
    return [...new Intl.Segmenter('zh-Hans',{granularity:'word'}).segment(text)].filter(x=>x.isWordLike).map(x=>x.segment);
  }
  return text.split(/\s+/u).filter(Boolean);
}
export function normalizedIdentifier(value='') {
  let text=String(value).trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').replace(/^doi\s*:?\s*/i,'');
  if(/^10\.\d{4,9}\/\S+$/i.test(text))return text.toLowerCase();
  text=text.replace(/^isbn(?:-1[03])?\s*:?\s*/i,'').replace(/[\s-]/g,'');
  return /^(?:\d{9}[\dXx]|\d{13})$/.test(text)?text.toUpperCase():null;
}
export function searchRecords(records,query,locale='en') {
  const value=String(query).trim().slice(0,160);
  if(!value)return [];
  const identifier=normalizedIdentifier(value), exact=normalizeExact(value,locale), loose=normalizeLoose(value,locale), terms=queryTerms(value,locale);
  const collator=new Intl.Collator(language(locale),{numeric:true,sensitivity:'base'});
  return records.map((record,index)=>{
    const identifiers=(record.identifiers||[]).map(normalizedIdentifier).filter(Boolean);
    if(identifier)return {record,index,score:identifiers.includes(identifier)?1000:0};
    const title=normalizeExact(record.title,locale), original=normalizeExact(record.originalTitle||'',locale);
    const raw=record.rawText || [record.title,record.summary,record.text].join(' ');
    const text=normalizeLoose(raw,locale);
    const all=terms.length>0 && terms.every(term=>text.includes(term));
    const phrase=text.includes(loose);
    const score=title===exact||original===exact?150:title.includes(exact)||original.includes(exact)?100:phrase?70:all?40:0;
    return {record,index,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||collator.compare(a.record.title,b.record.title)||a.index-b.index).map(x=>x.record);
}
