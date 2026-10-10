# Public precedents and source roles

Targeted inspection date: **2026-10-01**. This is a focused architecture review, not a systematic survey of research centers. No branding, page copy, images, restricted tools or course recordings were copied. The following observations support design choices, not institutional partnerships.

| Public source | Inspected function | MARSAM design inference |
| --- | --- | --- |
| Duke Center for Spirituality, Theology and Health — https://spiritualityandhealth.duke.edu/index.php/education/education-programs/ | Education programs and research-oriented learning | Separate reading paths, external education resources and actual approved programs. Do not imply that our reading path is an accredited course. |
| Human Flourishing Program, Harvard — https://hfh.fas.harvard.edu/publications | Topic-grouped publication catalogue with search | Connect topics to source records rather than maintaining an undifferentiated publication list. |
| Harvard measures — https://hfh.fas.harvard.edu/measuring-flourishing | Measurement resources and differing usage terms | Keep item permissions, translation and local validation separate. Link-only in this preview. |
| Danielsen Institute — https://www.bu.edu/danielsen/center-for-the-study-of-religion-and-psychology/research-publications-and-projects/ | Research areas linked to clinical and educational questions | Connect proposed work areas to learning and evidence without inventing active MARSAM projects. |
| GWish — https://gwish.smhs.gwu.edu/gwish-related-articles-books-and-media | Articles, books and media | A resource type is part of the data model, not only a separate navigation menu. |
| GWish FICA — https://gwish.smhs.gwu.edu/programs/transforming-practice-health-settings/clinical-fica-tool | Current tool landing page and rights statement | No questions, excerpts, translations or adaptations are reproduced; preserve original-source link and permission warning. |
| GWish SOERCE — https://lucee.app.smhs.gwu.edu/gwish/soerce/ | Educational resource discovery across resource categories | Topic/type filters and reusable catalogue entries. |
| Royal College of Psychiatrists spirituality resources — https://www.rcpsych.ac.uk/members/special-interest-groups/spirituality/resources/ | Books, education and resource archive | External resources need context and do not imply blanket endorsement. |
| TOAD — https://toad.halileksi.net/ | Turkish measurement directory | Relevant external directory, not an undocumented API integration or authorization to republish instruments. |

## Academic seed records

`src/content.mjs` is the complete machine-readable seed record. It is exported as `dist/data/source-ledger.json`. Each record separates title, original citation, URL, material type, inspected scope, check date, verification depth and limitation.

The introductory dossiers use bounded references to ASERVIC 2025, Vieten & Lukoff 2022, Captari et al. 2018, Swift et al. 2022, Tunç & Ekşi 2025, Hodge 2021, Pargament 2023, publisher metadata for the 2024 Ekşi-edited theories book, PRISMA and WHO AI-health ethics resources. The records do not imply that all full texts, supplements, current corrections and permissions have been exhaustively checked.

In particular, the meta-analysis record distinguishes psychological distress from spiritual well-being and does not infer equivalence from a nonsignificant contrast. The preference study remains observational. The Turkish qualitative study is not population prevalence or intervention-effect evidence. The FICA record is not a scale translation or scoring implementation.

## Content versus source language

Five-language catalogue descriptions and reading dossiers are newly drafted explanations and educational prompts. They are not authorized translations of the linked works. Original publication titles, authors and DOI strings remain intact. Native-language academic review remains pending for all editorial translations.

## Not imported

No private WhatsApp transcript, unpublished book chapter, student reflection, PRISMA working dataset, dissertation attachment, participant record or protected instrument content is in this repository. Files shared for earlier coursework were not silently repurposed as public website content.
