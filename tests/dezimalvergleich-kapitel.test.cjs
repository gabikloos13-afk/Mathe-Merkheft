const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=__dirname+'/../';
const ctx={window:{},document:{body:{dataset:{topic:'dezimalvergleich'}},querySelectorAll(){return []}}};
vm.createContext(ctx);
for(const f of ['course-data.js','dezimalvergleich-bilder.js','rechenbilder.js'])
 vm.runInContext(fs.readFileSync(root+f,'utf8'),ctx);
const c=ctx.window.MERKHEFT_COURSES.dezimalvergleich;
const draw=ctx.window.MerkheftPictures;
const pic=(id,i,r)=>draw.render('dezimalvergleich',id,i,r||c.cases[id]);
const learned=(id,i)=>draw.learning('dezimalvergleich',id,c.cases[id].learnSteps[i],{...c.cases[id],...c.cases[id].learning});
const matches=x=>x.match(/aria-label="([^"]+)"/)?.[1]||'';

assert.equal(c.lessons.length,4);
assert.equal(c.groups.flat().length,13);
assert.equal(new Set(c.groups.flat()).size,13);
assert.equal(Object.keys(c.cases).length,13);
assert.equal(c.referenceCards.length,6);
assert(c.rules.some(x=>x.includes('Bruch und Kommazahl')));
assert(c.rules.some(x=>x.includes('Negative Zahlen')));

const tasks=[
 [2,'0,7 und 0,700',3],
 [1,'0,56 und 0,527',3],
 [7,'0,704; 0,74; 0,7',4],
 [6,'0,7 und 0,8',3]
];
for(const [id,plain,count] of tasks){
 const r=c.cases[id],l=r.learning;
 assert(l,'Lernweg braucht eine eigenständige Aufgabe: '+id);
 assert(l.questionPlain.includes(plain));
 assert.notEqual(l.questionPlain,r.questionPlain,'Beispiel wird wiederholt: '+id);
 assert.equal(r.learnSteps.length,count,'Lernweg '+id);
 assert(l.answer.length&&l.check.length&&l.trap.length&&l.startHint);
 assert(l.notebookHtml.includes('school-calculation'));
 assert(l.learningPreview,'eigenständiges Startbild fehlt');
 const preview=pic(id,-1,{...r,...l});
 assert(preview.includes('<svg')&&preview.includes('aria-label='));
 for(const s of r.learnSteps){
  assert(s.title&&s.hint.length===1&&s.explain.length===2&&s.ask!==undefined);
  assert(s.chapterVisual,'Lernbildbeschreibung fehlt');
  const picture=learned(id,r.learnSteps.indexOf(s));
  assert(picture.includes('<svg')&&picture.includes('aria-label='));
  assert(!/NaN|Infinity|undefined/.test(picture));
 }
}
assert(!pic(2,-1,{...c.cases[2],...c.cases[2].learning}).includes('0,7 = 0,700'));
assert(!pic(1,-1,{...c.cases[1],...c.cases[1].learning}).includes('0,56 &gt; 0,527'));
assert(!pic(7,-1,{...c.cases[7],...c.cases[7].learning}).includes('0,7 &lt; 0,704'));
assert(!pic(6,-1,{...c.cases[6],...c.cases[6].learning}).includes('0,75'));
assert(c.cases[7].learnSteps[0].html.includes('0,704; 0,740; 0,700'),'Sortierung darf nicht in Schritt eins verraten werden');

let exampleImages=0,learningImages=0;
for(const [id,r] of Object.entries(c.cases)){
 for(let i=-1;i<r.steps.length;i++){
  const svg=pic(+id,i);
  assert(svg.startsWith('<svg')&&svg.includes('aria-label='),'Bild fehlt '+id+'/'+i);
  assert(!/NaN|Infinity|undefined/.test(svg),'ungültige Bildwerte '+id+'/'+i);
  assert(!svg.includes('width="-'),'negative SVG-Breite '+id+'/'+i);
  exampleImages++;
 }
 for(const s of r.learnSteps||[]){
  const svg=draw.learning('dezimalvergleich',+id,s,{...r,...r.learning});
  assert(svg.includes('<svg')&&!/NaN|Infinity|undefined/.test(svg));
  learningImages++;
 }
}
assert.equal(exampleImages,40);
assert.equal(learningImages,13);
assert(matches(learned(1,1)).includes('Hundertstel'));
assert(learned(1,1).includes('>6<')&&learned(1,1).includes('>2<'),'Stellenwert-Ziffern müssen stimmen');
assert(learned(6,2).includes('0,7 &lt; 0,75 &lt; 0,8'));
assert(matches(learned(2,2)).includes('gleich viel'));
assert(matches(learned(7,0)).includes('noch nicht sortiert'));
assert(matches(learned(7,3)).includes('Originalzahlen geordnet'));

// Die 13 Musterbeispiele bleiben erhalten, zeigen aber passende Bilder.
assert(!matches(pic(1,-1)).includes('größer als'));
assert(matches(pic(1,0)).includes('Hundertstel'));
assert(matches(pic(2,0)).includes('gleich viel'));
assert(matches(pic(3,1)).includes('−0,70')&&matches(pic(3,1)).includes('−0,65'));
assert(!pic(4,-1).includes('0,60'),'Gemischter Bruch-Vergleich: Ergebnis nicht in der Vorschau');
assert(pic(4,0).includes('60/100')&&pic(4,2).includes('3/5'));
assert(!pic(5,-1).includes('0,40'));
assert(pic(5,3).includes('0, 1 oder 2 passen'));
assert(!pic(6,-1).includes('0,45'));
assert(pic(6,0).includes('0,45'));
assert(matches(pic(7,-1)).includes('noch nicht sortiert'));
assert(matches(pic(7,1)).includes('Originalzahlen geordnet'));
assert(pic(8,0).includes('1,205')&&pic(8,0).includes('1,250'));
assert.equal((pic(9,0).match(/<circle[^>]+fill="#98536e"/g)||[]).length,9,'genau 9 Zahlen streng zwischen 0,95 und 1,05');
assert(!pic(10,-1).includes('−0,405'));
assert(!pic(10,1).includes('−0,405'));
assert(pic(10,2).includes('−0,405'));
assert(!pic(11,-1).includes('8,540'));
assert(pic(11,0).includes('8,540')&&pic(11,1).includes('0,458'));
assert(!pic(12,-1).includes('0,65'));
assert(pic(12,0).includes('65/100')&&pic(12,1).includes('0,59'));
assert(!pic(13,-1).includes('32,243'));
assert(!pic(13,0).includes('32,243'));
assert(pic(13,2).includes('32,243'));

const values=s=>Number(s.replace('−','-').replace(',','.'));
assert(values('0,43')>values('0,418'));
assert(values('0,6')===values('0,600'));
assert(values('−0,70')<values('−0,65'));
assert(3/5>values('0,58'));
for(const digit of [0,1,2])assert(values('0,4'+digit)<values('0,43'));
assert(!(values('0,43')<values('0,43')));
assert(values('0,4')<values('0,45')&&values('0,45')<values('0,5'));
assert(values('0,5')<values('0,506')&&values('0,506')<values('0,56'));
assert(values('1,205')<values('1,25')&&Math.abs((1.25-1.205)*1000-45)<1e-9);
for(let i=96;i<=104;i++)assert(values('0,95')<i/100&&i/100<values('1,05'));
assert(Math.abs((-0.41-0.40)/2-(-0.405))<1e-10);
assert(13/20===0.65);
for(let d=0;d<=5;d++)assert(values('0,'+d+'9')<0.65);
assert(!(values('0,69')<0.65));

const html=fs.readFileSync(root+'dezimalvergleich.html','utf8');
assert(html.includes('dezimalvergleich-bilder.js?v=20261031r28'));
assert(html.indexOf('dezimalvergleich-bilder.js')<html.indexOf('rechenbilder.js'));
const js=fs.readFileSync(root+'course.js','utf8');
assert(js.includes("['dezimal','dezimalvergleich'].includes(topic)&&state.mode==='learn'"),'Denkimpulse müssen angezeigt werden');
assert(js.includes("'dezimal','dezimalvergleich'].includes(topic)?ordered[0]"),'Beispielweg beginnt bei Fall 2');
console.log('PASS: 4 eigenständige Lernaufgaben, 13 Beispiele, '+exampleImages+' Beispielbilder, '+learningImages+' Lernbilder, 6 Nachschlagekarten, fachliche Rechenprüfungen, Navigation und Asset-Version.');
