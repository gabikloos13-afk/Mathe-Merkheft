'use strict';
(()=>{
if(document.body.dataset.topic!=='quotienten')return;
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const F=(n,d)=>`<span class="fraction" aria-label="${E(n)} durch ${E(d)}"><span>${E(String(n).replaceAll('-','−'))}</span><span>${E(String(d).replaceAll('-','−'))}</span></span>`;
const M=(w,n,d)=>`${w} ${F(n,d)}`;
const P=(kind,n=0,d=1,extra={})=>({kind,n,d,...extra});
function divisorSearch(n,d){
 const divisors=x=>Array.from({length:x},(_,i)=>i+1).filter(k=>x%k===0);
 const a=divisors(n),b=divisors(d),common=a.filter(k=>b.includes(k)),largest=common.at(-1);
 return `<div class="q-divisor-search"><b>So findest du die Kürzungszahl</b><ul><li>Teiler von ${n}: ${a.join(', ')}.</li><li>Teiler von ${d}: ${b.join(', ')}.</li><li>Gemeinsam: ${common.join(', ')}.</li><li>${largest>1?'Größte passende Kürzungszahl: '+largest+'.':'Nur 1 ist gemeinsam. Der Bruch ist vollständig gekürzt.'}</li></ul></div>`;
}
// Bilder: gleiche Einheiten und unveränderte Gesamtmenge.
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const simplify=(n,d)=>{if(!d)throw Error('Nenner 0');const g=gcd(n,d);return[n/g,d/g];};
function unitBar(filled,den,group=false){
 return `<div class="q-unit" role="img" aria-label="${filled} von ${den} gleich großen Teilen" style="--q-den:${den}">${Array.from({length:den},(_,i)=>`<span data-q-cell="${i<filled?'filled':'empty'}" class="${i<filled?'q-filled':''}${group?' q-grouped':''}"></span>`).join('')}</div>`;
}
function amount(n,d,labels=false){
 if(n===0)return '<div class="q-zero">Menge: 0</div>';
 const full=Math.floor(n/d),rest=n%d;
 return `<div class="q-amount">${Array.from({length:Math.ceil(n/d)},(_,i)=>{const k=Math.min(d,n-i*d);return `<div class="q-unit-wrap">${unitBar(k,d)}${labels?`<span>${k===d?'1 Ganzes':`${k} von ${d} Teilen`}</span>`:''}</div>`;}).join('')}</div>`;
}
function sharing(n,d,phase=0,unit='Tafel'){
 if(d<1||!Number.isInteger(d)||n<0)throw Error('Ungültige Verteilung');
 const total=n*d,focus=phase===3;
 if(phase<2)return `<div class="q-sharing" data-q-total="${n}" data-q-den="${d}" data-q-stage="${phase}"><div class="q-source"><b>${n} ${n===1?unit:unit==='Pizza'?'Pizzen':'Tafeln'} insgesamt</b>${n?`<div class="q-wholes">${Array.from({length:n},(_,i)=>`<div class="q-source-unit" data-q-source="${i}"><span>${unit} ${i+1}</span>${phase?unitBar(d,d):'<div class="q-whole" aria-label="Ein Ganzes"></div>'}</div>`).join('')}</div>`:'<p>Es ist nichts zum Verteilen vorhanden.</p>'}</div><div class="q-recipients"><b>${d} ${d===1?'Empfänger':'Empfänger'}</b><div class="q-recipient-names">${Array.from({length:d},(_,i)=>`<span>Kind ${i+1}</span>`).join('')}</div></div>${phase?`<div class="q-piece-caption">Jedes Stück ist ${F(1,d)} einer ganzen ${unit}.</div>`:''}</div>`;
 return `<div class="q-sharing" data-q-total="${n}" data-q-den="${d}" data-q-stage="${phase}" data-q-distributed="${total}"><b>${focus?'Anteil eines Kindes':'Alle Kinder erhalten gleich viel'}</b><div class="q-plates">${Array.from({length:focus?1:d},(_,i)=>`<div class="q-plate" data-q-child="${i}" data-q-count="${n}"><b>Kind ${i+1}</b>${amount(n,d)}<span>${phase===3?F(n,d)+' '+unit:n+(n===1?' Stück':' Stücke')}</span></div>`).join('')}</div>${focus?`<p>Alle ${d} Kinder erhalten diese Menge.</p>`:''}</div>`;
}
function objectPicture(s){
 const size=s.groupSize||s.d,count=s.groupSize?s.d:Math.floor(s.n/size),used=count*size;
 const dots=(n)=>Array.from({length:n},()=>'<i class="q-object" data-q-object></i>').join('');
 return s.group?`<div class="q-object-groups">${Array.from({length:count},(_,i)=>`<div><b>Gruppe ${i+1}</b><div>${dots(size)}</div><span>${size} Stück</span></div>`).join('')}${s.n>used?`<div class="q-object-rest"><b>Übrig</b><div>${dots(s.n-used)}</div></div>`:''}</div>`:`<div class="q-object-stock">${dots(s.n)}</div><p>${s.n} ganze Gegenstände</p>`;
}
function negativePicture(n,d,mirror=false){
 const v=n/d,min=-Math.ceil(Math.abs(v)),max=Math.ceil(Math.abs(v)),x=value=>35+(value-min)/(max-min||2)*330;
 let b='<path d="M30 85H375m-7-5 7 5-7 5" stroke="#326b82" stroke-width="2" fill="none"/>';
 for(let i=min;i<=max;i++)b+=`<path d="M${x(i)} 77v16" stroke="#326b82"/><text x="${x(i)}" y="121" text-anchor="middle" font-size="23">${i<0?'−'+Math.abs(i):i}</text>`;
 const points=mirror?[-Math.abs(v),Math.abs(v)]:[v];
 points.forEach(p=>{b+=`<circle cx="${x(p)}" cy="85" r="6" fill="#783d53"/>`;});
 return `<svg viewBox="0 0 400 150" role="img" aria-label="${mirror?'Gegenzahlen auf beiden Seiten von 0':'Ergebnis '+n+' durch '+d+' auf der Zahlenlinie'}">${b}</svg><div class="q-figure-equation">${mirror?'Gegenzahlen: −'+F(Math.abs(n),d)+' und +'+F(Math.abs(n),d):'Ergebnis: '+(n<0?'−':'')+F(Math.abs(n),d)}</div>`;
}
function setsPicture(phase){
 const nat=phase>=1?'<div class="q-set q-nat"><b>ℕ · natürliche Zahlen</b><span>0, 1, 2, 3, …</span>'+(phase>=6?'<div class="q-members">6'+(phase>=7?' · '+F(10,5)+' = 2':'')+'</div>':'')+'</div>':'';
 const ints=phase>=2?'<div class="q-set q-int"><b>ℤ · ganze Zahlen</b><span>Ganze Zahlen mit und ohne Minus.</span>'+(phase>=4?'<div class="q-members">−5</div>':'')+nat+'</div>':nat;
 return phase>=3?'<div class="q-set q-rational"><b>ℚ · rationale Zahlen</b><span>Als Bruch ganzer Zahlen darstellbar.</span>'+(phase>=5?'<div class="q-members">'+F(1,8)+'</div>':'')+ints+'</div>':ints;
}
function figure(s){
 if(!s)return '';
 let body='';
 if(s.kind==='share')body=sharing(s.n,s.d,s.phase||0,s.unit||'Tafel');
 else if(s.kind==='amount')body=amount(s.n,s.d,s.labels||s.group);
 else if(s.kind==='equivalent')body=`<div class="q-pair"><div><b>Vorher: ${F(s.n,s.d)}</b>${amount(s.n,s.d)}</div><div><b>Nachher: ${F(s.toN,s.toD)}</b>${amount(s.toN,s.toD)}</div></div><p>Die gefärbte Menge bleibt gleich groß.</p>`;
 else if(s.kind==='objects')body=objectPicture(s);
 else if(s.kind==='mapping')body=`<div class="q-mapping"><div><b>${s.reverse?'Bruch':'Geteilt-Aufgabe'}</b><span>${s.reverse?F(s.n,s.d):s.n+' : '+s.d}</span></div>${s.show?`<div class="q-map-arrow" aria-hidden="true">↓</div><div><b>${s.reverse?'Geteilt-Aufgabe':'Bruch'}</b><span>${s.reverse?s.n+' : '+s.d:F(s.n,s.d)}</span></div>`:''}<ul><li>Erste Zahl / Zähler: <b>${s.n}</b></li><li>Zweite Zahl / Nenner: <b>${s.d}</b></li></ul></div>`;
 else if(s.kind==='fraction')body=`<div class="q-big-fraction">${s.n<0?'−':''}${F(Math.abs(s.n),s.d)}</div>`;
 else if(s.kind==='sign')body=`<div class="q-sign-row"><div><b>Erste Zahl</b><span>${s.left}${s.n}</span></div><span>:</span><div><b>Zweite Zahl</b><span>${s.right}${s.d}</span></div></div>${s.result?'<div class="q-sign-result">Ergebnisvorzeichen: <b>'+s.result+'</b></div>':''}`;
 else if(s.kind==='negative'||s.kind==='mirror')body=negativePicture(s.n,s.d,s.kind==='mirror');
 else if(s.kind==='length')body=`<b>Gesamte Strecke: ${s.n} km</b><div class="q-length ${s.phase?'q-divided':''}" style="--q-den:${s.d}">${Array.from({length:s.phase?s.d:1},(_,i)=>`<span class="${s.phase>=2&&i===0?'q-length-selected':''}"></span>`).join('')}</div><p>${s.phase?s.d+' gleich lange Abschnitte':'Die ganze Strecke ist noch nicht aufgeteilt.'}</p>`;
 else if(s.kind==='sets')body=setsPicture(s.phase);
 else if(s.kind==='compare')body=`<div class="q-pair"><div><b>${F(s.n,s.d)}</b>${amount(s.n,s.d)}</div><div><b>${F(s.bN,s.bD)}</b>${amount(s.bN,s.bD)}</div></div>`;
 else body='<div class="q-facts">'+(s.lines||[]).map(l=>'<div>'+l+'</div>').join('')+'</div>';
 return `<figure class="q-picture" data-q-kind="${s.kind}">${body}${s.caption?'<figcaption>'+s.caption+'</figcaption>':''}</figure>`;
}
const old=window.MerkheftPictures;
window.MerkheftPictures={render:(topic,id,index,r)=>topic==='quotienten'?figure(index<0?r.preview:r.steps[index]?.picture):old.render(topic,id,index,r),learning:(topic,id,s,r)=>topic==='quotienten'?figure(s.picture):old.learning(topic,id,s,r)};
window.MerkheftDivision={figure,sharing,simplify,model:(n,d)=>{if(!Number.isInteger(n)||!Number.isInteger(d)||n<0||d<1)throw Error('Ungültige Verteilung');return{total:n,pieces:n*d,recipients:d,piecesEach:n,amountEach:n/d};}};
function installTool(){
 const lab=document.querySelector('#werkzeug');if(!lab)return;
 lab.innerHTML=`<h2>Gerecht verteilen und den Bruch verstehen</h2><div id="q-tool"><div class="q-tool-controls"><label for="q-total">Ganze Tafeln: <output id="q-total-out">3</output></label><input id="q-total" type="range" min="0" max="6" step="1" value="3"><label for="q-people">Kinder: <output id="q-people-out">4</output></label><input id="q-people" type="range" min="1" max="8" step="1" value="4"></div><h3 id="q-tool-title"></h3><div class="q-tool-picture"></div><div class="q-tool-equation" aria-live="polite"></div><div class="q-tool-explanation"></div><div class="q-tool-actions"><button type="button" id="q-back">← Zurück</button><span id="q-stage-status" aria-live="polite"></span><button type="button" id="q-next">Weiter →</button></div><div class="q-tool-bottom"><button type="button" id="q-reduce" hidden>Bruch vollständig kürzen</button><button type="button" id="q-reset">Zurück zu 3 Tafeln für 4 Kinder</button></div><div class="q-reduction" hidden></div></div>`;
 const root=lab.querySelector('#q-tool'),wholeInput=root.querySelector('#q-total'),peopleInput=root.querySelector('#q-people');let n=3,d=4,phase=0,reduced=false;
 function render(){
  root.dataset.qN=n;root.dataset.qD=d;root.dataset.qPhase=phase;
  root.querySelector('#q-total-out').textContent=n;root.querySelector('#q-people-out').textContent=d;wholeInput.value=n;peopleInput.value=d;
  root.querySelector('#q-tool-title').textContent=['Die Gesamtmenge und die Kinder','Jede Tafel gleichmäßig teilen','Die Stücke gerecht verteilen','Den Anteil eines Kindes ablesen'][phase];
  root.querySelector('.q-tool-picture').innerHTML=figure(P('share',n,d,{phase}));
  root.querySelector('.q-tool-equation').innerHTML=phase===0?`${n} Tafeln für ${d} Kinder`:phase===1?`Ein Stück = ${F(1,d)} Tafel`:phase===2?`Jedes Kind bekommt ${n===1?'ein gleich großes Stück':n+' gleich große Stücke'}.`:`${n} : ${d} = ${F(n,d)} Tafel pro Kind`;
  const points=[['Alle Tafeln sind gleich groß.','Alle Kinder sollen gleich viel erhalten.'],(d===1?['Jede Tafel bleibt ganz.','Das eine Kind bekommt alle ganzen Tafeln.']:[`Teile jede Tafel in ${d} gleich große Stücke.`,'Für jedes Kind ist von jeder Tafel ein Stück vorgesehen.']),['Jedes Kind bekommt von jeder Tafel ein Stück.','Kein Stück geht verloren.'],[`Ein Kind hat ${n} ${n===1?'Stück':'Stücke'}. Jedes Stück ist ${F(1,d)} einer Tafel.`,'Die Menge pro Kind ist der Quotient.']][phase];
  if(n===0)points.splice(0,points.length,'Es ist keine Schokolade vorhanden.',`Alle ${d} Kinder erhalten die Menge 0.`);
  root.querySelector('.q-tool-explanation').innerHTML='<ul>'+points.map(p=>'<li>'+p+'</li>').join('')+'</ul>';
  root.querySelector('#q-back').disabled=phase===0;root.querySelector('#q-next').textContent=phase===3?'Von vorn ansehen':'Weiter →';root.querySelector('#q-stage-status').textContent='Bildschritt '+(phase+1)+' von 4';
  root.querySelector('#q-reduce').hidden=phase!==3;const reduction=root.querySelector('.q-reduction');reduction.hidden=!reduced||phase!==3;
  const g=gcd(n,d),[a,b]=simplify(n,d),q=Math.floor(n/d),r=n%d;
  reduction.innerHTML=(n?divisorSearch(n,d):'')+(n===0?`${F(0,d)} = 0`:g===1?`${F(n,d)}${b===1?' = '+a:q>0?' = '+M(q,r,d):''} ist bereits vollständig gekürzt.`:`<ul><li>Kürzungszahl ${g}: ${n} : ${g} = ${a}; ${d} : ${g} = ${b}.</li><li>${F(n,d)} = ${F(a,b)}${b===1?' = '+a:q>0?' = '+M(q,r/g,d/g):''}.</li><li>Die Menge pro Kind bleibt gleich.</li></ul>`);
 }
 root.addEventListener('input',e=>{if(e.target!==wholeInput&&e.target!==peopleInput)return;n=+wholeInput.value;d=+peopleInput.value;phase=0;reduced=false;render();});
 root.addEventListener('click',e=>{if(e.target.id==='q-next'){phase=(phase+1)%4;reduced=false;}else if(e.target.id==='q-back'){phase=Math.max(0,phase-1);reduced=false;}else if(e.target.id==='q-reduce')reduced=!reduced;else if(e.target.id==='q-reset'){n=3;d=4;phase=0;reduced=false;}else return;render();});render();
}
installTool();
})();
