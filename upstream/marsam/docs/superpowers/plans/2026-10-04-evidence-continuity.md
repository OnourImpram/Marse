# Evidence Continuity Implementation Plan

> For agentic workers. Execute natively with superpowers:executing-plans. The owner has explicitly authorized autonomous implementation and scoped review-preview publication.

Goal. Improve scholarly balance and make unnoticed source or locale drift fail the build.
Architecture. Extend the existing shared evidence model, bind draft bytes in a separate ledger, and reuse current scholarly renderers. No frontend framework, new top-level menu, database or visual redesign.
Tech Stack. Node 22, JSON, native HTML/CSS, Python and the existing Playwright acceptance environment.
Spec. docs/cycles/2026-10-04/SPEC.md.

## Global Constraints

Eight editions remain tr, en, de, zh, ru, ar, id and ms. Original bibliography and author order are authoritative. Human and institutional approvals remain false. Preserve public/site.css and portal assets byte-for-byte. No unrelated hosting paths. Only a source-bound institutional review preview is authorized.

## Review Focus

A changed finding with an unchanged brief must be rejected. Metadata changes must invalidate continuity. Mixed-case duplicate DOIs must be rejected. OUT_OF_SCOPE plus retain must not bypass the scope gate. An instrument-use link must never imply validation or a licence.

## Task 1. Integrity gates

Files. Add src/evidence-continuity.mjs and src/evidence-bindings.json. Modify src/scholarship.mjs and scripts/build.mjs. Add tests/evidence-continuity.test.mjs to the package test command.
Interface. validateEvidenceContinuity(records, ledger) returns errors. evidenceContinuityManifest(records) reports per-locale presence and fingerprint matches, never semantic or human approval.
Steps. Write mutation tests. Run and retain RED results. Implement persisted bindings, normalized DOI duplicate detection and the scope rule. Run the new tests and the whole suite. Persist the initial draft fingerprints once, not during builds.

## Task 2. Evidence and reading connections

Files. Add src/evidence-2026-10.json, extend scholarly imports, copy, themes and scope audit. Modify scholarly-view for explicit related readings and instrument-use examples. Add tests/evidence-cycle.test.mjs and tests/evidence_cycle_e2e.py.
Interface. New records conform to the existing source/brief/editions schema. Related source IDs must exist. usesMeasure links bind a study to an existing measure profile. Rendered links remain base-aware and escaped.
Steps. Assert new records and relationships absent at baseline. Inspect primary identities and bounded support. Author each locale from the recorded brief. Add two themes, preserve existing six. Pin new narrative and evidence draft bytes. Exercise all new records through the generator, search and actual citation exports. Run all tests.

## Task 3. Review, documentation and publication

Files. Current README and DELIVERY_STATUS, docs/cycles/2026-10-04 report and receipts, release identifiers.
Steps. Preserve old delivery notes as historical records. Generate a truthful parity matrix and file-change inventory. Review science, institution, clinical limits and language claims sequentially, without claiming independent reviewers. Run both base roots, all existing and new browser suites and research artifacts. Publish only the tested MARSAM subtree. Check the actual public manifest, bytes and native browser journeys before recording delivery.
