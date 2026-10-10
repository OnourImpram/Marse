# MARSAM Implementation Plan

> For agentic workers: execute sequentially; keep read-only research, reversible preview development, and publication authorization separate.

**Goal:** Build a content-first, five-language, responsive research and learning portal preview.

**Architecture:** Node.js static generation from typed-by-validation locale/content records. Shared templates render meaningful HTML. Small progressive enhancement script handles discovery tools. No patient database, account system or external analytics.

**Tech Stack:** Node.js 22+, ES modules, HTML5, CSS, browser JavaScript. Node test runner; Playwright for browser verification.

**Spec:** docs/superpowers/specs/2026-10-01-marsam-design.md

## Global constraints

- Locales: tr, en, de, zh, ru. No silent fallback or fabricated human translation approval.
- Preview is not an established/affiliated/clinical institution.
- Academic synthesis, evidence, recommendation and verification depth stay distinct.
- No private source files, clinical records or restricted instrument items.
- Website deployment and backend provisioning are not part of this authorization.

## Review focus

- Direct deep links and locale changes must preserve the current resource.
- Empty research/video/news states must not imply fake activity or registration.
- Search must tolerate Turkish diacritics and work for Chinese text without space segmentation assumptions.
- Draft metadata must not be presented as reviewed content, permissions or ethical approval.
- Base-path hosting must preserve assets, internal links and 404 behaviour.

## Tasks

1. Source model and tests: write failing tests for exact locale keys, citation references, HTTPS-only URLs, publication gates and HTML escaping. Implement src/lib.mjs and localized records. Run npm test.
2. Content: add bounded introductory reading files and source records, each with all five languages, local source pointers, limitations and review state. Reject missing fields during build.
3. Rendering: create shared shell, information architecture, catalog filters, dossier reading pages, learning paths, research workspace and governance pages. Build real route files per locale.
4. Browser interaction: implement dialog search, bookmark list, citation copy/export, accessible navigation, print and local-only contribution download. Never post user text to an external service.
5. Verification: test core contracts, all generated internal links, language parity, hostile payloads, navigation, mobile overflow, keyboard search, local storage failure and form boundaries. Inspect screenshots in all five languages.
6. Delivery: record commands and limits; compare remote/local files; open review PR and provide runnable archive. Do not claim deployment, scientific approval or native-language review.
