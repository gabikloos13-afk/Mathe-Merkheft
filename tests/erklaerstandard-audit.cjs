'use strict';
// Fachstruktur und Datenvertrag. Browser-/Originalprüfung bleiben eigenständig.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const w={};vm.runInNewContext(fs.readFileSync('course-data.js','utf8'),{window:w});
const courses=w.MERKHEFT_COURSES,ids=new Set();let lessons=0,examples=0,phases=0,decisions=0,open=0;
for(const [topic,c]of Object.entries(courses)){
 const html=fs.readFileSync(topic+'.html','utf8');
 assert(html.includes('course-data.js?v=20261104regel2'));
 assert(html.includes('course.js?v=20261104gesamt2'));
 assert(html.includes('startbilder.js?v=20261104gesamt2'));
 assert(!/src="(?:erklaer-entscheidungen|beispiel-entscheidungen)\.js/.test(html),'Keine Schatten-Datensätze laden');
 const exampleIds=c.groups.flat();assert.equal(new Set(exampleIds).size,exampleIds.length);
 lessons+=c.lessons.length;examples+=exampleIds.length;
 for(const mode of ['learn','examples'])for(const id of mode==='learn'?c.lessons.map(l=>l.id):exampleIds){
  const base=c.cases[id],r=mode==='learn'&&base.learning?{...base,...base.learning}:base;
  const steps=mode==='learn'?(r.learnSteps||r.steps):r.steps;
  assert(r.question?.length&&r.answer?.length&&r.check?.length&&r.trap?.length,topic+':'+mode+':'+id);
  if(mode==='learn'&&exampleIds.includes(id)){
   assert(base.learning,'Getrennte Lernaufgabe: '+topic+':'+id);
   assert.notEqual(JSON.stringify(r.question),JSON.stringify(base.question),'Keine Aufgabenverdoppelung');
  }
  for(const [i,s]of steps.entries()){
   phases++;assert(s.phaseId&&!ids.has(s.phaseId),'Eindeutige Phasen-ID '+s.phaseId);ids.add(s.phaseId);
   assert.equal(s.phaseId,topic+':'+mode+':'+id+':'+(i+1));
   assert(s.ask?.endsWith('?'),'Konkrete Denkfrage '+s.phaseId);
   assert(s.html&&s.explain?.length&&s.hint?.length,'Fachinhalt '+s.phaseId);
   assert(s.counterexample?.claim&&s.counterexample?.reason,'Begründeter Gegenweg '+s.phaseId);
   assert.equal(s.pictureAfter,i);assert.equal(s.pictureBefore,i?'previous':'given');
   if(s.decision){decisions++;assert.equal(s.decision.choices.length,2);assert.equal(s.decision.choices.filter(x=>x.correct).length,1);assert(s.decision.choices.every(x=>x.label&&x.why));assert.equal(s.decision.question,s.ask);assert.equal(s.revealCondition,'decision');}
   else{open++;assert.equal(s.revealCondition,'deliberate');}
  }
 }
 const before=JSON.stringify(c);
 if(['gemischt','zahlenstrahl','quotienten'].includes(topic)){
  const d={window:{MERKHEFT_COURSES:courses,MerkheftPictures:{render(){return''},learning(){return''}}},document:{body:{dataset:{topic}},querySelector(){return null},addEventListener(){}}};
  vm.runInNewContext(fs.readFileSync(topic+'-kapitel.js','utf8'),d);
  assert.equal(JSON.stringify(c),before,'Renderer darf Fachinhalt nicht überschreiben');
 }
}
assert.equal(lessons,34);assert.equal(examples,111);assert.equal(phases,617);assert.equal(decisions+open,phases);
console.log(JSON.stringify({status:'STRUCTURE_OK',topics:9,lessons,examples,phases,decisions,openQuestions:open,sourceAndVisualRelease:'separate'},null,2));
