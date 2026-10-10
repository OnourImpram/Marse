import {locales,localeNames,langTags,direction} from './languages.mjs';
import {labels,campusCopy,resources,sections} from './catalogue.mjs';
import {message} from './messages.mjs';
import {h} from './heritage-copy.mjs';
import {RELEASE} from './release.mjs';
import {escapeHTML as e,route} from './lib.mjs';
import {icon} from './ui.mjs';

export const navigation = Object.freeze([
 {key:'explore',path:'collections',children:['collections','concepts','construct-dictionary','approaches']},
 {key:'library',path:'library',children:['library','publications','books','measures','measurement-observatory','compare']},
 {key:'learn',path:'learning',children:['learning','practice','ethics']},
 {key:'research',path:'research',children:['research','evidence','evidence-bridges','datasets','methods','participate']},
 {key:'about',path:'about',children:['about','governance','editorial','contribute']}
]);
const json=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const title=(id,l)=>id==='research'?message('nav.research',l):id==='governance'?message('governance.title',l):id==='practice'?labels[l].practicePage:sections.find(s=>s.id===id)?.title?.[l]||labels[l][id];
function groupLinks(group,l,path,base) {
 return group.children.map(id=>`<a href="${route(l,id,base)}" ${path===id?'aria-current="page"':''}>${e(title(id,l))}${icon('arrow')}</a>`).join('');
}
function header(l,path,base) {
 const t=labels[l];
 return `<a class="skip-link" href="#main">${e(t.skip)}</a>
 <header class="site-header" id="top" data-institution-status="planned"><div class="wide header-inner">
 <div class="institution-lockup"><a class="university-signature" href="https://www.marmara.edu.tr/" aria-label="${e(message('institution.university',l))}"><img src="${base}assets/marmara-${l==='tr'?'tr':'en'}.png" alt="${e(message('institution.university',l))}" width="320" height="105"></a><span class="lockup-rule" aria-hidden="true"></span><a class="brand" href="${route(l,'',base)}" aria-label="MARSAM. ${e(t.home)}"><span><span class="wordmark" dir="ltr">MARSAM</span><span class="brand-sub">${e(t.brand)}</span></span></a></div>
 <div class="header-actions"><a class="icon-button" href="${route(l,'saved',base)}" aria-label="${e(t.saved)}" title="${e(t.saved)}">${icon('bookmark')}</a>
 <details class="language-select"><summary>${icon('globe')}<bdi>${e(localeNames[l])}</bdi><span class="chevron" aria-hidden="true"></span></summary><div class="language-panel">${locales.map(x=>`<a href="${route(x,path,base)}" lang="${langTags[x]}" hreflang="${langTags[x]}" ${x===l?'aria-current="true"':''}><bdi>${e(localeNames[x])}</bdi>${x===l?icon('check'):''}</a>`).join('')}</div></details>
 <a class="icon-button search-toggle" href="${route(l,'search',base)}" data-open-search aria-label="${e(t.search)}">${icon('search')}</a></div></div>
 <div class="wide academic-context" data-academic-unit="guidance-counselling"><span>${e(message('institution.faculty',l))}</span><span>${e(message('institution.department',l))}</span><span>${e(message('institution.division',l))}</span></div>
 <div class="wide nav-wrap"><nav class="desktop-nav" aria-label="${e(t.menu)}" data-primary-nav>${navigation.map(g=>`<details class="nav-group"><summary>${e(message('nav.'+g.key,l))}<span class="chevron" aria-hidden="true"></span></summary><div class="mega-panel">${groupLinks(g,l,path,base)}</div></details>`).join('')}</nav>
 <details class="mobile-nav"><summary>${icon('layers')} ${e(t.menu)}</summary><nav aria-label="${e(t.menu)}">${navigation.map(g=>`<div class="mobile-nav-group"><strong>${e(message('nav.'+g.key,l))}</strong>${groupLinks(g,l,path,base)}</div>`).join('')}</nav></details>
 <a class="nav-reading" href="${route(l,'compare',base)}" data-compare-nav>${e(t.compare)} <span class="compare-count" data-compare-count>0</span></a></div></header>`;
}
function footer(l,base) {
 const t=labels[l];
 return `<footer class="site-footer"><div class="wide"><div class="footer-main"><div class="footer-brand"><a class="brand" href="${route(l,'',base)}"><span class="wordmark" dir="ltr">MARSAM</span></a><p class="footer-claim">${e(message('site.kicker',l))}</p><p>${e(message('site.context',l))}</p></div>
 ${navigation.slice(0,3).map(g=>`<div class="footer-column"><h2>${e(message('nav.'+g.key,l))}</h2>${g.children.map(id=>`<a href="${route(l,id,base)}">${e(title(id,l))}</a>`).join('')}</div>`).join('')}</div>
 <details class="future-sections"><summary>${e(message('footer.future',l))}</summary><div>${['projects','events','media','news'].map(id=>`<a href="${route(l,id,base)}">${e(t[id]||campusCopy[l][id])}</a>`).join('')}</div></details>
 <details class="visual-credits"><summary>${e(h.imageCredits[l])}</summary><p>${e(h.imageNote[l])}</p><a href="https://commons.wikimedia.org/wiki/File:Battal_Ebru.jpg" target="_blank" rel="noopener noreferrer">Akcire.14 · Battal Ebru</a><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></details>
 <div class="footer-bottom"><span dir="ltr">MARSAM · ${RELEASE.version}</span><a href="${route(l,'governance',base)}#privacy">${e(t.privacy)}</a><a href="${route(l,'governance',base)}#accessibility">${e(message('governance.accessibility',l))}</a><a href="${route(l,'contribute',base)}">${e(t.contribute)}</a><a href="#top">${e(t.backTop)} ↑</a></div></div></footer>`;
}
const ogLocale={tr:'tr_TR',en:'en_US',de:'de_DE',zh:'zh_CN',ru:'ru_RU',ar:'ar_AR',id:'id_ID',ms:'ms_MY'};
export function shell(l,path,pageTitle,description,body,base='/',siteURL='') {
 const t=labels[l],c=campusCopy[l],origin=siteURL|| (base==='/MARSAM/'?'https://onourimpram.github.io':'');
 const ui={locale:l,base,labels:t,version:RELEASE.version,errors:{title:message('form.errors',l),required:message('form.required',l),invalid:message('form.invalid',l)}};
 const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(pageTitle)} · MARSAM</title><meta name="description" content="${e(description)}"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><meta name="theme-color" content="#173f53"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'none'"><meta property="og:title" content="${e(path===''?'MARSAM · '+t.brand:pageTitle+' · MARSAM')}"><meta property="og:description" content="${e(description)}"><meta property="og:type" content="website"><meta property="og:site_name" content="MARSAM"><meta property="og:locale" content="${ogLocale[l]}"><meta property="og:url" content="${origin}${route(l,path,base)}"><meta property="og:image" content="${origin}${base}assets/og-card.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:alt" content="MARSAM · ${e(t.brand)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${origin}${base}assets/og-card.jpg"><link rel="icon" href="${base}brand.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}site.css?v=${RELEASE.version}">${locales.map(x=>`<link rel="alternate" hreflang="${langTags[x]}" href="${origin}${route(x,path,base)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${origin}${route('tr',path,base)}">`;
 const search=`<dialog class="search-dialog" aria-labelledby="search-title"><div class="search-dialog-top"><h2 id="search-title">${e(t.searchPage)}</h2><button type="button" class="icon-button" data-close-search aria-label="${e(t.close)}">${icon('close')}</button></div><form class="search-form" action="${route(l,'search',base)}" method="get">${icon('search')}<label class="sr-only" for="global-search">${e(message('search.prompt',l))}</label><input id="global-search" dir="auto" type="search" name="q" maxlength="160" placeholder="${e(message('search.prompt',l))}" autocomplete="off"><button class="button compact" type="submit">${e(t.search)}</button></form><p>${e(message('search.tip',l))}</p><div class="dialog-shortcuts">${['concepts','library','measures','ethics'].map(id=>`<a href="${route(l,id,base)}">${e(t[id])} ${icon('arrow')}</a>`).join('')}</div></dialog>`;
 return `<!doctype html><html lang="${langTags[l]}" dir="${direction(l)}"><head>${head}</head><body data-locale="${l}" data-base="${base}" data-campus="marmara-preview" data-release="${RELEASE.version}"><div class="reading-progress" aria-hidden="true"></div>${header(l,path,base)}<main id="main" tabindex="-1">${body}</main>${footer(l,base)}${search}<div class="toast" role="status" aria-live="polite"></div><script type="application/json" id="ui-data">${json(ui)}</script><script type="application/json" id="campus-data">${json({locale:l,base,copy:c,labels:t,resourceIds:resources.map(r=>r.id)})}</script><script type="module" src="${base}app.js?v=${RELEASE.version}"></script><script type="module" src="${base}campus.js?v=${RELEASE.version}"></script><script type="module" src="${base}heritage.js?v=${RELEASE.version}"></script></body></html>`;
}
