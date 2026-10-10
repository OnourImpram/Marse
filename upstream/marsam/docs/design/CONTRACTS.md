# Owner correction, 2 October 2026

RESTORATION_0_7_1.md supersedes the prior visual-identity and homepage-order recommendations below. University identity is visible, with the existing university marks reused unchanged. The planned academic home is identified using verified faculty and department names. A footer and About page carry concise prospective wording. No completed establishment, accreditation or clinical authorization is asserted. Keep the restored heritage composition visible and balanced, including a compact mobile version after the search form. Remove the rejected homepage warning strip and governance promotion. Retain one stylesheet, explicit composition, all current content and working features.

## Earlier 0.7 contracts, retained for rationale and unchanged functional requirements

# Reading-room design and component contracts

## Product and information architecture

Purpose. A proposed multilingual academic platform concerning spirituality, mental health, research, education and ethical access to knowledge. This public review build is not an established centre, an authorized clinical service or an accredited training provider.

The five navigation groups are Explore topics, Library, Learn, Research and About. Search, language and saved records remain persistent utilities. Existing record and dossier routes are preserved. Books and recent papers are views of canonical source records. Empty future media, projects, news and events remain reachable from a secondary disclosure, not the primary navigation.

The homepage presents purpose and proposed status, usable search before the decorative artwork, three audience pathways, selected research and books, topic entry points and editorial information. On small screens the large artwork is omitted rather than delaying discovery. No academic text is hidden behind animation.

## Composition

`src/catalogue.mjs` projects source content into copies for presentation. It must not mutate imported label dictionaries, articles, source descriptions or learning pathways. `src/chrome.mjs` owns header, footer, safe JSON configuration and the complete HTML shell. `src/ui.mjs` owns shared icons and action helpers. `src/site.mjs` renders reading and source detail. `src/campus.mjs` routes collections, comparison and future states. Its compatibility `decorate` is an identity function, not an HTML rewriting stage.

New pages must consume the same shell rather than transform serialized HTML. All localized pages retain one h1, a skip link, semantic main, descriptive navigation and exact base-aware URLs. HTML editorial strings are escaped. External links use HTTPS and preserve provenance. Do not change citation content to make display easier.

## Visual system

`src/tokens.json` contains primitive values organized by semantic role. `scripts/styles.mjs` compiles them into CSS variables at the start of `site.css`. This is a small project-owned token representation, not a claimed DTCG-compliant interchange implementation. `public/site.css` is the sole stylesheet. Do not add successive theme overrides or reintroduce campus/editorial/heritage stylesheets.

Paper surfaces, dark blue and petrol text, restrained gold decoration and a contemporary ebru reference support reading. The palette is not an approved Marmara brand specification. Ornament is decorative and does not convey scientific quality. No continuous motion, autoplay or character-by-character animated text. Reduced motion, forced colours and print are explicit modes. Major controls target 44 CSS pixels where layout permits. Contrast tests exercise semantic text pairs and form boundaries. These targets and automated tests do not constitute WCAG certification.

## Components and states

Navigation. Native details and summaries, keyboard accessible, collapsed mobile contents excluded from layout. Escape closes disclosures. The language menu uses autonyms, lang/hreflang and bidi isolation, not flags.

Search. Native form and dedicated search page. Exact DOI or ISBN before ranked title/text matching. Separate exact case-aware and tolerant matching, with Chinese segmentation when Intl.Segmenter exists. No claim of exhaustive full-text search or psychometric concept equivalence. No scholarly claims generated from a query. Query length is capped at 160 characters.

Catalogue. Existing HTML remains readable without JavaScript. Query, author/editor/contributor and year filters are progressive enhancements. List/cover state has a native pressed button and survives language switching. A filter must not imply that an author is a centre member.

Source record. Preserve original title, identifier, author order and metadata conflict notes. Show separate identity, inspection, interpretation, currency, language and rights dimensions. Keep important limitations visible. Download actual RIS/BibTeX files, never fake a successful action.

Comparison. Up to four valid source IDs. Store only source IDs, not participant information. Exports explicitly deny clinical ranking and scientific approval. A wide table scrolls within a labelled focusable region instead of widening the document.

Contribution. Local preparation only. Required-field errors are summarized with links to fields. The native download states `submission: not-sent`. No server receipt, account, email delivery, editor queue or authorization is implied.

## Multilingual and review contract

Eight separate locales are tr, en, de, zh, ru, ar, id and ms. Chinese uses zh-Hans. Arabic uses document RTL, normal letter spacing and suitable line height. Original names and identifiers are direction-isolated, not blindly mirrored. Russian й must not be folded to и. Turkish exact I distinctions and tolerant I matching are separate operations. Indonesian and Malay are separate dictionaries. Missing required strings stop the build.

New interface text uses stable IDs in ui-copy.json. Legacy academic text is preserved in its current source structure, with generated per-item source and target hashes rather than a risky bulk rewrite. All current interfaces and academic translations remain AI-assisted drafts without human review, including Turkish. A changed source or target invalidates exact-version review. No source language of a publication is inferred from the Turkish editorial seed.

## Acceptance and realistic fixtures

Test long German labels, Cyrillic, Chinese titles, Arabic mixed with Latin DOI, multiple contributor roles, incomplete access rights, stale translations and malformed query strings. Keep tests for original citations, locale parity, no-JavaScript reading and local-only downloads. Use actual native browser state and HTTP. Test scripts are not allowed to replace localStorage, mock network responses or remove CSP to manufacture a pass.
