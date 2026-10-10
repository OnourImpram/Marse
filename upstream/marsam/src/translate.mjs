import arabic from './locales/ar.json' with {type:'json'};
import indonesian from './locales/id.json' with {type:'json'};
import malay from './locales/ms.json' with {type:'json'};
export const languagePacks = {ar:arabic,id:indonesian,ms:malay};
/** Exact source strings bind translations. Changed source text requires new review. */
export function translate(source,locale) {
 const pack=languagePacks[locale];
 const value=pack?.translations[source];
 if(typeof value!=='string'||!value.trim())throw new Error(`Missing translation (${locale}): ${source}`);
 return value;
}
