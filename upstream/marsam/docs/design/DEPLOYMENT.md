# Static build, verification and publishing contract

Source repository. OnourImpram/MARSAM. Publishing repository. OnourImpram/onourimpram.github.io. Prefix. /MARSAM/.

Node 22 generates actual HTML for every supported locale and route. `npm run check` runs current source contracts, builds and checks every internal link, fragment and citation. Run once with BASE_PATH=/ and again with BASE_PATH=/MARSAM/ and PAGES_PREVIEW=true. `node scripts/budget.mjs` measures gzip estimates and rejects font files in the distributable. These are file-budget checks, not field performance measurements.

The standard verify-preview workflow runs on main, pull requests and manual invocation. It uses matching Playwright 1.61.0 package/image for Chromium, Firefox and WebKit. CJK coverage is installed only on the disposable test host from a commit-pinned official font source. Font bytes are never placed in source, dist or artifacts. Core, scope and layout suites have separate real-HTTP receipts. Their historical compatibility entry points delegate to the current suites.

The source deployment workflow only prepares a source-bound artifact. It does not attempt to replace the source repository's Pages settings or publish to a different host. A publishing workflow checks out an exact tested source, runs the build with /MARSAM/, creates release.json, and stages only the generated MARSAM subtree. Before promotion, read current host main, retain every unrelated root entry, create a child commit and use a non-force ref update. A concurrent host change must cause reconciliation, not a force push.

After promotion, verify the public release sourceCommit and file hashes, then run native browser journeys against the actual public origin. Inspect actual screenshots, normal unqueried entry URLs and downloaded citation files. Record actual HTTP headers and an unknown path. A repository commit or successful build alone is not proof of a live release.

GitHub Pages cannot supply an authenticated CMS, protected upload or participant database. Existing localStorage belongs to the shared origin, not a /MARSAM/ security compartment. There are no app analytics, accounts, external runtime scripts or remote forms.

The generator no longer emits a misleading Netlify-style _headers file. Meta CSP and actual response headers are distinct. Do not claim that GitHub Pages applies frame-ancestors or other headers without measuring them. /MARSAM/robots.txt does not control host-root crawling. noindex is not privacy. An unknown route may use the host's default 404 rather than /MARSAM/404.html. Changing the shared root 404 or robots policy is outside this scoped release.

Archive previous release manifests and compact receipts durably in docs/releases. Actions screenshots are supplementary and may expire. The release record must name source revision, host revision, actual run, engines, checks, measured limits and remaining human approvals. It must never relabel prior failures as passes.
