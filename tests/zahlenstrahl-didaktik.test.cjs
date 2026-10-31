const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/../';
const ctx={window:{},document:{body:{dataset:{topic:'zahlenstrahl'}},querySelector(){return null;}}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+'course-data.js','utf8'),ctx);
ctx.window.MerkheftPictures={render:()=>'',learning:()=>''};
vm.runInContext(fs.readFileSync(root+'zahlenstrahl-kapitel.js','utf8'),ctx);
const c=ctx.window.MERKHEFT_COURSES.zahlenstrahl;
const learningIds=c.lessons.map(l=>l.id);
const exampleIds=c.groups.flat();

assert.equal(learningIds.length,4);
assert.equal(exampleIds.length,12);
assert.equal(Object.keys(c.cases).length,16);
assert(!learningIds.some(id=>exampleIds.includes(id)),'Lernen und Beispiele dürfen keine identischen Fälle nutzen');

for(const [id,r] of Object.entries(c.cases)){
 assert.equal(typeof r.recognize,'string','Aufgabenart fehlt '+id);
 assert(r.recognize.length>25&&r.recognize.length<170,'Aufgabenart zu lang/kurz '+id);
 assert.equal(r.intro.length,1,'Ein kurzer verständlicher Einstieg pro Fall: '+id);
 assert(r.intro[0].length>25&&r.intro[0].length<180,'Einstieg zu lang/kurz '+id);
 assert.equal(r.approach.length,3,'Drei klare Herangehensfragen: '+id);
 assert(r.approach.every(x=>x.endsWith('?')),'Herangehensfragen sind echte Fragen: '+id);
 assert(r.approach.every(x=>x.length<125),'Zu verschachtelter Herangehensweg: '+id);
 assert(r.steps.every(s=>s.title&&!/^\d+\s*·/.test(s.title)),'Rechenschritte ohne zusätzliche Zählnummern: '+id);
 assert(r.steps.every(s=>s.explain.length>=1&&s.explain.every(x=>x.length>18&&x.endsWith('.'))),'Vollständige verständliche Erklärsätze: '+id);
 assert(r.steps.every(s=>s.hint.length===1&&s.hint[0].length),'Einzelne, zugeordnete Tipps: '+id);
 assert(r.answer.length&&r.check.length&&r.trap.length,'Abschlusskontrolle/Stolperstelle: '+id);
 const preview=ctx.window.MerkheftPictures.render('zahlenstrahl',Number(id),-1,r);
 assert(preview.includes('<svg'),'Vorschau ohne Zahlenstrahl: '+id);
 assert(!/NaN|undefined/.test(preview),'Ungültige Vorschau: '+id);
}
for(const id of learningIds){
 const r=c.cases[id];
 assert(r.steps.every(s=>typeof s.ask==='string'&&s.ask.endsWith('?')),'Vor jedem Lernschritt eine konkrete Denkfrage: '+id);
 assert(r.steps.every(s=>s.explain.length===2),'Ein Gedanke pro kurzer Erklärung: '+id);
}
assert(c.cases[101].recognize.includes('Einteilung'));
assert(c.cases[1].approach[0].includes('0 und 1'));
assert(c.cases[2].approach[1].includes('gleich lange'));
assert(c.cases[104].recognize.includes('links von 0'));
assert(c.cases[7].approach[0].includes('Randwerten'));
assert(c.cases[5].approach[1].includes('Zentimeter'));
assert(c.cases[13].approach[1].includes('Achtellücke'));
assert(c.cases[6].approach[2].includes('Mitte'));
assert(c.cases[9].approach[2].includes('Grenzen'));
assert(c.cases[10].approach[1].includes('fünf Punkten'));
assert(c.cases[12].approach[1].includes('Erweitern'));
assert(c.referenceCards[0].title==='Den Zahlenstrahl zuerst verstehen');
assert(c.referenceCards[0].lines.some(x=>x.includes('Schrittweite = Zahlenabstand')));

const course=fs.readFileSync(root+'course.js','utf8');
assert(course.includes("if(topic==='zahlenstrahl'&&Array.isArray(r.approach))"),'Zahlenstrahl braucht eine eigene Vorgehensübersicht');
assert(course.includes('<h3>Kurz erklärt</h3>'),'Kurzer Einstieg fehlt');
assert(course.includes('<h3>So erkennst du die Aufgabe</h3>'),'Diagnose fehlt');
assert(course.includes('<h3>So gehe ich vor</h3>'),'Strukturierte Strategie fehlt');
assert(course.includes("'groessen','zahlenstrahl'].includes(topic)&&state.mode==='learn'"),'Denkanstöße vor den Lösungen fehlen');
assert(course.includes("p!==0||!r.principle||topic==='zahlenstrahl'"),'Keine doppelte Grundregelbox im Zahlenstrahl-Einstieg');
assert(course.includes("picture.parentElement.insertBefore(picture,picture.parentElement.firstElementChild)"),'Das Zahlenstrahlbild steht vor Leitfrage und Rechenweg, auch in der Lesereihenfolge');
const css=fs.readFileSync(root+'zahlenstrahl-kapitel.css','utf8');
assert(css.includes('.zs-route section+section')&&css.includes('.zs-route ol'),'Zurückhaltende Abstände für die Strategie fehlen');
const page=fs.readFileSync(root+'zahlenstrahl.html','utf8');
assert(page.includes('zahlenstrahl-kapitel.js?v=20261031z3'));
assert(page.includes('course.js?v=20261031z3'));
assert(page.includes('zahlenstrahl-kapitel.css?v=20261031z3'));
assert(page.indexOf('zahlenstrahl-kapitel.js')<page.indexOf('course.js'));
console.log('PASS: 16 individuelle Aufgabenstrategien, vier Lernwege mit 17 Denkfragen, vollständige knappe Erklärsätze, sichtbare Lernstruktur, Nachschlagen und Dateiintegration.');
