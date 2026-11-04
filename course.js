'use strict';
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const topic=document.body.dataset.topic,c=window.MERKHEFT_COURSES[topic];if(!c)return;
const list=xs=>'<ul>'+xs.map(s=>'<li>'+s+'</li>').join('')+'</ul>';
const storageKey='merkheft:gesamtumbau:v2:'+topic;
let stored={};try{stored=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch(_){stored={};}
const state={mode:'learn',learn:c.lessons[0].id,examples:c.groups[0][0],
 steps:stored.steps&&typeof stored.steps==='object'?stored.steps:{},
 revealed:stored.revealed&&typeof stored.revealed==='object'?stored.revealed:{},
 choices:stored.choices&&typeof stored.choices==='object'?stored.choices:{},
 thoughts:stored.thoughts&&typeof stored.thoughts==='object'?stored.thoughts:{},
 paint:new Set(),paintGroups:false,paintChecked:false};
function saveState(){try{localStorage.setItem(storageKey,JSON.stringify({steps:state.steps,revealed:state.revealed,choices:state.choices,thoughts:state.thoughts}));}catch(_){}}
const reflectQuestions={
 brueche:'Was ist das Ganze, welcher Anteil ist bekannt und welcher Teil wird gesucht?',
 gleichwertig:'Wie bleiben Zähler und Nenner im gleichen Verhältnis, sodass der Bruchwert gleich bleibt?',
 gemischt:'Wie viele vollständige Ganze stecken darin und welche gleich großen Teile bleiben übrig?',
 zahlenstrahl:'Wo liegt die ganze Einheit, wie groß ist eine Lücke und in welche Richtung zählst du?',
 quotienten:'Was wird geteilt, durch welche Zahl und was bedeutet das Ergebnis?',
 vergleichen:'Welche Vergleichsregel passt zu diesen Brüchen und warum?',
 dezimal:'Welche Stellenwerte oder gleichwertigen Bruchteile brauchst du?',
 dezimalvergleich:'Welche gleichwertigen Stellenwerte vergleichst du von links nach rechts?',
 groessen:'Welche Ausgangseinheit und Zieleinheit stehen hier, und warum passt dieser Faktor?'
};
function simpleText(s){return String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').trim();}
function safeList(xs){return list(Array.isArray(xs)?xs:xs?[xs]:[]);}
function resetCurrentCase(){state.paint.clear();state.paintGroups=false;state.paintChecked=false;const prefix=phaseKey()+':';for(const key of Object.keys(state.revealed))if(key.startsWith(prefix))delete state.revealed[key];for(const key of Object.keys(state.choices))if(key.startsWith(prefix))delete state.choices[key];for(const key of Object.keys(state.thoughts))if(key.startsWith(prefix))delete state.thoughts[key];state.steps[phaseKey()]=0;saveState();render();}
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
  if(action==='model'){state.paint=new Set(Array.from({length:paintModel().target},(_,i)=>i));state.paintChecked=false;}
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
function route(){const hash=state.mode==='learn'?'lernen-type-'+state.learn:state.mode==='examples'?'type-'+state.examples:state.mode==='tool'?'werkzeug':'nachschlagen';if(location.hash!=='#'+hash)history.pushState(null,'','#'+hash);}
function setMode(mode){state.mode=mode;render();route();}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
function render(){
 const panes={learn:'learn-pane',examples:'examples-pane',tool:'tool-pane',reference:'reference-pane'};
 for(const [mode,pane] of Object.entries(panes))$('#'+pane).hidden=state.mode!==mode;
 $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
 if(state.mode!=='learn'&&state.mode!=='examples')return;
 $('#'+(state.mode==='learn'?'learn-reader':'example-reader')).append(reader);
 const base=c.cases[id()],r=state.mode==='learn'&&base.learning?{...base,...base.learning}:base;
 const steps=state.mode==='learn'?(r.learnSteps||r.steps):r.steps;
 const last=steps.length+1,p=Math.max(0,Math.min(phase(),last)),active=p>0&&p<last?steps[p-1]:null;
 const key=phaseKey()+':'+p,shown=!!state.revealed[key];
 reader.dataset.case=id();reader.dataset.phase=p;reader.dataset.revealed=String(shown);
 $('.example-tag',reader).textContent=state.mode==='learn'?'Gemeinsam verstehen':'Ein Beispiel zum Nachsehen';
 const principle=$('.principle-box',reader);
 principle.hidden=state.mode!=='learn'||p!==0||!r.principle||topic==='zahlenstrahl';
 principle.innerHTML=r.principle?'<b>Grundregel</b>'+safeList(r.principle):'';
 $('#example-title').textContent=r.title;$('.task-copy',reader).innerHTML=safeList(r.question);
 $$('[data-lesson]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.lesson)===state.learn)));
 $('#example-select').value=state.examples;
 const pos=ordered.indexOf(state.examples);
 $('#case-position').textContent=(pos+1)+' / '+ordered.length;$('#case-prev').disabled=pos===0;$('#case-next').disabled=pos===ordered.length-1;
 const stepTitle=active?simpleText(active.title||active.label||''):'';
 $('#phase-count').textContent=p===0?'Start · '+steps.length+' Lernschritte':p===last?'Abschluss':'Schritt '+p+' von '+steps.length;
 $('#phase-label').textContent=p===0?'Die Aufgabe erkennen':p===last?'Ergebnis verstehen und prüfen':stepTitle||'Denkschritt '+p;
 const picture=$('.stage-picture',reader),calculation=$('.stage-calculation',reader),note=$('.stage-note',reader);
 picture.parentElement.append(picture,note,calculation);
 picture.replaceChildren();calculation.replaceChildren();note.replaceChildren();
 const paintCase=topic==='brueche'&&id()===8;
 if(paintCase&&reader.dataset.paintMode!==state.mode){state.paint.clear();state.paintChecked=false;state.paintGroups=false;reader.dataset.paintMode=state.mode;}
 const renderPicture=index=>state.mode==='learn'
  ?window.MerkheftPictures.learning(topic,id(),steps[index],r)
  :window.MerkheftPictures.render(topic,id(),index,r);
 if(p===0){
  // Existing preview images sometimes already contain the target point or answer.
  // Do not show an unchecked preview before the learner has made a decision.
  note.innerHTML='<div class="think-origin"><h3>So erkennst du die Aufgabe</h3><p>'+(r.recognize||'Lies zuerst die gegebenen Zahlen und die Frage.')+'</p>'+
   (r.intro&&r.intro.length?'<h3>Das weißt du schon</h3>'+safeList(r.intro):'')+
   (r.approach&&r.approach.length?'<h3>Fragen für deinen Weg</h3><ol>'+r.approach.map(s=>'<li>'+s+'</li>').join('')+'</ol>':'')+
   '</div>';
  picture.innerHTML=window.MerkheftPictures.initial(topic,id(),r,state.mode);
  if(paintCase){picture.innerHTML=paintBoard(0);updatePaint();}
 }else if(p<last&&!shown){
  // Reuse only the image of an already explained step, never the future result.
  picture.innerHTML=p>1?renderPicture(p-2):window.MerkheftPictures.initial(topic,id(),r,state.mode);
  if(paintCase){picture.innerHTML=paintBoard(p-1);updatePaint();}
  const spec=active.decision;
  const question=active.ask;
  let html='<section class="think-gate"><p class="think-kicker">ERST ÜBERLEGEN · DANN AUFDECKEN</p><h3>Welche Entscheidung passt?</h3><p class="think-question">'+question+'</p>';
  if(spec&&Array.isArray(spec.choices)&&spec.choices.length>=2){
   // Die richtige Antwort darf nicht zuverlässig an derselben Position stehen.
   // Originalindices bleiben für die Speicherung stabil, auch wenn die Anzeige umsortiert wird.
   const order=spec.choices.map((opt,i)=>({opt,i}));
   const reverse=[...String(topic+':'+id()+':'+p)].reduce((sum,ch)=>sum+ch.charCodeAt(0),0)%2===1;
   if(reverse)order.reverse();
   html+='<div class="think-choices" role="group" aria-label="Weg auswählen">'+order.map(({opt,i})=>
    '<button type="button" data-think-choice="'+i+'" aria-pressed="'+(state.choices[key]===i)+'">'+opt.label+'</button>').join('')+'</div>';
   if(Number.isInteger(state.choices[key])){
    const choice=spec.choices[state.choices[key]];
    if(choice){
     html+='<div class="think-feedback '+(choice.correct?'think-feedback-ok':'think-feedback-try')+'" role="status"><b>'+(choice.correct?'Das passt, weil …':'Das passt hier nicht, weil …')+'</b><p>'+choice.why+'</p></div>';
     if(choice.correct){
      html+='<button type="button" class="think-reveal" data-think-reveal>Jetzt Bild und Rechenschritt erklären</button>';
     }else{
      html+='<p class="think-small">Überlege anhand der Begründung noch einmal und wähle den passenden Weg.</p>';
     }
    }
   }
  }else{
   html+='<label class="think-label" for="think-note">Deine Überlegung (freiwillig)</label><textarea id="think-note" data-think-text rows="2" placeholder="Was würdest du tun und warum?"></textarea>';
   html+='';
   html+='<button type="button" class="think-reveal" data-think-reveal>Ich habe überlegt – Schritt erklären</button>';
  }
  note.innerHTML=html+'</section>';
  const input=note.querySelector('[data-think-text]');
  if(input){input.value=state.thoughts[key]||'';input.addEventListener('input',()=>{state.thoughts[key]=input.value;saveState();});}
  note.querySelectorAll('[data-think-choice]').forEach(button=>button.addEventListener('click',()=>{
   state.choices[key]=Number(button.dataset.thinkChoice);saveState();render();
   const feedback=note.querySelector('.think-feedback');if(feedback){feedback.tabIndex=-1;feedback.focus();}
  }));
  const reveal=note.querySelector('[data-think-reveal]');
  if(reveal)reveal.addEventListener('click',()=>{state.revealed[key]=true;if(paintCase&&p===steps.length){state.paint=new Set(Array.from({length:paintModel().target},(_,i)=>i));state.paintChecked=false;}saveState();render();
   const current=calculation.querySelector('.current-line');if(current){current.tabIndex=-1;current.focus();}});
 }else if(p<last){
  picture.innerHTML=renderPicture(p-1);
  if(paintCase){picture.innerHTML=paintBoard(p);updatePaint();}
  const s=active;
  const calculationHtml=(s.choice?'<div class="choice-note"><b>So findest du die Zahl</b>'+safeList(s.choice)+'</div>':'')+
   (s.decisionHtml?'<div class="decision-work">'+s.decisionHtml+'</div>':'')+
   s.html+(s.afterHtml?'<div class="decision-work after-work">'+s.afterHtml+'</div>':'');
  calculation.innerHTML='<div class="notebook"><div class="school-calculation current-line" aria-current="step">'+
   '<div class="step-explanation"><b>Warum dieser Schritt passt</b>'+safeList(s.explain)+'</div>'+calculationHtml+'</div></div>';
  const thought=state.thoughts[key]||'';
  if(thought){
   const d=document.createElement('details');d.className='think-my-thought';
   d.innerHTML='<summary>Meine frühere Überlegung ansehen</summary><p></p>';
   d.querySelector('p').textContent=thought;note.append(d);
  }
  const whyNot=document.createElement('details');whyNot.className='think-trap';
  const claim=document.createElement('p'),reason=document.createElement('p');
  whyNot.innerHTML='<summary>Warum dieser andere Weg nicht passt</summary>';
  claim.textContent=s.counterexample.claim;reason.textContent=s.counterexample.reason;
  whyNot.append(claim,reason);note.append(whyNot);
  const thoughtQuestion=document.createElement('p');thoughtQuestion.className='answered-question';thoughtQuestion.textContent=s.ask;note.prepend(thoughtQuestion);

 }else{
  if(paintCase){picture.innerHTML=paintBoard(p);updatePaint();}
  else if(steps.length)picture.innerHTML=renderPicture(steps.length-1);
  // Learning overrides may use different numbers than the example. Never reuse a
  // stale notebook from the example variant as the conclusion of the learning variant.
  const notebook=state.mode==='learn'
   ?steps.map(s=>'<div class="school-calculation">'+s.html+'</div>').join('')
   :(r.notebookHtml||steps.map(s=>'<div class="school-calculation">'+s.html+'</div>').join(''));
  calculation.innerHTML='<div class="notebook"><h3>Der vollständige Rechenweg</h3>'+notebook+
   '</div><div class="final-answer"><b>Antwort</b>'+safeList(r.answer)+'</div>';
  note.innerHTML='<section class="think-check"><h3>So prüfst du dein Ergebnis</h3>'+safeList(r.check)+
   '<h3>Woran ein anderer Weg scheitert</h3>'+safeList(r.trap)+
   '<button type="button" class="think-restart" id="think-restart">Ohne Lösung neu beginnen</button></section>';
  $('#think-restart').onclick=resetCurrentCase;
 }
 if(p>1&&p<last){
  const history=document.createElement('details');history.className='think-history';history.innerHTML='<summary>Bisheriger Weg</summary>';
  for(let i=0;i<p-1;i++)if(state.revealed[phaseKey()+':'+(i+1)]){
   const line=document.createElement('div');line.className='school-calculation';line.innerHTML=steps[i].html;history.append(line);
  }
  note.append(history);
 }
 const next=$('#step-next'),back=$('#step-back');
 back.disabled=p===0;
 next.disabled=p>0&&p<last&&!shown;
 next.textContent=p===0?'Ersten Schritt überlegen →':p<last?'Weiter zum nächsten Gedanken →':
   state.mode==='examples'?(pos<ordered.length-1?'Nächstes Beispiel →':'Noch einmal ansehen'):
   c.lessons.findIndex(l=>l.id===state.learn)<c.lessons.length-1?'Nächster Lernweg →':'Weitere Beispiele →';
 const hint=$('.stage-hint',reader);
 hint.hidden=true;hint.innerHTML=safeList(p===0?[r.startHint]:p===last?r.check:active.hint);
 hint.dataset.forStep=state.mode+':'+id()+':'+p;$('#hint-toggle').hidden=false;
 $('#hint-toggle').textContent=p===last?'Probe als Tipp':'Ein Tipp ohne vollständige Lösung';
 $('#hint-toggle').setAttribute('aria-expanded','false');
 back.onclick=()=>{state.steps[phaseKey()]=Math.max(0,phase()-1);saveState();render();};
 next.onclick=()=>{
  if(next.disabled)return;
  if(phase()<last){state.steps[phaseKey()]=phase()+1;saveState();render();return;}
  if(state.mode==='examples'){if(pos<ordered.length-1)caseMove(1);else resetCurrentCase();return;}
  const at=c.lessons.findIndex(l=>l.id===state.learn);
  if(at<c.lessons.length-1){
   state.learn=c.lessons[at+1].id;state.steps['learn:'+state.learn]=0;saveState();render();route();reader.scrollIntoView({block:'start'});
  }else{
   state.examples=ordered[0];state.steps['examples:'+state.examples]=0;
   saveState();setMode('examples');
  }
 };
 $('#hint-toggle').onclick=()=>{hint.hidden=!hint.hidden;$('#hint-toggle').setAttribute('aria-expanded',String(!hint.hidden));};
 saveState();
}
function paintModel(){
 const base=c.cases[id()],r=state.mode==='learn'&&base.learning?{...base,...base.learning}:base;
 const model=r.amountModel||{n:5,d:6,known:18};
 return {...model,each:model.known/model.d,target:model.known*model.n/model.d};
}
function paintBoard(p){
 const m=paintModel();let columns='';
 for(let g=0;g<m.d;g++){
  let cells='';for(let row=0;row<m.each;row++){const n=g*m.each+row;cells+='<button type="button" data-paint-cell="'+n+'" aria-label="Kästchen '+(n+1)+' färben" aria-pressed="false"></button>';}
  columns+='<div class="paint-group">'+cells+'</div>';
 }
 return '<div class="paint-activity"><p class="paint-instruction">Tippe auf die Kästchen, die du färben möchtest.</p><div class="paint-board" style="--paint-columns:'+m.d+'" role="group" aria-label="Rechteck mit '+m.known+' gleich großen Kästchen">'+columns+'</div><p class="paint-count" role="status"></p><div class="paint-controls"><button type="button" data-paint-action="groups" aria-pressed="false">Gruppen zeigen</button><button type="button" data-paint-action="clear">Alles entfärben</button><button type="button" data-paint-action="check">Färbung prüfen</button>'+(p>=3&&state.revealed[phaseKey()+':3']?'<button type="button" data-paint-action="model">Beispiel färben</button>':'')+'</div><p class="paint-feedback" role="status"></p></div>';
}
function updatePaint(){
 const board=$('.paint-board',reader);if(!board)return;
 const m=paintModel();
 board.classList.toggle('groups-visible',state.paintGroups||(phase()>=2&&!!state.revealed[phaseKey()+':2']));
 $$('[data-paint-cell]',reader).forEach(b=>{const on=state.paint.has(Number(b.dataset.paintCell));b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label','Kästchen '+(Number(b.dataset.paintCell)+1)+(on?' entfärben':' färben'));b.textContent=on?'✓':'';});
 const groups=$('[data-paint-action="groups"]',reader);groups.setAttribute('aria-pressed',String(state.paintGroups));groups.textContent=state.paintGroups?'Gruppen ausblenden':m.d+' Gruppen zeigen';
 const count=state.paint.size;$('.paint-count',reader).textContent=count+' von '+m.known+' Kästchen gefärbt.';
 $('.paint-feedback',reader).textContent=!state.paintChecked?'':count===m.target?'Das passt: '+count+' von '+m.known+' Kästchen sind '+m.n+'/'+m.d+' des Rechtecks.':'Prüfe deine Färbung: Teile die '+m.known+' Kästchen in '+m.d+' gleich große Gruppen. Nimm davon '+m.n+' Gruppen.';
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
const reference=$('#reference-pane');
const cards=c.referenceCards||[
 {title:'Die Bruchzahlen',html:'',lines:c.words.flatMap(w=>[w.word+': '+w.lines.join(' ')])},
 {title:'Anteile und Ganzes',html:'',lines:c.rules}
];
const first=c.cases[c.groups[0][0]];
reference.innerHTML='<article class="reference-card reference-core"><h2>Kurz merken</h2>'+safeList(c.rules)+
 '<h3>Eine wichtige Denkfalle</h3>'+safeList(first.trap)+
 '<div class="print-pattern"><h3>Ein Rechenmuster</h3>'+first.steps.map(s=>'<div class="school-calculation">'+s.html+'</div>').join('')+'</div></article>'+
 '<article class="reference-card reference-decide"><h2>So entscheide ich</h2><ul>'+c.lessons.map(l=>{
  const base=c.cases[l.id],r=base.learning?{...base,...base.learning}:base;
  return '<li><a href="#lernen-type-'+l.id+'">'+l.label+'</a><br>'+r.recognize+'</li>';
 }).join('')+'</ul></article>'+
 '<article class="reference-card reference-patterns"><h2>Rechenmuster finden</h2><ul>'+c.groups.flat().map(id=>'<li><a href="#type-'+id+'">'+c.cases[id].title+'</a></li>').join('')+'</ul></article>'+
 '<article class="reference-card reference-mistakes"><h2>Typische Fehler</h2>'+safeList([...new Set(c.lessons.map(l=>{const r=c.cases[l.id];return(r.learning?.trap||r.trap).join(' ');} ))])+'</article>'+
 '<section class="reference-details" aria-label="Regeln und Sonderfälle">'+cards.map(card=>'<article class="reference-card"><h2>'+card.title+'</h2>'+(card.html||'')+safeList(card.lines)+(card.visual?'<div class="stage-picture">'+window.MerkheftPictures.learning(topic,1,{chapterVisual:card.visual},c.cases[1])+'</div>':'')+'</article>').join('')+'</section>';

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

