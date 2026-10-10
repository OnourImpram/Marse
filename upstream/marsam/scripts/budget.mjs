import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {RELEASE} from '../src/release.mjs';
const limits={css:18000,js:22000,home:16000,index:80000};
const files=['site.css','app.js','campus.js','campus-core.js','heritage.js','search-core.js','url-state.js'];
const assets=[];
for(const path of files){const data=await readFile('dist/'+path);assets.push({path,bytes:data.length,gzipBytes:gzipSync(data).length});}
const css=assets.filter(a=>a.path.endsWith('.css')).reduce((sum,a)=>sum+a.gzipBytes,0);
const js=assets.filter(a=>a.path.endsWith('.js')).reduce((sum,a)=>sum+a.gzipBytes,0);
if(css>limits.css||js>limits.js)throw Error('Core asset budget exceeded');
for(const locale of ['tr','en','de','zh','ru','ar','id','ms']){
 const data=await readFile(`dist/${locale}/index.html`);const index=await readFile(`dist/data/search-${locale}.json`);
 if(gzipSync(data).length>limits.home||gzipSync(index).length>limits.index)throw Error('Locale budget exceeded '+locale);
 assets.push({path:`${locale}/index.html`,bytes:data.length,gzipBytes:gzipSync(data).length},{path:`data/search-${locale}.json`,bytes:index.length,gzipBytes:gzipSync(index).length});
}
async function scan(path){for(const name of await readdir(path)){const file=path+'/'+name;if((await stat(file)).isDirectory())await scan(file);else if(/\.(ttf|otf|woff2?|ttc)$/i.test(file))throw Error('Font file in published artifact');}}
await scan('dist');
const report={version:RELEASE.version,limits,gzipEstimates:true,measuredNetworkPerformance:false,coreCSS:css,coreJS:js,assets};
await writeFile('verification/reading-room-budgets.json',JSON.stringify(report,null,2));console.log(JSON.stringify({css,js,budgetsPassed:true}));
