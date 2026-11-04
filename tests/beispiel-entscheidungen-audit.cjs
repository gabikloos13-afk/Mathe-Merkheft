'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const d={window:{}};
vm.runInNewContext(fs.readFileSync('beispiel-entscheidungen.js','utf8'),d);
let n=0;
for(const cases of Object.values(d.window.MerkheftBeispielEntscheidungen)){
 for(const phases of Object.values(cases)){
  for(const spec of Object.values(phases)){
   assert.ok(spec.question);
   assert.equal(spec.choices.length,2);
   assert.equal(spec.choices.filter(c=>c.correct).length,1);
   assert.ok(spec.choices.every(c=>c.label&&c.why));
   n++;
  }
 }
}
assert.equal(n,61);
console.log('Beispielentscheidungen: '+n+' vollständige Richtig/Falsch-Dialoge');
