const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../anfasslabor.js','utf8');
const prefix=source.slice(0,source.indexOf('const lab=document.querySelector'));
const Core=vm.runInNewContext(prefix+'return Core;})();');
for(let d=2;d<=12;d++)for(let n=0;n<=d;n++)for(let k=2;k<=5;k++){
 const s=Core.split(n,d,k);assert.equal(s.n*d,n*s.d);
 const b=Core.join(s.n,s.d,k);assert.equal(b.n,n);assert.equal(b.d,d);
}
assert.equal(Core.join(3,4,2),null);
for(let n=1;n<=24;n++)for(let d=3;d<=6;d++){
 const places=Array(n).fill(0);
 for(let i=0;i<n;i++){
  places[i]=Math.floor(i/d)+1;
  const c=Core.bundleCount(places,d);
  assert.equal(c.full*d+c.rest,n);
  assert(c.groups.every(x=>x<=d));
 }
 const c=Core.bundleCount(places,d);
 assert.equal(c.full,Math.floor(n/d));assert.equal(c.rest,n%d);
}
for(let n=1;n<=199;n++){
 const s={h:n,hb:0,t:0,tb:0,e:0};
 while(s.h){Core.exchange(s,'h',n%2===0);assert.equal(Core.amount(s),n)}
 while(s.t){Core.exchange(s,'t',n%2===0);assert.equal(Core.amount(s),n)}
 assert.equal(s.e,Math.floor(n/100));assert.equal(s.tb,Math.floor(n%100/10));assert.equal(s.hb,n%10);
}
for(const d of [2,3,4,6,8]){
 assert.equal(Core.snap(0,-1,3,d),-d);
 assert.equal(Core.snap(1,-1,3,d),2*d);
 assert.equal(Core.snap(.5,-1,3,d),Math.round(.5*d));
}
for(let angle=-50;angle<=50;angle+=5)for(const x of [0,10])for(const y of [0,10])for(const z of [0,10]){
 const p=Core.projected(x,y,z,angle);assert(p.every(Number.isFinite));assert(p[0]>=0&&p[0]<=600);assert(p[1]>=0&&p[1]<=390);
}
assert.equal(Core.compare(8,12,9,12),'&lt;');assert.equal(Core.compare(2,3,4,6),'=');
console.log('PASS: fraction conservation, complete/partial bundles, 199 decimal exchanges, snapped points and cube projection bounds');

for(const k of [2,3,4,5]){
 const reduced=Core.join(12,16,k);
 if([2,4].includes(k)){assert(reduced);assert.equal(reduced.n/reduced.d,12/16);}else assert.equal(reduced,null);
}
console.log('PASS: Fester Kürzungsbruch 12/16: nur 2 und 4 zulässig, 3 und 5 werden abgewiesen.');
