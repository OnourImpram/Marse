import {evidenceContinuityManifest} from '../src/evidence-continuity.mjs';
import {validateScholarship,validateScope,reviewManifest,evidence,scholarlyThemes,validateNarrativeBindings,narrativeReviewManifest} from '../src/scholarship.mjs';
import {emitResearchArtifacts} from './research-artifacts.mjs';
import {renderCampusHome,campusRenderers} from '../src/campus.mjs';
import {mkdir,writeFile,readFile,cp,rm} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {locales,localeNames,langTags} from '../src/languages.mjs';
import {labels,sources,resources,sections,articles,learningPaths} from '../src/catalogue.mjs';
import {RELEASE} from '../src/release.mjs';
import {knowledgeLedger,translationLedger,validateRelationships} from '../src/provenance.mjs';
import {message,messages,translationRecord} from '../src/messages.mjs';
import {tokenCSS} from './styles.mjs';
import {normalizeBase,validateContent,escapeHTML as e,exportRIS,exportBib,canPublish} from '../src/lib.mjs';
import {languagePacks} from '../src/translate.mjs';
import {instruments,datasets,constructs,bridges,claims} from '../src/roadmap/platform.mjs';
import reviewEvents from '../src/review-events.json' with {type:'json'};
import {sectionPage,dossierPage,resourcePage,pathPage,searchIndex} from '../src/site.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const base=normalizeBase(process.env.BASE_PATH||'/');
const errors=[...validateContent({locales,labels,sources,resources,sections,articles}),...validateScholarship(),...validateScope(sources),...validateNarrativeBindings(sources)];
if(errors.length)throw new Error(errors.join('\n'));
if(process.env.PUBLISH==='true'){
  const pending=[...resources,...articles].filter(r=>!canPublish(r,createHash('sha256').update(JSON.stringify({...r,approval:undefined})).digest('hex')));
  if(pending.length)throw new Error(`PUBLICATION BLOCKED: ${pending.length} records lack artifact-bound scientific/language approval. Preview builds are not publication approval.`);
  throw new Error('PUBLICATION BLOCKED: institutional release authorization, source currency and rights review must be recorded before enabling production generation.');
}
const dist=resolve(root,'dist');await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});await cp(resolve(root,'public'),dist,{recursive:true,filter:path=>!/(?:water-(?:640|1440)\.webp)$/.test(path)});
await writeFile(resolve(dist,'site.css'),tokenCSS()+await readFile(resolve(root,'public/site.css'),'utf8'));
await emitResearchArtifacts(root,dist);
const paths=[];
async function emit(path,html){const target=resolve(dist,path,'index.html');await mkdir(dirname(target),{recursive:true});const [locale,...parts]=path.split('/');await writeFile(target,html);paths.push('/'+(path?path+'/':''));}
for(const l of locales){await emit(l,renderCampusHome(l,base));for(const s of sections)await emit(`${l}/${s.id}`,(campusRenderers[s.id]?campusRenderers[s.id](l,base):sectionPage(s.id,l,base)));for(const a of articles)await emit(`${l}/dossier/${a.id}`,dossierPage(a,l,base));for(const r of resources)await emit(`${l}/resource/${r.id}`,resourcePage(r,l,base));for(const p of learningPaths)await emit(`${l}/learning/${p.id}`,pathPage(p,l,base));}
await mkdir(resolve(dist,'data'),{recursive:true});
await mkdir(resolve(dist,'data/v1'),{recursive:true});
const apiBase={schemaVersion:1,release:RELEASE.id,version:RELEASE.version,generatedAt:new Date().toISOString(),publicationState:RELEASE.status,reviewStatus:'AI_ASSISTED_DRAFT',humanReviewed:false,scientificApproval:RELEASE.scientificApproval,humanLanguageApproval:RELEASE.humanLanguageApproval,formalInstitutionalApproval:RELEASE.formalInstitutionalApproval};
await writeFile(resolve(dist,'data/v1/release.json'),JSON.stringify(apiBase,null,2));
await writeFile(resolve(dist,'data/v1/sources.json'),JSON.stringify({...apiBase,records:sources.map(s=>({id:s.id,title:s.title,year:s.year,url:s.url,kind:s.kind,inspection:s.inspection,checked:s.checked,doi:s.bibliography?.doi||null,pmid:s.bibliography?.pmid||null,rights:'link-only',correctionState:s.correctionState||'not-checked',correctionDoi:s.correctionDoi||null,bibliography:s.bibliography||null}))},null,2));
await writeFile(resolve(dist,'data/v1/instruments.json'),JSON.stringify({...apiBase,records:instruments},null,2));
await writeFile(resolve(dist,'data/v1/datasets.json'),JSON.stringify({...apiBase,records:datasets},null,2));
await writeFile(resolve(dist,'data/v1/constructs.json'),JSON.stringify({...apiBase,records:constructs},null,2));
await writeFile(resolve(dist,'data/v1/evidence-bridges.json'),JSON.stringify({...apiBase,records:bridges},null,2));
await writeFile(resolve(dist,'data/v1/claims.json'),JSON.stringify({...apiBase,records:[...evidence.flatMap(r=>['population','finding','limit'].map(field=>({id:r.id+':'+field,sourceIds:[r.sourceId],support:'source-bound-edition',claimType:field,sourceLocation:'shared scholarly brief',reviewStatus:'AI_ASSISTED_DRAFT',scientificApproval:false}))),...claims]},null,2));
const personMentions=sources.flatMap(source=>(source.bibliography?.authors||[]).map((name,index)=>({id:source.id+':author:'+(index+1),displayName:name,identityResolution:'source-scoped-mention',externalPersonId:null,sourceId:source.id,role:'author',orcid:null,orcidProvenance:null})));
const personRelations=personMentions.map(p=>({id:'relation:'+p.id,personMentionId:p.id,sourceId:p.sourceId,relation:'author-of',institutionalMembershipClaim:false}));
await writeFile(resolve(dist,'data/v1/people.json'),JSON.stringify({...apiBase,identityPolicy:'Source-scoped mentions are not merged by name. ORCID is never guessed from a name.',records:personMentions},null,2));
await writeFile(resolve(dist,'data/v1/organizations.json'),JSON.stringify({...apiBase,identityPolicy:'No organization membership is inferred from coauthorship or source mentions.',records:[]},null,2));
await writeFile(resolve(dist,'data/v1/relations.json'),JSON.stringify({...apiBase,records:personRelations},null,2));
await writeFile(resolve(dist,'data/v1/review-events.json'),JSON.stringify({...apiBase,appendOnly:true,records:reviewEvents.events},null,2));
await writeFile(resolve(dist,'data/v1/schema-index.json'),JSON.stringify({...apiBase,schemas:['source-record-v3','instrument','claim','review-event']},null,2));
await writeFile(resolve(dist,'data/v1/integrity.json'),JSON.stringify({...apiBase,policy:'Recorded post-publication state is review metadata; detected updates never rewrite claims automatically.',records:sources.filter(s=>s.bibliography?.doi).map(s=>({sourceId:s.id,doi:s.bibliography.doi,state:s.correctionState||'not-checked',correctionDoi:s.correctionDoi||null,checked:s.checked,requiresHumanReview:['correction','retraction','expression-of-concern'].includes(s.correctionState)}))},null,2));
await writeFile(resolve(dist,'data/v1/collections.json'),JSON.stringify({...apiBase,records:[{id:'selected-catalogue',method:'editorial-curation',systematic:false,exhaustive:false,sourceIds:sources.map(s=>s.id)},{id:'research-roadmap-wave2',method:'targeted-gap-filling',systematic:false,exhaustive:false,sourceIds:sources.filter(s=>s.bibliography?.collection==='research-roadmap-wave2').map(s=>s.id)}]},null,2));
await writeFile(resolve(dist,'data/scholarly-editions.json'),JSON.stringify(reviewManifest(),null,2));
await writeFile(resolve(dist,'data/locale-parity.json'),JSON.stringify(evidenceContinuityManifest(evidence),null,2));
await writeFile(resolve(dist,'data/narrative-editions.json'),JSON.stringify(narrativeReviewManifest(sources),null,2));
await writeFile(resolve(dist,'data/evidence-briefs.json'),JSON.stringify({schemaVersion:1,records:evidence.map(r=>({id:r.id,sourceId:r.sourceId,brief:r.brief})),themes:scholarlyThemes.map(t=>({id:t.id,sourceIds:t.sources}))},null,2));

for(const l of locales)await writeFile(resolve(dist,`data/search-${l}.json`),JSON.stringify(searchIndex(l,base)));
await writeFile(resolve(dist,'data/source-ledger.json'),JSON.stringify({schemaVersion:1,checked:null,recordDatesAreAuthoritative:true,editorialState:'preview',review:'SEQUENTIAL_ROLE_REVIEW',note:'Source identity and inspection scope are separate. Technical validation is not scientific approval. Audit fields below use English; interface and reading texts are localized.',sources},null,2));
await mkdir(resolve(dist,'citations'),{recursive:true});await mkdir(resolve(dist,'metadata'),{recursive:true});
for(const s of sources){
 await writeFile(resolve(dist,`citations/${s.id}.ris`),exportRIS(s));
 await writeFile(resolve(dist,`citations/${s.id}.bib`),exportBib(s));
 const b=s.bibliography||{};
 const csl={id:s.id,type:b.type==='book'?'book':'article-journal',title:s.title,author:(b.authors||[]).map(name=>({literal:name})),issued:{raw:b.date||String(s.year||'')},DOI:b.doi||undefined,ISBN:b.isbn||undefined,'container-title':b.journal||undefined,publisher:b.publisher||undefined,URL:s.url};
 await writeFile(resolve(dist,`citations/${s.id}.json`),JSON.stringify(csl,null,2));
 const jsonld={'@context':'https://schema.org','@type':b.type==='book'?'Book':'ScholarlyArticle','@id':s.url,name:s.title,datePublished:b.date||String(s.year||''),identifier:[b.doi&&'https://doi.org/'+b.doi,b.isbn&&'ISBN '+b.isbn].filter(Boolean),author:(b.authors||[]).map(name=>({'@type':'Person',name})),isPartOf:b.journal?{'@type':'Periodical',name:b.journal}:undefined,url:s.url};
 await writeFile(resolve(dist,`metadata/${s.id}.jsonld`),JSON.stringify(jsonld,null,2));
}
// The project root opens the full Turkish preview, not a placeholder splash.
await emit('',renderCampusHome('tr',base));
await writeFile(resolve(dist,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>404 · MARSAM</title><link rel="stylesheet" href="${base}site.css?v=${RELEASE.version}"></head><body><main class="error-body"><span class="wordmark">MARSAM</span><h1>404</h1><p>Sayfa bulunamadı · Page not found · Seite nicht gefunden · 页面不存在 · Страница не найдена · الصفحة غير موجودة · Halaman tidak ditemukan · Halaman tidak dijumpai</p><nav>${locales.map(l=>`<a href="${base}${l}/" lang="${langTags[l]}"><bdi>${e(localeNames[l])}</bdi></a>`).join('')}</nav></main></body></html>`);
await writeFile(resolve(dist,'.nojekyll'),'');
await writeFile(resolve(dist,'robots.txt'),'User-agent: *\nDisallow: /\n');
// GitHub Pages does not apply a Netlify-style _headers file. HTTP headers are measured at release.
const knowledge=knowledgeLedger();const relationshipErrors=validateRelationships(knowledge.relationships);if(relationshipErrors.length)throw Error(relationshipErrors.join('\n'));
await writeFile(resolve(dist,'data/knowledge-ledger.json'),JSON.stringify(knowledge,null,2));
const translationRecords=translationLedger();
await writeFile(resolve(dist,'data/translation-records.json'),JSON.stringify({schemaVersion:1,review:'AI_ASSISTED_DRAFT',humanReviewed:false,records:translationRecords},null,2));
const uiRecords=Object.keys(messages).flatMap(id=>locales.map(l=>translationRecord(id,l,message(id,'tr'),message(id,l))));
await writeFile(resolve(dist,'data/interface-review.json'),JSON.stringify({schemaVersion:1,records:uiRecords},null,2));
await writeFile(resolve(dist,'data/design-tokens.json'),await readFile(resolve(root,'src/tokens.json'),'utf8'));
const manifest={institution:{name:'Marmara University',relationship:'planned-centre',faculty:'Atatürk Eğitim Fakültesi',department:'Eğitim Bilimleri Bölümü',division:'Rehberlik ve Psikolojik Danışmanlık Anabilim Dalı',plannedHomeSource:'project-owner clarification, 2026-10-02',unitNameSource:'https://aef.marmara.edu.tr/bolumler-programlar/egitim-bilimleri',formalApprovalVerified:false},previewDeploymentAuthorized:process.env.PAGES_PREVIEW==='true',version:RELEASE.version,release:RELEASE.id,base,mode:'preview',generatedAt:new Date().toISOString(),locales,pages:paths.length,contentRoutes:paths.length-1,paths,resources:resources.length,articles:articles.length,learningPaths:learningPaths.length,sources:sources.length,publicationAuthorized:false,localeReview:Object.fromEntries(locales.map(l=>[l,{status:'AI_ASSISTED_DRAFT',humanReviewed:false,direction:l==='ar'?'rtl':'ltr'}]))};
await writeFile(resolve(dist,'data/translation-status.json'),JSON.stringify({locales,review:'AI_ASSISTED_DRAFT',humanReviewed:false,additionalLanguages:Object.keys(languagePacks),regionalScope:'Indonesian and Malay. No Javanese or Sundanese.',sourceBinding:'Exact source strings. Missing translation fails the build.'},null,2));
await writeFile(resolve(dist,'build-manifest.json'),JSON.stringify(manifest,null,2));
console.log(`Built ${paths.length} pages + 404, ${locales.length} languages, ${articles.length} dossiers, ${sources.length} source records. BASE_PATH=${base}. PREVIEW ONLY.`);
