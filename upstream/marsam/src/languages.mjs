/** Locale identities are languages, not flags or assumed user nationalities. */
export const baseLocales = ['tr','en','de','zh','ru'];
export const extraLocales = ['ar','id','ms'];
export const locales = [...baseLocales, ...extraLocales];
export const localeNames = {tr:'Türkçe',en:'English',de:'Deutsch',zh:'简体中文',ru:'Русский',ar:'العربية',id:'Bahasa Indonesia',ms:'Bahasa Melayu'};
export const langTags = {tr:'tr',en:'en',de:'de',zh:'zh-Hans',ru:'ru',ar:'ar',id:'id',ms:'ms'};
export const direction = locale => locale === 'ar' ? 'rtl' : 'ltr';
