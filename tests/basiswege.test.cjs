'use strict';
const assert=require('node:assert/strict');require('../basiswege.js');const c=global.MerkheftBasis;
// Independent expected answers for every task on worksheet page 19, nos. 1–3.
for(const [v,a,b,result]of [
 ['2','m','dm','20'],['2,35','km','m','2350'],['42','ct','€','0,42'],['0,423','dm³','m³','0,000423'],['4','cm','dm','0,4'],['0,81','cm²','mm²','81'],['17','m³','dm³','17000'],['280,4','cm³','mm³','280400'],['7,8','t','kg','7800'],
 ['2140','g','kg','2,14'],['523','mm','cm','52,3'],['12,2','kg','t','0,0122'],['252','m','km','0,252'],['300000','g','kg','300'],['90','min','h','1,5'],['666','ct','€','6,66'],['42,2','m','dm','422'],['321','dm','m','32,1']
]){assert.equal(c.fmt(c.convert(v,a,b)),result);const p=c.conversionPath(v,a,b);assert.equal(p.result,result+' '+b);assert(p.phases.length>=6);assert(p.phases.every(x=>x.ask.endsWith('?')&&x.why.length&&x.picture&&x.trap));assert(!p.phases.some(x=>/NaN|undefined|Infinity/.test(x.picture)));}
for(const [v,from,to,result]of [['1,5','kg','g','1500'],['23,5','dm','cm','235'],['1,001','t','kg','1001'],['6,08','m','cm','608'],['31,030','kg','g','31030'],['21,099','km','m','21099'],['56,56','€','ct','5656'],['100,043','km','m','100043'],['23,7','cm','mm','237']]){
 assert.equal(c.choose(v,from),to);assert.equal(c.conversionPath(v,from,null,true).result,result+' '+to);
}
for(const [a,b,s]of [['0,45','0,4455',1],['89,9','8,99',1],['7,98','7,996',-1],['77,003','78,002',-1],['−77,8','−77,799',-1],['−2,004','−1,9999',-1],['−27','−31',1],['3 1/3','−3 1/5',1],['−3 1/3','−3 1/5',-1],['1/2','0,5',0],['23/100','0,32',-1],['47/100','9/20',1],['1/200','1/20',-1]]){
 assert.equal(c.cmp(c.parse(a),c.parse(b)),s);assert(c.comparisonPath(a,b).phases.length>=4);
}
assert.equal(c.gapPath('5,□','5,7','>').result,'8, 9');
assert.equal(c.gapPath('−7□,88','−73,08','>').result,'0, 1, 2');
assert.equal(c.gapPath('0,0034□','0,0034','=').result,'0');
for(const [v,r]of [['1/2','0,5'],['−3/5','−0,6'],['−3/4','−0,75'],['5/8','0,625'],['−8/25','−0,32'],['3/50','0,06']])assert.equal(c.fractionPath(v,'decimal').result,r);
for(const [v,r]of [['0,25','1/4'],['−0,4','−2/5'],['−0,55','−11/20'],['0,6','3/5'],['−0,125','−1/8'],['1,50','3/2']])assert.equal(c.fractionPath(v,'fraction').result,r);
assert.throws(()=>c.convert('1','m','kg'));
assert.throws(()=>c.parse('1/0'));
assert.throws(()=>c.parse('<script>'));
assert.throws(()=>c.fractionPath('1/3','decimal'),/keine endliche/);
assert.equal(c.fmt(c.convert('0,00073','m³','dm³')),'0,73');
assert.equal(c.fmt(c.convert('250','cm','m')),'2,5');
console.log('PASS: exakte Ergebnisse aller 27 Aufgaben S.19/1–3, Vergleichs-/Lückenfälle S.18, beide Bruchrichtungen, Nullen, Vorzeichen und ungültige Eingaben.');
