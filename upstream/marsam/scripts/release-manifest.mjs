/** Bind a generated public preview to an exact source revision and bytes. */
import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {RELEASE} from '../src/release.mjs';
const sha=process.env.SOURCE_COMMIT||process.env.GITHUB_SHA||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(!/^[a-f0-9]{40}$/.test(sha))throw Error('Exact source SHA required');
const m=JSON.parse(await readFile('dist/build-manifest.json','utf8'));
if(m.base!=='/MARSAM/'||m.previewDeploymentAuthorized!==true||m.publicationAuthorized!==false||m.institution.formalApprovalVerified!==false)throw Error('Wrong deployment boundary');
m.deploymentCommit=sha;await writeFile('dist/build-manifest.json',JSON.stringify(m,null,2)+'\n');
const files={};
async function walk(dir,prefix=''){for(const name of (await readdir(dir)).sort()){const path=dir+'/'+name;const relative=prefix+name;const s=await stat(path);if(s.isDirectory())await walk(path,relative+'/');else if(relative!=='release.json'){if(/\.(ttf|otf|woff2?|ttc)$/i.test(name))throw Error('Test font included');const data=await readFile(path);files[relative]={sha256:createHash('sha256').update(data).digest('hex'),bytes:data.length};}}}
await walk('dist');
const release={release:RELEASE.id,version:RELEASE.version,sourceCommit:sha,url:'https://onourimpram.github.io/MARSAM/',mode:'institutional-review',formalApproval:false,scientificApproval:false,humanLanguageReview:false,files};
await writeFile('dist/release.json',JSON.stringify(release,null,2)+'\n');console.log(JSON.stringify({sourceCommit:sha,files:Object.keys(files).length,release:RELEASE.id}));
