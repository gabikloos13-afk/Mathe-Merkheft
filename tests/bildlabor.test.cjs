const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/../bildlabor.js', 'utf8');
const prefix = source.slice(0, source.indexOf("const lab=$('#werkzeug')"));
const scenes = vm.runInNewContext(prefix + 'return scenes;})();');
function good(html) {
  assert(!/NaN|undefined|Infinity/.test(html));
  assert(html.includes('scene-equation'));
}
for (let step=0; step<4; step++) {
  for (const [kind,params] of Object.entries({
    portion:{n:3,d:4,known:21,back:true,unit:'Kinder'},
    transform:{n:2,d:3,k:4}, bundle:{n:24,d:3},
    compare:{a:4,b:3,c:5,d:4,negative:true},
    share:{n:4,d:6}, line:{a:-.41,b:-.40},
    place:{hundredths:199}, decimal:{a:.6,b:.6},
    units:{dim:3,value:.5}
  })) good(scenes[kind](params,step));
}
// Bundling and decimal regrouping must preserve every single piece.
for (let step=0; step<4; step++) {
  assert.equal((scenes.bundle({n:24,d:3},step).match(/class="moving-piece"/g)||[]).length,24);
  assert.equal((scenes.place({hundredths:125},step).match(/class="moving-piece"/g)||[]).length,125);
}
// Cutting must preserve the coloured area, including values above one.
for(const opts of [{n:2,d:3,k:4},{n:18,d:12,k:6,reverse:true}]){
  const widths=[];
  for(let step=0;step<4;step++){
    const s=scenes.transform(opts,step);
    const width=Number(s.match(/width="([\d.]+)" height="80" rx="4" fill="#783d53"/)[1]);
    assert(width<=520);widths.push(width);
  }
  assert(widths.every(w=>w===widths[0]));
}
// Every pizza is partitioned into d pieces, then each child receives n.
for(let n=1;n<=4;n++)for(let d=2;d<=6;d++){
  const s=scenes.share({n,d},2);
  assert.equal((s.match(/class="moving-piece/g)||[]).length,n*d);
  assert.equal((s.match(/class="plate /g)||[]).length,d);
  assert(s.includes('fill="none" stroke="#9b5c1e"'));
}
assert(scenes.portion({n:3,d:4,known:21,back:true,unit:'Kinder'},3).includes('28 Kinder'));
assert(!scenes.portion({n:3,d:4,known:21,back:true,unit:'Kinder'},0).includes('28 Kinder'));
assert(scenes.line({a:.15,b:.151},3).includes('0,15025'));
assert(scenes.compare({a:2,b:3,c:3,d:4},3).includes('&lt;'));
assert(scenes.compare({a:2,b:3,c:1,d:3,negative:true},3).includes('&lt;'));
for(const dim of [1,2,3,4,5])for(let step=0;step<4;step++)good(scenes.units({dim,value:.5},step));
assert(scenes.units({dim:3,surface:true},3).includes('600 cm²'));
assert.equal((scenes.units({dim:3,surface:true},2).match(/<rect /g)||[]).length,6);
console.log('PASS: 36 basic states, conserved piece counts and areas, 20 distributions, nested zoom, comparisons and dimensional conversions');

for(const [opts,up,down] of [[{n:2,d:3,k:4},'2 · 4 = 8','3 · 4 = 12'],[{n:12,d:16,k:4,reverse:true},'12 : 4 = 3','16 : 4 = 4']]){
 const numerator=scenes.transform(opts,1),denominator=scenes.transform(opts,2);
 assert(numerator.includes(up));assert(!numerator.includes(down));assert(denominator.includes(down));
 assert(numerator.includes('Nur die bunten Stücke'));assert(denominator.includes('Jetzt alle Stücke'));
}
console.log('PASS: Geführtes Bild zeigt erst die obere Rechnung und erst danach die untere; beide Richtungen nach demselben Schema.');

const alternate=vm.runInNewContext(prefix+'return alternateTransform;})();');
for(const k of [2,3,4,5])for(const reverse of [false,true]){
 const other=alternate({n:reverse?2*k:2,d:reverse?3*k:3,k,reverse});
 assert.equal(other.reverse,reverse);assert.equal(other.k,k);assert.equal(other.n/other.d,3/4);
 const widths=[];
 for(let step=0;step<4;step++){
  const html=scenes.transform(other,step);good(html);
  widths.push(Number(html.match(/width="([\d.]+)" height="80" rx="4" fill="#783d53"/)[1]));
  if(step===1)assert(html.includes(reverse?`${3*k} : ${k} = 3`:`3 · ${k} = ${3*k}`));
  if(step===2)assert(html.includes(reverse?`${4*k} : ${k} = 4`:`4 · ${k} = ${4*k}`));
 }
 assert(widths.every(w=>w===widths[0]));
}
console.log('PASS: Anderes Beispiel behält Richtung und Faktor; alle 32 Varianten erhalten die gefärbte Fläche und rechnen oben/unten richtig.');
