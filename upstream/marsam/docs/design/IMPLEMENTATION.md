# Scholarly reading room implementation plan

**Goal.** Implement the owner-approved design investigation as a usable eight-language static knowledge platform, without changing the scientific claims or fabricating institutional permission.

**Spec.** RESEARCH_BRIEF.md, approved by the owner in the instruction to apply the report to the GitHub website on 2 October 2026. Its phased plan is executed inline in this workspace. This document resolves implementation details, not new institutional decisions.

**Architecture.** Retain Node 22 static HTML. Build a pure presentation model and explicit shared page shell. Replace layered styles with semantic tokens and one stylesheet. Share one locale-aware search module between generator and browser. Generate provenance and translation manifests from the exact public records.

**Global constraints.** Preserve all eight locales and existing source URLs. Preserve original titles, author order and inspection dates. No external runtime, clinical or participant data, invented membership, private coursework, copied benchmark assets, or implied approval. Only the MARSAM subtree may change on the publishing host. No root-host policy or unrelated-site changes. Source main and the live host are promoted only after tests.

## Tasks and interfaces

1. Model and locale contracts. Create `src/catalogue.mjs`, `src/ui-copy.json`, `src/messages.mjs`, `src/release.mjs`. Derived arrays do not mutate source modules. New message IDs require eight explicit translations. Existing academic copy is preserved. Test import invariance, locale parity and review hashes.
2. Discovery. Create `public/search-core.js`. Export `normalizeExact`, `normalizeLoose`, `queryTerms`, `searchRecords`. Use identifier matches first, original and displayed titles, and locale-aware exact versus tolerant matching. Reuse in `public/app.js` and catalogue filters. Preserve URL state on language change. Test Turkish I, Arabic diacritics, Cyrillic, Chinese, DOI and ISBN.
3. Explicit composition and visual system. Create `src/chrome.mjs`, `src/ui.mjs`, `src/tokens.json`. Update `src/site.mjs`, `src/campus.mjs`, `src/editorial.mjs`, `src/publications-view.mjs`. Remove regex decoration and global view mutations. Five primary destinations, compact proposed-project masthead, search before art, three audience pathways, optional covers/list catalogue view. Replace old CSS files with one `public/site.css`. Test semantic landmarks, no official logo lockup, one stylesheet, no hidden primary content, original citations.
4. Provenance and governance. Create `src/provenance.mjs`, `src/governance.mjs`. Generate typed work, version, access, contributor-mention, review and translation records without author disambiguation guesses. Add separate identity, inspection, scientific review, currency, language and rights disclosures. Add accessible catalogue-composition research view and governance page. Keep full-text and human approvals pending. Test version-bound review invalidation and role-aware citation rules.
5. Verification and deployment. Align source Actions with the complete browser suite. Update legacy tests to current semantic contracts, not blanket name bans or fixed catalogue counts. Test `/` and `/MARSAM/`, real browsers with CJK coverage, reduced motion, forced colours, keyboard, no-JS, query preservation, citations and local-only contribution. Measure asset budgets. Publish an exact source-bound manifest to host subtree only. Inspect true public bytes, unknown routes, headers and real screenshots. Preserve historical docs while indexing the current authority.

## Review focus

Long translated titles must wrap without horizontal overflow. Mixed-direction identifiers must remain readable. A source suggesting a Harvard publication is allowed, a fabricated Harvard partnership is not. Local form downloads must never claim submission. Public source records and translation hashes must change together without becoming approved. Stored source IDs are not private clinical records. No official logo is shown without explicit authorization, but the proposed Marmara context remains explained.

## Deferred decisions

Human scholarly and native-language approvals, institutional authorization, ownership and cover rights clearance remain unresolved. No backend, clinical assistant, survey collection or uncurated evidence graph is introduced. Pagefind is not added because the present small catalogue can meet the tested identifier and language-search contract without a runtime dependency. This is not a claim of equivalent full-text retrieval at scale.

## Completion recovery, 2 October 2026

Recovered the exact candidate c1ee674b5dac4f8eaa96501de83e0c35ef88c219. The last candidate run passed layout and scope suites but failed the WebKit Russian comparison reflow check. Diagnostic run 36969003160 reproduced a 447px document at a 390px viewport. Native WebKit select rendering forced visible overflow despite the authored overflow rule. Changing only native control appearance to none restored the authored overflow and a 390px document. Clipping the control did not fix the layout and was rejected. The fix retains native HTML selects, full option labels, native change events and focus, with a noninteractive decorative chevron. It does not clip the page or discard scholarly titles.

The expanded regression repeats populated comparison at 320px and 390px in every locale and native engine. Permanent verify-preview and artifact-preparation workflows are aligned with the current three-engine suite. No test failure is relabelled as a pass. No formal, scientific or language approval is changed by this recovery.
