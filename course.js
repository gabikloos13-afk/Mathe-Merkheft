'use strict';
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const topic=document.body.dataset.topic,c=window.MERKHEFT_COURSES[topic];if(!c)return;
const list=xs=>'<ul>'+xs.map(s=>'<li>'+s+'</li>').join('')+'</ul>';
const state={mode:'learn',learn:c.lessons[0].id,examples:c.groups[0][0],steps:{},paint:new Set(),paintGroups:false,paintChecked:false};
const reader=document.createElement('article');reader.className='lesson-card';reader.id='active-example';
reader.innerHTML='<div class="example-heading"><span class="example-tag"></span><h2 id="example-title"></h2></div><div class="task-box"><b>Aufgabe</b><div class="task-copy"></div></div><div class="lesson-status"><span id="phase-label"></span><span id="phase-count"></span></div><div class="learning-stage" aria-live="polite" aria-atomic="true"><div class="stage-picture"></div><div class="stage-calculation"></div><div class="stage-note"></div></div><div class="lesson-actions"><button type="button" id="step-back">← Zurück</button><button type="button" id="step-next">Weiter →</button></div><div class="stage-hint" hidden></div><button type="button" id="hint-toggle">Ein kurzer Tipp</button>';
reader.addEventListener('click',event=>{
 const cell=event.target.closest('[data-paint-cell]');
 if(cell){const n=Number(cell.dataset.paintCell);state.paint.has(n)?state.paint.delete(n):state.paint.add(n);state.paintChecked=false;updatePaint();return;}
 const action=event.target.closest('[data-paint-action]')?.dataset.paintAction;
 if(action){
  if(action==='clear'){state.paint.clear();state.paintChecked=false;}
  if(action==='groups')state.paintGroups=!state.paintGroups;
  if(action==='check')state.paintChecked=true;
  if(action==='model'){state.paint=new Set(Array.from({length:15},(_,i)=>i));state.paintChecked=false;}
  updatePaint();return;
 }
 const field=event.target.closest('[data-count-field]');if(!field)return;
 const on=field.getAttribute('aria-pressed')!=='true';field.setAttribute('aria-pressed',String(on));field.classList.toggle('field-counted',on);
 let counter=$('.picture-counter',reader);if(!counter){counter=document.createElement('div');counter.className='picture-counter';$('.stage-picture',reader).append(counter);}
 const count=$$('[data-count-field][aria-pressed="true"]',reader).length;
 counter.textContent=count===1?'1 gefärbtes Feld gezählt.':count+' gefärbte Felder gezählt.';
});
reader.addEventListener('keydown',event=>{if(event.target.matches('[data-count-field]')&&['Enter',' '].includes(event.key)){event.preventDefault();event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
const path=$('#lesson-path');c.lessons.forEach((l,i)=>{let b=document.createElement('button');b.type='button';b.dataset.lesson=l.id;b.innerHTML='<span>'+(i+1)+'</span> '+l.label;b.addEventListener('click',()=>{state.learn=l.id;state.steps[l.id]=0;render();route();});path.append(b);});
$('#course-goal').textContent=c.goal;
const ordered=c.groups.flat();
c.groups.forEach((ids,i)=>{let g=document.createElement('optgroup');g.label=['Grundlagen','Darauf aufbauen','Kniffliger'][i];ids.forEach(id=>{let o=document.createElement('option');o.value=id;o.textContent=c.cases[id].title;g.append(o);});$('#example-select').append(g);});
$('#example-select').addEventListener('change',e=>{state.examples=Number(e.target.value);state.steps[state.examples]=0;render();route();});
function id(){return state.mode==='learn'?state.learn:state.examples;}
function phase(){return state.steps[id()]||0;}
function route(){const hash=state.mode==='learn'?'lernen-type-'+state.learn:state.mode==='examples'?'type-'+state.examples:state.mode==='tool'?'werkzeug':'nachschlagen';history.replaceState(null,'','#'+hash);}
function setMode(mode){state.mode=mode;render();route();}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
function render(){
 const panes={learn:'learn-pane',examples:'examples-pane',tool:'tool-pane',reference:'reference-pane'};
 for(const [mode,pane] of Object.entries(panes))$('#'+pane).hidden=state.mode!==mode;
 $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
 if(state.mode!=='learn'&&state.mode!=='examples')return;
 $('#'+(state.mode==='learn'?'learn-reader':'example-reader')).append(reader);
 const r=c.cases[id()],p=phase(),last=r.steps.length+1;
 reader.dataset.case=id();reader.dataset.phase=p;
 $('.example-tag',reader).textContent=state.mode==='learn'?'Gemeinsam verstehen':'Ein Beispiel zum Nachsehen';
 $('#example-title').textContent=r.title;$('.task-copy',reader).innerHTML=list(r.question);
 $$('[data-lesson]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.lesson)===state.learn)));
 $('#example-select').value=state.examples;
 const pos=ordered.indexOf(state.examples);$('#case-position').textContent=(pos+1)+' / '+ordered.length;$('#case-prev').disabled=pos===0;$('#case-next').disabled=pos===ordered.length-1;
 $('#phase-count').textContent='Schritt '+(p+1)+' von '+(last+1);
 $('#phase-label').textContent=p===0?'1 · Das ist gegeben':p===last?'Fertig · Rechnung und Antwort':'So rechnest du · '+p;
 const picture=$('.stage-picture',reader),calculation=$('.stage-calculation',reader),note=$('.stage-note',reader);
 picture.replaceChildren();calculation.replaceChildren();note.replaceChildren();
 if(p===0){
  picture.innerHTML=window.MerkheftPictures.render(topic,id(),-1,r);
  note.innerHTML='<div class="focus-note">'+entryHint(topic,id(),r)+'</div>';
 }else if(p<last){
  picture.innerHTML=window.MerkheftPictures.render(topic,id(),p-1,r);
  calculation.innerHTML='<div class="school-calculation">'+r.steps[p-1].html+'</div>';
  note.innerHTML='<div class="focus-note">'+stepHint(topic,id(),p-1,r)+'</div>';
 }else{
  calculation.innerHTML='<div class="notebook"><h3>So steht die Rechnung im Heft</h3>'+r.steps.map(s=>'<div class="school-calculation">'+s.html+'</div>').join('')+'</div><div class="final-answer"><b>Antwort</b>'+list(r.answer)+'</div>';
  note.innerHTML='<div class="memory-note"><b>Merke</b><span>'+closingHint(topic,id(),r)+'</span></div>';
 }
 if(topic==='brueche'&&id()===8){
  picture.innerHTML=paintBoard(p);updatePaint();
  $('#phase-label').textContent=['Selbst färben','Das ganze Rechteck','Eine von sechs Gruppen','Fünf von sechs Gruppen','Rechnung und Antwort'][p];
 }
 $('#step-back').disabled=p===0;
 $('#step-next').textContent=p===0?'Ersten Schritt zeigen →':p<last?'Weiter →':state.mode==='examples'?(pos<ordered.length-1?'Nächstes Beispiel →':'Noch einmal ansehen'):c.lessons.findIndex(l=>l.id===state.learn)<c.lessons.length-1?'Nächster Lernschritt →':'Weitere Beispiele →';
 const hint=$('.stage-hint',reader);hint.hidden=true;hint.innerHTML=list(r.hint.length?r.hint:[c.rules[0]||c.goal]);$('#hint-toggle').hidden=p===last;$('#hint-toggle').setAttribute('aria-expanded','false');
 $('#step-back').onclick=()=>{state.steps[id()]=Math.max(0,phase()-1);render();};
 $('#step-next').onclick=()=>{
  if(phase()<last){state.steps[id()]=phase()+1;render();return;}
  if(state.mode==='examples'){if(pos<ordered.length-1)caseMove(1);else{state.steps[id()]=0;render();}return;}
  const at=c.lessons.findIndex(l=>l.id===state.learn);
  if(state.mode==='learn'&&at<c.lessons.length-1){state.learn=c.lessons[at+1].id;state.steps[state.learn]=0;render();route();reader.scrollIntoView({block:'start'});}
  else{state.examples=ordered.find(x=>!c.lessons.some(l=>l.id===x))||ordered[0];state.steps[state.examples]=0;setMode('examples');}
 };
 $('#hint-toggle').onclick=()=>{hint.hidden=!hint.hidden;$('#hint-toggle').setAttribute('aria-expanded',String(!hint.hidden));};
}
function paintBoard(p){
 let columns='';for(let g=0;g<6;g++){
  let cells='';for(let row=0;row<3;row++){const n=g*3+row;cells+='<button type="button" data-paint-cell="'+n+'" aria-label="Kästchen '+(n+1)+' färben" aria-pressed="false"></button>';}
  columns+='<div class="paint-group'+(p===2&&g===0?' focus-group':p===3&&g<5?' focus-group':'')+'">'+cells+'</div>';
 }
 return '<div class="paint-activity"><p class="paint-instruction">Tippe auf ein Kästchen: Es wird bunt. Tippe noch einmal: Die Farbe geht weg.</p><div class="paint-board" role="group" aria-label="Rechteck mit 18 färbbaren Kästchen">'+columns+'</div><p class="paint-count" role="status"></p><div class="paint-controls"><button type="button" data-paint-action="groups" aria-pressed="false">6 Gruppen zeigen</button><button type="button" data-paint-action="clear">Alles entfärben</button><button type="button" data-paint-action="check">Färbung prüfen</button>'+(p>=3?'<button type="button" data-paint-action="model">Beispiel färben</button>':'')+'</div><p class="paint-feedback" role="status"></p></div>';
}
function updatePaint(){
 const board=$('.paint-board',reader);if(!board)return;
 board.classList.toggle('groups-visible',state.paintGroups||phase()>=2);
 $$('[data-paint-cell]',reader).forEach(b=>{const on=state.paint.has(Number(b.dataset.paintCell));b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label','Kästchen '+(Number(b.dataset.paintCell)+1)+(on?' entfärben':' färben'));b.textContent=on?'✓':'';});
 const groups=$('[data-paint-action="groups"]',reader);groups.hidden=phase()>=2;groups.setAttribute('aria-pressed',String(state.paintGroups));groups.textContent=state.paintGroups?'Gruppen ausblenden':'6 Gruppen zeigen';
 const count=state.paint.size;$('.paint-count',reader).textContent=count+' von 18 Kästchen gefärbt.';
 $('.paint-feedback',reader).textContent=!state.paintChecked?'':count===15?'Das passt: 15 Kästchen sind 5/6 des Rechtecks. Jedes Kästchen zählt gleich viel.':count===0?'Noch ist nichts gefärbt. Die 6 unten heißt: Teile die 18 Kästchen in sechs gleich große Gruppen.':count<15?'Es fehlt noch Farbe. Jede der sechs Gruppen hat drei Kästchen. Du brauchst fünf solcher Gruppen.':'Es ist zu viel gefärbt. Eine der sechs gleich großen Gruppen soll frei bleiben.';
}
function entryHint(t,n,r){
 if(t==='brueche'&&n===1)return 'Das ganze Rechteck ist in gleich große Felder geteilt. Zähle zuerst alle Felder. Zähle dann die bunten Felder. Du kannst die bunten Felder antippen und so mitzählen.';
 if(t==='brueche'&&n===8)return 'Die 6 unten heißt: sechs gleich große Gruppen. Die 5 oben heißt: fünf davon färben. Probiere es am Rechteck. Danach zeigen wir den Rechenweg.';
 if(t==='brueche'&&n===3)return '21 Kinder sind nur drei Viertel der Klasse. Ein Viertel fehlt noch.';
 if(t==='brueche'&&n===2)return '60 Birnen sind das Ganze. Gesucht sind zwei von drei gleich großen Gruppen.';
 if(t==='gleichwertig')return n===1?'Oben und unten mal 4. Die Menge bleibt gleich.':n===2?'Teile oben und unten durch dieselbe Zahl.':n===4?'Unten steht schon 20. Oben fehlt noch eine Zahl.':r.hint[0]||c.goal;
 if(t==='gemischt')return 'Wie viele Stücke bilden ein Ganzes? Das sagt die Zahl unten im Bruch.';
 if(t==='groessen'&&n===14)return 'Länge, Breite und Höhe stehen in Zentimetern. Innenraum und Außenflächen rechnest du getrennt.';
 return r.hint[0]||c.goal;
}
function stepHint(t,n,i,r){
 const step=r.steps[i];
 if(t==='brueche'&&n===1)return ['Alle neun Felder zusammen sind das Ganze. Die 9 kommt unten in den Bruch. Die Zahl unten heißt Nenner.','Vier Felder sind bunt. Die 4 kommt oben in den Bruch. Die Zahl oben heißt Zähler.','Oben 4, unten 9: vier von neun gleich großen Teilen. Das liest du: vier Neuntel.'][i];
 const amount={brueche:{2:['Das Ganze sind alle 60 Birnen.','Teile 60 Birnen in drei gleich große Gruppen.','Nimm zwei dieser Gruppen.'],3:['Drei Viertel zusammen sind 21 Kinder.','Teile die 21 Kinder in drei gleich große Gruppen.','Vier solche Gruppen ergeben die ganze Klasse.'],6:['Eine Stunde hat 60 Minuten.','Teile die 60 Minuten in sechs gleiche Teile.','Nimm fünf dieser Teile.'],8:['Alle 18 Kästchen zusammen sind ein Ganzes. Noch ist nichts geteilt worden.','Jede Spalte ist eine von sechs gleich großen Gruppen. In einer Gruppe sind drei Kästchen. Deshalb: 18 : 6 = 3.','Die 5 oben sagt: Nimm fünf Gruppen. Jede hat drei Kästchen. Deshalb: 3 · 5 = 15. Du kannst jede beliebige Auswahl von 15 Kästchen färben.']}};
 if(amount[t]?.[n]?.[i])return amount[t][n][i];
 if(t==='gleichwertig'&&n===4)return i===0?'Von 5 zu 20 rechnest du mal 4.':'Rechne auch oben mal 4: 2 · 4 = 8.';
 if(t==='gleichwertig'&&n===5)return i===0?'Von 3 zu 15 rechnest du mal 5.':'Rechne auch unten mal 5: 4 · 5 = 20.';
 if(t==='gleichwertig')return n===1?'Zähler und Nenner werden mit 4 malgenommen.':n===2?'Zähler und Nenner werden durch 4 geteilt.':n===3?(i===0?'Teile oben und unten durch 2.':'Jetzt kannst du oben und unten durch 3 teilen.'):'Oben und unten rechnest du mit derselben Zahl.';
 if(t==='gemischt'){
  const h={1:['Zwei volle Vierergruppen. Drei Viertel bleiben übrig.','Die 2 sind die Ganzen. Die 3 Viertel sind der Rest.'],2:['Drei Ganze sind 15 Fünftel.','Die zwei Fünftel kommen dazu.','Die 17 steht oben. Unten bleibt die 5.'],3:['12 geteilt durch 4 ergibt 3 Ganze. Es bleibt kein Rest.'],4:['Rechne zuerst ohne Minus.','Das Minus gilt für die ganze Zahl und den Bruch zusammen.'],5:['Drei volle Fünfergruppen. Zwei Fünftel bleiben übrig.','Die ganze Zahl steht vor dem Bruch.','Die 3 kommt in das Kästchen.']};
  return h[n]?.[i]||'Die Zahl unten sagt, wie viele Stücke ein Ganzes bilden.';
 }
 if(t==='quotienten'&&n===2)return ['Die 8 steht oben. Die 12 steht unten.','Teile oben und unten durch 4.','Jedes Kind bekommt gleich viel Pizza.'][i];
 if(t==='quotienten'&&n===1)return ['Die Geteilt-Aufgabe wird ein Bruch.','Teile oben und unten durch 6.','Zwei Hälften bilden ein Ganzes. Eine Hälfte bleibt übrig.'][i];
 if(t==='quotienten'&&n===5)return i===0?'Rechne zuerst die Kilometer in Meter um.':'Teile die 6000 Meter in 20 gleich lange Strecken.';
 if(t==='dezimal'&&n===2)return i===0?'Von 4 zu 100: mal 25. Rechne oben auch mal 25.':'100 unten bedeutet: zwei Stellen nach dem Komma.';
 if(t==='dezimal'&&n===4)return i===0?'Zwei Stellen nach dem Komma: Schreibe Hundertstel.':'Teile oben und unten durch 5.';
 if(t==='dezimal'&&n===6)return i===0?'1,2 sind zwölf Zehntel.':'Teile oben und unten durch 2.';
 if(t==='dezimal'&&n===1)return '100 unten bedeutet: zwei Stellen nach dem Komma. Schreibe 7 deshalb als 0,07.';
 if(t==='zahlenstrahl'&&n===1)return ['Sechs gleiche Lücken: Die 6 kommt unten in den Bruch.','Vier Lücken bis zum Punkt: Die 4 kommt oben in den Bruch.','Teile oben und unten durch 2. Der Punkt bleibt an derselben Stelle.'][i];
 if(t==='zahlenstrahl'&&n===2)return i===0?'Die 4 unten sagt: Teile die Strecke von 0 bis 1 in vier gleiche Lücken.':'Die 3 oben sagt: Gehe drei Lücken von 0 nach rechts.';
 if(t==='vergleichen'&&(step.text.includes('<')||step.text.includes('>'))){
  if(r.givenPairs.some(p=>p.n<0))return 'Auf dem Zahlenstrahl ist die Zahl weiter links kleiner.';
  if(n===2)return 'Du nimmst gleich viele Stücke. Ein Viertel ist größer als ein Achtel.';
  return 'Bei gleich großen Stücken entscheidet die Zahl oben.';
 }
 if(t==='groessen'&&n===14)return ['Rauminhalt: Länge mal Breite mal Höhe.','Vorderseite und Rückseite sind gleich groß.','Die linke und rechte Seite sind gleich groß.','Die obere und untere Seite sind gleich groß.','Zähle die Flächen aller drei Paare zusammen.'][i];
 if(t==='groessen'&&n===1)return ['Ein Meter hat 100 Zentimeter.','Von Meter zu Zentimeter: mal 100.','Die Strecke bleibt gleich lang. Du schreibst sie jetzt in Zentimetern.'][i];
 if(t==='groessen'&&n===2)return ['Ein Kilogramm hat 1000 Gramm.','Von Kilogramm zu Gramm: mal 1000.','Das Gewicht bleibt gleich. Du schreibst es jetzt in Gramm.'][i];
 if(t==='groessen'&&n===12)return ['Eine Stunde hat 60 Minuten.','Rechne den kleinen Stundenanteil mal 60.','Zähle die ganze Stunde und die drei Minuten zusammen.','Eine Minute hat 60 Sekunden. Teile sie in sechs gleiche Teile.','Nimm fünf dieser Teile.'][i];
 if(t==='groessen'&&n===13)return ['Länge mal Breite ergibt die Fläche eines Kästchens.','Zwei halbe Kästchen ergeben ein ganzes Kästchen.','Zähle die ganzen Kästchen zusammen.','Jedes Kästchen hat 0,25 cm². Rechne achtmal diese Fläche.'][i];
 if(step.operation)return step.operation.startsWith(':')?'Teile oben und unten durch '+step.operation.slice(1).trim()+'.':'Rechne oben und unten mal '+step.operation.replace('·','').trim()+'.';
 if(step.pairs.length>=2){const first=step.pairs[0],last=step.pairs[step.pairs.length-1],k=last.d/first.d;if(Math.abs(first.n/first.d-last.n/last.d)<1e-8){if(Number.isInteger(k)&&k>1)return 'Erweitere oben und unten mit '+k+'.';if(Number.isInteger(1/k)&&k<1)return 'Kürze oben und unten durch '+(1/k)+'.';}}
 if(step.label)return 'Hier berechnest du: '+step.label.replace(/\s+/g,' ').trim().replace(/\s+(sind|ist)$/,'')+'.';
 return 'Lies diese Rechenzeile von links nach rechts.';
}
function closingHint(t,n,r){
 if(t==='brueche'&&n===8)return 'Unten steht, in wie viele gleiche Gruppen du teilst: 6. Oben steht, wie viele Gruppen du nimmst: 5. Erst teilen, dann die gewünschten Gruppen nehmen.';
 if(t==='brueche'&&[3,9,10].includes(n))return 'Ist nur ein Anteil bekannt? Finde zuerst einen Teil, dann das Ganze.';
 if(t==='gleichwertig')return 'Oben und unten dieselbe Rechnung. Die Menge bleibt gleich.';
 const correct=r.trap.find(s=>s.includes('Richtig:'));if(correct)return correct.replace(/<b>Richtig:<\/b>\s*/,'');
 return c.rules[0]||c.goal;
}
function caseMove(delta){const at=ordered.indexOf(state.examples),next=ordered[at+delta];if(next!==undefined){state.examples=next;state.steps[next]=0;render();route();reader.scrollIntoView({block:'start'});}}
$('#case-prev').addEventListener('click',()=>caseMove(-1));$('#case-next').addEventListener('click',()=>caseMove(1));
const reference=$('#reference-pane');reference.innerHTML='<div class="reference-card"><h2>Kurz merken</h2>'+list(c.rules)+'</div><div class="reference-card"><h2>Wörter verstehen</h2><dl>'+c.words.map(w=>'<dt>'+w.word+'</dt><dd>'+list(w.lines)+'</dd>').join('')+'</dl></div>';
function parseRoute(){const h=location.hash.slice(1);let m;if((m=/^lernen-type-(\d+)$/.exec(h))&&c.lessons.some(l=>l.id===Number(m[1]))){state.mode='learn';state.learn=Number(m[1]);}else if((m=/^type-(\d+)$/.exec(h))&&c.cases[m[1]]){state.mode='examples';state.examples=Number(m[1]);}else if(h==='werkzeug')state.mode='tool';else if(h==='nachschlagen')state.mode='reference';render();}
window.addEventListener('hashchange',parseRoute);window.addEventListener('popstate',parseRoute);parseRoute();
})();
