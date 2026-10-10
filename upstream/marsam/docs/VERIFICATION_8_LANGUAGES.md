# Eight-language verification receipt

Application version 0.2.0. Checked 1 October 2026.

## Exact application snapshot

Commit `959f89f6878645db50e1eb19525d22f3b9c1f71b` contains the eight-language application and `verification/live-browser.json`. The 24 application, localization and related documentation files were downloaded from the GitHub Actions artifact and byte-compared with the local implementation. All 24 matched. Subsequent housekeeping changed the README, this receipt and CI configuration only, not the tested application.

## Executed checks

- 20 Node unit/content/locale tests passed.
- 9 generated-site/link tests passed.
- Both suites passed with `BASE_PATH=/` and `BASE_PATH=/MARSAM/`.
- 642 live HTTP Chromium checks passed in GitHub Actions run `36859526229`.
- No mocked navigation, fetch, local storage or downloads were used by `tests/browser_e2e.py`.
- No uncaught JavaScript exceptions or POST requests were observed by that test.

The live suite covered all eight locales, viewport widths 320, 390, 768 and 1440, and home, library, dossier, source, editorial and contribution pages. It exercised real same-resource locale changes, persistent and cross-language reading lists, a native local-only JSON download, Arabic/Indonesian/Malay searches, literal hostile queries, Arabic without JavaScript and LTR citation isolation.

The report counts assertions, not independent participants, scientific validations or 642 separate features. Real source URLs were not all rechecked by browser tests. Clipboard permissions, screen-reader use, Safari/Firefox and native-language expert review remain outside this test's scope.

## Earlier local fixture

The development container blocked direct browser HTTP navigation by administrator policy. No policy was changed. A separate offline fixture passed 176 checks with mocked browser I/O and inspected rendered pages. Those results are not the live test above and are not labelled end-to-end verification.

## Reproduction

```sh
npm run check
python -m pip install playwright==1.57.0
python -m playwright install chromium
python tests/browser_e2e.py
```

The browser test starts and stops its own loopback server on port 4188. GitHub CI installs required operating-system browser dependencies and runs both path configurations before restoring the root build.

## Repository and publication boundaries

The one-time hash-checked source transfer workflow was removed after successful materialization. The remaining preview workflow is read-only and never deploys or merges. Pull request 1 is the review surface. Main remains unchanged.

Content and translations remain AI-assisted drafts. Technical results do not provide scientific, language, clinical, legal or institutional approval. MARSAM remains a proposed center's development preview.
