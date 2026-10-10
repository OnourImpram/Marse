# Continuous portal, 0.10.1

The owner reported the visible lower-left rectangular splice. The prior 0.10.0 release preserved an already defective CSS composition. Equality to that baseline was not proof of visual correctness.

The 0.9.4 rectangle extended to 94.4 percent of image height and crossed the bottom rail. It mirrored a slightly different right-side rail into the left. The main 480 px mobile source and 960 px overlays also used independently resampled images. Merely matching their resolutions could not remove the geometric cut.

The fix replaces both runtime overlays with one self-contained SVG image. It embeds the original 960 px WebP once and reuses it for the continuous reflected first-layer contour. Curved boundaries replace approximate straight contour cuts. The foot ends diagonally before the bottom rail. The centre wordmark, right half and bottom rail beyond the repair remain original. No text, colour or artwork is regenerated. The original WebP files and historical release receipts are retained.

The browser no longer chooses between different base images and independently scaled overlays. The same 105 kB self-contained asset is used at every viewport and pixel density. No new library, font, remote request or client-side script is introduced.

Verification must check rendered geometry, absence of CSS overlays, the centre and original bottom-rail pixels, source identity, all eight locales, and high-density mobile viewports. Old tests that only asserted the presence of the defective clip-path are replaced, not presented as visual acceptance.

This is a technical correction for academic review. It does not grant institutional, clinical, scientific or native-language approval. Deeper literature review is explicitly outside this requested rapid correction.
