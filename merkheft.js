'use strict';
(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=n=>Number(n).toLocaleString('de-DE',{maximumFractionDigits:9});
const f=(a,b)=>`<span class="fraction" aria-label="${a} durch ${b}"><span>${a}</span><span>${b}</span></span>`;
const list=a=>'<ul class="explain">'+a.map(s=>'<li>'+s+'</li>').join('')+'</ul>';
const bar=(n,d)=>`<div class="bar" role="img" aria-label="${n} von ${d} gleichen Teilen">${Array.from({length:d},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</div>`;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const svg=(body,h=180,label='Mathematisches Bildmodell')=>`<svg viewBox="0 0 600 ${h}" role="img" aria-label="${label}">${body}</svg>`;
const text=(x,y,s,color='')=>`<text x="${x}" y="${y}"${color?` style="fill:${color}"`:''}>${s}</text>`;
const rect=(x,y,w,h,fill='#783d53',extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#9e858b" ${extra}/>`;
function grid(n,d,columns=10){return `<div class="tiles" role="img" aria-label="${n} von ${d} Feldern gefärbt" style="grid-template-columns:repeat(${columns},1fr)">${Array.from({length:d},(_,i)=>`<i class="tile ${i<n?'on':''}"></i>`).join('')}</div>`}
function numberline(min,max,den,points=[]){
 const X=v=>30+(v-min)/(max-min)*540;
 let b='<path d="M30 70H575" stroke="#6b5e65" stroke-width="2"/>';
 for(let i=Math.round(min*den);i<=Math.round(max*den);i++){const v=i/den,x=X(v),whole=i%den===0;b+=`<path d="M${x} ${whole?58:64}v${whole?24:12}" stroke="#6b5e65"/>`;if(whole)b+=text(x-6,108,fmt(v))}
 points.forEach((p,i)=>{const x=X(p.v),y=i%2===0?28:142;b+=`<path d="M${x} ${i%2===0?y+8:80}V${i%2===0?58:y-20}" stroke="${p.color||'#783d53'}"/><circle cx="${x}" cy="70" r="6" fill="${p.color||'#783d53'}"/>`;b+=`<text x="${Math.max(35,Math.min(565,x))}" y="${y}" text-anchor="middle" style="fill:${p.color||'#783d53'}">${p.label}</text>`});
 return svg(b,160,'Zahlenstrahl von '+fmt(min)+' bis '+fmt(max));
}
function circle(n,d){return svg(Array.from({length:d},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/d,b=a+2*Math.PI/d,at=t=>(300+95*Math.cos(t))+','+(110+95*Math.sin(t));return `<path d="M300 110 L${at(a)} A95 95 0 0 1 ${at(b)} Z" fill="${i<n?'#783d53':'#f3e8e2'}" stroke="#9e858b"/>`}).join(''),225,`${n} von ${d} Kreissektoren gefärbt`)}
const controls=$('#lab-controls'),board=$('#lab-board'),obs=$('#lab-observation'),why=$('#lab-explain');
if(!controls)return;
const topic=document.body.dataset.topic;
let update;
function range(id,label,min,max,value,step=1){return `<div class="control-box"><label for="${id}">${label} <output id="${id}-out">${value}</output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`}
function select(id,label,choices){return `<div class="control-box"><label for="${id}">${label}</label><select id="${id}">${choices.map(c=>`<option value="${c[0]}">${c[1]}</option>`).join('')}</select></div>`}
function result(p,steps){obs.innerHTML=p;why.innerHTML=list(steps)}
function val(id){return +$('#'+id).value}
function title(s){$('#lab-title').textContent=s}
if(topic==='brueche'){
 title('Anteil, Menge oder Ganzes?');
 controls.innerHTML=select('view','Darstellung',[['bar','Bruchstreifen'],['circle','Kreis'],['set','Gegenstände'],['back','Vom Anteil zum Ganzen']])+range('n','Gemeinte Teile',0,8,3)+range('d','Teile pro Ganzem',2,12,8)+range('part','Gegenstände je Teil',1,10,3);
 update=()=>{const d=val('d');$('#n').max=d;if(val('n')>d)$('#n').value=d;const n=val('n'),g=val('part'),mode=$('#view').value;
 board.innerHTML=mode==='circle'?circle(n,d):mode==='set'?grid(n*g,d*g,g*d<=40?g:10):mode==='back'?`<div class="caption">Bekannt: ${n*g} Gegenstände sind ${f(n,d)} des Ganzen.</div>${bar(n,d)}<div class="caption">Jeder Abschnitt enthält gleich viele Gegenstände.</div>`:bar(n,d);
 result(`${f(n,d)} bedeutet ${n} von ${d} gleich großen Teilen.`,[`${d} Teile mit je ${g} Gegenständen ergeben das Ganze: ${d*g}.`,`Anteil ausrechnen: ${d*g} : ${d} · ${n} = ${n*g}.`,n?`Rückwärts: ${n*g} : ${n} = ${g} pro Teil; ${g} · ${d} = ${d*g} insgesamt.`:'Bei 0 bekannten Teilen lässt sich das Ganze nicht aus dem Anteil allein bestimmen.']);
 };
}
if(topic==='gleichwertig'){
 title('Die Fläche bleibt – die Einteilung wechselt');
 controls.innerHTML=range('n','Zähler',1,6,2)+range('d','Nenner',2,8,3)+range('factor','Faktor',1,5,2)+select('view','Richtung',[['split','Erweitern: Teile unterteilen'],['join','Kürzen: Teile zusammenfassen']]);
 update=()=>{const d=val('d');$('#n').max=d;if(val('n')>d)$('#n').value=d;const n=val('n'),k=val('factor'),join=$('#view').value==='join';const simple=`<div>${f(n,d)}${bar(n,d)}</div>`,fine=`<div>${f(n*k,d*k)}${bar(n*k,d*k)}</div>`;
 board.innerHTML=`<div class="two-models">${join?fine+simple:simple+fine}</div><div class="caption">Beide Balken stehen für ein gleich großes Ganzes.</div>`;
 result(`${f(n,d)} = ${f(n*k,d*k)} · Der gefärbte Anteil bleibt gleich.`,join?[`Je ${k} kleine Teile werden zu einem größeren Teil zusammengefasst.`,`Zähler UND Nenner teilen: ${n*k} : ${k} = ${n}; ${d*k} : ${k} = ${d}.`]:[`Jedes alte Teil wird in ${k} neue Teile geteilt.`,`Zähler UND Nenner multiplizieren: ${n} · ${k} = ${n*k}; ${d} · ${k} = ${d*k}.`]);
 };
}
if(topic==='gemischt'){
 title('Bruchstücke zu Ganzen bündeln');controls.innerHTML=range('n','Bruchstücke insgesamt',0,30,11)+range('d','Bruchstücke pro Ganzem',2,8,4)+select('sign','Vorzeichen',[['1','Positiv'],['-1','Negativ']]);
 update=()=>{const n=val('n'),d=val('d'),w=Math.floor(n/d),r=n%d,sign=val('sign')===-1&&n?'−':'';
 board.innerHTML=`<div class="two-models">${Array.from({length:Math.max(1,Math.ceil(n/d))},(_,j)=>`<div class="bar-row"><div>Ganzes ${j+1}</div>${bar(Math.min(d,Math.max(0,n-j*d)),d)}</div>`).join('')}</div><div class="caption">Jeder Balken hat dieselbe Länge. Auch bei vielen Ganzen bleibt alles sichtbar.</div>`;
 result(`${sign}${f(n,d)} = ${sign}${r?`(${w} + ${f(r,d)})`:w}`, [`${n} : ${d} = ${w} Rest ${r}.`,`Volle Gruppen: ${w}. Übrig: ${r} Stücke der Größe ${f(1,d)}.`,`Rückrechnung: ${w} · ${d} + ${r} = ${n}.`,sign?'Das Minus gilt für den gesamten Wert. Das Bild zeigt seinen Betrag.':'Das Bild zählt die Stücke; die Rechnung beschreibt denselben Wert.']);
 };
}
if(topic==='zahlenstrahl'){
 title('Eine Lücke – welchen Wert hat sie?');controls.innerHTML=select('d','Einteilung pro Ganzem',[[2,'Hälften'],[3,'Drittel'],[4,'Viertel'],[6,'Sechstel'],[8,'Achtel']])+range('n','Schritte ab 0 (Minus = links)',-16,16,3)+select('view','Blickwinkel',[['read','Bruch ablesen'],['mirror','Betrag und Gegenzahl']]);$('#d').value='4';
 update=()=>{const d=val('d');$('#n').min=-2*d;$('#n').max=2*d;const n=Math.min(2*d,Math.max(-2*d,val('n')));$('#n').value=n;const v=n/d;let points=[{v,label:n+'/'+d}];if($('#view').value==='mirror'&&n)points.push({v:-v,label:'Gegenzahl',color:'#326b82'});board.innerHTML=numberline(-2,2,d,points);
 result(`Eine Lücke entspricht ${f(1,d)}. Der Punkt liegt bei ${f(n,d)}.`,[`Zwischen zwei ganzen Zahlen sind ${d} gleich große Lücken.`,`${Math.abs(n)} Schritte ${n<0?'nach links':'nach rechts'} ab 0 führen zum markierten Punkt.`,`Betrag: ${f(Math.abs(n),d)}. Gegenzahl: ${f(-n,d)}.`,`Gleiche Werte können anders aussehen: ${f(n,d)} = ${f(n*2,d*2)}. Beide stehen am selben Punkt.`]);
 };
}
if(topic==='quotienten'){
 title('Ganze gerecht auf mehrere Kinder verteilen');controls.innerHTML=range('pizza','Pizzen',1,8,3)+range('kids','Kinder',2,8,4);
 update=()=>{const n=val('pizza'),d=val('kids'),g=gcd(n,d);board.innerHTML=`<div class="two-models">${Array.from({length:n},(_,i)=>`<div><div>Pizza ${i+1}: ${d} gleich große Stücke</div>${bar(1,d)}</div>`).join('')}</div><div class="caption">Die markierten Stücke zeigen den Anteil eines Kindes: ein Stück von jeder Pizza.</div>`;
 result(`${n} : ${d} = ${f(n,d)} = ${f(n/g,d/g)} Pizza je Kind.`,[`Jede Pizza wird in ${d} gleiche Teile geteilt.`,`Ein Kind bekommt von jeder der ${n} Pizzen ein ${d}-tel.`,`Zusammen sind das ${f(n,d)} Pizza je Kind.`,`Probe: ${d} Kinder · ${f(n,d)} Pizza = ${n} Pizzen.`]);
 };
}
if(topic==='vergleichen'){
 title('Verschiedene Stücke – gleicher Maßstab');controls.innerHTML=range('a','Zähler A',0,8,2)+range('b','Nenner A',2,10,3)+range('c','Zähler B',0,8,3)+range('d','Nenner B',2,10,4)+select('view','Bildidee',[['bars','Gleiche Ganze'],['common','Gleichnamig machen'],['negative','Beide Brüche negativ']]);
 update=()=>{const b=val('b'),d=val('d');$('#a').max=b;$('#c').max=d;$('#a').value=Math.min(val('a'),b);$('#c').value=Math.min(val('c'),d);const a=val('a'),c=val('c'),l=b*d/gcd(b,d),neg=$('#view').value==='negative',s=neg?-1:1,cmp=s*(a*d-c*b),sign=cmp===0?'=':cmp>0?'&gt;':'&lt;',common=$('#view').value==='common';
 board.innerHTML=`<div class="bar-row">A: ${f(a,b)}${bar(common?a*l/b:a,common?l:b)}</div><div class="bar-row">B: ${f(c,d)}${bar(common?c*l/d:c,common?l:d)}</div>`+(neg?numberline(-1,0,4,[{v:-a/b,label:'A',color:'#783d53'},{v:-c/d,label:'B',color:'#326b82'}]):'<div class="caption">Gleiche Länge = gleich großes Ganzes.</div>');
 result(`${neg?'−':''}${f(a,b)} ${sign} ${neg?'−':''}${f(c,d)}`,[`Gemeinsamer Nenner: ${l}.`,`${f(a,b)} = ${f(a*l/b,l)} und ${f(c,d)} = ${f(c*l/d,l)}.`,`Die gleich großen Teilstücke erlauben einen Vergleich der Zähler.`,neg?'Bei zwei negativen Werten liegt der größere Betrag weiter links. Deshalb dreht sich der Vergleich gegenüber den Beträgen um.':'Nicht nur die Zähler vergleichen, solange die Stücke verschieden groß sind.']);
 };
}
if(topic==='dezimal'){
 title('Zehntel bündeln, Hundertstel sehen');controls.innerHTML=range('n','Hundertstel insgesamt',0,199,45)+select('view','Bildidee',[['grid','Hunderterfelder'],['place','Stellenwerttafel']]);
 update=()=>{const n=val('n'),w=Math.floor(n/100),z=Math.floor(n%100/10),h=n%10,g=gcd(n,100),v=fmt(n/100);
 board.innerHTML=$('#view').value==='place'?`<table class="place-table"><caption>Jede Spalte hat einen anderen Wert</caption><thead><tr><th>Einer</th><th>Zehntel</th><th>Hundertstel</th></tr></thead><tbody><tr><td>${w}</td><td>${z}</td><td>${h}</td></tr></tbody></table>`:`<div class="two-models">${grid(Math.min(n,100),100)}${n>100?grid(n-100,100):''}</div><div class="caption">Ein Feld = ein Ganzes. Eine volle Reihe = ein Zehntel.</div>`;
 result(`${v} = ${f(n,100)} = ${f(n/g,100/g)}`,[`${w} Einer, ${z} Zehntel und ${h} Hundertstel.`,`Zehn Hundertstel bilden ein Zehntel. Zehn Zehntel bilden ein Ganzes.`,`Die Hundertstelzahl ${n} steht über dem Nenner 100.`,g>1?`Beide Zahlen durch ${g} teilen, um vollständig zu kürzen.`:'Der Bruch ist bereits vollständig gekürzt.']);
 };
}
if(topic==='dezimalvergleich'){
 title('Die erste unterschiedliche Stelle entscheidet');
 controls.innerHTML=select('pair','Zahlenpaar',[['0.43|0.418','0,43 und 0,418'],['0.6|0.600','0,6 und 0,600'],['-0.41|-0.40','−0,41 und −0,40'],['0.15|0.151','0,15 und 0,151']])+range('zoom','Ausschnitt vergrößern',0,2,0);
 update=()=>{const [a,b]=$('#pair').value.split('|').map(Number),sA=Math.abs(a).toFixed(3).split(''),sB=Math.abs(b).toFixed(3).split(''),idx=sA.findIndex((s,i)=>s!==sB[i]),sgn=a===b?'=':a>b?'&gt;':'&lt;';
 const row=s=>'<tr>'+[0,2,3,4].map(i=>`<td class="${i===idx?'decisive':''}">${s[i]}</td>`).join('')+'</tr>';
 const zoom=val('zoom'),baseMin= a<0?-1:0,baseMax=a<0?0:1,margin=Math.max(Math.abs(a-b)*0.6,0.002),min=zoom===0?baseMin:Math.min(a,b)-margin*(zoom===1?3:1),max=zoom===0?baseMax:Math.max(a,b)+margin*(zoom===1?3:1);
 board.innerHTML=`<table class="place-table"><caption>${a<0?'Beträge vergleichen – anschließend Vorzeichen beachten':'Gleiche Stellen untereinander'}</caption><thead><tr><th>Einer</th><th>Zehntel</th><th>Hundertstel</th><th>Tausendstel</th></tr></thead><tbody>${row(sA)}${row(sB)}</tbody></table>`+svg(`<path d="M30 85H570" stroke="#6b5e65" stroke-width="2"/>`+[a,b].map((v,i)=>{const x=30+(v-min)/(max-min)*540;return `<circle cx="${x}" cy="85" r="7" fill="${i?'#326b82':'#783d53'}"/><text x="${x}" y="${i?130:42}" text-anchor="middle">${fmt(v)}</text>`}).join('')+text(30,164,fmt(min))+`<text x="570" y="164" text-anchor="end">${fmt(max)}</text>`,185,'Vergrößerter Zahlenstrahlausschnitt');
 result(`${fmt(a)} ${sgn} ${fmt(b)}`,[idx<0?'Alle Stellen stimmen überein: Die Zahlen sind gleich. Endnullen ändern nichts.':`Die hervorgehobene Spalte ist die erste unterschiedliche Stelle.`,a<0?'Beide Zahlen sind negativ. Der größere Betrag gehört zum kleineren Zahlenwert.':'Bei positiven Zahlen entscheidet hier die größere Ziffer.',`Genau in der Mitte liegt ${fmt((a+b)/2)}.`,a===b?'Zwischen gleichen Zahlen liegt kein weiterer Wert.':'Beim Vergrößern bleibt die Reihenfolge erhalten. Zwischen verschiedenen Zahlen lassen sich weitere Zahlen finden.']);
 };
}
if(topic==='groessen'){
 title('Warum mal 10, mal 100 oder mal 1000?');controls.innerHTML=select('dimension','Größe und Einheiten',[[1,'Länge: dm ↔ cm'],[2,'Fläche: dm² ↔ cm²'],[3,'Raum: dm³ ↔ cm³'],[4,'Masse: kg ↔ g'],[5,'Zeit: h ↔ min']])+select('direction','Umrechnungsrichtung',[['small','Zur kleineren Einheit'],['large','Zur größeren Einheit']])+range('n','Maßzahl in Zehnteln',1,30,5);
 update=()=>{const d=val('dimension'),large=$('#direction').value==='large',factors={1:10,2:100,3:1000,4:1000,5:60},units={1:['dm','cm'],2:['dm²','cm²'],3:['dm³','cm³'],4:['kg','g'],5:['h','min']},factor=factors[d],u=units[d],n=val('n')/10,v=large?n/factor:n*factor;let picture='';
 if(d===1)picture=svg(text(40,32,'Ein Dezimeter enthält zehn Zentimeter')+Array.from({length:10},(_,i)=>rect(40+i*50,60,50,60,i%2?'#ead4db':'#783d53')).join('')+text(40,155,'1 dm = 10 cm'),180);
 if(d===2)picture=svg(text(30,24,'10 Reihen × 10 Spalten')+Array.from({length:100},(_,i)=>rect(180+i%10*22,40+Math.floor(i/10)*22,22,22,i<10?'#783d53':'#ead4db')).join('')+text(30,300,'1 dm² = 100 cm²'),320);
 if(d===3)picture=svg(text(30,26,'10 Schichten mit je 100 kleinen Würfeln')+Array.from({length:10},(_,i)=>rect(130+i*8,60+i*17,220,28,i%2?'#ead4db':'#783d53')).join('')+text(30,300,'10 × 10 × 10 = 1000 · 1 dm³ = 1000 cm³ = 1 l'),325);
 if(d===4)picture=svg(text(30,28,'Ein Kilogramm = 1000 Gramm')+rect(100,60,400,85,'#e8f0ef','rx="14"')+text(225,110,'1000 g = 1 kg'),180);
 if(d===5)picture=svg(`<circle cx="300" cy="130" r="86" fill="#f7eee7" stroke="#783d53"/>`+Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M${300+72*Math.sin(a)} ${130-72*Math.cos(a)}L${300+82*Math.sin(a)} ${130-82*Math.cos(a)}" stroke="#783d53"/>`}).join('')+text(258,135,'60 min')+text(200,250,'1 h = 60 min'),280);
 board.innerHTML=picture;const rounded=d===5&&large&&Math.round(n*10)%3!==0;result(`${fmt(n)} ${u[large?1:0]} ${rounded?'≈':'='} ${fmt(v)} ${u[large?0:1]}`,[`Umrechnungsfaktor: ${factor}.`,large?`Zur größeren Einheit: ${fmt(n)} : ${factor}.`:`Zur kleineren Einheit: ${fmt(n)} · ${factor}.`,d===2?'Eine Fläche hat zwei Richtungen. 10 · 10 = 100.':d===3?'Ein Körper hat drei Richtungen. 10 · 10 · 10 = 1000.':d===5?'Bei Stunden und Minuten ist der Faktor 60. Die Dezimalstellen sind keine Minutenangabe.':'Die Größe bleibt gleich. Maßzahl und Einheit ändern sich.',rounded?'Die Dezimalzahl ist periodisch. Das Zeichen ≈ bedeutet: hier gerundet.':large?'Die Maßzahl wird kleiner.':'Die Maßzahl wird größer.']);
 };
}
function refresh(){update();$$('input[type=range]').forEach(el=>{const o=$('#'+el.id+'-out');if(o)o.textContent=el.id==='n'&&topic==='groessen'?fmt(+el.value/10):fmt(el.value)});$('#lab-why').open=false}
controls.addEventListener('input',refresh);controls.addEventListener('change',refresh);refresh();

// Musterwege: keine Bewertung, keine zufälligen Übungsaufgaben.
$$('.worked').forEach(box=>{
 const items=[...box.querySelectorAll('.work-steps>li')],btn=box.querySelector('.next-step'),status=box.querySelector('.step-progress');let i=0;
 function paint(){items.forEach((li,j)=>li.hidden=j>=i);box.querySelector('.heft').hidden=i<items.length;box.querySelector('.control').hidden=i<items.length;status.textContent=`${i} von ${items.length} Schritten`;btn.textContent=i===items.length?'Schritte wieder verdecken':i===0?'Ersten Schritt zeigen':'Nächsten Schritt zeigen'}
 btn.addEventListener('click',()=>{i=i===items.length?0:i+1;paint()});box.addEventListener('toggle',()=>{if(!box.open){i=0;paint()}});paint();
});
const cases=$$('.case'),jump=$('#task-jump'),search=$('#task-search');
function filter(){const q=search.value.toLocaleLowerCase('de-DE').trim();let n=0;cases.forEach(c=>{c.hidden=!c.textContent.toLocaleLowerCase('de-DE').includes(q);if(!c.hidden)n++});[...jump.options].forEach(o=>{if(o.value)o.hidden=$('#'+o.value).hidden});$('#case-count').textContent=`${n} von ${cases.length} Musterwegen`;$('#no-cases').hidden=n>0}
search.addEventListener('input',filter);$('#search-reset').addEventListener('click',()=>{search.value='';filter();jump.value=''});
jump.addEventListener('change',()=>{if(!jump.value)return;const el=$('#'+jump.value);el.hidden=false;el.querySelectorAll('details').forEach(d=>d.open=false);el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});el.focus({preventScroll:true});history.replaceState(null,'','#'+el.id)});
// Konkrete Bilder für die neu ergänzten Aufgabenfamilien.
$$('.case-model').forEach(el=>{
 const m=el.dataset.model;let pic='';
 if(m==='triangles')pic=svg(rect(160,20,200,200,'#f7eee7')+'<path d="M260 20V220M160 120H360M160 20L260 120M260 20L360 120M160 120L260 220M260 120L360 220" stroke="#9e858b"/><path d="M260 20H360L260 120Z M160 120H260L160 220Z" fill="#783d53"/>'+text(150,255,'2 von 8 gleich großen Dreiecken'),280);
 if(m==='paint')pic=grid(15,18,9)+'<div class="caption">15 von 18 Kästchen · fünf Gruppen zu je drei Kästchen</div>';
 if(m==='recover')pic='<div>3 bekannte Teile: je 4 Kästchen</div>'+bar(3,4)+'<div class="caption">Ein vierter Teil gehört zum Ganzen dazu.</div>';
 if(m==='remainder')pic=bar(4,5)+'<div class="caption">4/5 übrig: 320 g · 1/5 verloren: unbekannt</div>';
 if(m==='tank')pic=svg('<path d="M120 180 A180 180 0 0 1 480 180" fill="none" stroke="#dfd2cb" stroke-width="30"/>'+Array.from({length:5},(_,i)=>{const a=Math.PI-i*Math.PI/4;return `<path d="M${300+155*Math.cos(a)} ${180-155*Math.sin(a)}L${300+195*Math.cos(a)} ${180-195*Math.sin(a)}" stroke="#6b5e65" stroke-width="3"/>`}).join('')+'<path d="M300 180L418 62" stroke="#783d53" stroke-width="7"/>'+text(110,220,'0 l')+text(450,220,'80 l'),245,'Tankanzeige bei drei Vierteln');
 if(m==='divide'){const n=el.closest('.case').id==='type-1'?18:8;pic='<div>Ein Ganzes: in 12 gleiche Teile zerlegt</div>'+bar(1,12)+`<div class="caption">Bei ${n} Ganzen erhält jeder der 12 Empfänger ${n} solche Zwölftel.</div>`;}
 if(m==='sets')pic=svg(rect(20,20,550,230,'#e8f0ef','rx="26"')+text(40,50,'ℚ · rationale Zahlen')+rect(100,75,430,150,'#f4e3e8','rx="22"')+text(120,105,'ℤ · ganze Zahlen')+rect(260,130,230,70,'#f2d29d','rx="18"')+text(280,165,'ℕ · 0, 1, 2, 3, …')+text(50,180,'1/8')+text(140,170,'−5'),270);
 if(m==='mirror')pic=numberline(-1,1,4,[{v:-.75,label:'−3/4'},{v:.75,label:'+3/4',color:'#326b82'}]);
 if(m==='ratio')pic='<div class="two-models"><div>Links: 4 von 16'+grid(4,16,4)+'</div><div>Rechts: 3 von 10'+grid(3,10,5)+'</div></div><div class="caption">Verschiedene Gesamtzahlen: erst die Anteile als Bruch schreiben.</div>';
 if(m==='area')pic=svg(Array.from({length:8},(_,i)=>rect(160+i%4*50,25+Math.floor(i/4)*50,50,50,'#e0bdc8')).join('')+text(135,165,'Jedes Kästchen: 0,5 cm × 0,5 cm'),190);
 if(m==='cuboid')pic=svg('<path d="M180 100L280 35H480L380 100Z" fill="#ead4db" stroke="#783d53"/><path d="M380 100L480 35V175L380 240Z" fill="#bed4cc" stroke="#783d53"/>'+rect(180,100,200,140,'#f5e7cd')+text(225,270,'Länge')+text(420,220,'Breite')+text(90,175,'Höhe'),300,'Quader mit drei verschiedenen Kantenlängen');
 if(m==='blocks')pic=svg(Array.from({length:10},(_,i)=>{const x=40+(i%5)*105,y=35+Math.floor(i/5)*115,c=i<7?'#b77c90':'#f5eee5';return `<path d="M${x} ${y+18}l22 -16h55l-22 16Z" fill="${c}" stroke="#783d53"/><path d="M${x+55} ${y+18}l22 -16v55l-22 16Z" fill="${c}" stroke="#783d53"/>`+rect(x,y+18,55,55,c)}).join(''),255,'Zehn Würfel: sieben gefärbt, drei ungefärbt');
 if(m==='frame')pic=svg(rect(35,35,220,145,'#b77c90')+rect(72,72,146,72,'#fffdf8')+'<path d="M335 180V35H555Z" fill="#b77c90" stroke="#783d53"/><path d="M335 180H555V35" fill="none" stroke="#783d53" stroke-dasharray="6 5"/>'+text(60,215,'Außen minus innen')+text(335,215,'Halbes Rechteck'),245,'Rahmenfläche und ein halbes Rechteck');
 el.innerHTML=pic;
});
window.addEventListener('beforeprint',()=>{$$('details').forEach(d=>{d.dataset.wasOpen=d.open?'1':'0';d.open=true})});window.addEventListener('afterprint',()=>{$$('details').forEach(d=>{d.open=d.dataset.wasOpen==='1'})});
})();
