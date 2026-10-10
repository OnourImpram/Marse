# MARSE

Maneviyat ve Ruh Sağlığı Araştırma ve Uygulama Enstitüsü.

This repository preserves the complete MARSAM source snapshot and publishes its content using the approved 9 October 2026 Turkish IAPOS design. The public review site is at https://onourimpram.github.io/Marse/ . The hosting mirror writes only the `Marse/` directory in the existing GitHub.io repository; the previous `MARSAM/` site is untouched.

## Authoritative inputs

- `design/approved-tr-iapos.html`: exact user-approved Turkish HTML, SHA256 `e4717c0f224ca1cb20b0b336b5047d86ac62614709cc048a44462b7fbef02e83`.
- `upstream/marsam/`: 284 original tracked files from commit `d5e75021eed775f01005f7df293b845c9aae0514`; retain unchanged.
- `migration/source-lock.json`: per-file integrity manifest.
- `scripts/build.py`: generates the MARSE site using the approved shell.
- `site/migration-manifest.json`: route mapping and explicit institutional-copy dispositions.

## Content

All 1,048 localized source routes (131 per language), 79 original resource records, nine dossiers, eight instrument-lineage records, four dataset records, citation exports and research downloads are carried over. The approved Turkish shell retains its 65 views and adds access to the full collection. Its library has 81 entries: all 79 source-catalogue records plus two books already present in the approved MARSE HTML but not in the source site's active resource catalogue. The full 9-book source data is preserved.

The ordinary 1,024 reading pages preserve their scientific text after the platform-name substitution. The 24 home/about/governance routes receive the documented independent-institute identity revision. The original identity wording remains in the immutable source snapshot, not as a claim of university affiliation in the new site.

## Build and verification

Node 22+, Python 3.11+, Beautiful Soup, lxml, tinycss2, Pillow and Playwright are required for the build and full test suite.

```sh
python scripts/build.py
python tests/integrity.py
python tests/links.py
python tests/browser.py
```

`tests/browser.py` uses a real local HTTP server on a GitHub-hosted runner. It verifies every imported route at mobile and desktop widths, all approved views, key interactive functions, and a pixel-identical first viewport against the approved HTML. It never submits client data. Reports and screenshots are uploaded as workflow artifacts; public file hashes are in `site/file-manifest.json`.

## Scope and evidence boundaries

This is an owner-authorized public **review preview**, not formal establishment, scientific-editor approval, accreditation, or a certificate of language review. MARSE is an independent initiative developed under Prof. Dr. Halil Ekşi's academic leadership. It is not presented as a Marmara University research centre.

The measurement demo uses fictional numerical data. It is not a validated scale and offers no diagnosis, cut-off or treatment recommendation. Original scale catalogue permissions and limitations are retained. No forms transmit identifiable client information; bookmarks/comparisons use a separate MARSE local-storage namespace.

Book covers and third-party resources retain their existing rights. An accessible external publication is not automatically licensed for redistribution. No new rights or approvals are inferred during migration.
