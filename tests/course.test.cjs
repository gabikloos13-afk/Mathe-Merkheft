const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const context={window:{},document:{body:{dataset:{topic:'brueche'}},querySelectorAll(){return[]}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/../course-data.js','utf8'),context);vm.runInContext(fs.readFileSync(__dirname+'/../rechenbilder.js','utf8'),context);
const data=context.window.MERKHEFT_COURSES,draw=context.window.MerkheftPictures.render;let cases=0,frames=0;
for(const [topic,c] of Object.entries(data)){
 const all=c.groups.flat();assert.equal(new Set(all).size,Object.keys(c.cases).length);
 for(const l of c.lessons)assert(c.cases[l.id]);
 for(const [id,r] of Object.entries(c.cases)){
  cases++;assert(r.question.length&&r.answer.length&&r.steps.length);
  for(let i=-1;i<r.steps.length;i++){
   let svg=draw(topic,+id,i,r);assert(svg.includes('<svg')&&svg.includes('aria-label='),topic+':'+id+':'+i);assert(!/NaN|undefined|Infinity/.test(svg),topic+':'+id+':'+i);assert(!/width="-/.test(svg),topic+':'+id+':'+i);frames++;
  }
 }
}
const gap=data.gleichwertig.cases[4];let first=draw('gleichwertig',4,0,gap),second=draw('gleichwertig',4,1,gap);assert(first.includes('□/20'));assert(!first.includes('8/20'));assert(second.includes('8/20'));
const middle=data.dezimalvergleich.cases[10];assert(!draw('dezimalvergleich',10,-1,middle).includes('−0,405'));assert(draw('dezimalvergleich',10,middle.steps.length-1,middle).includes('-0,405')||draw('dezimalvergleich',10,middle.steps.length-1,middle).includes('−0,405'));
const back=data.brueche.cases[3];assert(!draw('brueche',3,-1,back).includes('28 Kinder'));assert(draw('brueche',3,2,back).includes('28 Kinder'));
assert(!draw('brueche',10,0,data.brueche.cases[10]).includes('Gleiche Menge'));
assert(!draw('zahlenstrahl',7,2,data.zahlenstrahl.cases[7]).includes('Gleiche Menge'));
assert.equal(cases,98);console.log('PASS:',cases,'Beispiele,',frames,'Bildzustände, vollständige Lernwege; keine vorgezogene 8/20, 28 Kinder oder Mitte.');

const paint=data.brueche.cases[8];for(let i=-1;i<3;i++){const svg=draw('brueche',8,i,paint);assert(svg.includes('18 gleich großen Kästchen'));assert.equal((svg.match(/width="44"/g)||[]).length,18);assert(!svg.includes('>?</text>'));}
console.log('PASS: Färbeaufgabe zeigt in jedem Bild 18 echte Kästchen statt sechs Platzhaltern.');
