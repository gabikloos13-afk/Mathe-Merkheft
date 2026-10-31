const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const context={window:{},document:{body:{dataset:{topic:'brueche'}},querySelectorAll(){return[]}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/../course-data.js','utf8'),context);vm.runInContext(fs.readFileSync(__dirname+'/../rechenbilder.js','utf8'),context);
const data=context.window.MERKHEFT_COURSES,draw=context.window.MerkheftPictures.render;let cases=0,frames=0;
for(const [topic,c] of Object.entries(data)){
 const all=[...c.groups.flat(),...c.lessons.map(l=>l.id)];assert.equal(new Set(all).size,Object.keys(c.cases).length);
 for(const l of c.lessons)assert(c.cases[l.id]);
 for(const [id,r] of Object.entries(c.cases)){
  cases++;assert(r.question.length&&r.answer.length&&r.steps.length);
  for(let i=-1;i<r.steps.length;i++){
   let svg=draw(topic,+id,i,r);assert(svg.includes('<svg')&&svg.includes('aria-label='),topic+':'+id+':'+i);assert(!/NaN|undefined|Infinity/.test(svg),topic+':'+id+':'+i);assert(!/width="-/.test(svg),topic+':'+id+':'+i);frames++;
  }
 }
}
const gap=data.gleichwertig.cases[4];let first=draw('gleichwertig',4,0,gap),second=draw('gleichwertig',4,gap.steps.length-1,gap);assert(first.includes('Gegeben: 2/5'));assert(!first.includes('?')&&!first.includes('□')); assert(!first.includes('8/20'));assert(second.includes('8/20'));
const middle=data.dezimalvergleich.cases[10];assert(!draw('dezimalvergleich',10,-1,middle).includes('−0,405'));assert(draw('dezimalvergleich',10,middle.steps.length-1,middle).includes('-0,405')||draw('dezimalvergleich',10,middle.steps.length-1,middle).includes('−0,405'));
const back=data.brueche.cases[3];assert(!draw('brueche',3,-1,back).includes('28 Kinder'));assert(draw('brueche',3,2,back).includes('28 Kinder'));
assert(!draw('brueche',10,0,data.brueche.cases[10]).includes('Gleiche Menge'));
assert(!draw('zahlenstrahl',7,2,data.zahlenstrahl.cases[7]).includes('Gleiche Menge'));
assert.equal(cases,101);console.log('PASS:',cases,'Aufgabentypen,',frames,'Bildzustände, vollständige Lernwege; keine vorgezogene 8/20, 28 Kinder oder Mitte.');

const paint=data.brueche.cases[8];for(let i=-1;i<3;i++){const svg=draw('brueche',8,i,paint);assert(svg.includes('18 gleich großen Kästchen'));assert.equal((svg.match(/width="44"/g)||[]).length,18);assert(!svg.includes('>?</text>'));}
console.log('PASS: Färbeaufgabe zeigt in jedem Bild 18 echte Kästchen statt sechs Platzhaltern.');
let explanations=0;
for(const [topic,c] of Object.entries(data))for(const [id,r] of Object.entries(c.cases)){
 assert.equal(r.intro.length,2,topic+':'+id+' introduction');
 for(const [i,step] of r.steps.entries()){
  assert(step.explain.length>=2&&step.explain.length<=3,topic+':'+id+':'+i+' explanation');
  assert(step.explain.every(s=>s.trim().length>0&&!/Hier berechnest du|Lies diese Rechenzeile/.test(s)));
  explanations++;
 }
}
assert.equal(explanations,330);
assert(!data.brueche.cases[8].notebookHtml,'complete school solution is preserved');
assert(data.brueche.cases[8].steps[2].html.includes('3 · 5 = 15'));
console.log('PASS:',explanations,'individuelle Schritterklärungen, 101 kurze Einführungen, vollständiger Weg über einen Teil.');

assert(data.gleichwertig.cases[2].steps[0].decisionHtml.includes('12 : 2 = 6')); 
assert(data.gleichwertig.cases[4].steps[0].decisionHtml.includes('20 : 5 = 4'));
assert(data.gleichwertig.cases[5].steps[0].decisionHtml.includes('15 : 3 = 5'));
assert(data.vergleichen.cases[3].steps[0].choice.join(' ').includes('3er- und in der 4er-Reihe'));
for(const r of Object.values(data.gleichwertig.cases))assert(r.principle.length>=2);
console.log('PASS: Grundregeln, mehrere mögliche Kürzungszahlen, berechnete Malzahlen und gemeinsamer Nenner.');

let learnFrames=0;
for(const [topic,c]of Object.entries(data)){
 for(const r of Object.values(c.cases))assert(r.recognize.length>15);
 for(const lesson of c.lessons){const r=c.cases[lesson.id],learning=r.learnSteps||r.steps;assert(learning.length>=r.steps.length);
  for(const s of learning){assert(s.source>=0&&s.source<r.steps.length);assert(s.explain.length>=2);const svg=context.window.MerkheftPictures.learning(topic,r.id,s,r);assert(svg.includes('<svg'));assert(!/NaN|undefined|Infinity/.test(svg));learnFrames++;}
 }
}
const expand=data.gleichwertig.cases[1];assert.equal(expand.learnSteps.length,4);assert(expand.learnSteps[1].html.includes('2 · 2 = 4'));assert(!expand.learnSteps[1].html.includes('3 · 2 = 6'));assert(context.window.MerkheftPictures.learning('gleichwertig',1,expand.learnSteps[1],expand).includes('2 mal 2 ergibt 4')); assert.equal(expand.steps.length,4);
console.log('PASS:',learnFrames,'eigene Lernschritte mit passenden Bildern; 101 Vorgehenshinweise bei Beispiele.');

const signs=data.quotienten.cases[3].learnSteps.filter(s=>s.title==='Das Vorzeichen bestimmen');assert.equal(signs.length,2);assert(signs[0].html.includes('15 : (−12)'));assert(signs[1].html.includes('(−15) : (−12)'));console.log('PASS: Vorzeichen vor dem Kürzen ausdrücklich bestimmt.');

let hintCount=0;
for(const c of Object.values(data))for(const r of Object.values(c.cases)){
 assert(r.startHint.length>10);assert(r.check.length);
 for(const s of [...r.steps,...(r.learnSteps||[])]){assert(s.hint.length===1);assert(s.hint[0].length>10);hintCount++;}
}
assert.equal(hintCount,456);
const negativeHints=data.quotienten.cases[3].learnSteps.filter(s=>s.title==='Oben rechnen'&&s.pairs[0].n<0);assert(negativeHints.every(s=>s.hint[0].includes('Minus')));
console.log('PASS:',hintCount,'schrittspezifische Hinweise, 101 Einstiegstipps und 101 aufgabenbezogene Kontrollen.');

let chapterPictures=0;
for(const r of Object.values(data.gleichwertig.cases)){
 for(let i=-1;i<r.steps.length;i++){const svg=draw('gleichwertig',r.id,i,r);assert(!svg.includes('?')&&!svg.includes('□'),'unexplained placeholder in chapter graphic');chapterPictures++;}
 for(const s of r.learnSteps||[]){const svg=context.window.MerkheftPictures.learning('gleichwertig',r.id,s,r);assert(!svg.includes('?')&&!svg.includes('□'));chapterPictures++;}
}
assert(data.gleichwertig.cases[2].steps[0].decisionHtml.includes('16 : 3 = 5 Rest 1'));
assert(data.gleichwertig.cases[7].steps.filter(s=>s.title==='Die Rechenzahl finden').every(s=>s.decisionHtml));
console.log('PASS:',chapterPictures,'Kapitelbilder ohne Fragezeichen oder leere Ergebnisbalken; Kapitelaufgaben mit örtlicher Begründung.');

for(const r of Object.values(data.gleichwertig.cases))for(const s of [...r.steps,...(r.learnSteps||[])]){
 assert(!s.choice,'no long choice paragraphs in rewritten chapter');assert(s.explain.every(line=>line.split(/\s+/).length<=14),'short explanation points');
}
console.log('PASS: Kurze Erklärpunkte und strukturierte Entscheidungsrechnungen im gesamten Kapitel.');

assert.equal(data.gleichwertig.lessons.length,2);
for(const r of Object.values(data.gleichwertig.cases)){

 for(const s of r.steps){const v=s.chapterVisual;if(v.to){assert.equal(v.from.n*v.to.d,v.to.n*v.from.d,'fraction value preserved');}}
}
const mixed=data.gleichwertig.cases[7];
assert(mixed.steps[8].decisionHtml.includes('30 : 6 = 5'));
const negativeTop=draw('gleichwertig',7,9,mixed);
assert(negativeTop.includes('−4 · 5 = −20'));
assert(!negativeTop.includes('−20/30'),'no future complete fraction at numerator step');
assert.equal(data.gleichwertig.referenceCards.length,7);
console.log('PASS: Alle Kapitelaufgaben vollständig; jeder Bruchwert erhalten; negatives Erweitern ohne Umweg oder vorgezogenes Gesamtergebnis.');

const model=data.gleichwertig.cases[2].steps;
for(const r of Object.values(data.gleichwertig.cases)){
 assert.equal(r.steps.length%4,0,'complete four-step rounds');
 for(const [i,s] of r.steps.entries()){
  if(r.id<=8&&!(i===0&&[1,4,5].includes(r.id)))assert.equal(s.title,model[i%4].title,'same four operations as approved Kürzen');
  assert.equal(s.chapterVisual.phase,['known','color','all','done'][i%4]);
  if(i%4===0)assert(s.decisionHtml,'factor explained where selected');
 }
}
assert(data.gleichwertig.cases[4].steps[0].decisionHtml.includes('5 · 3 = 15'));
assert(data.gleichwertig.cases[4].steps[0].decisionHtml.includes('5 · 4 = 20'));
assert(data.gleichwertig.cases[8].steps[0].decisionHtml.includes('30 : 9 = 3 Rest 3'));
console.log('PASS: Rechenschritte und passende Bilder sind vorhanden; passende und unpassende Rechenzahlen nachvollziehbar.');

const derive=data.gleichwertig.cases[1];
assert.equal(derive.learning.questionPlain,'Erweitere 2/3.');
assert(derive.learnSteps[0].decisionHtml.includes('Mögliche Malzahlen'));
assert(derive.learnSteps[0].decisionHtml.includes('2, 3, 4')); 
assert(derive.learnSteps[0].html.includes('mal 2'));
assert(derive.question[0].includes('mit 2'),'given-factor example is retained separately');
const factorImage=context.window.MerkheftPictures.learning('gleichwertig',1,derive.learnSteps[0],derive);
assert(factorImage.includes('Malzahl 2'));
assert(!factorImage.includes('4/6'),'complete answer is not shown before calculating');
assert(data.gleichwertig.cases[4].steps[0].decisionHtml.includes('20 : 5 = 4'),'a target-denominator example is retained');
assert(data.gleichwertig.cases[2].steps[0].afterHtml.includes('6 und 8'));
assert(data.gleichwertig.cases[2].steps[0].afterHtml.includes('3 und 4'));
for(const r of Object.values(data.gleichwertig.cases))for(const step of [...r.steps,...(r.learnSteps||[])])for(const hint of step.hint)assert(!/\b\d+\.0\b/.test(hint),'no floating-point notation in child-facing hints');
console.log('PASS: Freie Wahl bei fehlender Vorgabe, richtiger Zielnenner-Weg als Beispiel und Begründung der Kürzungswahl.');

const eqChapter=data.gleichwertig;
assert.deepEqual(Array.from(eqChapter.lessons,l=>l.id),[1,2]);
assert(!eqChapter.groups.flat().includes(2),'basic reduction is not shown twice');
for(const l of eqChapter.lessons){const r=eqChapter.cases[l.id];if(eqChapter.groups.flat().includes(l.id))assert(r.learning,'same case in both modes needs a different learning task');}
assert(Object.values(eqChapter.cases).filter(r=>r.learnSteps).length===1,'duplicate step arrays removed');
console.log('PASS: Zwei Grundwege im Lernen, zehn Aufgabenarten bei Beispiele, keine identischen Durchgänge in beiden Bereichen.');

assert.equal(derive.givenPairs[0].n,3);assert.equal(derive.givenPairs[0].d,5);
assert.equal(derive.learning.givenPairs[0].n,2);assert.equal(derive.learning.givenPairs[0].d,3);
assert(derive.notebookHtml.includes('6 durch 10'));
assert(derive.learning.notebookHtml.includes('4 durch 6'));
console.log('PASS: Lernaufgabe 2/3 frei erweitern und Musterbeispiel 3/5 mit 2 haben eigene Aufgaben, Bilder und Ergebnisrechnungen.');

const learningCase={...derive,...derive.learning};
assert(draw('gleichwertig',1,-1,learningCase).includes('Gegeben: 2/3'));
assert(draw('gleichwertig',1,-1,derive).includes('Gegeben: 3/5'));

const chapter=data.gleichwertig;
assert(chapter.cases[9].steps[0].html.includes('12 : 2 = 6'));
assert(chapter.cases[9].steps[2].html.includes('6 · 6 = 36'));
assert(chapter.cases[10].steps[2].html.includes('9 · 6 = 54'));
assert(chapter.cases[11].steps[0].decisionHtml.includes('3, 6, 9, 12'));
assert(chapter.cases[11].steps[0].decisionHtml.includes('4, 8, 12'));
assert(chapter.cases[11].steps[4].html.includes('12 : 4 = 3'));
assert(!chapter.cases[1].learnSteps[0].decisionHtml.includes('Keine'));
console.log('PASS: Gesuchte Malzahl, Lücke links und selbst gefundener gemeinsamer Nenner mit nachvollziehbaren Rechnungen.');
