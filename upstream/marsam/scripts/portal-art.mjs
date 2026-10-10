/** Reproducible, self-contained rendering of the approved portal. No generated pixels. */
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const original=readFileSync(new URL('public/assets/heritage/approved-portal-960.webp',root));
if(createHash('sha256').update(original).digest('hex')!=='00a058dc8f737d73d9bfbd49ef9e541fe54defb2f8d0015efa3ad77cfaa6c66b')throw Error('Approved source changed');
// Source-side boundary follows the complete first arch and its diagonal foot.
// It ends before the bottom rail, unlike the superseded rectangular CSS patch.
const contour='M480 19 C518 74 563 83 626 96 C682 107 724 116 737 145 C769 145 807 166 821 194 L845 194 L845 879 L828 867 L790 843 L790 319 C790 287 781 275 755 269 C752 233 728 217 696 211 C681 174 655 161 607 152 C548 143 510 129 480 100 Z';
const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="960" height="960" viewBox="0 0 960 960"><defs><image id="art" width="960" height="960" xlink:href="data:image/webp;base64,${original.toString('base64')}"/><clipPath id="repair"><path d="${contour}"/></clipPath></defs><use xlink:href="#art"/><g transform="translate(960 0) scale(-1 1)"><g clip-path="url(#repair)"><use xlink:href="#art"/></g></g></svg>\n`;
writeFileSync(new URL('public/assets/heritage/portal-continuous-v1.svg',root),svg);
console.log(JSON.stringify({bytes:Buffer.byteLength(svg),sha256:createHash('sha256').update(svg).digest('hex')}));
