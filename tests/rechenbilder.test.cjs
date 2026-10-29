const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const s=fs.readFileSync(__dirname+'/../rechenbilder.js','utf8');
const m=vm.runInNewContext(s.slice(0,s.indexOf('const specs='))+'return {groups,transform,bundle,compare,hundred,line,unitPicture,share,cube};})();');
for(const [kind,args] of Object.entries({groups:[{n:2,d:3,known:60,unit:'Birnen',back:false},2],transform:[2,3,4],bundle:[11,4,2],compare:[2,3,3,4],hundred:[125],line:[-3,-2,-7/3,'Punkt',3],unitPicture:['m','cm',100],share:[8,12],cube:[4]})){
 const out=m[kind](...args);assert(!/NaN|undefined|Infinity/.test(out),kind);assert(out.includes('role="img"')&&out.includes('aria-label='),kind);
}
assert(m.groups({n:2,d:3,known:60,unit:'Birnen',back:false},2).includes('2 Teile: 40 Birnen'));
assert(m.groups({n:3,d:4,known:21,unit:'Kinder',back:true},2).includes('4 Teile: 28 Kinder'));
assert(!m.groups({n:3,d:4,known:21,unit:'Kinder',back:true},0).includes('28 Kinder'));
for(const [n,d,k,reverse] of [[2,3,4,false],[12,16,4,true],[18,24,2,true]]){
 let out=m.transform(n,d,k,reverse);let widths=[...out.matchAll(/width="([\d.]+)" height="48" rx="5"/g)].map(x=>+x[1]);assert.equal(widths.length,2);assert.equal(widths[0],widths[1]);
}
for(let i=0;i<5;i++)assert(!/NaN|undefined/.test(m.cube(i)));
assert.equal((m.groups({n:2,d:3,known:60,unit:'Birnen',back:false},2).match(/class="counted-pear"/g)||[]).length,60);
assert.equal((m.groups({n:3,d:4,known:21,unit:'Kinder',back:true},0).match(/class="counted-child"/g)||[]).length,21);
assert.equal((m.groups({n:3,d:4,known:21,unit:'Kinder',back:true},2).match(/class="counted-child"/g)||[]).length,28);
assert.equal((m.bundle(11,4,2).match(/fill="#ce9573"/g)||[]).length,11);
assert.equal((m.share(8,12).match(/fill="#edbd5d"/g)||[]).length,96);
console.log('PASS: 9 Bildtypen, 60→20→40 Birnen, 21→7→28 Kinder, verdecktes Ergebnis, unveränderte Bruchflächen und Quaderbilder.');
