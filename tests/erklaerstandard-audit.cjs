'use strict';
/* Run from the repository root: node tests/erklaerstandard-audit.cjs
 * Structural audit only. This is NOT a browser/mobile or schoolbook photo test. */
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=name=>fs.readFileSync(name,'utf8');
const topics=['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
const content=read('course-data.js').replace(/^window\.MERKHEFT_COURSES\s*=\s*/,'').trim().replace(/;\s*$/,'');
const base=JSON.parse(content);
const d={window:{}};
vm.runInNewContext(read('erklaer-entscheidungen.js'),d,{filename:'erklaer-entscheidungen.js'});
const guides=d.window.MerkheftEntscheidungen;
let lessons=0,examples=0,phases=0,authored=0;
for(const topic of topics){
 const source=JSON.parse(JSON.stringify(base));
 const window={MERKHEFT_COURSES:source,MerkheftPictures:{render(){return '';},learning(){return '';}}};
 const document={body:{dataset:{topic}},querySelector(){return null;},addEventListener(){}};
 if(['gemischt','quotienten','zahlenstrahl'].includes(topic)){
  vm.runInNewContext(read(topic+'-kapitel.js'),{window,document},{filename:topic+'-kapitel.js'});
 }
 const course=window.MERKHEFT_COURSES[topic];
 assert.ok(course,'Kapitel fehlt: '+topic);
 lessons+=course.lessons.length;
 const order=course.groups.flat();
 examples+=order.length;
 for(const target of [
  ...course.lessons.map(x=>({id:x.id,mode:'learn'})),
  ...order.map(id=>({id,mode:'example'}))
 ]){
  const original=course.cases[target.id];
  assert.ok(original,topic+' Fall fehlt: '+target.id);
  const data=target.mode==='learn'&&original.learning?{...original,...original.learning}:original;
  const steps=target.mode==='learn'?(data.learnSteps||data.steps):data.steps;
  assert.ok(Array.isArray(steps)&&steps.length,topic+' '+target.id+' ohne Schritte');
  for(const [idx,step] of steps.entries()){
   phases++;
   assert.ok(typeof step.html==='string'&&step.html.length,topic+' '+target.id+' Schritt '+(idx+1)+' ohne Schulrechnung');
   assert.ok(step.explain&&step.explain.length,topic+' '+target.id+' Schritt '+(idx+1)+' ohne Warum-Erklärung');
   assert.ok(step.hint&&step.hint.length,topic+' '+target.id+' Schritt '+(idx+1)+' ohne Tipp');
  }
  for(const key of ['recognize','answer','check','trap'])assert.ok(data[key]&&data[key].length,topic+' '+target.id+' ohne '+key);
 }
 for(const [id,parts] of Object.entries(guides[topic]||{})){
  const original=course.cases[id];
  assert.ok(original,topic+' ohne Fall für Entscheidungsdrehbuch '+id);
  const effective=original.learning?{...original,...original.learning}:original;
  const length=(effective.learnSteps||effective.steps).length;
  for(const [n,spec] of Object.entries(parts)){
   authored++;
   assert.ok(+n>=1&&+n<=length,'Falsche Schritt-ID in '+topic+':'+id+':'+n);
   assert.ok(spec.question&&spec.choices?.length===2,'Frage oder Antworten fehlen');
   assert.equal(spec.choices.filter(c=>c.correct===true).length,1,'Nicht genau eine richtige Kernentscheidung');
   assert.ok(spec.choices.every(c=>c.why&&c.label),'Begründung fehlt');
  }
 }
 if(topic==='zahlenstrahl'){
  for(const [id,count] of Object.entries({101:5,1:6,2:6,104:7})){
   assert.equal(course.cases[id].steps.length,count,'Zahlenstrahl Schrittanzahl falsch: '+id);
  }
  const steps=course.cases[104].steps;
  assert.equal(steps[4].html,'Ein Viertelschritt nach links','Einzelschritt darf keine Scheinrechnung sein');
  for(const step of steps.filter(s=>s.picture?.direction==='left')){
   const p=step.picture;
   const dest=p.countTo===undefined?-1/p.den:Array.isArray(p.countTo)?p.countTo[0]/p.countTo[1]:p.countTo;
   assert.ok(dest<=0&&dest>=p.min,'Minus-Pfeil zeigt auf dieselbe Strecke wie der Schritt');
  }

  assert.ok(steps.slice(0,-1).every(s=>(s.picture?.points||[]).length===0),'Negativer Zielpunkt vorzeitig eingezeichnet');
  assert.ok(steps.at(-1).picture.points[0].value,'Negativer Zielpunkt am Ende nicht beschriftet');
 }
 const html=read(topic+'.html');
 assert.ok(html.includes('course-data.js?v=20261104fach2'),'Aktueller Schulabgleich nicht im Browser-Cache bei '+topic);
 assert.ok(html.includes('erklaer-entscheidungen.js?v=20261104e2'),'Entscheidungsskript fehlt bei '+topic);
 assert.ok(html.includes('course.js?v=20261104e3'),'Aktueller Reader fehlt bei '+topic);
 assert.ok(html.includes('course.css?v=20261104e2'),'Aktuelles Stylesheet fehlt bei '+topic);
 assert.ok(html.indexOf('erklaer-entscheidungen.js')<html.indexOf('course.js?v='),'Falsche Script-Reihenfolge '+topic);
}
assert.equal(lessons,34);assert.equal(examples,111);
assert.ok(base.brueche.cases[10].questionPlain.includes('etwa'), 'Schulbuch S. 9: Teig verliert etwa 1/5');
assert.ok(base.brueche.cases[10].answer.join(' ').includes('ungefähr'), '400 g ist näherungsweise');
assert.ok(base.brueche.cases[12].intro.join(' ').includes('Bruchteil'), 'Gewinn braucht begründete Verteilungsregel');
assert.notEqual(base.brueche.cases[16].check.join(' '),base.brueche.cases[16].answer.join(' '),'Zucker/Eier brauchen echte Probe');
assert.ok(base.brueche.cases[15].check.join(' ').includes('5,25 m −'),'Sprung braucht eigene Rückprobe');
assert.ok(!base.gleichwertig.cases[5].steps[3].hint.join(' ').includes('20 unten'),'Tipp darf die Nennerlücke nicht verraten');

new Function(read('course.js'));
new Function(read('erklaer-entscheidungen.js'));
console.log(JSON.stringify({status:'STATIC_OK',topics:topics.length,lessons,examples,phases,authoredDecisions:authored},null,2));
console.log('Offen: Browser, Tastatur, Touch, Smartphone, vollständiger Schulquellen-Einzelbeweis und genaue didaktische Prüfung aller Antworten.');
