## Owner decision, 5 October 2026, 0.12.0: finished-centre voice

The site reads as the finished website of MARSAM at Marmara University. Visible copy no longer announces a planned centre, establishment stage, digital preview, development preview or website draft in any of the eight languages, and the footer establishment-stage label is retired. This supersedes rule 4's "planned centre status" wording and the earlier footer status requirement. It does not license invented facts: still no establishment date, board, accreditation, staff roster, completed projects, events or statistics without supplied records. AI-assisted translation is disclosed in one plain sentence, not as a draft banner. Every locale is fully localized: English fallback for non-English locales fails the build (`src/roadmap/q-locales.json`, `tests/locale-finish.test.mjs`). Copy changes go through `scripts/apply-copy-fixes.py` (escapes per container, refuses unparsable output) and intentional edition changes are re-pinned with `scripts/rebind-editions.mjs`, which never marks human or scientific review.

## Latest scholarly product direction, 5 October 2026

Preserve the approved continuous heritage portal and the relevance-first editorial model. The 0.11.x line may deepen scientific infrastructure through source-verified evidence bridges, instrument lineage, dataset metadata, construct boundaries, claim provenance and versioned static data. Do not convert source inclusion into clinical endorsement, instrument availability into permission to reproduce items, translation presence into human review, or founder authorship into selection priority. New locale prose may remain English-backed draft only when explicitly marked as not human reviewed. Do not reintroduce generic clinical disclaimer banners.

## Owner-requested notice cleanup, 4 October 2026, 0.10.2

Do not restore the generic clinical disclaimer footer, duplicate article or contribution side notes, blanket reading-path accreditation notice, or repeated draft warning panels. Editorial review information belongs on the existing editorial page and in source-level review records. Preserve real study limitations, citations, rights, attribution, institutional status and the approved continuous portal. Remove obsolete notice markup and CSS rather than hiding them.

## Current portal correction, 4 October 2026, 0.10.1

The owner reported a visible rectangular break after the 0.9.4 CSS seam patch. The two runtime pseudo-element patches are superseded. Display only `portal-continuous-v1.svg`, reproduced by `node scripts/portal-art.mjs` from the unchanged original WebP. It contains one coordinate system and one continuous first-arch contour ending at the diagonal foot, not a rectangle extending across the lower rail. Do not restore independent breakpoint-specific overlays or the forced 480 px mobile source. The original text, right half, centre, outer frame and underlying WebP bytes stay unchanged. Other design and scholarly rules below remain in force.

## Latest owner-approved visual correction, 4 October 2026, 0.9.4

The remaining tiny lower-left seam at the foot of the first outer receding portal layer must be closed using the corresponding correct right-hand segment. Keep the approved WebP assets byte-identical. Preserve the 0.9.3 full first-layer mirror in `::before`, and use only the narrow lower segment mask in `::after` recorded in `docs/design/PORTAL_LOWER_LEFT_SEAM_0_9_4.md`. Do not expand the patch into the floor, inner arches, central panel, outer square frame, MARSAM wordmark or page layout. This 0.9.4 rule supersedes any earlier instruction that leaves `::after` disabled.

## Latest owner-approved visual correction, 4 October 2026, 0.9.3

The right side of the first outer receding portal layer is the geometry authority. The left side must match it exactly in silhouette. Preserve the approved portal WebP bytes and mirror only that complete outer ebru arch layer into the left through the CSS mask recorded in `docs/design/PORTAL_FIRST_LAYER_SYMMETRY_0_9_3.md`. This supersedes the narrower 0.9.2 vertical-strip repair, which did not correct the full first-layer contour. Do not mirror the inner arches, the central panel, MARSAM text, or the full artwork. Do not recolor, regenerate, crop, blur, animate or otherwise redesign the approved visual.

## Latest owner-approved visual, 3 October 2026

Use the exact supplied layered ebru portal artwork recorded in docs/design/APPROVED_PORTAL_ASSETS.json. It supersedes earlier requirements to retain the flat manuscript interior. Only MARSAM appears inside the picture. Do not restore the Arastirma / Ogrenme subtitle, old overlaid rosette, or independent wordmark. Preserve the warm palette, academic typography, Marmara masthead and existing scholarly content. Cini is a restrained background, not a foreground wall covering. The approved square artwork must never be stretched or regenerated. No institutional approval follows from this visual approval.

# MARSAM content and release boundaries

Approved çini refinement, 2 October 2026. docs/design/CINI_0_8_1.md now governs the outer background. Replace repeating edge geometry with original, sparse İznik-inspired botanical compositions. Preserve the existing matte central panel, ebru, Marmara identity, typography, layouts and all content. Do not revert çini to generic geometry in unrelated refactors. Run tests/cini_e2e.py alongside the existing suites.

Latest owner correction, 2 October 2026. docs/design/MATTE_RESEARCH_0_8.md governs the central panel. The interior must remain a solid matte paper surface, with no white radial overlay, glowing text shadow or filter. The ebru frame, full-panel geometry and Marmara masthead stay. The academic development report informs the four research guides and downloadable templates. Planning targets are not completed research. Do not publish private course materials or infer source review or licence approval.

Current design authority: docs/design/SURFACE_0_7_2.md and docs/design/RESTORATION_0_7_1.md, reflecting the owner’s annotated corrections on 2 October 2026. The crossed-out bottom floral and separate top rosette are removed. The original rosette is now a full-interior background. Do not restore the rejected hero paragraph, search form or shortcut row. Search remains in the header and its dedicated page. Restore the approved 0.6 heritage visual identity and Marmara masthead while retaining all 0.7 content and interaction improvements. The planned academic home is Marmara University, Atatürk Faculty of Education, Department of Educational Sciences, Division of Guidance and Psychological Counselling. Do not remove institutional identity or flatten the approved artwork during unrelated refactors. Formal establishment remains pending. The rejected public homepage warning strip and governance promotion are not part of the design. Governance and source-review details remain available on their relevant pages.

1. Build the institution's website, not an individual's research proposal or a directory of design benchmarks. Main heading is the localized centre name. The remit is spirituality and mental health research, education, professional learning and knowledge exchange.
2. Websites supplied for design analysis stay in development documentation. Do not turn their names, logos, home pages, programs or events into public content. Real academic publications may be cited for specific supported claims, with clear provenance.
3. Do not import private course assignments, unpublished book chapters, personal reflections or research records into public site content. Context is not permission to publish it.
4. Do not invent a board, establishment date, affiliations, completed projects, courses, events or video recordings. Maintain the stated planned Marmara University centre status until formal records are supplied.
5. Keep Turkish, English, German, Simplified Chinese, Russian, Arabic, Indonesian and Malay. Preserve Arabic RTL and bibliographic LTR. Missing translations fail the build.
6. Keep source identity, inspection depth, permissions and scientific approval separate. Do not remove genuine citations merely because an institution was also studied as a design reference.
7. Run `npm run check`, `tests/browser_e2e.py`, `tests/scope_e2e.py` `tests/heritage_e2e.py`, `tests/research_e2e.py` and `tests/research_artifacts.py`. Evaluate the actual meaning and purpose of copy, not only absence of technical errors.
8. Publish only the generated MARSAM subtree to the existing Pages host. Read the current host main branch first and preserve every other root entry exactly. Remove obsolete MARSAM routes rather than leaving stale files.
9. Confirm the actual public release identifier, file hashes, interactions and screenshots before announcing a live correction. Technical checks are not human academic, native-language or independent accessibility approval.

## Script-aware visual verification

The verification host must have actual glyph coverage for all eight languages. Install CJK fonts on the test host before judging Chinese screenshots. Keep short action labels on one line without causing horizontal overflow. Test-host fonts must not be included in website assets, source bundles or user deliverables.
