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
// Musterwege: keine Bewertung, keine zufälligen Übungsaufgaben.
$$('.worked').forEach(box=>{
 const items=[...box.querySelectorAll('.work-steps>li')],btn=box.querySelector('.next-step'),status=box.querySelector('.step-progress');let i=0;
 function paint(){items.forEach((li,j)=>li.hidden=j>=i);box.querySelector('.heft').hidden=i<items.length;box.querySelector('.control').hidden=i<items.length;status.textContent=`${i} von ${items.length} Schritten`;btn.textContent=i===items.length?'Schritte wieder verdecken':i===0?'Ersten Schritt zeigen':'Nächsten Schritt zeigen';box.dispatchEvent(new CustomEvent('merkheft:step',{bubbles:true,detail:{index:i,total:items.length}}))}
 btn.addEventListener('click',()=>{i=i===items.length?0:i+1;paint()});box.addEventListener('toggle',()=>{if(!box.open){i=0;paint()}});paint();
});
// Immer genau eine Aufgabenkarte; Suche bleibt in der geschlossenen Auswahl.
const cases=$$('.case'),jump=$('#task-jump'),search=$('#task-search');
if(cases.length){
 const picker=document.createElement('details');picker.className='task-picker';
 const summary=document.createElement('summary');summary.textContent='Aufgabentyp auswählen';
 picker.append(summary);const navigator=$('.navigator');navigator.before(picker);picker.append(navigator);
 const heading=document.createElement('div');heading.className='reader-current';heading.setAttribute('aria-live','polite');heading.setAttribute('aria-atomic','true');
 const region=$('.cases');region.before(heading);
 let active=0;
 const pagers=['oben','unten'].map(position=>{
  const nav=document.createElement('nav');nav.className='case-pager';nav.setAttribute('aria-label','Musterwege '+position);
  const prev=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');
  prev.type=next.type='button';prev.textContent='← Vorheriger Musterweg';next.textContent='Nächster Musterweg →';count.className='pager-count';
  nav.append(prev,count,next);if(position==='oben')region.before(nav);else region.after(nav);
  prev.addEventListener('click',()=>show(active-1,true));next.addEventListener('click',()=>show(active+1,true));
  return {prev,next,count};
 });
 function show(index,move=false){
  if(index<0||index>=cases.length)return;
  if(move)history.replaceState({...history.state,merkheftCase:cases[active].id},'');
  active=index;cases.forEach((c,i)=>c.hidden=i!==active);
  const card=cases[active],title=card.querySelector('h3').textContent;
  heading.textContent=`Musterweg ${active+1} von ${cases.length} · ${title}`;
  pagers.forEach(p=>{p.prev.disabled=active===0;p.next.disabled=active===cases.length-1;p.count.textContent=`${active+1} / ${cases.length}`});
  const option=[...jump.options].find(o=>o.value===card.id);jump.value=option&&!option.hidden?card.id:'';
  if(move){
   picker.open=false;history.pushState({merkheftCase:card.id},'','#'+card.id);
   card.focus({preventScroll:true});
   heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }
 }
 function filter(){
  const q=search.value.toLocaleLowerCase('de-DE').trim();let n=0;
  cases.forEach(c=>{const match=c.textContent.toLocaleLowerCase('de-DE').includes(q);const o=[...jump.options].find(o=>o.value===c.id);if(o){o.hidden=!match;o.disabled=!match}if(match)n++});
  $('#case-count').textContent=q?`${n} von ${cases.length} Aufgabentypen passen zur Suche`:`${cases.length} Aufgabentypen zur Auswahl`;
  $('#no-cases').hidden=n>0;const selected=[...jump.options].find(o=>o.value===cases[active].id);jump.value=selected&&!selected.hidden?cases[active].id:'';
 }
 // Die Suche filtert die Auswahl, nicht den geöffneten Musterweg.
 const empty=$('#no-cases');empty.textContent='Kein Treffer. Versuche ein anderes Wort oder lösche die Suche.';navigator.append(empty);
 jump.options[0].textContent='Passenden Aufgabentyp wählen';
 navigator.querySelector('label[for="task-search"]').textContent='Aufgabentyp suchen';
 navigator.querySelector('label[for="task-jump"]').textContent='Zu diesem Aufgabentyp wechseln';
 $('#search-reset').textContent='Suche löschen';$('#case-count').setAttribute('aria-live','polite');
 search.addEventListener('input',filter);$('#search-reset').addEventListener('click',()=>{search.value='';filter();search.focus()});
 jump.addEventListener('change',()=>{const index=cases.findIndex(c=>c.id===jump.value);if(index>=0)show(index,true)});
 function fromHash(){const hash=location.hash.slice(1),id=cases.some(c=>c.id===hash)?hash:history.state?.merkheftCase,index=cases.findIndex(c=>c.id===id);if(index>=0){show(index);requestAnimationFrame(()=>cases[index].scrollIntoView({block:'start'}))}}
 show(0);filter();fromHash();window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
}
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
