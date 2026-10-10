# First-layer portal symmetry repair, MARSAM 0.9.3

Owner correction date. 4 October 2026.

The owner identified that the first outer receding portal layer remained geometrically asymmetric. The right side is the approved reference. Version 0.9.2 repaired only a narrow vertical recess. Version 0.9.3 supersedes that narrow patch and mirrors the complete right-hand contour of the first outer ebru arch into the corresponding left-hand layer.

The original 960 px and 480 px portal WebP assets remain byte-identical. The repair is CSS-only and uses the existing 960 px artwork as the pseudo-element background. It is horizontally mirrored with `scaleX(-1)` and revealed only through the first-layer mask.

`polygon(50% 2.5%, 53.2% 5.4%, 58% 7.8%, 64% 10.3%, 71% 12.7%, 77% 15.3%, 82.3% 18.6%, 86.7% 20.4%, 87% 84.8%, 81.7% 84.8%, 81.7% 21.7%, 78.5% 19.8%, 73% 17%, 67.2% 15.2%, 61.2% 13.4%, 56% 11.4%, 52.2% 9%, 50% 7.1%)`

Because the pseudo-element is mirrored after masking, the source polygon traces the correct right-side first layer and lands on its left counterpart. The old 0.9.2 narrow `::after` strip is disabled so the two repairs do not compete.

No inner arch, center panel, wordmark, outer square ebru frame, typography, Marmara identity, cini background or scholarly content is altered.
