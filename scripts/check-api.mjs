import fs from 'node:fs';import assert from 'node:assert/strict';import ts from 'typescript';
let user=null,filters=[],writes=[];
const records={id:'id',userId:'userId',createdAt:'createdAt'};
const db={select(){return {from(){return {where(f){filters.push(f);return {orderBy(){return {limit:async()=>[]}},get:async()=>undefined}}}}}},insert(){return {values:async v=>writes.push(v)}},delete(){return {where:async f=>filters.push(f)}}};
const stub=n=>n.includes('chatgpt-auth')?{getChatGPTUser:async()=>user}:n.includes('db/schema')?{records}:n.endsWith('/db')?{getDb:()=>db}:n==='drizzle-orm'?{eq:(a,b)=>[a,b],and:(...x)=>x,desc:x=>x}:n==='cloudflare:workers'?{env:{}}:(()=>{throw Error(n)})();
function load(path){const module={exports:{}};const js=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;new Function('require','module','exports',js)(stub,module,module.exports);return module.exports;}
const api=load('app/api/records/route.ts'),photo=load('app/api/photo/route.ts'),mcp=load('app/mcp/route.ts');
assert.equal((await api.GET()).status,401);assert.equal((await photo.GET(new Request('https://app.test/api/photo?id=x'))).status,401);
assert.equal((await mcp.POST(new Request('https://app.test/mcp',{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'get_fitness_log'}})}))).status,401);
user={userId:'user-a'};await api.GET();assert.deepEqual(filters.at(-1),['userId','user-a']);
const payload={kind:'session',day:'2026-10-11',data:{rpe:5,pain:false}};
const request=(p,origin=true)=>new Request('https://app.test/api/records',{method:'POST',headers:{'Content-Type':'application/json',...(origin?{origin:'https://app.test'}:{})},body:JSON.stringify(p)});
assert.equal((await api.POST(request(payload,false))).status,403);
assert.equal((await api.POST(request({...payload,kind:'admin'}))).status,400);
assert.equal((await api.POST(request({...payload,photo:'data:image/jpeg;base64,bm90YW5pbWFnZQ=='}))).status,400);
assert.equal((await api.POST(request(payload))).status,201);assert.equal(writes.at(-1).userId,'user-a');
assert.equal((await photo.GET(new Request('https://app.test/api/photo?id=x'))).status,404);assert.deepEqual(filters.at(-1),[['id','x'],['userId','user-a']]);
console.log('PASS: unauthenticated API/photo/MCP denied, owner filters, origin protection, input rejection, invalid JPEG rejected, authorized save.');
