'use strict';
// Inventar der tatsächlich pro HTML-Seite geladenen Daten; keine Fachfreigabe.
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const topics = ['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
const read = p => fs.readFileSync(p, 'utf8');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const head = cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const historical = read('docs/FACHLICHE-EINZELPRUEFUNG-NEUN-THEMEN-2026-11-04.md');
const headings = ['Brüche und Anteile','Kürzen und Erweitern','Gemischte Zahlen','Brüche am Zahlenstrahl','Brüche als Geteilt-Aufgabe','Brüche vergleichen','Brüche und Kommazahlen','Kommazahlen vergleichen','Mit Größen rechnen'];
const rows = [], summaries = [], loaded = new Set();
const text = x => String(x ?? '').replace(/\|/g,'/').replace(/\n/g,' ').replace(/<[^>]+>/g,'');
const courseData = {};
let learnCount=0, exampleCount=0, phaseCount=0, learnDialogs=0, exampleDialogs=0;
for (const [i,topic] of topics.entries()) {
  const html = read(topic+'.html');
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"?]+)(?:\?[^\"]*)?"[^>]*>/g)].map(m=>m[1]);
  const window = {MerkheftPictures:{render(){return '';},learning(){return '';}}};
  const document = {body:{dataset:{topic}},querySelector(){return null;},addEventListener(){}};
  // Nur Fachdatenskripte in der tatsächlichen HTML-Reihenfolge ausführen.
  for (const script of scripts.filter(s=>s==='course-data.js'||/-kapitel\.js$/.test(s)||/^(erklaer-entscheidungen|beispiel-entscheidungen|beispiel-dialoge-.*)\.js$/.test(s))) {
    vm.runInNewContext(read(script), {window,document}, {filename:script});
    loaded.add(script);
  }
  const c = window.MERKHEFT_COURSES[topic];
  courseData[topic] = c;
  const chapter = historical.split('## '+headings[i]+'\n')[1]?.split('\n## ')[0] || '';
  const historicalSources = new Map();
  for (const line of chapter.split('\n').filter(l=>/^\| [LB]\d+ –/.test(l))) {
    const cells = line.split('|').slice(1,-1).map(s=>s.trim());
    historicalSources.set(cells[0].match(/^([LB]\d+)/)[1],cells[3]);
  }
  const chapterRows=[];
  for (const mode of ['learn','example']) {
    const ids = mode==='learn' ? c.lessons.map(l=>l.id) : c.groups.flat();
    assert.equal(new Set(ids).size, ids.length, 'Doppelte ID: '+topic+'/'+mode);
    for (const id of ids) {
      const original=c.cases[id];
      const data=mode==='learn'&&original.learning?{...original,...original.learning}:original;
      const steps=mode==='learn'?(data.learnSteps||data.steps):data.steps;
      const dialogs=(mode==='learn'?window.MerkheftEntscheidungen:window.MerkheftBeispielEntscheidungen)?.[topic]?.[id]||{};
      const count=Object.keys(dialogs).length;
      for (const n of Object.keys(dialogs)) assert.ok(+n>=1&&+n<=steps.length,'Dialog außerhalb der Phasen: '+topic+'/'+id+'/'+n);
      const key=(mode==='learn'?'L':'B')+id;
      const row={caseId:topic+':'+mode+':'+id,topic,mode,id,title:data.title,question:data.questionPlain||data.question,phases:steps.length,loadedDialogs:count,sourceHint:historicalSources.get(key)||'Historische Zuordnung einzeln lesen; Originalnachweis offen',sourceStatus:'OFFEN',mathStatus:'OFFEN',explanationStatus:'OFFEN',pictureStatus:'OFFEN',functionStatus:'OFFEN',mobileStatus:'OFFEN',overallStatus:'OFFEN',sharedTask:mode==='learn'&&c.groups.flat().includes(id)&&!original.learning};
      rows.push(row);chapterRows.push(row);phaseCount+=steps.length;
      if(mode==='learn'){learnCount++;learnDialogs+=count;}else{exampleCount++;exampleDialogs+=count;}
    }
  }
  summaries.push({topic,lessons:c.lessons.length,examples:c.groups.flat().length,phases:chapterRows.reduce((n,r)=>n+r.phases,0),loadedDialogs:chapterRows.reduce((n,r)=>n+r.loadedDialogs,0)});
}
assert.equal(learnCount,34);assert.equal(exampleCount,111);assert.equal(phaseCount,522);
assert.equal(learnDialogs,127);assert.equal(exampleDialogs,61);
const orphanModules=fs.readdirSync('.').filter(p=>/^beispiel-dialoge-.*\.js$/.test(p)&&!loaded.has(p));
const manifest={baselineCommit:head,counts:{topics:9,lessons:learnCount,examples:exampleCount,phases:phaseCount,loadedLearningDialogs:learnDialogs,loadedExampleDialogs:exampleDialogs,examplePhasesWithoutLoadedDialog:rows.filter(r=>r.mode==='example').reduce((n,r)=>n+r.phases-r.loadedDialogs,0)},effectiveCourseDataSha256:hash(JSON.stringify(courseData)),loadedDataFiles:[...loaded].map(path=>({path,sha256:hash(read(path))})),orphanModules,summaries,cases:rows};
if(process.argv.includes('--write')) {
  fs.writeFileSync('docs/ARBEITSSTAND-2026-11-04.json',JSON.stringify(manifest,null,2)+'\n');
  const lines=['# Zentrale Abnahmematrix – alle neun Themen','',`Ausgangscommit: \`${head}\`. Die 145 Ansichten und 522 Phasen wurden aus den tatsächlich geladenen Skripten ermittelt. **Keine Gesamtfreigabe.**`,'','Die Quellenhinweise stammen aus der älteren Einzelprüfung und sind Suchhilfen, keine neu erbrachten Originalnachweise. Dialogzahl bedeutet eingebunden, nicht fachlich abgenommen. Alle sieben Prüfebenen bleiben bis zu konkreter Evidenz offen.','', 'Die Regel **ein Musterbeispiel je fachlich eigenständigem Aufgabentyp, keine Übungen** hat Vorrang vor einer festen Beispielzahl. 111 ist der Ausgangsbestand. Vier Lernansichten im Anteilskapitel verwenden dieselben Aufgaben wie Beispiele; ihre Abgrenzung ist offen.','','| Fall | Aufgabe | Phasen | Dialoge geladen | Quellenhinweis | Schule | Mathematik | Erklärung | Bild | Funktion | Mobil | Gesamt |','|---|---|---:|---:|---|---|---|---|---|---|---|---|'];
  for(const r of rows)lines.push(`| ${r.caseId} | ${text(r.title)} | ${r.phases} | ${r.loadedDialogs} | ${text(r.sourceHint)} | offen | offen | offen | offen | offen | offen | offen |`);
  lines.push('','## Technische Ausgangsbefunde','',`Nicht geladen: ${orphanModules.map(s=>'\x60'+s+'\x60').join(', ')}. Diese Entwürfe werden nicht als erreichte Erklärungstiefe gezählt.`,'','Diese Matrix dokumentiert den eingefrorenen Ausgangsstand. Spätere Abnahmen brauchen den geprüften Commit, Prüfumfang und Nachweis; eine erneute Generierung darf solche Abnahmen nicht überschreiben.');
  fs.writeFileSync('docs/ZENTRALE-ABNAHMEMATRIX-2026-11-04.md',lines.join('\n')+'\n');
}
console.log(JSON.stringify({baselineCommit:head,...manifest.counts,orphanModules,sharedLearningTasks:rows.filter(r=>r.sharedTask).map(r=>r.caseId)},null,2));
