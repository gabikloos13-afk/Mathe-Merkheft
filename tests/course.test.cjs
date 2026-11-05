'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const raw=fs.readFileSync('course-data.js','utf8');let count=0,pictures=0;
const topics=['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
for(const topic of topics){
 const window={},document={body:{dataset:{topic}},querySelector(){return null},querySelectorAll(){return []},addEventListener(){}};
 const ctx={window,document};vm.createContext(ctx);vm.runInContext(raw,ctx);
 for(const f of ['dezimal-bilder.js','dezimalvergleich-bilder.js','groessen-bilder.js','rechenbilder.js',...(['gemischt','zahlenstrahl','quotienten'].includes(topic)?[topic+'-kapitel.js']:[]),'startbilder.js','dezimalvergleich-lernweg.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 const c=window.MERKHEFT_COURSES[topic],model=window.MerkheftPictures;
 for(const mode of ['learn','examples'])for(const id of mode==='learn'?c.lessons.map(l=>l.id):c.groups.flat()){
  count++;const base=c.cases[id],r=mode==='learn'&&base.learning?{...base,...base.learning}:base,steps=mode==='learn'?(r.learnSteps||r.steps):r.steps;
  const images=[model.initial(topic,id,r,mode),...steps.map((s,i)=>mode==='learn'?model.learning(topic,id,s,r):model.render(topic,id,i,r))];
  for(const [i,html]of images.entries()){
   pictures++;assert(html&&/<svg|<figure/.test(html),topic+':'+mode+':'+id+':'+i+' Bild fehlt');
   assert(!/NaN|undefined|Infinity|(?:width|height)="-/.test(html),topic+':'+mode+':'+id+':'+i+' ungültiges Bild');
  }
 }
}
assert.equal(count,145);assert.equal(pictures,762);
console.log('PASS: '+count+' Lern-/Beispielansichten und '+pictures+' Ausgangs-/Phasenbilder in allen neun Fachrenderern.');
require('./erklaerstandard-audit.cjs');

// Unabhängige Zahlenkontrolle der vier neu getrennten Anteil-Lernaufgaben.
const checkWindow={};vm.runInNewContext(raw,{window:checkWindow});
const fractionLessons=checkWindow.MERKHEFT_COURSES.brueche.cases;
assert(fractionLessons[1].learning.steps[0].html.includes('6'));
assert(fractionLessons[1].learning.steps[2].html.includes('2 durch 6'));
assert(fractionLessons[2].learning.steps[2].html.includes('24 Birnen'));
assert(fractionLessons[3].learning.steps[2].html.includes('27 Kinder'));
assert(fractionLessons[8].learning.steps[2].html.includes('9 Kästchen'));
for(const id of [1,2,3,8])assert(!fractionLessons[id].learnSteps,'Keine geerbten alten Lernzahlen: '+id);
