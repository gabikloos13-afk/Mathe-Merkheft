const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const context={window:{},document:{body:{dataset:{topic:'vergleichen'}},querySelectorAll(){return []}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/../course-data.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/../rechenbilder.js','utf8'),context);
const c=context.window.MERKHEFT_COURSES.vergleichen;
const draw=context.window.MerkheftPictures;

assert.equal(c.lessons.length,4);
assert.equal(c.groups.flat().length,12);
assert.equal(new Set(c.groups.flat()).size,12);
assert.equal(c.referenceCards.length,6);

const lessonPairs=['2/9|7/9','2/3|2/6','1/2|2/3','3/5|6/10'];
const lessonSteps=[2,2,5,3];
for(const [i,lesson] of c.lessons.entries()){
 const r=c.cases[lesson.id],l=r.learning;
 assert(l,'Grundweg muss eine eigene Aufgabenstellung besitzen');
 const pair=xs=>xs.map(x=>x.n+'/'+x.d).join('|');
 assert.equal(pair(l.givenPairs),lessonPairs[i]);
 assert.notEqual(pair(l.givenPairs),pair(r.givenPairs),'Lernaufgabe und Beispiel dupliziert');
 assert.notEqual(l.questionPlain,r.questionPlain,'verschiedene Aufgabenstellungen');
 assert.equal(r.learnSteps.length,lessonSteps[i]);
 assert(l.notebookHtml&&l.notebookHtml.includes('school-calculation'));
 assert(l.answer.length&&l.check.length&&l.startHint);
 for(const step of r.learnSteps){
  assert(step.title&&step.explain.length===2&&step.hint.length===1);
  assert(step.chapterVisual&&step.pairs.length===2);
 }
}
assert(c.rules.some(x=>x.startsWith('Gleiche Zähler')));
assert(c.rules.some(x=>x.includes('negativen')));

let examples=0,learnImages=0;
for(const [id,r] of Object.entries(c.cases)){
 assert.equal(r.intro.length,2);
 for(let i=-1;i<r.steps.length;i++){
  const pic=draw.render('vergleichen',+id,i,r);
  assert(pic.includes('<svg')&&pic.includes('aria-label='),'fehlt: Beispiel '+id+', Bild '+i);
  assert(!/NaN|undefined|Infinity/.test(pic),'ungültiger SVG-Wert in '+id+':'+i);
  examples++;
 }
 for(const s of r.learnSteps||[]){
  const pic=draw.learning('vergleichen',+id,s,r);
  assert(pic.includes('<svg')&&pic.includes('aria-label='));
  assert(!/NaN|undefined|Infinity/.test(pic));
  learnImages++;
 }
}
assert.equal(examples,43);
assert.equal(learnImages,12);
assert(draw.learning('vergleichen',2,c.cases[2].learnSteps[0],c.cases[2]).includes('1/3 und 1/6'),'Der Stückgrößenschritt vergleicht einzelne Teilstücke.');

const pic=(id,i)=>draw.render('vergleichen',id,i,c.cases[id]);
assert(pic(6,-1).includes('1 1/4'),'gemischte Zahl muss in der Aufgabe vorkommen');
assert(!pic(6,-1).includes('−1/2 < 2/3'),'Reihenfolge nicht vorwegnehmen');
assert(pic(6,0).includes('−1/2 &lt; 2/3 &lt; 1 1/4'),'vollständiger geordneter Zahlenstrahl');

assert(pic(8,3).includes('5/20')&&pic(8,3).includes('6/20'));
assert(!pic(8,3).includes('Das zeigt die Rechnung.'),'Abschlussbild darf nicht leer sein');
assert(pic(9,0).includes('Grenze: 2'),'ganze Vergleichsgrenze muss sichtbar sein');
assert(pic(10,0).includes('Zahlenstrahl'),'bei Fünfzigsteln die Lage statt falscher Streifen zeigen');
assert(pic(10,2).includes('31/50')&&pic(10,2).includes('39/50'));

assert.notEqual(pic(11,-1),pic(11,0),'negative Umformungen müssen Bilder ändern');
assert.notEqual(pic(11,0),pic(11,1));
assert(pic(11,1).includes('-16/12')&&pic(11,1).includes('-15/12'));

assert(pic(12,3).includes('−9 bis −1'));
assert(!pic(12,-1).includes('−9 bis −1'),'noch keine Lösung im Startbild');
const compareSceneSrc=fs.readFileSync(__dirname+'/../bildlabor.js','utf8');
const prefix=compareSceneSrc.slice(0,compareSceneSrc.indexOf("const lab=$('#werkzeug');"));
const compareScene=vm.runInNewContext(prefix+'return compareScene;})();');
const first=compareScene({a:2,b:3,c:3,d:4},0);
const search=compareScene({a:2,b:3,c:3,d:4},1);
const converted=compareScene({a:2,b:3,c:3,d:4},2);
const negative=compareScene({a:2,b:3,c:1,d:3,negative:true},3);
assert(first.includes('?'),'Startbild noch ohne Vergleichszeichen');
assert(search.includes('Ein gemeinsamer Nenner ist 12.'));
assert(converted.includes('8')&&converted.includes('12'));
assert(negative.includes('−')&&negative.includes('&lt;'));
console.log('PASS: Brüche vergleichen: 4 eigenständige Lernaufgaben, 12 Beispiele, '+examples+' Beispielbilder, '+learnImages+' Lernbilder, Bildwerkzeug und Nachschlagen.');
