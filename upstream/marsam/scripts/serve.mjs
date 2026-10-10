import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
let manifest;try{manifest=JSON.parse(await readFile(resolve(root,'build-manifest.json'),'utf8'));}catch{console.error('Run npm run build before npm run preview.');process.exit(1);}
const base=manifest.base,port=Number(process.env.PORT||4173),host=process.env.HOST||'127.0.0.1';
const mime={'.csv':'text/csv; charset=utf-8','.py':'text/plain; charset=utf-8','.ipynb':'application/x-ipynb+json','.qmd':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.ris':'application/x-research-info-systems; charset=utf-8','.bib':'application/x-bibtex; charset=utf-8'};
const headers={'X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'none'; frame-ancestors 'none'"};
const server=http.createServer(async(req,res)=>{
  const finish=(status,content,type='text/plain; charset=utf-8')=>{res.writeHead(status,{...headers,'Content-Type':type,'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:content);};
  if(!['GET','HEAD'].includes(req.method))return finish(405,'Method not allowed');
  let path;try{path=decodeURIComponent((req.url||'/').split('?')[0]);}catch{return finish(400,'Bad request');}
  if(path.includes('\0')||path.includes('\\')||path.split('/').includes('..'))return finish(400,'Bad request');
  if(!path.startsWith(base)){const error=await readFile(resolve(root,'404.html'));return finish(404,error,mime['.html']);}
  const relative=path.slice(base.length);let file=resolve(root,relative);
  if(file!==root&&!file.startsWith(root+sep))return finish(400,'Bad request');
  try{const info=await stat(file);if(info.isDirectory()){if(!path.endsWith('/')){res.writeHead(308,{...headers,Location:path+'/'});return res.end();}file=resolve(file,'index.html');}const body=await readFile(file);return finish(200,body,mime[extname(file)]||'application/octet-stream');}
  catch{try{return finish(404,await readFile(resolve(root,'404.html')),mime['.html']);}catch{return finish(500,'Build unavailable');}}
});
server.listen(port,host,()=>console.log(`MARSAM preview: http://${host}:${port}${base}tr/`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
