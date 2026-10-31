const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=__dirname+'/../';
const context={window:{},document:{body:{dataset:{topic:'groessen'}},querySelectorAll(){return []}}};
vm.createContext(context);
for(const f of ['course-data.js','groessen-bilder.js','rechenbilder.js'])
 vm.runInContext(fs.readFileSync(root+f,'utf8'),context);
const c=context.window.MERKHEFT_COURSES.groessen;
const picture=context.window.MerkheftPictures;
const R=(id,phase,r=c.cases[id])=>picture.render('groessen',id,phase,r);
const L=(id,i)=>picture.learning('groessen',id,c.cases[id].learnSteps[i],{...c.cases[id],...c.cases[id].learning});
const alt=s=>s.match(/aria-label="([^"]+)"/)?.[1]||'';

assert.equal(c.title,'Mit Größen rechnen');
assert.equal(c.lessons.length,5);
assert.equal(c.groups.flat().length,17);
assert.equal(new Set(c.groups.flat()).size,17);
assert.equal(Object.keys(c.cases).length,17);
assert.equal(c.referenceCards.length,6);
assert(c.referenceCards.some(card=>card.lines.some(s=>s.includes('1 h = 60 min'))));
assert(c.referenceCards.some(card=>card.lines.some(s=>s.includes('cm³'))));

const lessons=[
 [1,'2,4 m','1,25 m',3],
 [2,'0,32 kg','0,075 kg',3],
 [12,'1,25 h','1,05 h',5],
 [13,'4 ganze','6 ganze',4],
 [14,'3 cm','2 cm lang',5]
];
for(const [id,own,example,count] of lessons){
 const r=c.cases[id],task=r.learning;
 assert(task,'Eigenständiger Lernauftrag fehlt: '+id);
 assert(task.questionPlain.includes(own));
 assert.notEqual(task.questionPlain,r.questionPlain,'Lernen und Beispiele doppeln sich: '+id);
 assert.equal(r.learnSteps.length,count,'Lernschritte: '+id);
 assert(task.learningPreview&&task.answer.length&&task.trap.length&&task.check.length);
 assert(task.notebookHtml.includes('school-calculation'));
 const start=R(id,-1,{...r,...task});
 assert(start.startsWith('<svg')&&alt(start),'Eigene Vorschau: '+id);
 for(let i=0;i<r.learnSteps.length;i++){
  const step=r.learnSteps[i];
  assert(step.title&&step.html&&step.hint.length===1&&step.explain.length===2);
  assert(step.chapterVisual&&step.ask!==undefined);
  assert(Number.isInteger(step.source)&&step.source>=0&&step.source<r.steps.length);
  const img=L(id,i);
  assert(img.startsWith('<svg')&&alt(img),'Lernbild fehlt '+id+'/'+i);
  assert(!/NaN|undefined|Infinity|width="-/.test(img));
 }
}
assert(!R(1,-1,{...c.cases[1],...c.cases[1].learning}).includes('240 cm'));
assert(!R(2,-1,{...c.cases[2],...c.cases[2].learning}).includes('320 g'));
assert(!R(12,-1,{...c.cases[12],...c.cases[12].learning}).includes('75 min'));
assert(!R(13,-1,{...c.cases[13],...c.cases[13].learning}).includes('1,25 cm²'));
assert(!R(14,-1,{...c.cases[14],...c.cases[14].learning}).includes('22 cm²'));

let exampleImages=0,lessonImages=0;
for(const [id,r] of Object.entries(c.cases)){
 assert(r.question.length&&r.steps.length&&r.answer.length&&r.check.length);
 for(let phase=-1;phase<r.steps.length;phase++){
  const svg=R(+id,phase),description=alt(svg);
  assert(svg.startsWith('<svg'),'Fehlendes SVG: '+id+'/'+phase);
  assert(description&&description.length>15,'Fehlende Bildbeschreibung: '+id+'/'+phase);
  assert(!/NaN|undefined|Infinity|width="-/.test(svg),'Ungültiger Bildwert: '+id+'/'+phase);
  exampleImages++;
 }
 for(let i=0;i<(r.learnSteps||[]).length;i++)lessonImages++;
}
assert.equal(exampleImages,83);
assert.equal(lessonImages,20);

// Aufgabe und Bild müssen dieselbe Einheit und Zahl behandeln.
assert(alt(R(1,-1)).includes('1,25 m')&&!R(1,-1).includes('125 cm'));
assert(alt(R(1,2)).includes('125 cm'));
assert(alt(R(2,2)).includes('75 g'));
assert(alt(R(3,2)).includes('0,25 kg'));
assert(alt(R(4,3)).includes('12 000 cm²'));
assert(alt(R(5,3)).includes('3000 cm³'));
assert(alt(R(6,1)).includes('cm'));
assert(alt(R(7,1)).includes('4,25 Euro'));
assert(alt(R(8,1)).includes('700 Meter'));
assert(alt(R(9,-1)).includes('acht gleich großen Lücken'));
assert(alt(R(9,2)).includes('250 g'));
assert(alt(R(10,3)).includes('50 a'));
assert(alt(R(10,5)).includes('0,071 a'));
assert(alt(R(11,-1)).includes('77,3 ml'));
assert(alt(R(11,3)).includes('77,3 ml'));
assert(alt(R(11,5)).includes('0,0773 dm³'));
assert(alt(R(12,-1)).includes('5/6 min'));
assert(alt(R(12,4)).includes('50 s'));
assert(alt(R(13,-1)).includes('6 ganze und 4 halbe'));
assert(alt(R(13,3)).includes('2 cm²'));
assert(!alt(R(14,-1)).includes('13 Quadratzentimeter'));
assert(alt(R(14,0)).includes('3 Kubikzentimeter'));
assert(alt(R(14,4)).includes('13 Quadratzentimeter'));
assert(alt(R(15,-1)).includes('80 Zentimeter'));
assert(alt(R(15,3)).includes('0,4 m³'));
assert(alt(R(16,-1)).includes('µg')&&alt(R(16,-1)).includes('µm'));
assert(alt(R(16,5)).includes('0,000004'));
assert(!alt(R(17,-1)).includes('vier Quadratzentimeter'));
assert(alt(R(17,2)).includes('vier Quadratzentimeter'));
assert(alt(R(17,3)).includes('drei Quadratzentimeter'));
assert(alt(L(1,2)).includes('240 cm'));
assert(alt(L(2,2)).includes('320 g'));
assert(alt(L(12,2)).includes('75 min'));
assert(alt(L(12,4)).includes('45 s'));
assert(alt(L(13,3)).includes('1,25 cm²'));
assert(alt(L(14,0)).includes('6 Kubikzentimeter'));
assert(alt(L(14,4)).includes('22 Quadratzentimeter'));

// Herkunfts-Daten zeigen vollständige Einheiten, keine aus "ha", "ml" und "min" abgeschnittenen Tokens.
assert(c.cases[10].steps[0].tokens.includes('100 ha'));
assert(c.cases[10].steps[2].tokens.includes('1 ha'));
assert(c.cases[11].givenTokens.includes('77,3 ml'));
assert(c.cases[12].givenTokens.includes('5/6 min'));
assert(c.cases[16].givenTokens.includes('6 µg'));
assert(c.cases[16].givenTokens.includes('4 µm'));

const nearly=(a,b)=>Math.abs(a-b)<1e-9;
assert(nearly(1.25*100,125));
assert(nearly(.075*1000,75));
assert(nearly(250/1000,.25));
assert(nearly(1.2*100*100,12000));
assert(nearly(.003*1000*1000,3000));
assert(nearly(3.5+.75,4.25));
assert(nearly(.7*1000-650,50));
assert(nearly(2/8,.25));
assert(nearly(.005*10000,50));
assert(nearly(7.1/100,.071));
assert(nearly(.5*1000,500));
assert(nearly(77.3/1000,.0773));
assert(nearly(1.05*60,63)&&nearly(5/6*60,50));
assert(nearly(6*.5*.5+4/2*.5*.5,2));
assert(nearly(2*1.5*1,3)&&nearly(2*(2*1.5+2*1+1.5*1),13));
assert(nearly(.8*.5*1,.4));
assert(nearly(6/1e6,.000006)&&nearly(4/1e6,.000004));
assert(nearly(3*2-2*1,4)&&nearly(3*2/2,3));
assert(nearly(2.4*100,240)&&nearly(.32*1000,320));
assert(nearly(1.25*60,75)&&nearly(3/4*60,45));
assert(nearly((4+2/2)*.5*.5,1.25));
assert(nearly(3*2*1,6)&&nearly(2*(3*2+3*1+2*1),22));

const page=fs.readFileSync(root+'groessen.html','utf8');
assert(page.includes('groessen-bilder.js?v=20261031r29'));
assert(page.indexOf('groessen-bilder.js')<page.indexOf('rechenbilder.js'));
const js=fs.readFileSync(root+'course.js','utf8');
assert(js.includes("['dezimal','dezimalvergleich','groessen','zahlenstrahl'].includes(topic)&&state.mode==='learn'"));
assert(js.includes("'dezimalvergleich','groessen'].includes(topic)?ordered[0]"));
console.log('PASS: 5 getrennte Lernwege, 17 Musterbeispiele, '+exampleImages+' Beispielbilder, '+lessonImages+' Lernbilder, 6 Nachschlagekarten, Größenrechnung, Navigation und Asset-Version.');
