import tokens from '../src/tokens.json' with {type:'json'};
/** A single compiled CSS file is served. Token names are the public design contract. */
export function tokenCSS(){
 const values=[...Object.entries(tokens.color),...Object.entries(tokens.space).map(([k,v])=>['space-'+k,v]),...Object.entries(tokens.layout).map(([k,v])=>['layout-'+k,v]),...Object.entries(tokens.type).map(([k,v])=>['type-'+k,v]),...Object.entries(tokens.motion).map(([k,v])=>['motion-'+k,v])];
 for(const[k,v]of values)if(!/^[a-z0-9-]+$/.test(k)||/[{};]/.test(v))throw Error('Unsafe design token');
 return ':root{'+values.map(([k,v])=>'--'+k+':'+v).join(';')+'}\n';
}
