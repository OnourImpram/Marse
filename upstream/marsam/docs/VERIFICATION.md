# Verification record

## Executed checks

- `npm test`: 12 Node tests, passing after the initial expected failure recorded in `verification/red.txt`.
- `npm run build`: 241 generated pages plus the 404 file. 240 are localized routes; content counts are 18 sources, 8 dossiers and 3 learning paths.
- `npm run test:build`: 9 passing tests. Includes every generated internal link, anchor, asset and citation download, locale parity and blocked publication mode.
- `python tests/browser_check.py --offline-fixture`: 96 passing fixture and separate HTTP checks. Source: `verification/browser-check.json`.

## Browser environment limitation

The browser installed in the runtime denied navigation to local and test URLs with `ERR_BLOCKED_BY_ADMINISTRATOR`. Browser policy was not modified. Visual inspection therefore used local HTML inserted into an offline document, embedded stylesheet and the actual application script. Local storage, fetch and download boundaries were mocked for DOM interaction tests. CSP was omitted only from the **test fixture**, not from the generated website.

Screenshots were produced for all five home-page languages at 1440px and 390px, with mobile deep-page checks for the library, dossier, source and editorial pages. Catalogue filtering, Unicode search, modal focus and Escape, language-link preservation, reading-list state, denied storage and the local contribution tool were exercised. HTTP response codes and security headers were checked against the real Node server separately.

This does not establish live-browser end-to-end navigation, native storage persistence, real download behaviour, clipboard permission behaviour, browser CSP enforcement, screen-reader correctness or multi-browser compatibility. The same test script has a live-server mode for a later unrestricted environment. No WCAG conformance or security certification is claimed.

## Scientific limits

Compilation, route and UI tests do not verify source truth, translation equivalence, clinical appropriateness or institutional approval. All editorial drafts and source depth limits remain visible. External URLs were inspected selectively during research, not crawled in a fresh automated full-link audit by the offline build.

## Re-run

```sh
npm run check
npm run preview
# in a second terminal, with Python Playwright and a working Chromium:
python tests/browser_check.py --browser /path/to/chromium
```

For a subdirectory deployment, rebuild with `BASE_PATH=/MARSAM/` and re-run the Node checks and HTTP/browser tests. `PUBLISH=true` remains blocked by design.
