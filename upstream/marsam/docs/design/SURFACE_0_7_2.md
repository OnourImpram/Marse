# MARSAM 0.7.2. Annotated bookplate and background correction

## Owner-specified changes

The red crossed-out bottom floral ornament is removed from the hero markup. The upper geometric rosette is no longer a separate top emblem. Its existing, original SVG is used as a full-size decorative background across the complete arched inner panel, behind the MARSAM wordmark. The yellow and red screenshot annotations are instructions, not palette colours or website assets.

The ebru border and its original asset bytes, arched inner panel, Marmara signature, planned faculty and PDR academic home remain. The wordmark is centred and protected by a soft paper halo rather than a hard rectangular label. The full-panel layer is noninteractive and carries no semantic content.

The earlier marked hero paragraph, search box and shortcut row were still present in 0.7.1. They are now removed from the hero. Header search, keyboard shortcut, standalone search, navigation and catalogue filters remain intact. A test requiring the rejected hero search box is updated to assert the real global search instead.

## General background review

The warm paper palette is retained. The entry surface has a gentle paper-tone transition and geometric margins. Long-page decoration is limited to the outer margins, away from reading text. Reading selections receive a related muted paper surface, and the colophon receives a restrained petrol-tone depth. No moving backdrop, parallax, new raster image, new font or external request is introduced. On narrow screens the page-margin ornament is removed. Print and forced-colour modes remove decoration and keep readable plain surfaces.

These are presentation changes only. Original academic records, authorship, original titles, DOI and ISBN data, translations, source-inspection states and reuse rights are unchanged. No formal institutional or human language approval is inferred.

## Verification and boundaries

New regression tests fail on the prior source for the original reasons, then pass after the change. Browser checks measure the background rectangle against the inner panel in eight languages and four widths, and retain the existing search, downloads, saved state and keyboard checks. Three-engine CI and live checks are required before a publication claim. Actual screenshots must also be inspected, because passing tests do not decide aesthetic acceptance.

Deployment changes only the generated MARSAM subtree. Root identity and Elif Tasarim are preserved from the current host revision. Prior release 0.7.1 did reach the live site successfully. Its interrupted final response is not a failed deployment. The durable prior receipt is ../releases/restoration-0.7.1-live.json.
