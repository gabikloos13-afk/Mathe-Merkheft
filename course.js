'use strict';
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const topic=document.body.dataset.topic,c=window.MERKHEFT_COURSES[topic];if(!c)return;
const list=xs=>'<ul>'+xs.map(s=>'<li>'+s+'</li>').join('')+'</ul>';
const state={mode:'learn',learn:c.lessons[0].id,examples:c.groups[0][0],steps:{},paint:new Set(),paintGroups:false,paintChecked:false};
const reader=document.createElement('article');reader.className='lesson-card';reader.id='active-example';
reader.innerHTML='<div class="example-heading"><span class="example-tag"></span><h2 id="example-title"></h2></div><div class="principle-box" hidden></div><div class="task-box"><b>Aufgabe</b><div class="task-copy"></div></div><div class="lesson-status"><span id="phase-label"></span><span id="phase-count"></span></div><div class="learning-stage" aria-live="polite" aria-atomic="true"><div class="stage-calculation"></div><div class="stage-note"></div><div class="stage-picture"></div></div><div class="lesson-actions"><button type="button" id="step-back">← Zurück</button><button type="button" id="step-next">Weiter →</button></div><div class="stage-hint" hidden></div><button type="button" id="hint-toggle">Ein kurzer Tipp</button>';
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
const path=$('#lesson-path');c.lessons.forEach((l,i)=>{let b=document.createElement('button');b.type='button';b.dataset.lesson=l.id;b.innerHTML='<span>'+(i+1)+'</span> '+l.label;b.addEventListener('click',()=>{state.learn=l.id;state.steps["learn:"+l.id]=0;render();route();});path.append(b);});
$('#course-goal').textContent=c.goal;
const ordered=c.groups.flat();
c.groups.forEach((ids,i)=>{let g=document.createElement('optgroup');g.label=['Grundlagen','Darauf aufbauen','Kniffliger'][i];ids.forEach(id=>{let o=document.createElement('option');o.value=id;o.textContent=c.cases[id].title;g.append(o);});$('#example-select').append(g);});
$('#example-select').addEventListener('change',e=>{state.examples=Number(e.target.value);state.steps["examples:"+state.examples]=0;render();route();});
function id(){return state.mode==='learn'?state.learn:state.examples;}
function phaseKey(){return state.mode+":"+id();}
function phase(){return state.steps[phaseKey()]||0;}
function route(){const hash=state.mode==='learn'?'lernen-type-'+state.learn:state.mode==='examples'?'type-'+state.examples:state.mode==='tool'?'werkzeug':'nachschlagen';history.replaceState(null,'','#'+hash);}
function setMode(mode){state.mode=mode;render();route();}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
function render(){
 const panes={learn:'learn-pane',examples:'examples-pane',tool:'tool-pane',reference:'reference-pane'};
 for(const [mode,pane] of Object.entries(panes))$('#'+pane).hidden=state.mode!==mode;
 $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
 if(state.mode!=='learn'&&state.mode!=='examples')return;
 $('#'+(state.mode==='learn'?'learn-reader':'example-reader')).append(reader);
 const base=c.cases[id()],r=state.mode==='learn'&&base.learning?{...base,...base.learning}:base,steps=state.mode==='learn'?(r.learnSteps||r.steps):r.steps,p=phase(),last=steps.length+1;
 reader.dataset.case=id();reader.dataset.phase=p;
 $('.example-tag',reader).textContent=state.mode==='learn'?'Gemeinsam verstehen':'Ein Beispiel zum Nachsehen';
 const principle=$('.principle-box',reader);principle.hidden=state.mode!=="learn"||p!==0||!r.principle;principle.innerHTML=r.principle?'<b>Grundregel</b>'+list(r.principle):'';
 $('#example-title').textContent=r.title;$('.task-copy',reader).innerHTML=list(r.question);
 $$('[data-lesson]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.lesson)===state.learn)));
 $('#example-select').value=state.examples;
 const pos=ordered.indexOf(state.examples);$('#case-position').textContent=(pos+1)+' / '+ordered.length;$('#case-prev').disabled=pos===0;$('#case-next').disabled=pos===ordered.length-1;
 $('#phase-count').textContent='Schritt '+(p+1)+' von '+(last+1);
 $('#phase-label').textContent=p===0?'1 · Das ist gegeben':p===last?'Fertig · Rechnung und Antwort':'So rechnest du · '+p;
 if((state.mode==='learn'||['gleichwertig','gemischt'].includes(topic))&&p>0&&p<last)$('#phase-label').textContent=steps[p-1].title;
 const picture=$('.stage-picture',reader),calculation=$('.stage-calculation',reader),note=$('.stage-note',reader);
 picture.replaceChildren();calculation.replaceChildren();note.replaceChildren();
 if(p===0){
  picture.innerHTML=window.MerkheftPictures.render(topic,id(),-1,r);
  if(state.mode==='examples')note.innerHTML='<div class="approach-note"><b>So findest du den Weg</b>'+ (['gleichwertig','gemischt'].includes(topic)?list([r.recognize,...r.intro]):'<p>'+r.recognize+'</p>'+list(r.intro))+'</div>';else if(!r.principle)note.innerHTML='<div class="focus-note">'+list(r.intro)+'</div>';
 }else if(p<last){
  picture.innerHTML=state.mode==='learn'?window.MerkheftPictures.learning(topic,id(),steps[p-1],r):window.MerkheftPictures.render(topic,id(),p-1,r);
  calculation.innerHTML='<div class="notebook"><h3>'+(steps[p-1].segment||'Rechenweg wie im Heft')+'</h3>'+steps.slice(0,p).map((s,i)=>(steps[p-1].segment&&s.segment!==steps[p-1].segment?'':'<div class="school-calculation'+(i===p-1?' current-line':' previous-line')+'"'+(i===p-1?' aria-current="step"':'')+'>'+(i===p-1&&s.choice?'<div class="choice-note"><b>So findest du die Zahl</b>'+list(s.choice)+'</div>':'')+(i===p-1&&s.decisionHtml?'<div class="decision-work">'+s.decisionHtml+'</div>':'')+s.html+(i===p-1&&s.afterHtml?'<div class="decision-work after-work">'+s.afterHtml+'</div>':'')+(i===p-1?'<div class="step-explanation"><b>Kurz erklärt</b>'+list(s.explain)+'</div>':'')+'</div>')).join('')+'</div>';

 }else{
  calculation.innerHTML='<div class="notebook"><h3>So steht die Rechnung im Heft</h3>'+(r.notebookHtml||r.steps.map(s=>'<div class="school-calculation">'+s.html+'</div>').join(''))+'</div><div class="final-answer"><b>Antwort</b>'+list(r.answer)+'</div>';
  note.innerHTML=['gleichwertig','gemischt'].includes(topic)?'<div class="memory-note"><b>Daran denken</b>'+list(r.trap)+'</div>':'<div class="memory-note"><b>Merke</b><span>'+closingHint(topic,id(),r)+'</span></div>';
 }
 if(topic==='brueche'&&id()===8){
  picture.innerHTML=paintBoard(p);updatePaint();
  $('#phase-label').textContent=['Selbst färben','Das ganze Rechteck','Eine von sechs Gruppen','Fünf von sechs Gruppen','Rechnung und Antwort'][p];
 }
 $('#step-back').disabled=p===0;
 $('#step-next').textContent=p===0?'Ersten Schritt zeigen →':p<last?'Weiter →':state.mode==='examples'?(pos<ordered.length-1?'Nächstes Beispiel →':'Noch einmal ansehen'):c.lessons.findIndex(l=>l.id===state.learn)<c.lessons.length-1?'Nächster Lernschritt →':'Weitere Beispiele →';
 const hint=$('.stage-hint',reader);hint.hidden=true;hint.innerHTML=list(p===0?[r.startHint]:p===last?r.check:steps[p-1].hint);hint.dataset.forStep=state.mode+':'+id()+':'+p;$('#hint-toggle').hidden=false;$('#hint-toggle').textContent=p===last?'Ergebnis prüfen':'Tipp zu diesem Schritt';$('#hint-toggle').setAttribute('aria-expanded','false');
 $('#step-back').onclick=()=>{state.steps[phaseKey()]=Math.max(0,phase()-1);render();};
 $('#step-next').onclick=()=>{
  if(phase()<last){state.steps[phaseKey()]=phase()+1;render();return;}
  if(state.mode==='examples'){if(pos<ordered.length-1)caseMove(1);else{state.steps[phaseKey()]=0;render();}return;}
  const at=c.lessons.findIndex(l=>l.id===state.learn);
  if(state.mode==='learn'&&at<c.lessons.length-1){state.learn=c.lessons[at+1].id;state.steps["learn:"+state.learn]=0;render();route();reader.scrollIntoView({block:'start'});}
  else{state.examples=['gleichwertig','gemischt'].includes(topic)?ordered[0]:(ordered.find(x=>!c.lessons.some(l=>l.id===x))||ordered[0]);state.steps["examples:"+state.examples]=0;setMode('examples');}
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
function closingHint(t,n,r){
 if(t==='brueche'&&n===8)return 'Unten steht, in wie viele gleiche Gruppen du teilst: 6. Oben steht, wie viele Gruppen du nimmst: 5. Erst teilen, dann die gewünschten Gruppen nehmen.';
 if(t==='brueche'&&[3,9,10].includes(n))return 'Ist nur ein Anteil bekannt? Finde zuerst einen Teil, dann das Ganze.';
 if(t==='gleichwertig')return 'Oben und unten dieselbe Rechnung. Die Menge bleibt gleich.';
 const correct=r.trap.find(s=>s.includes('Richtig:'));if(correct)return correct.replace(/<b>Richtig:<\/b>\s*/,'');
 return c.rules[0]||c.goal;
}
function caseMove(delta){const at=ordered.indexOf(state.examples),next=ordered[at+delta];if(next!==undefined){state.examples=next;state.steps["examples:"+next]=0;render();route();reader.scrollIntoView({block:'start'});}}
$('#case-prev').addEventListener('click',()=>caseMove(-1));$('#case-next').addEventListener('click',()=>caseMove(1));
const reference=$('#reference-pane');reference.innerHTML=c.referenceCards?c.referenceCards.map(card=>'<article class="reference-card"><h2>'+card.title+'</h2>'+card.html+list(card.lines)+(card.visual?'<div class="stage-picture">'+window.MerkheftPictures.learning(topic,1,{chapterVisual:card.visual},c.cases[1])+'</div>':'')+'</article>').join(''):'<div class="reference-card"><h2>Kurz merken</h2>'+list(c.rules)+'</div><div class="reference-card"><h2>Wörter verstehen</h2><dl>'+c.words.map(w=>'<dt>'+w.word+'</dt><dd>'+list(w.lines)+'</dd>').join('')+'</dl></div>';
function parseRoute(){
 const h=location.hash.slice(1);let m;
 if((m=/^lernen-type-(\d+)$/.exec(h))&&c.cases[m[1]]){
  const n=Number(m[1]);if(c.lessons.some(l=>l.id===n)){state.mode='learn';state.learn=n;}else if(ordered.includes(n)){state.mode='examples';state.examples=n;route();}
 }else if((m=/^type-(\d+)$/.exec(h))&&c.cases[m[1]]){
  const n=Number(m[1]);if(ordered.includes(n)){state.mode='examples';state.examples=n;}else if(c.lessons.some(l=>l.id===n)){state.mode='learn';state.learn=n;route();}
 }else if(h==='werkzeug')state.mode='tool';else if(h==='nachschlagen')state.mode='reference';render();
}
window.addEventListener('hashchange',parseRoute);window.addEventListener('popstate',parseRoute);parseRoute();
})();

