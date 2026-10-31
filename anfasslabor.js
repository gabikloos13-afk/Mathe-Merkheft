'use strict';
(()=>{
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const F=(n,d)=>`<span class="fraction" aria-label="${n} durch ${d}"><span>${n}</span><span>${d}</span></span>`;
const fmt=n=>Number(n).toLocaleString('de-DE',{maximumFractionDigits:6});
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const simplify=(n,d)=>{const g=gcd(n,d);return [n/g,d/g]};
const list=items=>'<ul class="mini-explain">'+items.flatMap(x=>String(x).split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/)).map(x=>'<li>'+x+'</li>').join('')+'</ul>';
const button=(action,label,more='')=>`<button type="button" data-do="${action}" ${more}>${label}</button>`;
const option=(id,label,values,value)=>{
 const chips=['pieces','shape','workfactor','workmode','bundleden','lineden','unitdimension'].includes(id);
 return `<div class="control-group ${chips?'chip-group':''}"><label for="${id}">${label}</label><select id="${id}" data-control="${id}" ${chips?'class="visually-select" tabindex="-1" aria-hidden="true"':''}>${values.map(([v,t])=>`<option value="${v}" ${String(v)===String(value)?'selected':''}>${t}</option>`).join('')}</select>${chips?`<div class="choice-row" role="group" aria-label="${label}">${values.map(([v,t])=>`<button type="button" data-choice="${id}" data-value="${v}" value="${v}" aria-pressed="${String(v)===String(value)}">${t}</button>`).join('')}</div>`:''}</div>`;
};
const range=(id,label,min,max,value,step=1)=>`<label for="${id}">${label}: <b>${fmt(value)}</b><input id="${id}" data-control="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
const svg=(body,h,label,w=600)=>`<svg viewBox="0 0 ${w} ${h}" role="${/data-handle|data-piece/.test(body)?'group':'img'}" aria-label="${E(label)}">${body}</svg>`;
const text=(x,y,s,anchor='start')=>`<text x="${x}" y="${y}" text-anchor="${anchor}">${E(s)}</text>`;
const rect=(x,y,w,h,color,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" ${more}/>`;
const purple='#783d53',blue='#326b82',gold='#ad6b22',paper='#f3ece2';
const Core={
 split(n,d,k){return {n:n*k,d:d*k}},
 join(n,d,k){return n%k||d%k?null:{n:n/k,d:d/k}},
 bundleCount(loc,d){const groups=Array.from({length:Math.ceil(loc.length/d)},(_,g)=>loc.filter(x=>x===g+1).length);return {full:groups.filter(n=>n===d).length,rest:loc.length-groups.filter(n=>n===d).length*d,groups}},
 exchange(s,kind,all=false){const a=kind==='h'?'h':'t',bucket=kind==='h'?'hb':'tb',next=kind==='h'?'t':'e';const count=Math.min(s[a],all?10-s[bucket]:1);s[a]-=count;s[bucket]+=count;if(s[bucket]===10){s[bucket]=0;s[next]++}return s},
 amount(s){return s.h+s.hb+10*(s.t+s.tb)+100*s.e},
 snap(x,min,span,d){return Math.round((min+Math.max(0,Math.min(1,x))*span)*d)},
 projected(x,y,z,angle){const a=angle*Math.PI/180;return [300+(x*Math.cos(a)-y*Math.sin(a))*18,255+(x*Math.sin(a)+y*Math.cos(a))*8-z*18]},
 compare(a,b,c,d){const x=a*d-c*b;return x===0?'=':x<0?'&lt;':'&gt;'}
};

const lab=document.querySelector('#werkzeug');if(!lab)return;
const topic=document.body.dataset.topic;
if(topic==='quotienten')return; // The distribution chapter keeps its dedicated four-step model.
const titles={brueche:'Bruchbaukasten',gleichwertig:'Bruch-Werkstatt',gemischt:'Bündelmaschine',vergleichen:'Brüche vergleichen',zahlenstrahl:'Verschiebbare Zahlenlinie',dezimal:'Stellenwert-Maschine',dezimalvergleich:'Stellenwert-Lupe',groessen:'Längen, Flächen und Körper'};
if(!titles[topic])return;
const help=document.createElement('details');help.className='guided-follow';help.innerHTML='<summary>Ein Beispiel Schritt für Schritt verstehen</summary>';
const h2=lab.querySelector('h2');h2.textContent=titles[topic];
let node=h2.nextSibling;while(node){const next=node.nextSibling;help.append(node);node=next}
const root=document.createElement('div');root.className='direct-workspace';root.id='anfasslabor';lab.append(root,help);
let S={n:3,d:8,mask:new Set([0,1,2]),view:'circle',k:2,workmode:'extend',workShown:false,count:11,den:4,locations:Array(11).fill(0),selected:null,a:2,b:3,c:3,bd:4,fa:1,fb:1,overlay:false,lineN:3,lineD:4,start:-1,span:3,total:35,h:35,hb:0,t:0,tb:0,e:0,pair:0,loupe:0,dim:3,angle:25,layers:5,slice:5,surface:false,lengthMask:new Set([0,1,2,3,4]),areaMask:new Set(Array.from({length:50},(_,i)=>i))};
if(topic==='gleichwertig')S.k=4;
let message='',activeDrag=null;
const playbook={
 brueche:['Brüche sehen','Wie viele Stücke nimmst du?','Tippe auf ein Stück. Tippe noch einmal, um es wegzunehmen.'],
 gleichwertig:['Schokolade teilen','Die Menge bleibt gleich.','Wähle eine Zahl. Klicke dann auf Erweitern oder Kürzen.'],
 gemischt:['Ganze und Rest','Fülle die Schachteln.','Ziehe ein Stück in die Schachtel. Du kannst es auch antippen.'],
 vergleichen:['Brüche vergleichen','Welcher Streifen zeigt mehr?','Teile beide Streifen in gleich große Stücke.'],
 zahlenstrahl:['Zahlen in Bewegung','Wo landet dein Bruch?','Ziehe den Punkt. Jede Lücke zählt.'],
 dezimal:['Zehntel und Hundertstel','Aus 10 kleinen wird 1 größeres.','Lege 10 Plättchen in den Tauschkasten.'],
 dezimalvergleich:['Kommazahlen vergleichen','Welche Ziffer ist anders?','Tippe auf eine Spalte. Du kannst auch die Lupe ziehen.'],
 groessen:['Länge, Fläche, Raum','Schau in den Würfel.','Drehe ihn. Fülle ihn Schicht für Schicht.']
};
const pairs=[['0,43','0,418'],['0,6','0,600'],['−0,41','−0,40'],['0,15','0,151']];
// Kurze Rückmeldungen zeigen die Handlung; keine dauernden Animationen.
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function motion(source,target,kind='piece',count=1){
 if(!source||!target||reduced())return;
 const end=target.getBoundingClientRect(),ghost=document.createElement('span');
 ghost.className='transfer-ghost '+kind;ghost.setAttribute('aria-hidden','true');
 ghost.innerHTML=kind==='piece'?F(1,S.den):kind==='h'?F(count,100):F(count,10);
 ghost.style.left=(source.left+source.width/2-24)+'px';ghost.style.top=(source.top+source.height/2-24)+'px';document.body.append(ghost);
 const dx=end.left+end.width/2-(source.left+source.width/2),dy=end.top+end.height/2-(source.top+source.height/2);
 const anim=ghost.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx*.5}px,${dy*.5-35}px) scale(1.15)`,opacity:1},{transform:`translate(${dx}px,${dy}px) scale(.65)`,opacity:0}],{duration:440,easing:'ease-in-out'});
 anim.onfinish=()=>ghost.remove();
}
function feedback(kind='change'){
 if(reduced())return;
 root.querySelector('.hands-answer').animate([{transform:'scale(.98)',background:'#fff0c7'},{transform:'scale(1)',background:'#ffffffd9'}],{duration:280});
 if(kind==='cut')root.querySelectorAll('.work-cut').forEach(el=>el.animate([{strokeDasharray:'90',strokeDashoffset:'90'},{strokeDasharray:'90',strokeDashoffset:'0'}],{duration:400}));
}
function reset(){message='';if(topic==='brueche'){S.mask=new Set([0,1,2]);S.d=8}if(topic==='gleichwertig')S.workShown=false;if(topic==='gemischt'){S.locations=Array(S.count).fill(0);S.selected=null}if(topic==='dezimal'){S.h=S.total;S.hb=S.t=S.tb=S.e=0}render()}
function shell(instruction,controls,board,answer,explanation,actions=''){
 const focused=document.activeElement;let focusQuery=null;if(focused&&root.contains(focused)){const names=['data-do','data-group','data-k','data-piece','data-token','data-place','data-loupe','data-area','data-length','data-choice','data-value'];const attrs=names.filter(n=>focused.hasAttribute(n));if(attrs.length)focusQuery=attrs.map(n=>'['+n+'=\"'+focused.getAttribute(n)+'\"]').join('');}
 if(!root.children.length){
  const [tag,title,hint]=playbook[topic];
  root.innerHTML=`<div class="play-banner"><span class="play-emblem" data-tool-art="${topic}" aria-hidden="true"></span><div><span class="play-kicker">${tag}</span><h3>${title}</h3></div></div><div class="touch-tip"><span class="touch-symbol" aria-hidden="true">↗</span><span>${hint}</span></div><div class="play-stage"><div class="hands-board"></div><div class="hands-answer" aria-live="polite" aria-atomic="true"></div></div><div class="hands-message" role="status"></div><div class="hands-actions"></div><details class="model-settings" open><summary>Bild verändern</summary><div class="direct-controls"></div></details><details class="model-reason"><summary>Das steckt dahinter</summary><div class="hands-explain"></div></details><details class="model-help"><summary>Bedienung Schritt für Schritt</summary><div class="direct-instruction"></div></details>`;
  window.MerkheftArt?.decorate(root);
 }
 root.querySelector('.direct-instruction').innerHTML=list(instruction);
 const controlBox=root.querySelector('.direct-controls'),template=document.createElement('template');template.innerHTML=controls;
 const oldInputs=[...controlBox.querySelectorAll('[data-control]')],newInputs=[...template.content.querySelectorAll('[data-control]')];
 if(oldInputs.length===newInputs.length&&oldInputs.every((el,i)=>el.id===newInputs[i].id)){
  oldInputs.forEach((el,i)=>{const next=newInputs[i];el.value=next.value;for(const name of ['min','max','step'])if(next.hasAttribute(name))el.setAttribute(name,next.getAttribute(name));const oldB=el.closest('.control-group,label').querySelector('b'),newB=next.closest('.control-group,label').querySelector('b');if(oldB&&newB)oldB.textContent=newB.textContent;});
 }else controlBox.innerHTML=controls;
 controlBox.querySelectorAll('[data-choice]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.value===controlBox.querySelector('#'+btn.dataset.choice).value)));
 root.querySelector('.touch-tip span:last-child').textContent=topic==='brueche'?(S.view==='circle'?'Tippe auf ein Pizzastück. Markiere so deinen Anteil.':S.view==='grid'?'Tippe auf ein Schokoladenstück. Markiere so deinen Anteil.':'Tippe auf einen Teil des Streifens.'):topic==='groessen'?(S.dim===3?(S.surface?'Sechs Flächen bilden die Hülle. Stelle den Würfel wieder auf.':'Ziehe den Würfel seitlich. So drehst du ihn.'):'Tippe im Bild auf die Teile.'):playbook[topic][2];
 root.querySelector('.hands-board').innerHTML=board;root.querySelector('.hands-actions').innerHTML=actions;root.querySelector('.hands-answer').innerHTML='<span class="answer-label">Bild → Rechnung</span><div>'+answer+'</div>';root.querySelector('.hands-explain').innerHTML=list(explanation);root.querySelector('.hands-message').textContent=message;
 if(focusQuery){const next=root.querySelector(focusQuery);if(next&&!next.disabled)next.focus({preventScroll:true});}
}
function fractionBuilder(){
 const n=S.mask.size,d=S.d;
 let image='';
 if(S.view==='circle'){
  let body='<ellipse cx="160" cy="249" rx="104" ry="8" fill="#4e36531a"/><circle cx="160" cy="130" r="125" fill="white" stroke="#d8d2ea" stroke-width="2"/><circle cx="160" cy="130" r="115" fill="#ce8a3e"/>';
  body+=Array.from({length:d},(_,i)=>{const a=-Math.PI/2+i*Math.PI*2/d,b=a+Math.PI*2/d,p=t=>`${160+106*Math.cos(t)},${130+106*Math.sin(t)}`;return `<path d="M160 130L${p(a)}A106 106 0 0 1 ${p(b)}Z" class="touch-part pizza-slice ${S.mask.has(i)?'selected-part':''}" data-piece="${i}" role="button" tabindex="0" aria-label="Pizzastück ${i+1} ${S.mask.has(i)?'entfärben':'färben'}" aria-pressed="${S.mask.has(i)}"/>`}).join('');
  body+='<g pointer-events="none">'+Array.from({length:d},(_,i)=>{if(!S.mask.has(i))return '';const a=-Math.PI/2+(i+.5)*Math.PI*2/d,x=160+70*Math.cos(a),y=130+70*Math.sin(a);return `<circle cx="${x}" cy="${y}" r="${d>8?8:11}" fill="#c34d49"/><circle cx="${x-2}" cy="${y-2}" r="2" fill="#efb1a0"/><ellipse cx="${160+43*Math.cos(a)}" cy="${130+43*Math.sin(a)}" rx="5" ry="3" fill="#507858" transform="rotate(${a*180/Math.PI} ${160+43*Math.cos(a)} ${130+43*Math.sin(a)})"/>`}).join('')+'</g>';
  image=svg(body,264,`${n} von ${d} gleich großen Pizzastücken markiert`,320);
 }else if(S.view==='bar'){
  image=svg(Array.from({length:d},(_,i)=>rect(25+i*550/d,45,550/d,105,S.mask.has(i)?purple:paper,`class="touch-part" data-piece="${i}" role="button" tabindex="0" aria-label="Teil ${i+1} umschalten" aria-pressed="${S.mask.has(i)}"`)).join(''),190,'Bruchstreifen zum Anklicken');
 }else image=`<div class="fraction-parts" style="--parts:${d<=4?d:d/2};--rows:${d<=4?1:2}">${Array.from({length:d},(_,i)=>`<button class="square-part ${S.mask.has(i)?'filled':''}" type="button" data-piece="${i}" aria-label="Teil ${i+1} umschalten" aria-pressed="${S.mask.has(i)}">${i+1}</button>`).join('')}</div>`;
 const [a,b]=simplify(n,d);
 shell(['Tippe direkt auf ein Stück. So färbst du es.','Tippe noch einmal auf dasselbe Stück. So wird es wieder frei.'],option('pieces','Teile pro Ganzem',[[2,'2 Hälften'],[3,'3 Drittel'],[4,'4 Viertel'],[6,'6 Sechstel'],[8,'8 Achtel'],[10,'10 Zehntel'],[12,'12 Zwölftel']],d)+option('shape','Bild wechseln',[['circle','Pizza'],['bar','Streifen'],['grid','Schokolade']],S.view),image,`${F(n,d)} = ${n} von ${d} Teilen`,[`<b>Nenner ${d}:</b> So viele gleich große Teile bilden das Ganze.`,`<b>Zähler ${n}:</b> So viele Teile hast du gefärbt.`,n?`Anderes Bild, gleicher Anteil: ${F(n,d)} = ${b===1?fmt(a):F(a,b)}.`:'Noch kein Teil ist gefärbt.'],button('all','Alle färben')+button('none','Alle freigeben'));
}
function workshop(){
 const reduce=S.workmode==='reduce',k=S.k,from=reduce?{n:12,d:16}:{n:2,d:3},to=reduce?Core.join(from.n,from.d,k):Core.split(from.n,from.d,k),sign=reduce?':':'·',shown=S.workShown&&to;
 const strip=(n,d,label)=>{
  let body=rect(20,10,560,80,'#eee7df')+rect(20,10,560*n/d,80,purple);
  for(let i=0;i<=d;i++)body+=`<path d="M${20+i*560/d} 10v80" class="work-cut"/>`;
  return svg(body,105,label);
 };
 const divide=n=>n+' : '+k+' = '+Math.floor(n/k)+(n%k?' Rest '+n%k:'');
 const choice='<div class="reason-rows"><div><b>Deine Rechenzahl</b><span>'+k+'</span></div><div><b>'+(reduce?'Was prüfen wir?':'Warum ist sie erlaubt?')+'</b><span>'+(reduce?'Geht das Teilen oben und unten ohne Rest?':'Kein Ziel vorgegeben. Du darfst diese Malzahl wählen.')+'</span></div></div>';
 let calculation='';
 if(S.workShown){
  calculation='<div class="workshop-calculation"><div><b>Oben rechnen</b><span>'+(reduce?divide(from.n):from.n+' · '+k+' = '+to.n)+'</span></div><div><b>Unten genauso rechnen</b><span>'+(reduce?divide(from.d):from.d+' · '+k+' = '+to.d)+'</span></div></div>';
  if(!to)calculation+='<div class="workshop-feedback" role="status"><b>Mit '+k+' geht es nicht.</b><ul><li>Beim Teilen bleibt ein Rest.</li><li>Probiere eine andere Zahl.</li></ul></div>';
  else if(reduce&&to.n===6)calculation+='<div class="workshop-feedback" role="status">Noch nicht fertig: 6 und 8 sind beide durch 2 teilbar.</div>';
  else if(reduce)calculation+='<div class="workshop-feedback" role="status">Vollständig gekürzt: 3 und 4 haben nur den Teiler 1 gemeinsam.</div>';
 }
 const picture=choice+`<div class="workshop-pair"><div><h4>Vorher: ${F(from.n,from.d)}</h4>${strip(from.n,from.d,'Vorher: '+from.n+' von '+from.d+' gleichen Teilen')}</div><div class="${shown?'':'workshop-awaiting'}"><h4>${shown?'Nachher: '+F(to.n,to.d):'Nachher'}</h4>${shown?strip(to.n,to.d,'Nachher: '+to.n+' von '+to.d+' gleichen Teilen'):'<div class="workshop-placeholder">'+(S.workShown?'Diese Zahl passt nicht.':'Rechne zuerst oben und unten.')+'</div>'}</div></div>`+calculation;
 const equation=shown?`${F(from.n,from.d)} <span class="school-equals" aria-label="oben und unten ${sign} ${k}"><span>${sign} ${k}</span><span>=</span><span>${sign} ${k}</span></span> ${F(to.n,to.d)}`:`Start: ${F(from.n,from.d)}`;
 shell(['Wähle eine Rechenzahl.','Tippe auf „Rechnung zeigen“.'],option('workmode','Was möchtest du ansehen?',[['extend','Erweitern'],['reduce','Kürzen']],S.workmode)+option('workfactor','Mit welcher Zahl?',[[2,'2'],[3,'3'],[4,'4'],[5,'5']],k),picture,equation,[reduce?'Kürzen geht nur ohne Rest bei beiden Zahlen.':'Jedes Stück wird in '+k+' kleine Teile geteilt.','Die gefärbte Fläche bleibt gleich groß.'],button('work-show','Rechnung zeigen',S.workShown?'disabled':'')+(S.workShown?button('reset','Noch einmal ansehen'):''));
 root.querySelector('.play-banner h3').textContent=reduce?'Welche Kürzungszahl passt?':'Erweitern: oben und unten malnehmen.';
 root.querySelector('.touch-tip span:last-child').textContent=reduce?'Der Startbruch bleibt 12/16. Prüfe verschiedene Zahlen.':'Mehr Stücke. Gleich viel Schokolade.';
}
function tile(i,group){const a=-Math.PI/2+Math.PI*2/S.den,x=22+18*Math.cos(a),y=22+18*Math.sin(a),icon=`<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" fill="#e9e4f4"/><path d="M22 22L22 4A18 18 0 0 1 ${x} ${y}Z" fill="#9860ac" stroke="white"/></svg>`;return `<button type="button" draggable="true" data-token="${i}" class="bundle-token ${S.selected===i?'chosen':''}" aria-label="Bruchstück ${i+1} auswählen: 1 von ${S.den} gleich großen Teilen" data-sourcegroup="${group}">${icon}<span>${F(1,S.den)}</span></button>`}
function bundler(){
 const count=Core.bundleCount(S.locations,S.den),source=S.locations.map((g,i)=>g===0?tile(i,g):'').join(''),groups=count.groups;
 const b=`<div class="loose-pieces" data-drop="0" role="group" aria-label="Lose Bruchstücke"><h3>Lose Bruchstücke</h3><div class="token-row">${source||'<span>Alle Stücke sind verteilt.</span>'}</div></div><div class="bundle-boxes">${groups.map((n,g)=>`<div class="bundle-box ${n===S.den?'full-box':''}" data-drop="${g+1}" role="group" aria-label="Schachtel ${g+1}"><b>Schachtel ${g+1}</b><div class="token-row">${S.locations.map((where,i)=>where===g+1?tile(i,where):'').join('')}${Array.from({length:S.den-n},()=>'<span class="empty-slot" aria-hidden="true"></span>').join('')}</div><div>${n} von ${S.den} Plätzen</div>${button('drop-here',n===S.den?'Ein Ganzes ist voll':'Hier ablegen',`data-group="${g+1}" ${n===S.den?'disabled':''}`)}</div>`).join('')}</div>`;
 shell(['Ziehe ein Bruchstück in eine Schachtel.','Oder: Tippe ein Stück an. Wähle danach „hier ablegen“.'],range('bundlecount','Bruchstücke insgesamt',1,24,S.count)+option('bundleden','Stücke pro Ganzem',[[3,'3 Drittel'],[4,'4 Viertel'],[5,'5 Fünftel'],[6,'6 Sechstel']],S.den),b,count.rest<S.den?`${F(S.count,S.den)} = ${count.full}${count.rest?' + '+F(count.rest,S.den):''}`:`${F(S.count,S.den)} · ${count.full} Ganze sind bereits voll`,[`${S.den} Stücke füllen eine Schachtel. Das ist ein Ganzes.`,`${count.rest} Bruchstücke liegen noch außerhalb voller Schachteln.`,`Beim Verschieben geht kein Stück verloren.`],button('auto-piece','Ein Stück in die nächste freie Schachtel')+button('unpack-selected','Ausgewähltes Stück wieder auspacken',S.selected===null?'disabled':'')+button('ungroup','Alle Stücke wieder auspacken'));
}
function comparison(){
 const da=S.b*S.fa,db=S.bd*S.fb,na=S.a*S.fa,nb=S.c*S.fb;const rows=(n,d,den,y,col)=>rect(25,y,550,65,paper)+rect(25,y,550*n/d,65,col)+Array.from({length:den+1},(_,i)=>`<path d="M${25+i*550/den} ${y}v65" class="work-cut"/>`).join('');
 let body=text(25,30,'A: '+S.a+'/'+S.b)+rows(S.a,S.b,da,45,purple)+text(25,160,'B: '+S.c+'/'+S.bd)+rows(S.c,S.bd,db,175,blue);
 if(S.overlay)body+=`<path d="M${25+550*S.a/S.b} 38V248M${25+550*S.c/S.bd} 38V248" class="comparison-guide"/>`;
 const same=da===db;
 shell(['Unterteile A und B unabhängig voneinander.','Suche eine Einteilung, bei der beide dieselbe Stückgröße haben.'],option('comparepair','Ausgangsbrüche',[[0,'2/3 und 3/4'],[1,'3/4 und 3/8'],[2,'2/3 und 4/6']],S.pair)+range('factorA','Jedes A-Stück unterteilen in',1,6,S.fa)+range('factorB','Jedes B-Stück unterteilen in',1,6,S.fb),svg(body,265,'Zwei unabhängig unterteilbare Bruchstreifen'),`${F(S.a,S.b)} = ${F(na,da)} &nbsp; ${F(S.c,S.bd)} = ${F(nb,db)}`,[same?`<b>Jetzt passt die Stückgröße:</b> Beide Nenner sind ${da}.`:'Die Teilstücke sind noch verschieden groß. Die Nenner stimmen noch nicht überein.',same?`Vergleiche jetzt die Zähler: ${na} ${Core.compare(na,da,nb,db)} ${nb}.`:'Verändere eine oder beide Unterteilungen.',`Die gefärbten Längen bleiben gleich. Du veränderst nur die Schnittlinien.`],button('common','Passende Schnittlinien zeigen')+button('overlay',S.overlay?'Hilfslinien ausblenden':'Längen mit Hilfslinien vergleichen'));
}
function numberline(){
 const min=S.start,max=min+S.span,d=S.lineD,value=S.lineN/d,X=v=>30+(v-min)/S.span*540;let b=`<path d="M30 110H570" class="line-axis"/>`;
 for(let i=Math.ceil(min*d);i<=Math.floor(max*d);i++){const x=X(i/d),whole=i%d===0;b+=`<path d="M${x} ${whole?94:102}v${whole?32:16}" class="line-axis"/>`;if(whole)b+=text(x,155,fmt(i/d),'middle');}
 if(value>=min&&value<=max)b+=`<path d="M${X(value)-18} 71Q${X(value)} 92 ${X(value)+18} 71V42Q${X(value)} 23 ${X(value)-18} 42Z" fill="#783d53" opacity=".12"/><circle cx="${X(value)}" cy="110" r="15" class="drag-point" data-handle="numberline" role="slider" tabindex="0" aria-label="Bruchpunkt verschieben" aria-valuenow="${value}" aria-valuemin="${min}" aria-valuemax="${max}"/>`+text(X(value),65,S.lineN+'/'+d,'middle');else b+=text(300,65,'Der Punkt liegt '+(value<min?'links':'rechts')+' außerhalb des Ausschnitts.','middle');
 b='<rect x="10" y="89" width="580" height="42" rx="21" fill="#e8e2f4"/>'+b;
 b+=`<rect x="30" y="83" width="540" height="60" fill="transparent" class="line-touch" data-handle="numberline"/>`;
 const [n,den]=simplify(S.lineN,d);
 shell(['Ziehe den Punkt nach links oder rechts. Du kannst auch auf die Linie tippen.','Verschiebe oder vergrößere den sichtbaren Ausschnitt.'],option('lineden','Lücken pro Ganzem',[[2,'2 Hälften'],[3,'3 Drittel'],[4,'4 Viertel'],[6,'6 Sechstel'],[8,'8 Achtel']],d),svg(b,185,'Zahlenlinie mit verschiebbarem Bruchpunkt'),`Punkt: ${F(S.lineN,d)} = ${den===1?fmt(n):F(n,den)}`,[`Eine Lücke ist ${F(1,d)} groß.`,`Nach rechts werden die Zahlen größer. Nach links werden sie kleiner.`,`Der Ausschnitt verändert die Ansicht. Er verändert nicht den Wert des Punktes.`],button('pan-left','Ausschnitt nach links')+button('zoom-line',S.span===3?'Näher heran':'Überblick zeigen')+button('pan-right','Ausschnitt nach rechts')+button('center','Punkt wiederfinden'));
}
function placeMachine(){
 const stock=(kind,count,label)=>`<div class="place-stock"><h3>${label}</h3><div class="stock-number">${count}</div><div class="stock-symbols">${Array.from({length:Math.min(count,10)},()=>`<button type="button" draggable="true" data-place="${kind}" class="place-coin ${kind}" aria-label="Ein ${kind==='h'?'Hundertstel':'Zehntel'} in den Bündler legen"><span class="place-glyph ${kind}" aria-hidden="true"></span><span>${F(1,kind==='h'?100:10)}</span></button>`).join('')}</div><small>Vorrat: ${count} ${kind==='h'?'Hundertstel':'Zehntel'}</small><small>Du siehst hier höchstens 10 Plättchen aus dem Vorrat.</small></div>`;
 const bucket=(kind,n,label)=>`<div class="exchange-bucket" data-exchange="${kind}"><h3>${label}</h3><div class="bucket-slots">${Array.from({length:10},(_,i)=>`<i class="${i<n?'slot-filled':''}"></i>`).join('')}</div><div class="machine-progress"><b>${n} von 10 Plätzen</b><span aria-hidden="true">→</span><span class="machine-output ${kind}">1 ${kind==='h'?'Zehntel':'Ganzes'}</span></div></div>`;
 const b=`<div class="place-machine-row">${stock('h',S.h,'Einzelne Hundertstel')}${bucket('h',S.hb,'10 Hundertstel → 1 Zehntel')}</div><div class="place-machine-row">${stock('t',S.t,'Gebündelte Zehntel')}${bucket('t',S.tb,'10 Zehntel → 1 Ganzes')}</div><div class="whole-stock"><b>Ganze: ${S.e}</b></div><table class="place-table"><caption>So ist deine Menge gerade aufgeteilt</caption><tr><th>Ganze</th><th>Zehntel</th><th>Hundertstel</th></tr><tr><td>${S.e}</td><td>${S.t+S.tb}</td><td>${S.h+S.hb}</td></tr></table>`;
 shell(['Ziehe Plättchen aus dem Vorrat in den passenden Bündler.','Du kannst die Plättchen auch antippen. Bei 10 Plättchen entsteht die nächstgrößere Einheit.'],range('placeamount','Hundertstel insgesamt',1,199,S.total),b,`${F(S.total,100)} = ${fmt(S.total/100)} · Die Gesamtmenge bleibt gleich.`,['Ein Plättchen ist ein Hundertstel.','Der Bündler tauscht 10 Hundertstel gegen 1 Zehntel.','Der zweite Bündler tauscht 10 Zehntel gegen 1 Ganzes.'],button('ten-h','Bis zu 10 Hundertstel hineinlegen',S.h?'':'disabled')+button('ten-t','Bis zu 10 Zehntel hineinlegen',S.t?'':'disabled')+button('reset','Alles wieder in Hundertstel zerlegen'));
}
function magnifier(){
 const [rawA,rawB]=pairs[S.pair],toNumber=s=>Number(s.replace('−','-').replace(',','.')),a=toNumber(rawA),b=toNumber(rawB),digits=x=>Math.abs(x).toFixed(3).replace('.','').split('').map(Number),da=digits(a),db=digits(b),labels=['Einer','Zehntel','Hundertstel','Tausendstel'],first=da.findIndex((n,i)=>n!==db[i]);
 const table=`<table class="place-table loupe-table"><caption>Tippe auf eine Stelle. Oder verschiebe die Lupe.</caption><tr>${labels.map((s,i)=>`<th><button type="button" data-loupe="${i}" aria-pressed="${S.loupe===i}">${s}</button></th>`).join('')}</tr>${[da,db].map(d=>'<tr>'+d.map((n,i)=>`<td class="${S.loupe===i?'decisive':''}">${n}</td>`).join('')+'</tr>').join('')}</table>`;
 const rail=svg(`<path d="M75 35H525" class="line-axis"/>`+labels.map((_,i)=>`<circle cx="${75+i*150}" cy="35" r="4" fill="${blue}"/>`).join('')+`<path d="M${75+S.loupe*150+15} 50l15 15" stroke="#92662e" stroke-width="10" stroke-linecap="round" pointer-events="none"/><circle cx="${75+S.loupe*150}" cy="35" r="23" class="loupe-handle" data-handle="loupe" role="slider" tabindex="0" aria-label="Lupe zur Stelle verschieben" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${S.loupe}"/>`,70,'Lupe über die Stellenwerte verschieben');
 const detail=`<div class="loupe-detail"><h3>Unter der Lupe: ${labels[S.loupe]}</h3>${[da,db].map((d,i)=>`<div class="digit-detail"><div class="digit-focus ${i?'digit-b':'digit-a'}"><span>${i?'B':'A'}</span><strong>${d[S.loupe]}</strong><span>${labels[S.loupe]}</span></div><div class="ten-cells">${Array.from({length:10},(_,j)=>`<i class="${j<d[S.loupe]?(i?'blue-cell':'purple-cell'):''}"></i>`).join('')}</div></div>`).join('')}</div>`;
 const why=first===-1?'Alle Stellen stimmen überein. Endnullen verändern den Wert nicht.':S.loupe<first?'Diese Stelle ist bei beiden Zahlen gleich. Schau eine Stelle weiter rechts.':S.loupe===first?`<b>Hier fällt die Entscheidung:</b> Die ${labels[first]} sind zum ersten Mal verschieden.`:`Die Entscheidung fiel schon bei den ${labels[first]}. Die spätere Stelle ändert sie nicht mehr.`;
 shell(['Verschiebe die Lupe über die Stellen.','Die Vergrößerung zeigt genau die ausgewählte Stelle.'],option('decimalpair','Zahlenpaar',pairs.map((x,i)=>[i,x.join(' und ')]),S.pair),table+rail+detail,`A: ${rawA} &nbsp; B: ${rawB}`,[why,a<0?'Beide Zahlen sind negativ. Danach gilt: Die Zahl näher an 0 ist größer.':'Vergleiche gleiche Stellen von links nach rechts.'],button('decisive','Zur ersten unterschiedlichen Stelle'));
}
function spatial(){
 let b='';let answer,why;
 if(S.dim===1){b=`<div class="unit-line-parts">${Array.from({length:10},(_,i)=>`<button type="button" data-length="${i}" class="${S.lengthMask.has(i)?'filled':''}" aria-label="Zentimeter ${i+1} umschalten">${i+1}</button>`).join('')}</div>`;answer=`${S.lengthMask.size} cm = ${F(S.lengthMask.size,10)} dm`;why=['Der ganze Streifen ist 1 dm lang.','Er besteht aus 10 Zentimetern.'];}
 else if(S.dim===2){b=`<div class="area-unit-grid">${Array.from({length:100},(_,i)=>`<button type="button" data-area="${i}" class="${S.areaMask.has(i)?'filled':''}" aria-label="Quadratzentimeter ${i+1} umschalten" aria-pressed="${S.areaMask.has(i)}"></button>`).join('')}</div>`;answer=`${S.areaMask.size} cm² = ${F(S.areaMask.size,100)} dm²`;why=['Das große Quadrat ist 1 dm² groß.','10 Reihen mit je 10 Kästchen ergeben 100 cm².','Jedes kleine Quadrat ist 1 cm² groß.'];}
 else if(S.surface){
  const positions=[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]];b=svg(positions.map(([x,y],i)=>rect(55+x*110,10+y*110,110,110,i%2?'#e7bdc8':'#bed5dc')+Array.from({length:9},(_,j)=>`<path d="M${55+x*110+(j+1)*11} ${10+y*110}v110M${55+x*110} ${10+y*110+(j+1)*11}h110" class="cube-grid"/>`).join('')).join(''),370,'Sechs aufgefaltete Quadratflächen eines Würfels');answer='Hülle: 6 · 100 cm² = 600 cm²';why=['Diese Hülle gehört zum ganzen Würfel mit 1 dm Kantenlänge.','Das Netz zeigt sechs Seitenflächen.','Jede Fläche ist 1 dm² = 100 cm² groß.','Die Hülle misst du in Quadrateinheiten.'];
 }else{
  const P=(x,y,z)=>Core.projected(x,y,z,S.angle),path=pts=>pts.map((p,i)=>(i?'L':'M')+P(...p).join(',')).join('')+'Z';
  let body=`<path d="${path([[0,0,0],[10,0,0],[10,10,0],[0,10,0]])}" fill="#ebe2d5" stroke="#326b82"/>`;
  if(S.layers)body+=`<path d="${path([[0,0,0],[10,0,0],[10,0,S.layers],[0,0,S.layers]])}" fill="#bed5dc" opacity=".8"/><path d="${path([[10,0,0],[10,10,0],[10,10,S.layers],[10,0,S.layers]])}" fill="#a0bfc7" opacity=".8"/><path d="${path([[0,0,S.layers],[10,0,S.layers],[10,10,S.layers],[0,10,S.layers]])}" fill="#609eac" opacity=".8"/>`;
  for(let z=0;z<=10;z++){const p=P(0,0,z),q=P(10,0,z),r=P(10,10,z);body+=`<path d="M${p}L${q}L${r}" class="cube-grid"/>`;}
  const slice=S.slice;body+=`<path d="${path([[0,0,slice],[10,0,slice],[10,10,slice],[0,10,slice]])}" fill="#ffc955" fill-opacity=".85" stroke="#ad6b22" stroke-width="2"/>`;
  for(let i=0;i<=10;i++){body+=`<path d="M${P(i,0,slice)}L${P(i,10,slice)}M${P(0,i,slice)}L${P(10,i,slice)}" class="cube-grid"/>`;}
  for(const [x,y] of [[0,0],[10,0],[10,10],[0,10]])body+=`<path d="M${P(x,y,0)}L${P(x,y,10)}" class="cube-edge"/>`;
  body+=`<rect x="25" y="10" width="550" height="370" fill="transparent" data-handle="cube" class="cube-touch" role="slider" tabindex="0" aria-label="Würfel drehen" aria-valuemin="-50" aria-valuemax="50" aria-valuenow="${S.angle}"/>`;
  b=svg(body,390,'Drehbarer Würfel mit zehn Schichten und herausgehobener Schicht')+`<div class="slice-caption">Gelbe Ebene: Schicht ${S.slice} von 10 · 10 × 10 kleine Würfel</div>`;
  answer=`Füllung: ${F(S.layers,10)} dm³ = ${S.layers*100} cm³`;why=['Ziehe den Würfel seitlich. So drehst du die Ansicht.','Eine Schicht enthält 10 · 10 = 100 kleine Würfel.','Jeder kleine Würfel ist 1 cm³ groß.','Zehn Schichten füllen 1 dm³ = 1000 cm³.'];
 }
 shell(['Wähle Länge, Fläche oder Raum.','Verändere die Teile direkt im Bild.'],option('unitdimension','Was untersuchst du?',[[1,'Länge: dm und cm'],[2,'Fläche: dm² und cm²'],[3,'Raum: dm³ und cm³']],S.dim)+(S.dim===3&&!S.surface?range('cubeangle','Würfel drehen',-50,50,S.angle)+range('cubefill','Gefüllte Schichten',0,10,S.layers)+range('cubeslice','Gelbe Schicht verschieben',1,10,S.slice):''),b,answer,why,S.dim===3?button('surface',S.surface?'Würfel wieder aufstellen':'Hülle zu einem Netz auffalten'):button('unit-all','Alles markieren')+button('unit-none','Alles freigeben'));
}
function render(){({brueche:fractionBuilder,gleichwertig:workshop,gemischt:bundler,vergleichen:comparison,zahlenstrahl:numberline,dezimal:placeMachine,dezimalvergleich:magnifier,groessen:spatial}[topic])()}
function dropPiece(group){
 const i=S.selected??S.locations.findIndex(x=>x===0);if(i<0||i===null){message='Wähle zuerst ein Stück.';return}
 if(group!==0&&S.locations.filter(x=>x===group).length>=S.den){message='Diese Schachtel ist voll.';return}
 S.locations[i]=group;S.selected=null;message=group?'Das Stück liegt jetzt in Schachtel '+group+'.':'Das Stück ist wieder ausgepackt.';
}
function action(name,el){message='';
 let from=null,destination=null,kind='piece',movingCount=1;
 if(name==='auto-piece'){from=root.querySelector('.loose-pieces [data-token]')?.getBoundingClientRect();const target=Core.bundleCount(S.locations,S.den).groups.findIndex(n=>n<S.den)+1;destination='[data-drop="'+target+'"]'}
 if(name==='drop-here'&&S.selected!==null){from=root.querySelector('[data-token="'+S.selected+'"]')?.getBoundingClientRect();destination='[data-drop="'+el.dataset.group+'"]'}
 if(name==='ten-h'||name==='ten-t'){kind=name==='ten-h'?'h':'t';from=root.querySelector('[data-place="'+kind+'"]')?.getBoundingClientRect();movingCount=Math.min(kind==='h'?S.h:S.t,10-(kind==='h'?S.hb:S.tb));destination=(kind==='h'?S.hb:S.tb)+movingCount===10?(kind==='h'?'.place-machine-row:nth-child(2) .place-stock':'.whole-stock'):'[data-exchange="'+kind+'"]'}
 if(name==='reset')return reset();
 if(name==='work-show')S.workShown=true;
 if(name==='all'||name==='none')S.mask=name==='all'?new Set(Array.from({length:S.d},(_,i)=>i)):new Set();
 if(name==='drop-here')dropPiece(+el.dataset.group);if(name==='unpack-selected')dropPiece(0);
 if(name==='auto-piece'){const target=Core.bundleCount(S.locations,S.den).groups.findIndex(n=>n<S.den)+1;S.selected=S.locations.findIndex(x=>x===0);if(S.selected>=0)dropPiece(target);else{S.selected=null;message='Alle Stücke sind bereits zugeordnet.'}}
 if(name==='ungroup'){S.locations.fill(0);S.selected=null}
 if(name==='common'){const l=S.b*S.bd/gcd(S.b,S.bd);S.fa=l/S.b;S.fb=l/S.bd}
 if(name==='overlay')S.overlay=!S.overlay;
 if(name==='pan-left')S.start=Math.max(-5,S.start-1);
 if(name==='pan-right')S.start=Math.min(5-S.span,S.start+1);
 if(name==='zoom-line'){S.span=S.span===3?1:3;S.start=Math.floor(S.lineN/S.lineD)-(S.span===3?1:0)}
 if(name==='center')S.start=Math.floor(S.lineN/S.lineD)-(S.span===3?1:0);
 if(name==='ten-h')Core.exchange(S,'h',true);
 if(name==='ten-t')Core.exchange(S,'t',true);
 if(name==='decisive'){const [a,b]=pairs[S.pair].map(s=>Math.abs(Number(s.replace('−','-').replace(',','.'))).toFixed(3).replace('.',''));const first=[...a].findIndex((x,i)=>x!==b[i]);S.loupe=Math.max(0,first);if(first<0)message='Alle Stellen sind gleich. Endnullen ändern den Wert nicht.'}
 if(name==='surface')S.surface=!S.surface;
 if(name==='unit-all'||name==='unit-none'){const key=S.dim===1?'lengthMask':'areaMask',n=S.dim===1?10:100;S[key]=name==='unit-all'?new Set(Array.from({length:n},(_,i)=>i)):new Set()}
 render();
 if(from)motion(from,root.querySelector(destination),kind,movingCount);feedback(name==='work-show'?'cut':'change');
}
root.addEventListener('click',event=>{
 const el=event.target.closest('[data-choice],[data-do],[data-piece],[data-token],[data-place],[data-loupe],[data-area],[data-length]');if(!el)return;
 if(el.dataset.choice)return control({dataset:{control:el.dataset.choice},value:el.value});
 if(el.dataset.do)return action(el.dataset.do,el);
 if(el.dataset.piece!==undefined){const i=+el.dataset.piece;S.mask.has(i)?S.mask.delete(i):S.mask.add(i)}
 if(el.dataset.token!==undefined){S.selected=+el.dataset.token;message='Stück '+(S.selected+1)+' ist ausgewählt. Wähle eine Schachtel.'}
 const coinFrom=el.dataset.place?el.getBoundingClientRect():null;
 if(el.dataset.place){Core.exchange(S,el.dataset.place);message='Ein Plättchen ist in den Bündler gewandert.'}
 if(el.dataset.loupe!==undefined)S.loupe=+el.dataset.loupe;
 for(const [key,attr] of [['areaMask','area'],['lengthMask','length']])if(el.dataset[attr]!==undefined){const i=+el.dataset[attr];S[key].has(i)?S[key].delete(i):S[key].add(i)}
 render();
 if(coinFrom)motion(coinFrom,root.querySelector('[data-exchange="'+el.dataset.place+'"]'),el.dataset.place);
 if(el.dataset.piece!==undefined||el.dataset.area!==undefined||el.dataset.place)feedback();
});
function control(el){const key=el.dataset.control,value=el.value;if(!key)return;message='';
 if(key==='pieces'){S.d=+value;S.mask=new Set([...S.mask].filter(x=>x<S.d))}
 if(key==='shape')S.view=value;
 if(key==='workfactor'){S.k=+value;S.workShown=false;}
 if(key==='workmode'){S.workmode=value;S.workShown=false;}
 if(key==='bundlecount'||key==='bundleden'){if(key==='bundlecount')S.count=+value;else S.den=+value;S.locations=Array(S.count).fill(0);S.selected=null}
 if(key==='comparepair'){S.pair=+value;const p=[[2,3,3,4],[3,4,3,8],[2,3,4,6]][S.pair];[S.a,S.b,S.c,S.bd]=p;S.fa=S.fb=1}
 if(key==='factorA')S.fa=+value;if(key==='factorB')S.fb=+value;
 if(key==='lineden')S.lineD=+value;
 if(key==='placeamount'){S.total=+value;S.h=S.total;S.hb=S.t=S.tb=S.e=0}
 if(key==='decimalpair'){S.pair=+value;S.loupe=0}
 if(key==='unitdimension'){S.dim=+value;S.surface=false}
 if(key==='cubeangle')S.angle=+value;if(key==='cubefill')S.layers=+value;if(key==='cubeslice')S.slice=+value;
 render();
 // Preserve focus and keyboard range operation after the picture updates.
 const next=root.querySelector('#'+key);if(next&&!next.classList.contains('visually-select'))next.focus({preventScroll:true});
}
root.addEventListener('input',e=>control(e.target));root.addEventListener('change',e=>{if(e.target.tagName==='SELECT')control(e.target)});
root.addEventListener('dragstart',e=>{const token=e.target.closest('[data-token],[data-place]');if(!token)return;activeDrag=token.dataset.token!==undefined?{kind:'piece',id:+token.dataset.token}:{kind:token.dataset.place};e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',JSON.stringify(activeDrag));});
root.addEventListener('dragover',e=>{if(e.target.closest('[data-drop],[data-exchange]'))e.preventDefault()});
root.addEventListener('drop',e=>{const target=e.target.closest('[data-drop],[data-exchange]');if(!target||!activeDrag)return;e.preventDefault();if(target.dataset.drop!==undefined&&activeDrag.kind==='piece'){S.selected=activeDrag.id;dropPiece(+target.dataset.drop)}if(target.dataset.exchange===activeDrag.kind)Core.exchange(S,activeDrag.kind);activeDrag=null;render()});
root.addEventListener('dragend',()=>{activeDrag=null});
let pointer=null;
function movePointer(e){if(!pointer)return;const svgEl=root.querySelector('.hands-board svg'),r=svgEl.getBoundingClientRect(),x=(e.clientX-r.left)/r.width;
 if(pointer.kind==='numberline')S.lineN=Core.snap((x*600-30)/540,S.start,S.span,S.lineD);
 if(pointer.kind==='loupe')S.loupe=Math.max(0,Math.min(3,Math.round((x*600-75)/150)));
 if(pointer.kind==='cube')S.angle=Math.max(-50,Math.min(50,pointer.angle+(e.clientX-pointer.x)*.35));
 render();
}
root.addEventListener('pointerdown',e=>{const handle=e.target.closest('[data-handle]');if(!handle)return;e.preventDefault();pointer={kind:handle.dataset.handle,x:e.clientX,angle:S.angle};root.setPointerCapture(e.pointerId);if(pointer.kind!=='cube')movePointer(e)});
root.addEventListener('pointermove',e=>{if(pointer)movePointer(e)});
root.addEventListener('pointerup',e=>{if(pointer){movePointer(e);pointer=null;if(root.hasPointerCapture(e.pointerId))root.releasePointerCapture(e.pointerId)}});
root.addEventListener('pointercancel',()=>{pointer=null});
root.addEventListener('keydown',e=>{const handle=e.target.closest('[data-handle],[data-piece]');if(!handle)return;if(handle.dataset.piece!==undefined&&(e.key==='Enter'||e.key===' ')){e.preventDefault();handle.dispatchEvent(new MouseEvent('click',{bubbles:true}));return}if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const step=e.key==='ArrowLeft'?-1:1;if(handle.dataset.handle==='numberline')S.lineN+=step;if(handle.dataset.handle==='loupe')S.loupe=Math.max(0,Math.min(3,S.loupe+step));if(handle.dataset.handle==='cube')S.angle=Math.max(-50,Math.min(50,S.angle+step*5));render();const next=root.querySelector('[data-handle="'+handle.dataset.handle+'"]');next?.focus()});
render();
})();
