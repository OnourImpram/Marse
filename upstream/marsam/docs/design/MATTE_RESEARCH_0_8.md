# Matte panel and research workbench. Version 0.8.0

Owner request, 2 October 2026. Remove the white glare shown behind the MARSAM lettering and adapt the supplied academic-content and design investigation to the existing website. This change does not replace the approved heritage visual identity.

## Diagnosis and correction

The source had three contributors to the white patch. The manuscript interior had a radial gradient. Its after pseudo-element placed a second white radial gradient across the middle. The wordmark had a luminous pale text shadow. These are removed at their source. A solid #f4efdf paper surface supports the existing full-interior rosette at uniform 0.32 opacity. The ebru frame, arch, typography, Marmara logo and planned academic hierarchy are retained. There is no new image, blur filter, animation or JavaScript dependency.

The rejected homepage paragraph, search form, shortcut row, floral ornament and separate top rosette remain absent. Search is available in the header and dedicated route. Later annotated owner decisions override the earlier research report's conflicting homepage recommendations.

## Source-to-implementation map

The owner supplied “MARSAM için Akademik İçerik, Açık Bilim ve Araştırma Altyapısı Geliştirme Raporu”, dated 2 October 2026, and “MARSAM design and UX research report”, dated 1 October 2026. These are planning and design documents, not completed research or authority to claim human review. The reports' old catalogue versions describe earlier snapshots.

| Source proposal | Implemented object | Scope and limitation |
| --- | --- | --- |
| Structured research summary standard | Eight-language research reading guide and blank JSON/CSV extraction templates | No invented sample, effect size, risk rating or completed review |
| Measurement evidence observatory | Eight-language measurement guide and blank evidence template | Does not distribute questionnaire items or claim permission to administer a measure |
| Türkiye data comparisons | Eight-language data-access guide, empty crosswalk and access manifest | Official-provider links, no WVS, EVS, ESS or MIDUS raw data hosted |
| Reproducible research layer | Catalogue CSV, Python script, notebook, Quarto companion, exact checksum manifest and visible inventory table | Actual selected catalogue metadata only. Not a field census, clinical dataset, meta analysis or statistical evidence map |
| Metadata and citation interoperability | Research-object schema, exact-source translation records, CSL JSON catalogue export | Original titles, author order and underlying rights remain separate |
| Native, accessible discovery | Four guide routes linked from the existing Research page and searchable in each language | No new primary-navigation category or homepage search block |

The tables, six-month schedule, labour estimates and target numbers in the planning report are not represented as already achieved. Personal assignments, research proposals, unpublished book chapters and personal reflections are not published.

## Supporting official documentation

The new method guides link to the following primary sources, consulted on 2 October 2026. The cited guidance supports their bounded educational purpose. It does not validate MARSAM or establish a partnership.

* PRISMA 2020. https://www.prisma-statement.org/prisma-2020
* COSMIN methodology guidance. https://www.cosmin.nl/tools/guideline-conducting-systematic-review-outcome-measures/
* WVS documentation and conditions. https://www.worldvaluessurvey.org/WVSContents.jsp?CMSID=Documentation and https://www.worldvaluessurvey.org/AJDownloadLicense.jsp
* EVS documentation. https://europeanvaluesstudy.eu/surveys/integrated-values-surveys/data-and-documentation/
* ESS Data Portal. https://www.europeansocialsurvey.org/data-portal
* MIDUS conditions. https://midus.wisc.edu/data-access/
* Wilkinson et al. (2016), FAIR principles. https://doi.org/10.1038/sdata.2016.18
* Jupyter nbconvert. https://nbconvert.readthedocs.io/en/latest/usage.html
* Quarto Python documentation. https://quarto.org/docs/computations/python.html

The guides paraphrase these sources and the supplied report. No source text, external logos or third-party forms are copied. Each source relationship is classified in src/research-guides.json. Existing publication records are not silently marked as newly inspected.

## Reproducibility contract

The Node build creates the CSV and its exact SHA256 checksum from existing catalogue records. It computes the visible inventory. A separate Python process recomputes it, validates unique identifiers and compares with the manifest. The Jupyter kernel executes the same analysis from the downloadable notebook. Tampered bytes and duplicate identifiers must fail. The Quarto source is a downloadable companion. A Quarto renderer and browser-based Python execution are not installed or claimed.

All guide text is localized for Turkish, English, German, Simplified Chinese, Russian, Arabic, Indonesian and Malay. Independent scientific and native-language review remain incomplete. Empty template fields explicitly distinguish not extracted from zero, absent evidence or material not reported by an inspected source. No new blanket code, content or dataset licence is assigned.

## Verification and release boundary

Run npm checks at both / and /MARSAM/. Run the budget check, the existing three browser suites, tests/research_e2e.py, and tests/research_artifacts.py. The final suite executes the script and notebook and checks negative cases. Verify the actual public release and screenshots after deployment. Technical success is not human scientific review, accessibility certification or institutional establishment.

Only the generated MARSAM subtree may be updated on the shared Pages host. Preserve every other root entry, including concurrently updated Elif Tasarım content. Original source documents and temporary transport payloads are not part of the public site.
