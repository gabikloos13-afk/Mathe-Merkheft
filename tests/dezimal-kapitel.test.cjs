const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const root=__dirname+'/../';
const ctx={window:{},document:{body:{dataset:{topic:'dezimal'}},querySelectorAll(){return []}}};
vm.createContext(ctx);
for(const path of ['course-data.js','dezimal-bilder.js','rechenbilder.js'])
  vm.runInContext(fs.readFileSync(root+path,'utf8'),ctx);
const c=ctx.window.MERKHEFT_COURSES.dezimal;
const render=ctx.window.MerkheftPictures.render;
const learning=ctx.window.MerkheftPictures.learning;

assert.equal(c.title,'Brüche und Kommazahlen');
assert.equal(c.lessons.length,4);
assert.equal(c.groups.flat().length,11);
assert.equal(c.referenceCards.length,6);
assert(c.rules.some(x=>x.includes('endlos wiederholten')));
assert(c.referenceCards.some(x=>x.lines.some(y=>y.includes('0,07'))));

const learningTasks=[
 [1,'9/100','7/100',2],
 [2,'2/5','3/4',3],
 [4,'0,6','0,45',3],
 [6,'1,4','1,2',3]
];
for(const [id,given,example,count] of learningTasks){
 const r=c.cases[id],task=r.learning;
 assert(task,'Lernaufgabe fehlt bei '+id);
 assert(task.questionPlain.includes(given));
 assert(!task.questionPlain.includes(example),'Lernen und Beispiel doppeln sich: '+id);
 assert.notEqual(task.questionPlain,r.questionPlain);
 assert.equal(r.learnSteps.length,count);
 assert(task.notebookHtml.includes('school-calculation'),'eigene Abschlussrechnung fehlt: '+id);
 assert(task.answer.length&&task.check.length&&task.startHint);
 const givenSvg=render('dezimal',id,-1,{...r,...task});
 assert(givenSvg.includes('<svg')&&givenSvg.includes('aria-label='));
 for(const s of r.learnSteps){
   assert(s.title&&s.explain.length===2&&s.hint.length===1);
   assert(s.ask!==undefined&&s.chapterVisual);
   assert(s.source>=0&&s.source<r.steps.length);
   const pic=learning('dezimal',id,s,{...r,...task});
   assert(pic.includes('<svg')&&pic.includes('aria-label='));
   assert(!/NaN|undefined|Infinity/.test(pic));
 }
}
assert(!render('dezimal',1,-1,{...c.cases[1],...c.cases[1].learning}).includes('0,09'));
assert(!render('dezimal',2,-1,{...c.cases[2],...c.cases[2].learning}).includes('0,4'));
assert(!render('dezimal',4,-1,{...c.cases[4],...c.cases[4].learning}).includes('3/5'));
assert(!render('dezimal',6,-1,{...c.cases[6],...c.cases[6].learning}).includes('14/10'));
assert(learning('dezimal',6,c.cases[6].learnSteps[2],c.cases[6]).includes('demselben Punkt am Zahlenstrahl'),'Unechte, gleichwertige Brüche brauchen einen echten Zahlenstrahl');

let frames=0;
for(const [rawId,r] of Object.entries(c.cases)){
 const id=+rawId;
 assert(r.question.length&&r.answer.length&&r.steps.length&&r.check.length);
 for(let i=-1;i<r.steps.length;i++){
   const pic=render('dezimal',id,i,r);
   assert(pic.includes('<svg')&&pic.includes('aria-label='),'kein Bild: '+id+':'+i);
   assert(!/NaN|undefined|Infinity/.test(pic),'ungültiger Bildwert: '+id+':'+i);
   assert(!/width="-/.test(pic),'negative Breite: '+id+':'+i);
   frames++;
 }
}
assert.equal(frames,34);
const lessonImages=c.lessons.reduce((sum,l)=>sum+c.cases[l.id].learnSteps.length,0);
assert.equal(lessonImages,11);
const equal=(a,b)=>Math.abs(a-b)<1e-10;
assert(equal(9/100,0.09)&&equal(2/5,0.4)&&equal(6/10,3/5)&&equal(14/10,7/5));
assert(equal(3/4,0.75)&&equal(800/2000,0.4)&&equal(45/100,9/20)&&equal(-15/100,-3/20));
assert(equal(12/10,6/5)&&equal(35/100,7/20)&&equal(6/8,0.750)&&!equal(3/8,0.750));
assert(equal(3/12,0.25)&&equal(7/40,0.175)&&equal(-1.5-10*0.05,-2)&&equal(-1.5+10*0.05,-1));


const img=(id,step)=>render('dezimal',id,step,c.cases[id]);
assert(!img(1,-1).includes('0,07'),'Einstiegsbild verrät die Umwandlung');
assert(img(1,0).includes('0,07'));
assert(img(2,0).includes('3/4')&&img(2,0).includes('75/100'));
assert(img(3,1).includes('0,4'));
assert(img(4,0).includes('0,45'));
assert(img(5,1).includes('−3/20'));
assert.equal((img(6,0).match(/fill="#98536e"/g)||[]).length,12,'1,2 braucht zwölf echte Zehntel');
assert(img(6,1).includes('12/10 = 6/5 = 1,2'),'Zweite Beispielphase zeigt Kürzung');
assert.notEqual(img(6,0).match(/aria-label="([^"]+)"/)[1],img(6,1).match(/aria-label="([^"]+)"/)[1],'unterschiedliche Rechnungen brauchen unterschiedliche Bildbeschreibungen');
assert(img(7,0).includes('0,333')&&img(7,0).includes('Rest 1'));
assert.notEqual(img(7,0),img(7,1),'Periodische Zahl: zweiter Erklärschritt muss sich sichtbar unterscheiden');
assert(img(8,-1).includes('□/20')&&!img(8,-1).includes('Kästchen = 7'));
assert(img(8,2).includes('Kästchen = 7'));
assert(!img(9,-1).includes('0,375'),'Vorschau darf die Aussortierung nicht verraten');
assert(img(9,0).includes('0,750')&&img(9,1).includes('0,375'));
assert(img(10,0).includes('0,25'));
assert(img(10,1).includes('0,1666')&&img(10,1).includes('Rest 4'));
assert(img(10,2).includes('0,175'));
assert(!img(11,-1).includes('−1,5'),'Sprung-Aufgabe verrät Start noch nicht');
assert(img(11,0).includes('0,05')&&img(11,1).includes('−1,5'));
assert(!c.cases[2].steps[0].choice.join(' ').includes('100.0'));
assert(c.cases[3].trap.join(' ').includes('durch 200'));
assert(c.cases[11].check.every(x=>x.includes('10 · 0,05')));

const page=fs.readFileSync(root+'dezimal.html','utf8');
assert(page.includes('dezimal-bilder.js?v=20261031r25'));
assert(page.indexOf('dezimal-bilder.js')<page.indexOf('rechenbilder.js'));
const courseJs=fs.readFileSync(root+'course.js','utf8');
assert(courseJs.includes("topic==='dezimal'&&state.mode==='learn'&&p<last"));
console.log('PASS: 4 getrennte Lernaufgaben, 11 Musterbeispiele, '+frames+' Beispielbilder, '+lessonImages+' Lernbilder; Wertdarstellung, Perioden, Minus, Ganze, Zahlenstrahl, Direktanzeige und Cache-Version.');
