# MARSAM design and UX research report

**Research date. 1 October 2026.**

**Repository examined.** `OnourImpram/MARSAM`, main snapshot `d2caf4854caabafcee6d2c737222c6b9d224e772`, application version `0.6.0`. The repository distinguishes this documentation snapshot from the application commit used for its recorded public deployment. 

**Evidence boundary.** This is a source-level investigation, supported by repository documentation, existing verification records, supplied screenshots, and external primary sources. Existing GitHub Actions results were inspected, not rerun. Consequently, findings about implementation are stronger than findings about actual user behaviour. This report does not establish present browser compatibility, measured performance, accessibility conformance, translation accuracy, or institutional approval.

## 1. Executive findings

### The recommended direction

**MARSAM should become a culturally grounded scholarly reading room, with a dependable catalogue and an explicit evidence trail.** Its distinctive character can come from restrained references to book culture, ebru, geometric ornament, and careful typography. Its credibility should come from what visitors can inspect, not from how closely its masthead resembles an established university centre.

The current application already has valuable foundations. It generates static HTML, preserves eight language identities, separates source records from editorial reading material, provides citation downloads, and explicitly records the absence of formal institutional and human translation approval. A wholesale migration to a fashionable React stack would discard some of these advantages without, by itself, improving academic trust or usability.  

### The highest-priority issue is authority, not ornament

There is a tension between the repository’s explicit proposed-centre status and the interface’s prominent university logo and combined institutional masthead. The asset ledger establishes where the logo files came from. It does not establish authorization to present MARSAM as an approved university unit. My assessment is that the visual hierarchy can communicate more institutional certainty than the qualification communicates. This is a design risk, not a finding from user testing.  

### The next improvement should be structural

The most consequential work is not another decorative layer. It is a coordinated improvement to navigation, search, source presentation, translation review, and maintenance contracts.

Current source inspection identifies several concrete reasons. Page composition relies partly on global mutation and regular-expression replacements of rendered HTML. Styling is distributed across successive stylesheet layers. The search-index request still carries a `0.4.0` cache tag. Some tests prohibit benchmark institution names even in legitimate source records. Standard Actions workflows do not match the latest recorded release workflow or its complete test selection.    

### The most useful benchmark combination

My recommendation is to combine principles, not appearances.

**Penn Libraries and GOV.UK** provide the strongest lessons for task clarity, information hierarchy, and understandable interactions. **USWDS and React Aria** provide particularly useful multilingual and interaction guidance. **Starlight and Pagefind** offer relevant static knowledge-access patterns. **FOLIO, VIVO, OpenAlex, and InvenioRDM** clarify record structure, identity, relationships, versions, and publication states. **Impeccable and agent-readable design-system research** offer useful ways to communicate these decisions to future coding agents. None should determine MARSAM’s identity wholesale. [Design System · Penn Libraries](https://designsystem.library.upenn.edu/foundations/principles/)

### What should remain outside the core experience

An animated spiritual atmosphere, a three-dimensional knowledge universe, a clinical advice chatbot, a simulated institutional team, and an oversized menu of empty programmes would not solve the platform’s immediate problems.

The design should make four questions easy to answer.

**What is this resource. What does its evidence support. What may I do with it. Who has reviewed this version.**

---

## 2. Current-repository assessment

### Architecture and implementation

| Area examined | What the current implementation establishes | Assessment and consequence |
|---|---|---|
| Runtime and build | `package.json` specifies Node.js 22 or later and a custom ESM static generator. It declares no application package dependencies. This is not currently a React, Next.js, or Astro application. | Preserve the static foundation unless a demonstrated authoring or maintenance problem justifies migration. React-oriented benchmarks are primarily behavioural references, not immediate dependencies.  |
| Repository structure | Separate `src`, `public`, `scripts`, `tests`, `docs`, and `verification` directories exist. The inspected root contains no repository-wide `LICENSE` file. | The separation is useful. Project code licensing and ownership need an explicit decision before future reuse or incorporation of third-party code. This does not imply that individually licensed assets lack licences.  |
| Rendering | `site.mjs` provides shell, header, footer, source cards, and dossier cards. `campus.mjs` modifies shared labels and content at import time and decorates serialized HTML through string and regular-expression replacements. | This is workable for a prototype but fragile for multiple agents. Prefer explicit component inputs and a predictable rendering pipeline in a future implementation phase. Do not add another layer of post-render replacements.   |
| Visual system | The page loads `site.css`, `campus.css`, `editorial.css`, and `heritage.css`. Heritage styling introduces paper, navy, petrol, gold, ebru, and ornament. | Consolidate decisions into semantic tokens and documented component variants. Four successive layers make precedence harder to reason about. The current heritage direction can be refined without adding a fifth competing system.   |
| Content | Bibliographic records, resources, dossiers, learning paths, and section definitions are distinct. The current selection includes nine books and eight recent papers, not an exhaustive bibliography. | Preserve the distinction between a work, the platform’s explanation of it, and a curated collection containing it. Do not present translated route counts as the number of original scholarly contributions.   |
| Publication metadata | Records preserve original titles, localized display titles, dates, authors, editors, contributors, identifiers, publisher information, and identity sources. | A good starting point. Names remain strings rather than disambiguated person entities. Work, edition, translation, and access location need clearer separation as the collection expands.  |
| Locale model | Five initial languages use inline localized structures, while Arabic, Indonesian, and Malay also use dictionaries keyed by exact source strings. Missing required translations throw errors. | The fail-closed behaviour is useful. The hybrid model is harder to maintain than stable message IDs plus source hashes and explicit locale review states. A wording change should mark a translation stale, not make its relationship difficult to reconstruct.   |
| Search | Static locale-specific indexes support substring matching, whitespace-separated query terms, and title preference. Normalization applies Turkish case handling and additional diacritic folding broadly. | This is not yet a language-aware scholarly retrieval system. Separate display text, exact identifier matching, locale-aware normalization, and optional tolerant matching. The stale `0.4.0` request tag is a cache-invalidation risk, not proof that users currently receive stale results.   |
| Catalogue interaction | Books and papers have query, author, and year filters, original-record disclosure, localized date formatting, and citation links. Author sorting currently uses Turkish collation across locales. | Keep the native form controls and readable HTML fallback. Reconsider universal Turkish sorting, overly broad author/contributor filters, and the distinction between an original title and an editorial translation.  |
| Contribution | The contribution form creates a local JSON download explicitly marked `not-sent`. There is no actual editorial submission service. | This honesty must remain visible. “Prepare suggestion” is appropriate. “Submit to the editorial team” would be misleading until an approved receiving workflow exists.  |
| Institutional state | Manifest fields and release records explicitly leave formal approval, scientific editorial approval, and human language review false. | These are genuine boundaries, not cosmetic labels to remove when the site looks finished. They should govern visible copy, structured metadata, masthead treatment, and release permissions.   |

### Tests and verification need a clearer evidence hierarchy

The test suite has useful protections. It checks internal routes, fragments, locale presence, identifiers, single-page headings, citation exports, unsafe URLs, forbidden external embeds, and publication gating. These are valuable engineering checks. They do not establish scientific correctness, effective translation, screen-reader usability, or representative user success.  

Four issues deserve attention before another implementation cycle.

**First, the benchmark-name ban is too broad.** `tests/build.test.mjs` rejects names including Harvard, Duke, Columbia, and IAPR throughout public HTML, search data, and the source ledger. That conflicts with `AGENTS.md`, which correctly allows genuine academic publications to be cited. The intended restriction is against invented affiliations and benchmark directories, not against legitimate scholarship. Future tests should check the role of a reference, not merely its spelling.  

**Second, several assertions freeze an editorial snapshot.** Exact counts of nine books, eight papers, and 27 resources, alongside a fixed date ceiling, are useful release fixtures. They should not become permanent constraints that discourage legitimate catalogue growth. Distinguish snapshot tests from general invariants. 

**Third, the standard CI path is behind the recorded delivery path.** The main verification workflow invokes older browser suites, while the latest delivery records reference heritage-specific verification elsewhere. The deployment workflow is tied to an earlier feature branch, not a straightforward current-main release process. Some older browser locators also appear susceptible to ambiguity after controls were duplicated in the header and footer. That last point requires future execution to confirm.   

**Fourth, documentation mixes historical and current states.** The README and delivery record describe version 0.6.0, while other documents still discuss version 0.4.0, five-language review, older content counts, or earlier verification totals. Preserve this history, but label it as history and provide one authoritative current-state index.    

### Visual assessment of the supplied implementation

The supplied screenshots show a coherent improvement over a generic template. The paper palette and bookplate-like composition have a recognizable character. However, the large decorative composition pushes discovery downward, particularly on mobile. The implementation also gives the combined university and centre identity considerable visual weight. These observations support two design hypotheses for testing.

**Make search and the platform’s practical purpose visible earlier. Make proposed institutional status as legible as institutional identity.**

They do not establish that users dislike the artwork or misunderstand the institution. Those questions require actual participants.

---

## 3. Benchmark matrix by category

### How to read the matrices

Scores are my **practical applicability judgments**, not measured usability rankings.

**5** means a priority source of transferable patterns. **4** means strong relevance with adaptation. **3** means situational value. **2** means limited or specialist value. **1** means little justification for the present core experience.

A high score does not mean “install this library.”

The language implications in every row assume the same eight-language baseline. Turkish requires careful case handling. English needs terminological consistency. German needs expansion tolerance. Simplified Chinese needs appropriate segmentation and typography. Russian needs Cyrillic coverage and flexible layouts. Arabic requires RTL, shaping, and mixed-direction handling. Indonesian and Malay require separate terminology and review. No benchmark transfers human-reviewed translations to MARSAM.

Licence labels refer to the inspected code or documented material, not automatically to examples, fonts, images, trademarks, premium products, or underlying scholarly works.

### A. AI-oriented design agents and agent-readable systems

| Benchmark and purpose | Patterns to learn, and what not to copy | Multilingual, accessibility, and performance implications | Trust, rights, and applicability |
|---|---|---|---|
| **Impeccable, `pbakaus/impeccable`**. Design guidance and inspection workflows for coding agents. | Separate durable product truth from visual direction. Use distinct critique, accessibility, hardening, and typography passes. Reject universal aesthetic prohibitions, such as treating a familiar font as intrinsically bad. | Require eight-language fixtures in every critique. Deterministic rules can detect selected problems, not semantic translation errors or complete accessibility. Its development tooling need not add a visitor-facing runtime. | Apache 2.0 code. Preserve notices where reused. Agent confidence is not editorial approval. **5/5**, especially for repeatable design review and agent handoff. [GitHub](https://github.com/pbakaus/impeccable) |
| **Open Design, canonical `nexu-io/open-design`**. A local design workspace using coding agents and portable design documents. | Learn its brief, visual direction, preview, and persistent design-context sequence. Do not import another brand’s `DESIGN.md`, templates, or unrestricted agent execution into MARSAM. | Useful for comparing the same page in eight languages. Generated output still needs independent keyboard, RTL, and mobile review. Its daemon is development infrastructure, not a GitHub Pages feature. | The official project site identifies `nexu-io/open-design` as canonical. Apache 2.0 does not clear bundled brand assets. Provider-bound prompts remain a separate data-processing concern. **4/5**. [OpenDesign](https://open-design.ai/) |
| **Requested `attentiondotnet/open-design`**. A separately located repository carrying the Open Design name. | Retain its identity in the research trail, but use the canonical project for future dependency decisions. Do not assume identical maintenance or a verified upstream relationship from a shared name. | No separate eight-language or accessibility advantage was established. Reassess exact revision and tooling before any use. | The repository exists, and its API metadata does not label it a fork. Its relationship to the canonical project should not be guessed. **2/5**, useful for provenance resolution rather than adoption.  [OpenDesign](https://open-design.ai/) |
| **Open Design Kilo, `mojila/open-design-kilo`**. An Open Design variant oriented toward Kilo workflows. | Learn adapter separation and reusable design context. Do not count a related implementation as independent evidence that the underlying design method works. | Same eight-language acceptance requirements as upstream. A tool adapter does not supply Arabic semantics, Chinese search, or accessible generated interactions. Keep it outside the public runtime. | The repository identifies its upstream. Apache 2.0 applies to the project, with separately licensed bundled material requiring inspection. **3/5**, relevant only if Kilo becomes part of the chosen development workflow. [GitHub](https://github.com/mojila/open-design-kilo) |
| **Better Web UI, `aladicf/better-web-ui`**. Agent-readable frontend guidance. | Useful for hierarchy, consistency, edge cases, and preflight review. Do not treat its recipes as a validated academic design system. | Turn recommendations into explicit tests for long German labels, Arabic shaping, and CJK layouts. No inherent visitor runtime is needed. The repository is in maintenance mode. | Its licence is **not standard MIT**. It adds source-availability and restrictions on proprietary or paid redistribution of the software. **3/5 for studying principles**, with direct reuse requiring careful review. [GitHub](https://github.com/aladicf/better-web-ui)  |
| **`Cozythecoder/frontend-design-md`**. Design-document and frontend guidance collection. | Learn concise design briefs, explicit visual rules, and preflight checks. Reject brand imitation and cinematic effects as default measures of quality. | Specify script-aware typography and no-motion examples rather than inheriting Latin-centric demonstrations. Performance depends on the generated choices, not the Markdown format. | The inspected repository uses MIT for its code. Referenced brands and visual examples retain separate rights. **3/5**, helpful as a document pattern, not as MARSAM’s visual authority. [GitHub](https://github.com/Cozythecoder/frontend-design-md) |
| **`kaelig/state-of-ai-in-design-systems`**. A dated field survey of machine-readable design-system practices. | Particularly useful are source-linked records, schema validation, Markdown and JSON counterparts, and explicit snapshot dates. Do not treat survey categories as a validated universal maturity scale. | Machine-readable contracts should carry locale constraints and accessibility states. Static counterparts fit MARSAM. The survey’s server and edge features do not automatically fit Pages. | Code is MIT, data and report text CC BY 4.0, with third-party source material retaining its own rights. **5/5**, especially for evidence-preserving agent documentation.  |
| **Storybook MCP and component stories**. A way for agents to discover component documentation and examples. | Learn executable component contracts and named states. Do not introduce Storybook or React solely to claim agent readiness. A lightweight static component gallery could serve the initial need. | Stories should include all eight languages, keyboard states, reduced motion, errors, and narrow screens. Development dependencies need not ship to visitors. | MCP capabilities and package maturity require version-specific review. Tool access should remain bounded, with no implied permission to publish. **4/5**, strongest after stable component boundaries exist. [Storybook](https://storybook.js.org/docs/ai/mcp/overview) |
| **Design Tokens Community Group format**. An interoperable representation of design decisions. | Learn typed primitive, semantic, and component tokens. Do not confuse exchanging tokens with choosing good colours or layouts. | Supports shared values with explicit locale overrides. Tokens alone provide neither contrast assurance nor correct RTL. A generated CSS output can remain lightweight. | The 2025.10 format is a community specification, not a W3C Recommendation. MARSAM’s brand and token ownership remain separate decisions. **5/5**, as a future exchange contract. [Design Tokens](https://www.designtokens.org/tr/2025.10/format/) |

### B. Product and institutional design systems

| Benchmark and purpose | Patterns to learn, and what not to copy | Multilingual, accessibility, and performance implications | Trust, rights, and applicability |
|---|---|---|---|
| **GOV.UK Design System**. Consistent public-service interactions. | Learn explicit labels, linked error summaries, clear next steps, and restrained progressive disclosure. Do not copy the government masthead, official-service language, or the assumption that every journey is a transaction. | Native HTML and progressive enhancement suit MARSAM. Translate error relationships and test RTL rather than assuming an English component works unchanged. Mobile clarity matters more than compactness. | Frontend code is MIT, guidance has its own licensing context, and official marks are separate. **5/5**, for understandable forms and task-focused pages. [design-system.service.gov.uk](https://design-system.service.gov.uk/components/error-summary/) |
| **USWDS**. A public-sector component and pattern system. | Learn language-selection distinctions between equivalent translations and partially translated content, plus documented accessibility exceptions. Do not copy federal banners or identifiers. | Its language guidance is highly relevant to eight locales. Preserve autonyms, language metadata, and predictable placement. Component-level tests do not certify the assembled site. | Original government material and bundled third-party assets have different terms. Do not label everything CC0. **5/5**, particularly for language access and transparent test reporting. [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/components/language-selector/) |
| **GitHub Primer**. A product design system for complex information and actions. | Learn consistent action hierarchy, token roles, and component-specific accessibility documentation. Do not make MARSAM resemble a repository dashboard or use green status pills as academic-quality seals. | Useful interaction references across locales, but long labels and RTL need MARSAM fixtures. Avoid importing dense toolbars or an unnecessary React runtime. | Primer React is MIT. GitHub identity and other assets are separate. **4/5**, for component discipline rather than overall appearance. [Primer](https://primer.style/product/components/token/accessibility/) |
| **IBM Carbon**. A system for enterprise products and data-rich interfaces. | Learn table anatomy, toolbar separation, semantic tokens, and progressive disclosure. Reject enterprise density as the default public reading experience. | Strong reference for comparisons and researcher views. Mobile tables need contained scrolling and preserved headers. Arabic direction and localized formatting require deliberate implementation. | Apache 2.0 code does not confer IBM endorsement or rights to every demonstration asset. **4/5**, for research utilities and structured data, less for the homepage. [Carbon Design System](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/accessibility) |
| **Material Design**. Cross-platform interaction and layout guidance. | Learn adaptive layouts, consistent state feedback, and hierarchy. Do not adopt a generic mobile-app appearance or assume Material styling is culturally neutral. | Adaptive patterns help on narrow screens. Localization, typography, and RTL still require testing. Import only needed behaviour. | Distinguish Material guidance from a particular implementation. The official Material Web repository currently states maintenance mode pending new maintainers. **3/5**, primarily for patterns rather than selecting that runtime. [Material Design](https://m3.material.io/foundations/layout/canonical-examples/overview) |
| **Radix UI**. Unstyled React interaction primitives. | Learn focus management, keyboard models, and separation of behaviour from appearance. Do not treat “unstyled” as “automatically accessible after customization.” | Direction configuration and author-supplied labels remain necessary. All eight languages need state and overflow tests. React is an additional architectural cost for the current site. | MIT core. Example assets and logos are separate. No academic or institutional validation follows from using a primitive. **4/5 for behavioural reference**, conditional for future implementation. [Radix UI](https://www.radix-ui.com/primitives/docs/overview/accessibility) |
| **React Aria**. Accessible, internationalized interaction foundations. | Learn locale-aware behaviour, consistent keyboard and touch handling, and explicit accessible naming. Avoid importing complex widgets where native controls suffice. | Especially valuable for future comboboxes and complex filtering. Locale handling is not human translation review. Styled output, Arabic layouts, and mobile touch behaviour still need evaluation. | Apache 2.0. Adobe identity remains separate. **5/5 as an interaction reference**, but not a reason by itself to migrate MARSAM to React. [react-aria.adobe.com](https://react-aria.adobe.com/quality) |
| **Headless UI**. Unstyled React and Vue components. | Learn state-based component contracts and interaction semantics. Do not copy an example’s visual design or assume omitted styling means no design work remains. | Labels, direction, text expansion, and focus visibility need local work in all eight languages. Framework overhead must be justified. | MIT core. Templates and third-party assets need separate checks. **3/5**, useful if the future stack already uses React or Vue. [Headless UI](https://headlessui.com/) |
| **shadcn/ui**. Distributable component source and registries. | Learn inspectable component ownership and consistent variants. Do not accumulate copied components without taking responsibility for updates and accessibility regressions. | Helpful for agent-readable contracts, but examples are not eight-language acceptance evidence. React and styling dependencies are not presently required by MARSAM. | MIT core does not clear every third-party registry entry or premium block. **3/5**, stronger for a future editor application than the present static reading platform. [shadcn/ui](https://ui.shadcn.com/docs) |
| **daisyUI**. CSS-oriented component classes and themes. | Learn economical styling and reusable states. Reject theme proliferation, tiny badges, and replacing clear content hierarchy with visual variety. | Low client-side behaviour requirements can be advantageous. CSS alone does not solve focus management or accessible complex widgets. Check RTL and every script explicitly. | MIT core, with other products and assets separately licensed. **3/5**, useful as a styling reference, not a replacement for MARSAM’s own tokens. [daisyui.com](https://daisyui.com/) |
| **Open Props**. Reusable CSS custom-property scales. | Learn systematic spacing, sizing, easing, and fluid values. Do not import every token or adopt its palette as MARSAM’s identity. | Framework-neutral and compatible with static HTML. Script-specific typography and directional layout remain local responsibilities. Selective use can avoid additional JavaScript. | MIT. Token provenance should be recorded if code is reused. **4/5**, for a small, coherent foundation rather than an all-purpose component framework. [open-props.style](https://open-props.style/) |

### C. Academic, documentation, library, and knowledge platforms

| Benchmark and purpose | Patterns to learn, and what not to copy | Multilingual, accessibility, and performance implications | Trust, rights, and applicability |
|---|---|---|---|
| **Astro Starlight**. A static documentation framework. | Learn clear side navigation, page outlines, search, and consistent reading layouts. Do not force bibliographic records into a software-manual structure. | Its internationalization model is relevant, but language availability and review remain separate. Static output is promising. Any migration must preserve `/MARSAM/` routes, citation files, and current fallbacks. | MIT. Content and artwork retain their own rights. **4/5**, as the leading conditional framework option if authoring complexity becomes the bottleneck. [Starlight](https://starlight.astro.build/) |
| **Docusaurus**. Documentation with internationalization and versioning. | Learn visible version context and structured navigation. Do not multiply entire site versions when only a publication edition or article revision changes. | Useful locale routing patterns. Its React application model adds complexity relative to the current generator. Base-path deployment must be configured explicitly. | MIT. Framework versioning is not scholarly edition provenance. **3/5**, suitable for a large evolving teaching corpus, not currently necessary. [Docusaurus](https://docusaurus.io/docs/i18n/introduction) |
| **Nextra**. Documentation built around Next.js and MDX. | Learn compact reading layouts and navigable long-form content. Reject migration solely for visual polish. | Localization is useful, but static export, locale routing, middleware assumptions, and `/MARSAM/` compatibility must be proven together. Eight-language presence alone does not establish equivalent content. | MIT core. Next.js capabilities that need a server cannot be assumed on Pages. **3/5**, a conditional choice with a higher migration burden. [Nextra](https://nextra.site/docs) |
| **Mintlify**. A hosted documentation product. | Learn contextual navigation, concise page structure, and clear task grouping. Do not copy its SaaS aesthetic or add an answer-generating assistant merely because one is available. | Multilingual navigation patterns are relevant. Hosted search, processing, performance, and exports require a separate vendor assessment. Arabic and academic translation quality remain unverified. | Commercial service terms are not a reusable open-source licence. **3/5 for UX patterns**, lower for direct adoption under the current static constraint. [Mintlify](https://www.mintlify.com/docs/organize/navigation) |
| **University of Minnesota Libraries design system**. Library-specific design, content, and development guidance. | Learn service clarity, content voice, semantic implementation, and institutional consistency. Do not copy Minnesota’s brand or assume its local service structure fits MARSAM. | Particularly useful for students and the public. Native, understandable interfaces help across scripts, but all translations and RTL behaviour remain local work. | Public documentation does not clear all design assets. Repository and asset terms need exact verification before reuse. **5/5**, for library-oriented content and task design. [umnlibraries.github.io](https://umnlibraries.github.io/design-system/content/) |
| **Penn Libraries design system**. Shared standards and components for library websites. | Learn task-based wayfinding, information shown at the point of need, semantic tokens, and separate release notes from design rationale. Do not copy Penn’s header, brand, or experimental patterns as production-ready components. | CSS custom properties and web components provide a useful framework-neutral model. Test scripts, RTL, keyboard operation, and expanded labels. Do not hide essential limitations in disclosure widgets. | Exact code and asset reuse terms need confirmation. **5/5**, the closest overall information-design benchmark for MARSAM. [Design System · Penn Libraries](https://designsystem.library.upenn.edu/foundations/principles/) |
| **FOLIO**. A library-services platform with structured inventory. | Learn the separation of bibliographic description, holdings, and individual items. Do not imply MARSAM owns or lends a book merely because its record is indexed. | Structured fields can support localized labels while preserving original metadata. Its administrative application and backend are not appropriate as the public site’s default runtime. | Inspected inventory modules use Apache 2.0, with module-specific review still necessary. **4/5 for the data model**, low for direct platform adoption. [FOLIO Documentation](https://docs.folio.org/docs/metadata/inventory/) |
| **VIVO**. Research discovery through structured people, works, and relationships. | Learn typed scholarly relationships and disambiguated identities. Reject the inference that coauthors are friends, students, partners, or centre members. | Preserve original names and add reviewed display forms. Graphs need searchable list equivalents and manageable mobile subsets. The full platform requires backend infrastructure. | Current official project material identifies Apache 2.0. Relationship evidence and profile permissions remain separate. **4/5**, for future scholarly modelling rather than immediate installation. [vivo.lyrasis.org](https://www.vivo.lyrasis.org/technical-specifications/) |
| **OpenAlex**. A connected scholarly metadata system. | Learn stable identifiers, explicit relationships, and separation of works, authors, institutions, topics, and access locations. Do not equate machine-disambiguated metadata with verified identity or scientific quality. | Original-language metadata needs preservation. Imported topics and aliases need review across eight languages. Prefer bounded build-time snapshots over unrestricted browser queries. | Data is CC0, not the full texts it describes. Access and licence fields can be incomplete. **5/5 for metadata principles**, **3/5 for an immediate integration**. [OpenAlex Yardım Merkezi](https://help.openalex.org/data/how-its-built/) |
| **InvenioRDM**. Research-data and repository publication workflows. | Learn the distinction between drafts, published records, versions, and access conditions. Do not present a local browser form as a secure deposit service. | Review states and access messages need equivalent meaning in all languages. Its authenticated workflow requires infrastructure beyond Pages. Public records should remain readable and accessible. | MIT core. Deposited works retain their own permissions. **4/5**, for publication-state design and a possible later repository service. [inveniordm.docs.cern.ch](https://inveniordm.docs.cern.ch/install/run/) |
| **IIIF Presentation API**. Interoperable presentation of digitized objects. | Learn structured attribution, rights statements, language maps, and object structure. Do not treat an image manifest as permission to reproduce the image. | Valuable for multilingual descriptions and accessible alternatives if approved scans or collections are later added. Avoid loading a heavy viewer on ordinary bibliographic pages. | Specifications, viewer code, and collection assets have different licences. **3/5 now**, potentially **5/5** for a rights-cleared digital collection. [iiif.io](https://iiif.io/api/presentation/3.0/) |
| **Pagefind, canonical `Pagefind/pagefind`**. Static search designed to limit bandwidth and infrastructure. | Learn build-time indexing, meaningful result metadata, and locale-specific retrieval. Do not index headers and repeated disclaimers as though they were substantive scholarship. | The documented language table includes several MARSAM languages, while Chinese needs its segmentation support. Malay is not listed, so a reviewed Malay interface must not silently fall back to English. Keyboard and RTL output need tests. | MIT. Search indexes must include only approved public content. **5/5 as the first search candidate to evaluate**, not an automatic replacement. [GitHub](https://github.com/CloudCannon/pagefind) |

### D. Academic and spirituality or mental-health organizations

These are **information-architecture and communication benchmarks**. Their existence, reputation, or published work does not establish a relationship with MARSAM.

| Benchmark and purpose | Patterns to learn, and what not to copy | Multilingual, accessibility, and performance implications | Trust, rights, and applicability |
|---|---|---|---|
| **Harvard Human Flourishing Program**. Research and communication around flourishing. | Learn connections between research domains, publications, methods, and measures. Do not borrow institutional prestige, programme claims, participant counts, or impact language. | A measure’s translation availability should be distinguished from its psychometric validation in a population. MARSAM should provide accessible summaries before downloads and keep scientific qualifications intact in every language. | The official measure page specifies usage conditions, including noncommercial licensing arrangements. Harvard marks and publication rights remain separate. **4/5**, particularly for method-to-publication navigation. [Human Flourishing Program at Harvard](https://hfh.fas.harvard.edu/publications) |
| **Duke Center for Spirituality, Theology and Health**. Research, training, and information resources. | Learn the distinction between research materials, publications, training, and dated announcements. Do not copy an accumulated announcement wall or assume a US professional audience maps directly to Türkiye and other regions. | Short HTML summaries, accessible document links, and clear dates would improve MARSAM’s international use. Training descriptions need local professional and legal review, not literal translation alone. | No partnership or reuse permission follows from benchmarking. Work-specific rights remain necessary. **4/5**, for the breadth of scholarly services rather than its exact appearance. [Duke Ruhsatı ve Sağlığı Merkezi](https://spiritualityandhealth.duke.edu/) |
| **Columbia University Spirituality Mind Body Institute, within Teachers College**. Research and educational communication. | Learn separation of research, education, and public engagement. Do not turn promotional summaries into causal clinical claims or imply that MARSAM offers equivalent qualifications. | Media and educational pages need transcripts, captions, concise navigation, and reviewed terminology. Avoid a media-heavy homepage that delays access on mobile. | Institutional names, images, programme descriptions, and credentials are not transferable. **4/5**, for audience pathways, with particularly careful scientific qualification. [Teachers College - Columbia University](https://spiritualitymindbody.tc.columbia.edu/) |
| **IAPR, International Association for the Psychology of Religion**. A scholarly association. | Learn visible governance, conference archives, journal connections, and disciplinary scope. Do not confuse it with another organization using the same acronym or imply MARSAM membership. | Association terminology must preserve the distinction between psychology of religion and spirituality. Dated event archives and accessible text-first pages can work well across locales. | Public bylaws or pages are not a licence to reproduce identity assets or copy governance arrangements. **4/5**, for scholarly community structure and transparent organizational roles. [IAPR](https://www.iaprweb.org/) |
| **Official Marmara University pages**. The relevant institutional context. | Learn unit naming, document ownership, contact structure, and differentiation between a centre’s mission and its formal status. Do not infer MARSAM authorization from the existence of other centres or a downloadable logo. | Preserve official names and carefully reviewed translations. Institutional navigation should not overwhelm the knowledge platform. Accessibility and policy links must point to the correct responsible organization. | The centres directory inspected displays a 2023 update date, so absence there cannot establish a 2026 legal fact. Repository approval flags remain the relevant evidence boundary. **5/5 for context**, not for presumed authorization. [Marmara Üniversitesi](https://www.marmara.edu.tr/arastirma/arastirma-ve-uygulama-merkezleri/) |

### E. Visual interaction, motion, visualization, and experimental interfaces

| Benchmark and purpose | Patterns to learn, and what not to copy | Multilingual, accessibility, and performance implications | Trust, rights, and applicability |
|---|---|---|---|
| **Aceternity UI**. Visually expressive React and Tailwind components and templates. | Learn selected hover and disclosure details. Reject infinite moving cards, decorative globes, spotlight effects, and partner-logo clouds as default academic UI. | Text animation can damage Arabic shaping and CJK reading. Motion must have a static equivalent. Decorative effects create extra rendering and mobile testing costs. | The official Pro licence restricts source redistribution and marketplace reuse. Public-repository inclusion needs exact item-level clearance. **2/5**, for selective reference, not a site-wide foundation. [Aceternity UI](https://ui.aceternity.com/) |
| **Magic UI**. Animated components for visually rich interfaces. | Learn subtle, meaningful state feedback. Do not import moving testimonials, promotional counters, or text effects as evidence of credibility. | Test all scripts without character-by-character animation. Respect reduced motion and maintain keyboard equivalents. Do not ship its dependencies for one decorative effect. | MIT core does not automatically cover premium products or third-party assets. **2/5**, with limited relevance outside optional promotional surfaces. [Magic UI](https://magicui.design/) |
| **Framer Motion, now Motion**. Animation tooling for web interfaces. | Learn coordinated state transitions and interruptible motion. Do not make navigation, reading, or evidence inspection depend on an animation completing. | Localized content should remain semantic HTML. Use reduced-motion support and assess actual bundle impact. Current JavaScript options may be more appropriate than adding React. | MIT core, with paid offerings separate. Motion is not proof of usability. **3/5**, only where CSS and native behaviour are insufficient. [GitHub](https://github.com/motiondivision/motion) |
| **Motion One**. A smaller animation project associated with the Web Animations API. | Study its economical approach. Do not select an archived package simply because an old comparison describes it as current. | The same script, reduced-motion, keyboard, and mobile conditions apply. Native CSS may satisfy MARSAM’s immediate needs without it. | The inspected repository is archived. MIT code remains distinct from maintenance suitability. **2/5**, as historical reference rather than a new dependency. [GitHub](https://github.com/motiondivision/motionone) |
| **D3.js**. Data-driven visualization primitives. | Learn explicit scales, encodings, and data joins. Do not assume an attractive chart makes a selected bibliography representative of the field. | SVG can support inspectable output, but labels, descriptions, keyboard interaction, and table alternatives need authoring. Localize numbers and labels without mirroring data indiscriminately. | ISC-style licence. Dataset rights remain separate. **4/5**, particularly for modest evidence maps and static explanatory graphics. [d3js.org](https://d3js.org/) |
| **React Flow**. Interactive node-based interfaces and workflow editors. | Learn keyboard-aware node interaction and explicit graph controls. Do not use a workflow editor as the default public literature browser. | Accessibility features and customizable messages are relevant, but Arabic labels and eight-language navigation need testing. Dragging requires alternatives. React adds architectural cost. | MIT core, with Pro offerings separate. Edges must not imply unsupported relationships. **3/5**, strongest for a future editorial workflow tool. [React Flow](https://reactflow.dev/learn/advanced-use/accessibility) |
| **Apache ECharts**. Configurable statistical and analytical charts. | Learn consistent legends, data zoom, accessible descriptions, and patterned encodings. Reject unexplained gauges, ornamental statistics, and inaccessible chart-only information. | ARIA and decal facilities require configuration. They do not replace keyboard testing or a data table. Localize labels and formats, and load only required chart modules. | Apache 2.0 with component notices to inspect. **4/5**, for a later, properly sourced evidence dashboard. [echarts.apache.org](https://echarts.apache.org/handbook/en/best-practices/aria/) |
| **Cytoscape.js**. Graph analysis and network visualization. | Learn typed nodes, explicit edges, filtering, and bounded exploration. Reject an unreadable graph of every record and every possible relationship. | Canvas output needs an equivalent searchable list or adjacency view. Mobile interaction, Arabic labels, and stable layouts require deliberate design. | MIT. Graph data and identity assertions need provenance independently of the library. **4/5 for a later scholarly graph**, low priority before the catalogue is stronger. [Cytoscape.js](https://js.cytoscape.org/) |
| **Three.js**. Three-dimensional rendering. | Potentially useful for a specific educational object or spatial explanation. Do not build a rotating spiritual universe or decorative 3D homepage. | A canvas is not a substitute for accessible content. Battery, GPU, touch, reduced motion, and text alternatives create substantial obligations across devices and scripts. | MIT engine, but models, textures, and scans need separate rights. **1/5 for the core platform**, conditional value for a justified teaching module. [Three.js](https://threejs.org/) |
| **Theatre.js**. Animation sequencing and authoring. | Learn controlled timelines for optional educational explanations. Do not use continuous background animation or distribute the editing interface unnecessarily. | Every explanation needs a meaningful static or transcript equivalent. Localized narration and text timing need separate production review. | The inspected licence distinguishes Apache 2.0 material from the Studio’s AGPL-covered files. Exact package boundaries matter. **1/5 now**, with narrowly defined future authoring value. [Theatre.js Docs](https://www.theatrejs.com/docs/latest)  |
| **React Three Fiber**. A React renderer for Three.js. | Learn declarative scene composition only if a real 3D requirement emerges. Do not introduce React plus Three.js to animate decorative heritage motifs. | It does not solve canvas accessibility or multilingual text design. The added rendering stack must earn its mobile and maintenance cost. | MIT core, with scene assets separately licensed. **1/5 for the present core experience**. [GitHub](https://github.com/pmndrs/react-three-fiber) |
| **“thereej”** | No reliable repository or canonical project was identified from the supplied term. It has not been silently equated with Three.js. | Language, accessibility, performance, and integration characteristics remain unknown. | Licence and ownership are unknown. **Not scored**. An exact owner and repository URL are required before assessment. |

---

## 4. Best patterns to adopt

### A single, dependable reading and discovery environment

Penn Libraries’ task-oriented approach is especially relevant. MARSAM’s visitors should not need to learn whether an item was entered as a source, publication, book, learning resource, or research collection before finding it. Those distinctions belong in the data model and presentation, not as obstacles in the visitor’s path. Penn’s separation of release notes from design rationale is also useful for repairing MARSAM’s documentation drift. [Design System · Penn Libraries](https://designsystem.library.upenn.edu/foundations/principles/)

### Native interactions with explicit contracts

Retain ordinary links, native selects, disclosure controls, and readable HTML. Improve them through named interaction contracts rather than replacing them with custom widgets everywhere.

The GOV.UK error-summary pattern illustrates the principle. A problem should be described in understandable language and linked to the place where it can be corrected. The equivalent in MARSAM is not merely form validation. It includes an unavailable source, a missing translation, an invalid identifier, and a contribution that has not actually been sent. [design-system.service.gov.uk](https://design-system.service.gov.uk/components/error-summary/)

### A source record that explains its own limits

A record should reveal enough to assess relevance before opening the publisher’s site. The primary information should be the original work, its authorship, date, type, subject, and access route. The next layer should explain what MARSAM inspected and what remains unreviewed.

This extends an existing strength rather than inventing a new platform. Current records already distinguish bibliographic identity, abstract inspection, and incomplete rights or clinical review. 

### Agent-readable constraints, not larger prompts

Future agents need a small authoritative package describing product purpose, allowed identity claims, components, tokens, locale behaviour, evidence rules, and acceptance tests.

Impeccable’s separation of product context from visual direction and the source-linked machine-readable records in the State of AI in Design Systems project are useful models. A future agent should receive these constraints before being asked to “make it better.” [GitHub](https://github.com/pbakaus/impeccable) 

---

## 5. Anti-patterns to reject

| Anti-pattern | Why it is unsuitable | Preferred alternative |
|---|---|---|
| A stronger university masthead paired with a weaker pending-status notice | Visual authority can contradict explicit governance status. | A proportionate proposed-project identity, with university branding only in an approved configuration. |
| More heritage decoration on every page | Repetition can turn a cultural reference into visual noise and reduce reading contrast. | Concentrated ornament on selected entry surfaces and a restrained colophon. |
| A menu representing everything the platform might eventually offer | Visitors encounter empty destinations and cannot distinguish present capability from ambition. | Prioritize populated, useful routes. Describe future channels separately. |
| One green “verified” badge | It collapses identity, evidence quality, translation, rights, and editorial approval. | Separate, understandable review dimensions. |
| Blanket bans on institutional names | They can suppress legitimate citations while failing to test the meaning of an affiliation claim. | Role-aware checks for source, benchmark, partner, member, and publisher. |
| Automatically importing a professor’s entire publication network | Coauthorship does not establish membership, supervision, or endorsement. | Curated works and explicitly evidenced relationships. |
| A clinical assistant placed above an incomplete evidence library | Fluent answers could exceed the inspected evidence and the project’s authority. | Source-first discovery and human-reviewed educational explanations. |
| A catalogue built around covers alone | A visually attractive shelf is inefficient for comparing methods, populations, evidence, and access. | A cover-supported view plus a compact bibliographic list. |
| Framework migration for visual novelty | It changes maintenance and runtime costs without necessarily improving user tasks. | First define the problem that the existing generator cannot reasonably solve. |

The repository itself already prohibits invented institutional relationships and the publication of private course material. The redesign should strengthen those boundaries rather than dilute them through visual presentation. 

---

## 6. Information architecture recommendations

### Proposed primary navigation

I recommend five primary destinations, with search, language selection, and saved items treated as persistent utilities.

| Destination | Purpose | Suggested contents |
|---|---|---|
| **Explore topics** | Understand an area before selecting a source. | Concepts, theoretical approaches, cultural contexts, ethical questions, curated topic pages. |
| **Library** | Find and inspect works. | One catalogue with views for papers, books, measures, methods, guidelines, and other approved resources. |
| **Learn** | Follow an educational sequence. | Student introductions, practitioner learning pathways, researcher methods, reviewed reading guides. |
| **Research** | Understand research activity and opportunities. | Approved projects, methods resources, evidence maps, and authorized participation information when available. |
| **About** | Understand what MARSAM is and who is responsible. | Proposed status, scope, governance, editorial policy, accessibility, rights, corrections, and approved contact information. |

Books and publications should remain useful landing pages, but they should be views over the same record collection, not separate systems with inconsistent metadata.

### Homepage sequence

The next homepage should test this sequence.

**Purpose and status, search, three audience pathways, selected research and books, topic entry points, editorial information.**

On mobile, the decorative composition should become smaller or move below the first useful discovery action. The page should not require a visitor to pass a large ornamental panel before reaching search.

### Topic pages

A topic page should answer a bounded question. Its structure should include an introductory explanation, relevant distinctions, selected works, evidence limitations, and next reading steps.

For example, a page about spiritually integrated counselling should not treat a theory chapter, a qualitative practitioner study, a validated scale, and a controlled intervention study as interchangeable support. This recommendation is consistent with the repository’s existing separation of source inspection from scientific approval. 

### Empty and future sections

News, events, media, and projects currently use honest empty states. Keep that honesty, but reconsider their prominence until they contain approved material. An empty section is preferable to fabrication, but a navigation bar dominated by empty sections remains a discovery problem. 

---

## 7. Personas and key user journeys

These are **proposed task segments for research**, not personas derived from interviews.

| User | Core question | Recommended journey | Success criterion to test |
|---|---|---|---|
| **Student** | “What does this concept mean, and what should I read first?” | Search or topic page, introductory explanation, learning pathway, original source, citation export. | The student can distinguish MARSAM’s explanation from the original source and identify the review status. |
| **Practitioner** | “How does this relate to practice, and what are its limits?” | Practice-related topic, population and context information, evidence type, ethical considerations, training requirements, source. | The practitioner can identify limitations and does not mistake educational material for an approved treatment protocol. |
| **Researcher** | “Which works address this question, with what methods and populations?” | Identifier or concept search, filters, detailed record, related works, source inspection details, citation export. | The researcher retrieves the correct work, preserves authorship, and can trace metadata and interpretive statements. |
| **Public visitor** | “What is this subject, and is this a service for me?” | Plain-language overview, explanation of platform scope, limits, reviewed external help information where appropriate. | The visitor understands that the proposed platform is not currently a clinical service and is not diagnosing their spirituality or mental health. |
| **Editor or contributor** | “How do I propose, correct, review, or publish something?” | Contribution instructions, structured proposal, rights and evidence assessment, translation review, editorial decision, versioned publication. | The contributor knows whether information was merely prepared locally or actually received, and who controls the next decision. |

The current local JSON contribution feature can support preparation, but it cannot fulfil the complete editor journey. That distinction must remain explicit until a receiving service exists. 

For later user research, measure task completion, misinterpretation of source status, recovery from failed searches, and comprehension of institutional status. Do not rely only on aesthetic preference ratings.

---

## 8. Content model and source/provenance model

### Recommended entities

| Entity | Essential fields | Why the distinction matters |
|---|---|---|
| **Work** | Stable internal ID, original title, work type, original language, identifiers, creators. | A scholarly work should not become a different work merely because its display title is translated. |
| **Edition or version** | Parent work, edition number, publication dates, revision relationships, publisher, version-specific identifiers. | A revised textbook and an article correction need precise relationships, not overwritten dates. |
| **Access location** | URL, host, access type, last checked date, available format, rights statement. | A catalogue record is not proof that MARSAM hosts or owns the full text. |
| **Person** | Stable ID, source-preserved name, verified identifiers where available, reviewed aliases. | Name matching should not silently merge different researchers or invent affiliations. |
| **Editorial item** | Author, purpose, audience, body, linked evidence, limitations, review state. | A MARSAM summary is not the publisher’s abstract or the original study. |
| **Evidence assertion** | Claim, supporting source, relevant locator, inspection depth, interpretation, reviewer, date. | This permits readers and editors to inspect how a statement is supported. |
| **Translation** | Source item and version hash, locale, translator or process, reviewer, date, status. | Translation approval should be bound to the exact source version. |
| **Collection** | Selection purpose, inclusion criteria, curator, update date, member record IDs. | A selected reading list must not masquerade as an exhaustive evidence review. |
| **Institutional relationship** | Relationship type, parties, evidence, authorization, dates, status. | Coauthorship, employment, supervision, membership, and partnership are different claims. |
| **Asset** | Creator, source, licence, permission record, modifications, attribution, usage locations. | Cover images, ebru derivatives, logos, and full texts require different rights assessments. |

FOLIO’s inventory distinctions, VIVO’s typed relationships, OpenAlex’s identifiers, and InvenioRDM’s version and publication-state concepts provide useful precedents. The recommendation is to borrow these distinctions without deploying their complete infrastructures. [FOLIO Documentation](https://docs.folio.org/docs/metadata/inventory/)

### Separate review dimensions

MARSAM should not replace `PARTIALLY_VERIFIED` with a more reassuring but less precise badge. Instead, show relevant dimensions independently.

**Identity.** Does the record correspond to the named publication?

**Inspection.** Was the catalogue entry, abstract, selected section, or full text examined?

**Interpretation.** Has a qualified reviewer checked the platform’s explanation?

**Currency.** When were corrections, retractions, links, and versions last checked?

**Language.** Has this language version been reviewed against the exact source version?

**Rights.** What may be linked, displayed, downloaded, translated, or redistributed?

**Institutional approval.** Who, if anyone, authorized this specific public representation?

The current record model already contains parts of this distinction. The main task is to make it more structured and understandable.  

### Preserve disagreements rather than silently resolving them

The heritage review records a discrepancy between a publisher’s author label and a book cover’s editor designation for *Manevi Yaşam Pratikleri*. That is exactly the kind of disagreement a provenance model should retain as separate source assertions until resolved by an appropriate human. It should not disappear because a coding agent prefers a single clean value. 

W3C PROV offers a useful conceptual vocabulary of entities, activities, agents, and derivation. MARSAM can apply that vocabulary in ordinary structured records without adopting a full semantic-web database. [W3C](https://www.w3.org/TR/prov-overview/)

---

## 9. Academic trust and governance UX

### Make the proposed status part of the identity

Until authorization is recorded, the interface should visibly communicate a proposed academic platform in the Marmara context. A small footer disclaimer should not carry the full burden of correcting a strongly official-looking masthead.

The exact wording and logo treatment require institutional review. Neither this report nor a repository flag can provide that authorization. The current manifest explicitly records formal approval as unverified. 

### Put useful evidence information beside the content

A compact record panel should show the source, original publication date, type of material inspected, review status, and access conditions. More detailed audit information can be expandable.

Do not hide clinically important limitations, unresolved identity problems, or missing translation review behind an ambiguous “More” control. Penn Libraries’ own disclosure guidance cautions that collapsed content can become harder to discover and recommends descriptive labels. [Design System · Penn Libraries](https://designsystem.library.upenn.edu/patterns/details/)

### Distinguish scholarship from service provision

The platform should not imply that reading a technique constitutes training, that a translated scale is validated, or that a research finding authorizes a clinical intervention.

For practitioner-facing material, I recommend a clearly identified educational purpose, intended audience, evidence scope, and professional limitations. Any future participant recruitment, clinical service, or assessment functionality should have separate governance and infrastructure.

### Establish a correction process before expanding claims

A future correction workflow should identify the affected item and languages, preserve the previous version, record the reason and supporting source, invalidate relevant review approvals, and publish a dated correction note when appropriate.

MARSAM’s existing governance document already proposes source-linked corrections and version-bound approval. The missing step is an operational, human-owned process. 

### Avoid a prestige-centred collection

Halil Ekşi’s and collaborators’ work can form an important curated collection. It should not become the implicit definition of the field. The collection should explain its purpose and eventually include relevant contrasting findings, theoretical disagreements, methodological limitations, and international contexts.

This is an editorial recommendation. It does not claim that the present selection is scientifically biased based on an exhaustive literature assessment.

---

## 10. Multilingual and RTL UX requirements

### Language-specific requirements

| Language | Required design and retrieval treatment |
|---|---|
| **Turkish** | Preserve `İ`, `I`, `ı`, and diacritics in display. Test exact and tolerant search separately. Maintain consistent distinctions among psychological counselling, psychotherapy, spirituality, and religion. |
| **English** | Establish a terminology baseline without making English the unquestioned conceptual authority. Distinguish original English titles from English translations of Turkish titles. |
| **German** | Allow navigation and controls to expand. Avoid fixed-width labels. Review compounds and specialized counselling terminology in realistic sentences. |
| **Simplified Chinese** | Use `zh-Hans` consistently, suitable punctuation and line breaking, genuine CJK glyph coverage, and segmentation-aware search. Avoid letter-spaced Latin display conventions. |
| **Russian** | Provide Cyrillic coverage, flexible heading widths, and reviewed transliterations or aliases where useful. Preserve the source’s author names and identifiers. |
| **Arabic** | Use RTL at document level, logical layout properties, and isolation for embedded Latin identifiers. Preserve shaping. Do not globally letter-space Arabic or mirror every icon and image. |
| **Indonesian** | Maintain an independent reviewed terminology set. Do not substitute Malay merely because many labels appear similar. |
| **Malay** | Maintain an independent reviewed terminology set and check library fallbacks explicitly. “Unsupported UI language” must not quietly become English while the surrounding page claims Malay. |

The existing language identifiers and autonyms are a strong foundation. W3C guidance supports explicit document direction and careful handling of bidirectional content rather than using visual CSS reversal alone.  [W3C](https://www.w3.org/International/questions/qa-html-dir)

### Translation status must be visible and version-specific

The current build marks **all eight locales** as AI-assisted drafts without human review. Turkish should not be presented as human-approved merely because it is the initial language. 

A future translation status model should distinguish draft, under review, reviewed, and outdated after source revision. It should also distinguish a translated interface from a reviewed translation of substantive academic content.

### Search should separate identifiers, names, and concepts

Exact DOI and ISBN queries should take priority over fuzzy conceptual matching. Author names should use preserved display forms and controlled aliases. Conceptual search can use reviewed synonyms, but should not silently equate different constructs.

Pagefind deserves evaluation because it offers static language-specific indexing. However, its documented language support is not uniform, and unsupported interface translations can fall back to English. MARSAM’s Malay requirements and Chinese segmentation must be explicit acceptance conditions. [Pagefind](https://pagefind.app/docs/multilingual/)

Language changes should preserve the current item and meaningful filter state. When a corresponding translation is absent or stale, the interface should explain that condition rather than implying equivalence.

---

## 11. Accessibility requirements

The proposed target should be **WCAG 2.2 Level AA**, supported by manual testing and a published account of remaining limitations. Component-library adoption and automated scores should not be represented as conformance. [W3C](https://www.w3.org/TR/WCAG22/)

### Reading and perception

Normal text should meet the applicable 4.5-to-1 contrast requirement, with the relevant 3-to-1 threshold for large text. Essential interface boundaries and states also need appropriate non-text contrast. Decorative gold should not become low-contrast metadata simply because it fits the palette. Status must never be conveyed only through colour. [W3C](https://www.w3.org/TR/WCAG22/)

Text enlargement and reflow need testing with long titles, identifiers, bibliographies, and RTL content. The WCAG reflow requirement uses a 320 CSS-pixel width for the relevant vertical reading case. Wide data tables need carefully justified contained scrolling rather than causing the whole page to overflow. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

### Interaction

A 44 CSS-pixel target is a useful MARSAM design goal for prominent touch controls. It should not be misrepresented as the universal WCAG 2.2 AA minimum. The AA target-size criterion uses 24 CSS pixels with specified exceptions. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

Menus, language selection, search dialogs, filters, saved items, and citation actions need visible focus, predictable keyboard operation, and understandable names. Sticky headers and overlays must not obscure focused controls. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

### Content and alternatives

Videos need reviewed captions and transcripts. Charts need equivalent data and explanations. Decorative motifs should be excluded from the accessibility tree. Book covers may have empty alternative text when an adjacent, correctly labelled link already communicates the same purpose, but meaningful information must not disappear with the image.

### Future test matrix

Test representative journeys in Chromium, Firefox, and WebKit, followed by actual assistive-technology testing. Suggested combinations include NVDA with Firefox, VoiceOver with Safari, and TalkBack with Chrome. These are proposed test environments, not environments validated in this investigation.

Include keyboard-only operation, reduced motion, forced colours, enlarged text, narrow screens, unavailable images, blocked storage, and JavaScript-disabled catalogue access.

---

## 12. Visual direction and design tokens

### Recommended visual concept

**A contemporary scholarly reading room with a restrained Turkish cultural reference.**

The current ebru and architectural ornament should remain a supporting vocabulary. It should not make the platform look like a historical reconstruction, a religious authority, or a luxury publishing advertisement.

The present asset documentation appropriately distinguishes contemporary ebru, original geometric drawings, and historical inspiration. Preserve that distinction. 

### Proposed token structure

| Layer | Purpose | Illustrative direction |
|---|---|---|
| **Primitive tokens** | Raw colour, spacing, radius, and type values. | Small, documented scales rather than repeated independent hexadecimal values. |
| **Semantic tokens** | Meaning in the interface. | Reading surface, primary text, secondary text, link, focus, border, warning, draft state. |
| **Component tokens** | Controlled exceptions. | Catalogue row spacing, masthead height, disclosure padding, citation panel border. |
| **Locale adjustments** | Script-specific needs. | Arabic line height, CJK heading scale, language-specific text width and letter-spacing rules. |
| **Mode adjustments** | Accessible alternatives. | Reduced motion, print, forced colours, and any later high-contrast presentation. |

The existing palette supplies reasonable candidates, including paper `#f8f5ee`, body text `#293f49`, ink `#173f53`, and petrol `#195567`. These are existing implementation values, not newly approved university brand specifications. Their actual combinations need contrast testing. 

For future prototypes, I recommend a restrained spacing scale based on 4, 8, 12, 16, 24, 32, 48, and 64 units, expressed through relative CSS values where appropriate. Long-form text can begin around 18 pixels on desktop, with script-specific evaluation rather than a universal font-size formula.

Keep expressive serif headings where they remain legible. Use dependable text faces for long reading and controls. Do not globally apply uppercase or letter spacing to Arabic and Chinese.

### Where ornament belongs

Use it selectively in the homepage entry, topic dividers, collection introductions, and footer credits. Keep catalogue results, forms, bibliographic detail, and long-form reading predominantly plain.

The mobile hierarchy should prioritize an understandable title, proposed status, purpose, and useful action over the decorative panel.

---

## 13. Motion and interaction policy

**Motion should explain a state change, not manufacture an atmosphere.**

For an initial prototype, short transitions around 120 to 200 milliseconds are a reasonable design starting point, not an accessibility standard. Reduced-motion mode should remove unnecessary movement while preserving feedback.

Appropriate uses include revealing a disclosure, acknowledging a saved item, and helping users track a deliberate panel change. Inappropriate uses include continuously animated ebru, floating manuscripts, parallax reading surfaces, automatic carousels, and headings that appear one character at a time.

CSS and native browser behaviour should be the first choice. Consider Motion only where a specific interaction cannot be handled clearly with simpler means. Do not install both current Motion and archived Motion One as though they were complementary requirements. [GitHub](https://github.com/motiondivision/motion)

Hover effects must have an equivalent focus treatment. Core information should be immediately available, not delayed until an animation or scroll trigger completes.

---

## 14. Data visualization and knowledge-graph opportunities

### First opportunity, describe the collection honestly

The earliest useful visualizations would show the composition of the **selected MARSAM collection**, such as publication years, resource types, research methods, or available languages.

Every visualization should state its denominator, inclusion criteria, update date, and missing information. Nine selected books and eight selected recent papers do not justify claims about the entire field.

### Second opportunity, evidence maps

After method and population fields are reliably curated, MARSAM could offer a matrix connecting topics, study designs, populations, countries, and inspection depth.

This would be more useful than a decorative network because it could expose where evidence is concentrated and where the catalogue lacks coverage. A blank cell would mean “not represented in this curated dataset,” not “no research exists.”

D3 or ECharts could support such views, with a table carrying the same information. Library-provided accessibility features would remain only part of the implementation. [d3js.org](https://d3js.org/)

### Third opportunity, bounded scholarly relationships

A later graph could connect works to authors, topics, methods, editions, and cited sources. Each edge should have an explicit type and provenance. A shared author must not create a “MARSAM member” relationship.

Cytoscape.js is a plausible candidate for this task. React Flow is better considered for an editorial process diagram or workflow editor. Neither should replace an accessible catalogue or list of relationships. [Cytoscape.js](https://js.cytoscape.org/)

Three-dimensional navigation is not recommended for the present collection. It would create considerable interaction and accessibility work without an established scholarly task that requires spatial depth.

---

## 15. GitHub Pages and static-site constraints

### Preserve the actual deployment topology

The source repository and publishing repository are different. The documented process generates the application and replaces only the `MARSAM/` subtree within the existing user-site repository. A future agent must not overwrite the host’s root or unrelated sites. 

### Static HTML is an advantage, but not a backend

GitHub Pages serves static content. It does not provide the application server needed for authenticated editorial approval, protected uploads, participant databases, or private clinical records. A future CMS, survey service, or repository backend would require a separate architecture and approval decision. [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

### `/MARSAM/` must be treated as a deployment contract

Every generated route, stylesheet, script, image, citation download, search index, and future worker or visualization asset must resolve under the configured base.

The current `normalizeBase` and route validation already provide a useful contract. Preserve it through any future generator or framework change. 

### Generated configuration files are not proof of host behaviour

The build emits an `_headers` file, but that filename is not itself evidence that GitHub Pages applies the listed headers. The deployment needs actual HTTP-header checks. The HTML meta CSP is also not equivalent to every response-header directive, particularly `frame-ancestors`.  [GitHub](https://github.com/orgs/community/discussions/54257)

Similarly, the generated `/MARSAM/robots.txt` is not the host-root robots file. Robots rules belong at the appropriate top-level location, and `noindex` is not access control. A crawler blocked from reading a page may not see its `noindex` instruction. [Google for Developers](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)

### Missing-page behaviour needs a real route test

Generating `/MARSAM/404.html` does not establish that the user-site host will serve it for an unknown MARSAM path. Future verification should request a genuinely nonexistent URL and inspect the response. The current generated 404 also uses older stylesheet layers without the heritage stylesheet, which is a separate consistency issue. [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) 

### Browser storage is not isolated by folder

The saved-reading list uses local storage. Browser storage is associated with the origin, not a `/MARSAM/` security boundary. Because other projects share the user-site origin, a distinct path should not be described as a private storage compartment. The feature should explain device-local persistence and provide an easy clear action.  [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)

### Release evidence should be durable

The recorded release verification is useful, but the long-term record should not depend exclusively on short-lived Actions artifacts. Preserve a compact manifest with source commit, generated artifact identity, test scope, approvals, known limitations, and rollback target.

The inspected delivery documentation records successful historical checks while explicitly distinguishing them from human academic and language approval. That distinction should remain in the future release contract. 

---

## 16. Recommended design-system and document package before coding

The following is a proposed package, not a set of files created during this investigation.

| Document or specification | Required contents | Human decision required |
|---|---|---|
| **Product and scope brief** | Audience priorities, purpose, actual capabilities, excluded clinical functions, proposed institutional status. | Project owner and appropriate institutional representative. |
| **Authority and identity matrix** | Every proposed institutional statement, logo configuration, role, partnership, and supporting authorization. | Institutional and brand approval. |
| **Information architecture and route register** | Primary tasks, navigation, canonical record routes, legacy routes, empty-section policy, `/MARSAM/` constraints. | Product and editorial ownership. |
| **Design direction and token specification** | Palette roles, typography, spacing, ornament limits, responsive behaviour, script adjustments. | Design review and accessible prototype evaluation. |
| **Component contracts** | Anatomy, inputs, states, keyboard behaviour, touch behaviour, translations, no-JavaScript fallback, print behaviour. | Design and accessibility review. |
| **Content and provenance schema** | Work, version, person, editorial item, source assertion, review, translation, rights, and institutional relationship models. | Academic editor and metadata specialist. |
| **Locale glossary and review matrix** | Eight independent language responsibilities, terminology, source hashes, stale-translation rules, approval scope. | Qualified language and subject reviewers. |
| **Rights register** | Code licences, book covers, ebru derivative, logos, quotations, full texts, instruments, and allowed uses. | Rights holders or authorized reviewers as applicable. |
| **Accessibility and performance plan** | Browser and assistive-technology matrix, test tasks, measurable budgets, manual checks, exceptions. | Accessibility and engineering ownership. |
| **Deployment and release decision record** | Source and host repositories, CI suites, public versus approved publication, headers, 404, robots, rollback. | Maintainer and release authority. |
| **Agent operating contract** | Read-first files, prohibited assumptions, permitted change scope, dependency policy, evidence requirements, stop conditions. | Project owner. |

A component contract should contain realistic examples, not merely a screenshot. For MARSAM, a citation panel should be shown with a long German title, Chinese text, Arabic text containing an English DOI, multiple authors, missing access information, an unresolved metadata conflict, and a stale translation.

The document package should consolidate existing material. Adding another “final design plan” beside contradictory older plans would repeat the present maintenance problem.

---

## 17. Phased handoff plan for future coding agents

| Phase | Future work | Gate before proceeding |
|---|---|---|
| **0. Authority and rights** | Resolve masthead treatment, responsible ownership, source and asset permissions, and public-preview status. | Approved statement of what MARSAM may publicly claim. |
| **1. Product and information architecture** | Test audience priorities, simplify navigation, define catalogue views, and specify search tasks. | Approved journeys and route model. |
| **2. Design contracts** | Define tokens, reading layouts, source panels, catalogue rows, language controls, and mobile hierarchy. | Reviewed prototypes across representative scripts and accessibility states. |
| **3. Structural implementation** | Replace fragile page-decoration patterns with explicit composition, reduce competing CSS layers, and preserve stable IDs and routes. | Existing functionality retained under both root and `/MARSAM/` builds. |
| **4. Discovery and provenance** | Improve search, source status, record relationships, filters, and translation-version handling. | Verified retrieval tasks and reviewed academic terminology. |
| **5. Accessibility and release** | Align CI with the actual release path, add missing browser and manual checks, verify headers and unknown routes, preserve unrelated host content. | An exact approved release manifest and clearly documented unresolved limitations. |
| **6. Optional extensions** | Consider evidence maps, a bounded scholarly graph, authenticated editing, or approved research participation infrastructure. | A demonstrated user need, suitable governance, and a separate implementation decision. |

Each coding-agent task should identify the exact files it may change, the behaviour it must preserve, the evidence it must produce, and the conditions under which it must stop.

“Improve the design” is not an adequate handoff. “Improve mobile catalogue discovery while preserving eight locales, source review distinctions, keyboard operation, and `/MARSAM/` routes” is much closer to an executable specification.

---

## 18. Open questions and risks

### Decisions requiring human or institutional authority

The following remain material.

Who is authorized to approve MARSAM’s name and relationship to Marmara University. Which logo configuration, if any, is approved for a public proposed-project site. Who owns the code, original editorial material, and commissioned visual work. Who has final scientific responsibility. Who reviews each of the eight language versions. Which rights permit the current book covers and any future extracts or instrument material to be displayed.

The repository’s approval flags do not resolve these questions. They correctly record that approval has not been established. 

### Product questions

The project also needs to decide whether its immediate priority is a Turkish teaching resource, a professional reference library, an international research discovery platform, or a broader public knowledge service. It can eventually serve all four, but the initial homepage and editorial workload need a clear order of priority.

A related question is whether the collection represents the work of a particular academic network or aims to represent the field. Both are legitimate scopes. They require different inclusion policies and different claims about coverage.

### Evidence limitations in this investigation

The repository audit examined current source, selected records and components, documentation, tests, Actions definitions, and stored release evidence. It did not execute the application or establish present-day user outcomes.

Benchmark inspection was based on official documentation, repositories, licence files where available, and indexed official pages where direct retrieval was incomplete. Not every commercial item or institutional design asset received a full licence audit. Eight-language accessibility and translation quality were not independently validated for the benchmark systems.

The term **“thereej” remains unresolved**. The searches did not identify a reliable software project matching it. No substitute has been assumed.

### Final recommendation

**Retain MARSAM’s static foundation and cultural character, but make the next design iteration a discovery, provenance, and governance improvement.**

The most valuable outcome is not a more elaborate background. It is a platform where a student finds the right starting point, a practitioner recognizes the limits of a source, a researcher retrieves an accurate citation, a public visitor understands the platform’s status, and an editor knows exactly what has and has not been approved.