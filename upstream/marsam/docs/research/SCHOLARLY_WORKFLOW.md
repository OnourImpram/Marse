# Scholarly evidence workflow

This release extends the existing static site. It does not claim a systematic review, formal centre establishment, clinical service, licensed instrument translations or completed human review.

## Selection and scope

SCOPE_AUDIT.json covers all 27 records in the 0.8.3 catalogue and all 11 additions. The public catalogue has 36 records after two exclusions. A borderline self-help record can return only when a concrete scholarly or professional-training role is substantiated. Exclusion is an editorial scope decision, not a judgement of overall merit. The original records remain in publications-data.json and git history.

The general-looking CBT, group-counselling and psychotherapy-theories titles remain because their specific editions explicitly concern spiritual approaches. PRISMA and WHO AI ethics remain contextual methods resources and are not presented as evidence for spiritual intervention efficacy. Books, scales, guidance and outcome research have distinct roles.

Recent research means the curated 2025–2026 papers. Foundational psychometrics, older trials and cohorts are discoverable in the library and thematic evidence page, not falsely labelled new. Homepage evidence selection explicitly includes international synthesis and Turkish qualitative research instead of selecting only the most recent founder-associated record.

## Evidence records

src/scholarship-data.json contains original metadata, a shared factual brief and eight editions. A brief records design, population, result direction, inspection scope, check date and, where checked, quantitative estimates. Edition finding and limit fields are short editorial descriptions, not article abstracts or licensed instrument translations. Original titles and source identifiers remain available.

The actual inspected support was publisher abstracts, publisher-supplied Crossref abstracts and metadata, and institutional measure descriptions. The RCT abstract was read through Europe PMC. Some publisher full pages were accessible, but this release deliberately retains abstract-level inspection status rather than implying a complete methods appraisal. No comprehensive correction/retraction surveillance, rights clearance or independent scientific review is claimed. Transport logs are separate from these judgements.

A nonsignificant superiority test is not an equivalence test. This distinction is stated explicitly for the 132-person pilot CBT trial even though the article abstract itself uses stronger equivalence language. Cross-sectional mediation claims are not promoted to causal explanations. A candidate trauma mediation article was not added before its publisher update history could be resolved. A 2026 LGBTQIA+ review with incomplete inspectable support remains a candidate, not a verified public record.

## Equal editions and freshness

No new locale is a source language. The shared brief has a canonical SHA-256 hash. Each edition stores the briefHash that the author actually used. Build validation compares stored values with the current brief and fails for any mismatch or missing title/finding/limit. Changing a brief must trigger a substantive check of every locale. Never refresh hashes blindly to make a build green.

The emitted scholarly-editions.json records claim IDs, source IDs, locale edition hashes, brief hashes and pending human status. This tests presence and freshness, not semantic equivalence. A competent speaker and scientific editor must examine each edition before human approval can be recorded. New content is AI-assisted drafting. Independently structured editions do not imply eight independent people or expert review.

Existing legacy editions are preserved and explicitly marked legacy-seed in the earlier translation ledger. They were not silently relabelled as rewritten shared-brief editions. This avoids erasing provenance or claiming a whole-site language review that did not occur. TERMINOLOGY.json provides a 14-concept working glossary with scientific boundaries, also pending human review.

## Maintaining selection

Run `node scripts/discover-literature.mjs --out /tmp/marsam-candidates.json` to retrieve at most 20 unscreened Europe PMC candidates. On a managed proxy host using Node 24, `node --use-env-proxy` may be needed. Override `--query` for a new date window or research question. The saved query, timestamp and total hit count document the search. This narrow database query is not a systematic field search and has limited coverage of Turkish and regional scholarship.

The script cannot write candidates into src, public or dist. It never edits the catalogue or marks a source included, reviewed or approved. An editor must inspect the primary record, resolve DOI/version identity, check scope and correction notices, document study design and limits, then author eight editions and update the audit. Automated discovery is not automated publication.

## Benchmarks and deliberate departures

The existing repository already contains academic benchmark research. A focused current check revisited Duke’s research/publication resources, Harvard Human Flourishing’s publication catalogue, IAPR’s scientific exchange framing and ASERVIC’s current best-practice page. Useful lessons are explicit publication identity, methods visibility and separation of professional guidance from research findings. These are editorial inferences from the inspected pages, not evidence that MARSAM has a relationship with those organizations.

- https://spiritualityandhealth.duke.edu/index.php/research/
- https://spiritualityandhealth.duke.edu/index.php/publications/crossroads/
- https://hfh.fas.harvard.edu/publications
- https://www.iaprweb.org/about-us/
- https://aservic.org/aservic-best-practices/

We preserved the approved ebru portal, warm palette, çini background, existing static architecture, research templates and useful reading dossiers. Six connected themes form one coherent evidence page rather than many shallow new sections. Four instrument profiles extend the existing measurement guide rather than duplicate its methodology. No founder portrait was invented. Founder status is the project owner’s supplied description of the academic initiative, while the academic profile is linked to Marmara AVESIS. No administrative directorship or formal establishment is inferred.

## Remaining human work

Source verification remains V1 / PARTIALLY_VERIFIED. All scientific, native-language and institutional approvals remain false. Quantitative source summaries and psychometric interpretations require expert review. The four instrument profiles are starting points, not a complete inventory of adaptations. A screen-reader user study, native-speaker usability study and full clinical applicability appraisal have not been performed. The technical preview can be published under the owner’s existing authorization without treating those pending approvals as complete.
