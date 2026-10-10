# MARSAM scholarly evidence implementation plan

For agentic workers. Use superpowers:executing-plans. Execute inline under the owner's autonomous implementation instruction and obtain one independent final code review.

Goal. Strengthen the existing knowledge platform with source-based selection, balanced international and Turkish evidence, structured measurement resources and equal multilingual substance.

Architecture. Preserve the dependency-free Node static generator. Add independent scholarly data and validation modules, explicit renderers and small integrations into the existing catalogue and shell.

Tech stack. Node 22+, static HTML/CSS/JavaScript, Python test tooling.

Spec. docs/superpowers/specs/2026-10-03-scholarly-evidence.md.

Global constraints. Eight locales tr/en/de/zh/ru/ar/id/ms. Preserve portal assets and palette. No invented claims, human approvals, rights or clinical functions. No unrelated host changes. No automatic bibliography imports into public content.

Review focus. Stale brief changes must fail the build. Removed works must disappear from search/export/public routes. Abstract-level associations must not become causal claims. Arabic identifiers must remain isolated. A date-based feature must not hide international evidence behind the founder's newest publication.

## Task 1. Scope and evidence data

Files. src/scholarship-data.json, src/scholarship.mjs, src/publications-data.mjs, docs/research/SCOPE_AUDIT.json, tests/scholarship.test.mjs.

Interfaces. validateScholarship(data) returns errors. scholarlyPublications projects canonical brief + eight editions to publication records. scopeDecision(sourceId) requires a decision. archivedSourceIds identifies excluded public works.

Steps. Write tests for complete decisions and rejection of missing limits, stale brief hashes and fabricated approval. Observe failure. Implement data validators, curated records and scope filter. Verify node --test tests/scholarship.test.mjs and npm test.

## Task 2. Research experience and measurement

Files. src/scholarly-view.mjs, src/scholarly-copy.json, src/scholarly-content.json, src/editorial.mjs, src/site.mjs, src/campus.mjs, src/catalogue.mjs, src/chrome.mjs, public/site.css.

Interfaces. evidencePage, instrumentOverview, instrumentProfile, founderSection, evidenceRecordPanel return escaped HTML using existing shell. Evidence topic and measure routes join the canonical sections. Search indexes the same localized prose.

Steps. Add rendering/search tests, observe failure. Implement all eight editions, topic syntheses, instrument profiles and founder section. Preserve existing five navigation groups and approved visual. Add source and evidence type near claims. Verify source suite and both root builds.

## Task 3. Review manifests and reusable discovery

Files. src/provenance.mjs, scripts/build.mjs, scripts/discover-literature.mjs, research/templates, docs/research, tests/scholarship.test.mjs.

Interfaces. editionLedger binds exact brief and edition hashes. Parity matrix records present claims/sources/limits and pending human reviews. Discovery produces private candidate JSON only, with no auto-publication.

Steps. Add mutation tests, observe failure. Emit review manifests, attach claim-level provenance, implement bounded literature discovery and maintainable workflow documentation. Verify executable notebook/template checks and budgets.

## Task 4. Release candidate and audit

Files. tests/scholarship_e2e.py, .github/workflows/verify-preview.yml, src/release.mjs, package.json, docs/releases, DELIVERY_STATUS.md.

Steps. Run all relevant existing tests and new scholar journeys. Fix regressions without weakening contracts. Review all new claims and source decisions. Run independent whole-branch review. Record exact files, commit, checks, limitations and deliberate deviations. Push tested review branch and prepare source-bound release. Never describe a candidate as deployed without public byte verification.
