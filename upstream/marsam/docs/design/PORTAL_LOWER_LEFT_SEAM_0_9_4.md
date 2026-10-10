# Lower-left portal seam closure, MARSAM 0.9.4

Owner correction date. 4 October 2026.

After the 0.9.3 first-layer symmetry repair, one small seam remained where the mirrored left outer portal post meets the lower threshold. The owner marked this precise area in the live screenshot.

The repair remains CSS-only. The existing 960 px approved portal is reused as the pseudo-element background, mirrored horizontally, and exposed only over the matching right-hand lower segment.

`polygon(84.2% 84.2%, 87.4% 84.2%, 87.4% 94.4%, 84.2% 94.4%)`

After the pseudo-element is mirrored, this patch lands at approximately 12.6 to 15.8 percent of the left side and 84.2 to 94.4 percent of the artwork height, which corresponds to the owner-marked seam. This mapping was derived from the marked screenshot against the full live screenshot rather than estimated from the page layout.

The 0.9.3 first-layer mask remains unchanged. No WebP bytes are modified. No floor, inner arch, central panel, outer square frame, MARSAM text, Marmara identity, cini background, typography or scholarly content is changed.
