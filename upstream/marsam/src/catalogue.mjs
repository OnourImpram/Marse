import {scholarlyCopy as sc} from './scholarship.mjs';
import {measureProfiles} from './measure-profiles.mjs';
import {researchGuides} from './research-data.mjs';
/** Immutable presentation projection. Original academic text and provenance stay in their source modules. */
import {labels as baseLabels} from './i18n.mjs';
import {sources,resources as baseResources,sections as baseSections,topics,typeKeys} from './content.mjs';
import {articles as baseArticles} from './articles.mjs';
import {learningPaths as basePaths,overview as baseOverview} from './info.mjs';
import {locales} from './languages.mjs';
import {centreRows as n} from './centre-copy.mjs';
import {campusCopy as originalCampusCopy} from './campus-copy.mjs';
import {h} from './heritage-copy.mjs';
import {dossierTitles,pathSummaries,publicationSummaries,permissionsText} from './catalogue-copy.mjs';
import {message} from './messages.mjs';
const localized=id=>Object.fromEntries(locales.map(l=>[l,message(id,l)]));
export const sourceById=Object.fromEntries(sources.map(s=>[s.id,s]));
export const labels=Object.fromEntries(locales.map(l=>[l,{
 ...baseLabels[l],publications:h.publications[l],books:h.books[l],metaBook:h.book[l],
 preview:message('site.proposed',l),previewNote:message('site.context',l),heroText:n.lead[l],
 center:message('nav.about',l),research:message('nav.research',l),learn:message('nav.learn',l),explore:message('nav.explore',l),
 collections:n.areas[l],library:n.library[l],readings:n.readings[l],readingsIntro:n.readingsLead[l],
 selectedSources:n.library[l],selectedSourcesIntro:n.libraryLead[l],forYou:n.educationTitle[l],forYouIntro:n.educationLead[l],
 student:n.students[l],professional:n.professionals[l],researcher:n.researchers[l],
 learning:n.learning[l],media:n.media[l],news:n.news[l],projects:n.projects[l],practicePage:n.practiceTitle[l],
 footerLine:n.footer[l],featuredTitle:baseLabels[l].brand,browse:n.viewLibrary[l],startLearning:n.viewEducation[l],
 heroTitle:baseLabels[l].brand,heroAccent:n.research[l],compare:originalCampusCopy[l].compare,
 evidence:sc.evidence[l],governance:message('governance.title',l)
}]));
const scope={tr:'Özet',en:'Summary',de:'Zusammenfassung',zh:'摘要',ru:'Краткое описание',ar:'ملخص',id:'Ringkasan',ms:'Ringkasan'};
export const campusCopy=Object.fromEntries(locales.map(l=>[l,{...originalCampusCopy[l],scope:scope[l],
 heroLead:n.lead[l],collections:n.areas[l],collectionLead:n.areasLead[l],events:n.events[l],eventsLead:n.eventLead[l],status:message('site.context',l)}]));
export const articles=baseArticles.map(a=>({...a,title:dossierTitles[a.id]||a.title}));
export const learningPaths=basePaths.map(p=>({...p,summary:pathSummaries[p.id]||p.summary}));
export const resources=baseResources.map(r=>({...r,summary:publicationSummaries[r.id]&&!sourceById[r.sources[0]].bibliography?publicationSummaries[r.id]:r.summary}));
const updates={library:[n.library,n.libraryLead],learning:[n.learning,n.educationLead],media:[n.media,n.mediaLead],projects:[n.projects,n.projectsLead],about:[n.aboutTitle,n.aboutText],news:[n.news,n.emptyNews],practice:[n.practiceTitle,n.practiceLead]};
export const sections=baseSections.map(s=>updates[s.id]?{...s,title:updates[s.id][0],summary:updates[s.id][1]}:{...s});
for(const [id,title,summary,group]of [
 ['collections',n.areas,n.areasLead,'research'],['compare',Object.fromEntries(locales.map(l=>[l,campusCopy[l].compare])),Object.fromEntries(locales.map(l=>[l,campusCopy[l].compareLead])),'research'],
 ['events',n.events,n.eventLead,'center'],['research',localized('research.title'),localized('research.lead'),'research'],
 ['governance',localized('governance.title'),localized('governance.lead'),'center']
])if(!sections.some(s=>s.id===id))sections.push({id,title,summary,group,topic:'methods'});
for(const g of researchGuides)sections.push({id:g.id,title:g.title,summary:g.summary,group:'research',topic:'methods'});
for(const p of measureProfiles)sections.push({id:'measure-'+p.id,title:Object.fromEntries(locales.map(l=>[l,p.title])),summary:sc.measureLead,group:'research',topic:'assessment'});
export const overview={...baseOverview,editorial:baseOverview.editorial.map((item,i)=>i===2?{...item,text:permissionsText}:item),about:[
 {title:n.areas,text:n.areasLead},{title:n.educationTitle,text:n.educationLead}
]};
export {sources,topics,typeKeys};
export const catalogue=Object.freeze({sources,resources,sections,articles,learningPaths,labels});
