# Portal symmetry repair, MARSAM 0.9.2

Owner correction date. 4 October 2026.

The supplied layered ebru portal remains the approved visual and its 960 px and 480 px WebP derivatives remain byte-identical. The owner identified one narrow open vertical recess on the left side of the outer nested portal. The corresponding right side already contains the intended teal ebru surface.

The repair is intentionally surgical. `.manuscript-frame.approved-portal::after` reuses the existing 960 px portal as its background, mirrors it horizontally with `scaleX(-1)`, and reveals only the corresponding strip through this clip path.

`polygon(84.5% 32.5%, 86.5% 33%, 86.2% 86.5%, 84.6% 83.5%)`

Because the pseudo-element itself is mirrored, this source-side polygon lands on the owner-marked left recess. No new image is generated. There is no recoloring, text regeneration, global mirroring, crop, glow, animation, filter or interactive surface. Pointer events remain disabled. The frame clips the repair to the square artwork.

This correction does not authorize redesign of the portal or changes to the Marmara identity, typography, cini background, content architecture or scholarly evidence layer.
