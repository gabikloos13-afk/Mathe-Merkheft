'use strict';
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const F=(a,b)=>`<span class="fraction" aria-label="${a} durch ${b}"><span>${a}</span><span>${b}</span></span>`;
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const fmt=x=>Number(x).toLocaleString('de-DE',{maximumFractionDigits:6});
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const colors={part:'#783d53',whole:'#326b82',unit:'#9b5c1e',empty:'#f3ede4'};
const txt=(x,y,s,cls='')=>`<text x="${x}" y="${y}" class="${cls} ${String(s).length>30?'scene-small':''}">${E(s)}</text>`;
const svg=(body,h=260,label='')=>`<svg viewBox="0 0 600 ${h}" role="img" aria-label="${E(label)}">${body}</svg>`;
const box=(x,y,w,h,fill=colors.empty,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" ${more}/>`;
const eq=s=>`<div class="scene-equation">${s}</div>`;
const points=s=>String(s).split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9])| → /).filter(Boolean);
const miniList=s=>'<ul class="mini-explain">'+points(s).map(x=>'<li>'+E(x)+'</li>').join('')+'</ul>';
const note=s=>`<div class="scene-note">${miniList(s)}</div>`;
function fractionStrip(n,d,x,y,w=520,h=55,cuts=true,ink=colors.part){
 return box(x,y,w,h)+box(x,y,w*n/d,h,ink)+(cuts?Array.from({length:d+1},(_,i)=>`<path class="cut-line" d="M${x+i*w/d} ${y}v${h}"/>`).join(''):'');
}
function transformScene(o,stage){
 const {n,d,k=2,reverse=false}=o,small=reverse?d/k:d,big=reverse?d:d*k;
 const sourceD=d,sourceN=n,goalD=reverse?d/k:d*k,goalN=reverse?n/k:n*k,units=Math.max(1,Math.ceil(n/d)),unitWidth=520/units;
 let lines='';
 for(let i=0;i<=big*units;i++){const major=i%(big/small)===0,x=40+i*unitWidth/big;
  if(major||(!reverse&&stage>=1)||(reverse&&stage<2))lines+=`<path class="cut-line ${!major?'new-cut':''}" d="M${x} 75v80" style="opacity:${reverse&&stage===1&&!major?.25:1}"/>`;
 }
 const b=box(40,75,520,80)+box(40,75,unitWidth*n/d,80,colors.part)+lines+txt(40,45,units===1?'Dasselbe Ganze · derselbe gefärbte Anteil':units+' Ganze im sichtbaren Streifen')+Array.from({length:units+1},(_,i)=>`<path d="M${40+i*unitWidth} 70v90" class="unit-line"/><text x="${40+i*unitWidth}" y="184" text-anchor="middle">${i}</text>`).join('');
 const step=['Einen Anteil betrachten',reverse?'Je '+k+' Stücke gehören zusammen':'Jedes Stück wird in '+k+' Teile zerlegt',reverse?'Innere Grenzen verschwinden':'Neue Stücke zählen','Anders geschrieben – gleich viel'][stage];
 return svg(b,200,step)+eq(stage===0?F(sourceN,sourceD):stage<3?`${F(sourceN,sourceD)} <span class="operation">${reverse?':':'·'} ${k} oben und unten</span>`:`${F(sourceN,sourceD)} = ${F(goalN,goalD)}`)+note(step);
}
function portionScene(o,stage){
 const {n,d,known,back=false,unit='Gegenstände'}=o,one=back?known/n:known/d,total=back?one*d:known,part=one*n;
 let b=txt(35,32,back?`${fmt(known)} ${unit} gehören zu ${n} von ${d} Teilen`:`Das Ganze: ${fmt(total)} ${unit}`);
 const gap=8,w=(530-gap*(d-1))/d;
 for(let i=0;i<d;i++){
  const active=stage>=2||(back?i<n:stage>=1),fill=active?(i<n?colors.part:colors.whole):colors.empty,x=35+i*(w+gap);
  b+=box(x,65,w,90,fill,`class="part-block ${!active?'unknown-part':''}"`);
  if(stage>=1&&(i<n||!back||stage>=2))b+=`<text x="${x+w/2}" y="118" text-anchor="middle" class="on-dark">${fmt(one)}</text>`;
  else if(!active)b+=`<text x="${x+w/2}" y="118" text-anchor="middle">?</text>`;
 }
 const start=back?`${F(n,d)} des Ganzen = ${fmt(known)} ${unit}`:`${F(n,d)} von ${fmt(known)} ${unit}`;
 const equation=stage===0?start:stage===1?`${fmt(known)} : <b class="part-color">${back?n:d}</b> = ${fmt(one)} ${unit} je Teil`:stage===2?`${fmt(one)} · <b class="whole-color">${back?d:n}</b> = ${fmt(back?total:part)} ${unit}`:`${back?'Ganzes':'Anteil'}: ${fmt(back?total:part)} ${unit}`;
 return svg(b,180,back?'Aus bekannten Teilen das Ganze ergänzen':'Ein Ganzes in gleich große Gruppen teilen')+eq(equation)+note(stage===0?'Welche Größe ist bekannt – das Ganze oder nur ein Teil?':stage===1?'Erst EINEN gleich großen Teil bestimmen.':stage===2?back?'Die fehlenden gleich großen Teile ergänzen.':'So viele Teile nehmen, wie der Zähler angibt.':'Kontrolle: Alle Teile zusammen ergeben wieder das Ganze.');
}
function bundleScene(o,stage){
 const {n,d,negative=false}=o,whole=Math.floor(n/d),rest=n%d,groups=Math.max(1,Math.ceil(n/d)),cols=3,rows=Math.ceil(groups/cols),height=stage?rows*100+70:Math.ceil(n/10)*45+75;
 let b='';
 if(stage)for(let g=0;g<groups;g++){const x=20+g%cols*195,y=30+Math.floor(g/cols)*100;b+=box(x,y,180,70,'#fff',`class="group-outline"`)+txt(x,y+92,'Ganzes '+(g+1));}
 for(let i=0;i<n;i++){
  const x0=20+i%10*55,y0=25+Math.floor(i/10)*45,g=Math.floor(i/d),j=i%d,x1=28+g%cols*195+j*(164/d),y1=42+Math.floor(g/cols)*100;
  b+=`<rect class="moving-piece" x="0" y="0" width="${stage?Math.max(5,155/d):43}" height="30" rx="3" fill="${stage>=2&&g===whole?colors.unit:colors.part}" style="--sx:${x0}px;--sy:${y0}px;--tx:${stage?x1:x0}px;--ty:${stage?y1:y0}px"/>`;
 }
 const sign=negative?'−':'';
 return svg(b,height,'Bruchstücke bewegen sich in vollständige Gruppen')+eq(stage<2?`${sign}${F(n,d)} · ${d} Stücke bilden ein Ganzes`:stage===2?`${whole} volle Gruppen · ${rest} Stücke bleiben`:`${sign}${F(n,d)} = ${sign}${rest?`(${whole} + ${F(rest,d)})`:whole}`)+note(stage===0?'Die einzelnen Stücke sind noch nicht gebündelt.':stage===1?'Jedes Stück gehört zu genau einer Gruppe.':stage===2?'Nur die letzte unvollständige Gruppe ist der Rest.':negative?'Das Bild zeigt den Betrag. Das Minus gilt für den gesamten Wert.':'Die Menge bleibt bei der Umordnung erhalten.');
}
function compareScene(o,stage){
 const {a,b,c,d,negative=false}=o,l=b*d/gcd(b,d),denA=stage>=2?l:b,denB=stage>=2?l:d,units=Math.max(1,Math.ceil(Math.max(a/b,c/d))),width=530/units;
 let body=txt(35,30,'A: '+a+'/'+b)+box(35,50,530,55)+box(35,50,width*a/b,55,colors.part)+txt(35,155,'B: '+c+'/'+d)+box(35,175,530,55)+box(35,175,width*c/d,55,colors.whole);
 [denA,denB].forEach((den,row)=>{for(let i=0;i<=den*units;i++)body+=`<path class="cut-line ${stage>=2?'new-cut':''}" d="M${35+i*width/den} ${50+row*125}v55"/>`});
 if(stage>=1&&stage<2){for(let i=0;i<=l*units;i++)body+=`<path class="guide-cut" d="M${35+i*width/l} 40v200"/>`}
 const cmp=(a*d-c*b)*(negative?-1:1),sign=cmp===0?'=':cmp<0?'&lt;':'&gt;',sgn=negative?'−':'';
 return svg(body,260,units+' ganze Einheiten je Zeile mit zusammenpassender Einteilung')+eq(stage===0?`${sgn}${F(a,b)} &nbsp; ? &nbsp; ${sgn}${F(c,d)}`:stage<3?`${F(a,b)} = ${F(a*l/b,l)} &nbsp; ${F(c,d)} = ${F(c*l/d,l)}`:`${sgn}${F(a,b)} ${sign} ${sgn}${F(c,d)}`)+note(stage===0?(units>1?`Jede volle Zeile umfasst ${units} Ganze. Die Stückgrößen sind noch verschieden.`:'Gleiche Gesamtlänge – aber noch verschieden große Stücke.'):stage===1?'Die gestrichelten Hilfslinien passen zu beiden Einteilungen.':stage===2?'Jetzt sind alle Teilstücke gleich groß. Die gefärbten Längen bleiben gleich.':negative?'Beide Werte sind negativ: Der größere Betrag liegt weiter links.':'Jetzt darfst du die Zähler vergleichen.');
}
function shareScene(o,stage){
 const {n,d}=o,topRows=Math.ceil(n/4),plateRows=Math.ceil(d/3),plateY=topRows*100+50,height=plateY+plateRows*115+25;let b='';
 const arc=(x,y,r,j)=>{const a=-Math.PI/2+j*2*Math.PI/d,z=a+2*Math.PI/d,p=t=>`${x+r*Math.cos(t)},${y+r*Math.sin(t)}`;return `M${x},${y}L${p(a)}A${r},${r} 0 ${d===1?1:0},1 ${p(z)}Z`};
 for(let p=0;p<n;p++){const x=75+p%4*145,y=45+Math.floor(p/4)*100;b+=`<circle cx="${x}" cy="${y}" r="35" fill="${stage>=2?'none':'#f6dfb0'}" stroke="#9b5c1e"/>`;if(stage===0)b+=txt(x-8,y+7,p+1);}
 for(let child=0;child<d;child++){const x=100+child%3*195,y=plateY+Math.floor(child/3)*115;b+=`<ellipse cx="${x}" cy="${y}" rx="80" ry="50" class="plate ${stage===3&&child>0?'muted-plate':''}"/>`+txt(x-38,y+65,'Kind '+(child+1));}
 if(stage>=1)for(let p=0;p<n;p++)for(let child=0;child<d;child++){
  const sx=75+p%4*145,sy=45+Math.floor(p/4)*100,dx=stage>=2?100+child%3*195+(p%4-1.5)*38:sx,dy=stage>=2?plateY+Math.floor(child/3)*115+Math.floor(p/4)*14-12:sy;
  b+=`<g class="moving-piece ${stage===3&&child>0?'muted-plate':''}" style="--sx:0px;--sy:0px;--tx:${dx-sx}px;--ty:${dy-sy}px"><path transform="rotate(${stage>=2?-child*360/d:0} ${sx} ${sy})" d="${arc(sx,sy,35,child)}" fill="${child===0?colors.part:'#d6a850'}" stroke="#fffdf8"/></g>`;
 }
 return svg(b,height,`${n} Pizzen in ${d} gleich große Anteile schneiden und auf ${d} Kinder verteilen`)+eq(stage===0?`${n} Pizzen : ${d} Kinder`:stage===1?`Ein Stück = ${F(1,d)} Pizza`:stage===2?'Jedes Kind bekommt von jeder Pizza ein Stück.':`${n} : ${d} = ${F(n,d)} Pizza je Kind`)+note(stage===0?'Alle Pizzen und alle Kinderteller sind sichtbar.':stage===1?'Die Pizzen werden gleichmäßig zerschnitten.':stage===2?'Die Stücke wandern auf die Teller. Kein Stück geht verloren.':`Betrachte Kind 1: ${n} gleich große Stücke ergeben seinen Anteil. Jedes Stück ist ein ${d}-tel einer Pizza.`);
}
function lineScene(o,stage){
 const {a=.15,b=.151,p=null}=o,lo=Math.min(a,b),hi=Math.max(a,b),mid=p??(lo+hi)/2;
 const focusHi=stage===3?mid:hi,span=focusHi-lo||1,zoom=stage>=1,min=zoom?lo-span*.15:Math.floor(lo),max=zoom?focusHi+span*.15:Math.ceil(hi)||1,X=v=>35+(v-min)/(max-min)*530;
 const number=v=>Math.abs(v-Number(v.toFixed(6)))>1e-9?'≈ '+fmt(v):fmt(v);
 let body=txt(35,25,'Überblick: Die Zahlen behalten ihren Platz.');
 const overviewMin=Math.floor(lo),overviewMax=Math.ceil(hi)||overviewMin+1,OX=v=>35+(v-overviewMin)/(overviewMax-overviewMin)*530;
 body+=`<path d="M35 65H565" class="axis"/>`+txt(35,95,number(overviewMin))+`<text x="565" y="95" text-anchor="end">${number(overviewMax)}</text>`;
 body+=box(OX(lo),48,Math.max(3,OX(focusHi)-OX(lo)),34,'#f0d19a');
 body+=`<path d="M${OX(lo)} 87L35 155M${OX(focusHi)} 87L565 155" class="zoom-link"/><path d="M35 180H565" class="axis"/>`;
 for(let j=0;j<=10;j++)body+=`<path d="M${35+j*53} 173v14" class="axis"/>`;
 const labels=[lo,focusHi];labels.forEach((v,i)=>{const x=X(v);body+=`<circle cx="${x}" cy="180" r="7" fill="${i?colors.whole:colors.part}"/>`;if(zoom)body+=`<text x="${x}" y="${i?218:154}" text-anchor="middle">${number(v)}</text>`;});
 if(!zoom)body+=txt(55,225,number(a)+' und '+number(b)+' liegen hier dicht beieinander.');
 if(stage>=2){const inner=stage===3?(lo+mid)/2:mid;body+=`<circle cx="${X(inner)}" cy="180" r="6" fill="${colors.unit}"/>`+txt(145,275,'Weitere Zahl: '+number(inner));}
 const equation=stage===0?number(a)+' bis '+number(b):stage===1?'Derselbe Abschnitt – mit mehr Platz dargestellt':stage===2?number(lo)+' &lt; '+number(mid)+' &lt; '+number(hi):number(lo)+' &lt; '+number((lo+mid)/2)+' &lt; '+number(mid);
 return svg(body,stage>=2?305:265,'Verbundener Überblick und vergrößerter Ausschnitt des Zahlenstrahls')+eq(equation)+note(stage===3?'Die linke Hälfte ist erneut vergrößert. Auch darin liegt wieder eine weitere Zahl.':'Die Verbindungslinien zeigen, wo der vergrößerte Ausschnitt im Überblick liegt.');
}
function placeScene(o,stage){
 const {hundredths=45}=o,w=Math.floor(hundredths/100),z=Math.floor(hundredths%100/10),h=hundredths%10,total=Math.min(hundredths,200),cols=20;let b='';
 for(let i=0;i<total;i++){
  const sx=15+i%cols*28,sy=20+Math.floor(i/cols)*24,bundle=Math.floor(i/10),within=i%10,dx=stage>=1?25+bundle%10*55+within%2*21:sx,dy=stage>=1?35+Math.floor(bundle/10)*150+Math.floor(within/2)*22:sy;
  b+=`<rect class="moving-piece" width="18" height="18" rx="2" fill="${stage>=2&&i<w*100?colors.whole:colors.part}" style="--sx:${sx}px;--sy:${sy}px;--tx:${dx}px;--ty:${dy}px"/>`;
 }
 const height=stage>=1?Math.ceil(Math.max(1,total)/100)*150+35:Math.ceil(Math.max(1,total)/cols)*24+50;
 let table=stage>=2?`<table class="place-table"><caption>Das Bild und die Stellenwerttafel zeigen dieselbe Menge.</caption><tr><th>Einer</th><th>Zehntel</th><th>Hundertstel</th></tr><tr><td class="${stage===3?'decisive':''}">${w}</td><td>${z}</td><td>${h}</td></tr></table>`:'';
 return svg(b,height,'Hundertstel in Zehnergruppen bündeln')+table+eq(stage===0?`${hundredths} einzelne Hundertstel`:stage===1?'10 Hundertstel bilden jeweils 1 Zehntel.':stage===2?`${w} Einer · ${z} Zehntel · ${h} Hundertstel`:`${fmt(hundredths/100)} = ${F(hundredths,100)}`)+note('Die Anzahl der kleinen Quadrate bleibt bei der Umordnung gleich.');
}
function decimalScene(o,stage){
 const {a=.43,b=.418}=o,negative=a<0&&b<0,aa=Math.abs(a).toFixed(3),bb=Math.abs(b).toFixed(3),idx=[0,2,3,4].findIndex(i=>aa[i]!==bb[i]),labels=['Einer','Zehntel','Hundertstel','Tausendstel'];
 const row=(s,row)=>'<tr>'+[0,2,3,4].map((j,k)=>`<td class="${stage>=1&&k===idx?'decisive':''} ${stage===0?'unscanned':''}">${s[j]}</td>`).join('')+'</tr>';
 const table=`<table class="place-table"><caption>${negative?'Zuerst die Beträge vergleichen':'Gleiche Stellen stehen untereinander'}</caption><tr>${labels.map(x=>'<th>'+x+'</th>').join('')}</tr>${row(aa,0)}${row(bb,1)}</table>`;
 const sign=a===b?'=':a<b?'&lt;':'&gt;';
 return table+(stage>=2&&a!==b?lineScene({a:Math.min(a,b),b:Math.max(a,b)},1).split('</svg>')[0]+'</svg>':'')+eq(stage<1?`${fmt(a)} &nbsp; ? &nbsp; ${fmt(b)}`:stage<3?idx<0?'Alle Stellen stimmen überein.':`Die erste unterschiedliche Stelle: ${labels[idx]}`:`${fmt(a)} ${sign} ${fmt(b)}`)+note(negative?'Bei negativen Zahlen entscheidet anschließend die Lage links von 0.':idx<0?'Endnullen ändern den Wert nicht.':'Spätere Ziffern können die Entscheidung nicht mehr umkehren.');
}
function surfaceScene(stage){
 let b='';
 if(stage===0)b='<path d="M170 95L245 42H460L385 95Z" fill="#e2b8c7"/><path d="M385 95L460 42V250L385 303Z" fill="#90b9b2"/>'+box(170,95,215,208,'#abc5d4');
 else [[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]].forEach(([x,y],i)=>{const xx=50+x*100,yy=20+y*100;b+=box(xx,yy,100,100,i%2?'#e2b8c7':'#abc5d4');if(stage>=2)for(let j=1;j<10;j++)b+=`<path d="M${xx+j*10} ${yy}v100M${xx} ${yy+j*10}h100" class="cut-line new-cut"/>`;});
 return svg(b,345,'Würfelhülle zu sechs Quadraten auffalten')+eq(stage===0?'Ein Würfel · Kantenlänge 1 dm':stage===1?'6 Seitenflächen · jede 1 dm²':stage===2?'Je Fläche: 10 · 10 = 100 cm²':'Oberfläche: 6 · 100 cm² = 600 cm²')+note(stage<3?'Oberfläche ist die äußere Hülle. Die sechs Seitenflächen lassen sich zu einem Netz auffalten.':'Oberfläche und Rauminhalt getrennt: 600 cm² Hülle und 1000 cm³ Inhalt beim Einheitswürfel.');
}
function unitsScene(o,stage){
 if(o.surface)return surfaceScene(stage);
 const {dim=2,value=1,reverse=false,surface=false}=o,power=Math.min(dim,3),factor=dim===4?1000:dim===5?60:10**power,u=dim===4?['kg','g']:dim===5?['h','min']:power===1?['dm','cm']:power===2?['dm²','cm²']:['dm³','cm³'];let b='';
 if(dim<=3){
  if(power===1){b=fractionStrip(10,10,40,75,520,55,stage>=1,colors.whole)+txt(40,40,'Eine Richtung');}
  if(power===2){b=txt(35,25,'Zwei Richtungen: 10 Reihen mit je 10 Feldern');for(let y=0;y<10;y++)for(let x=0;x<10;x++)b+=box(170+x*25,45+y*25,24,24,stage===0?colors.whole:y===0?colors.part:stage>=2?colors.whole:colors.empty);}
  if(power===3){b=txt(20,25,surface?'Äußere Hülle: Flächen zählen':'Innerer Raum: Würfelschichten zählen');if(stage<2)b+=`<path d="M170 95L245 42H460L385 95Z" fill="#e2b8c7"/><path d="M385 95L460 42V250L385 303Z" fill="#90b9b2"/>`+box(170,95,215,208,'#abc5d4');else for(let layer=0;layer<10;layer++){const dx=layer*6,dy=layer*17;b+=box(120+dx,55+dy,240,32,layer===0?colors.part:colors.whole,`class="layer" style="animation-delay:${layer*.045}s"`);if(layer===0)for(let i=0;i<=10;i++)b+=`<path d="M${120+dx+i*24} ${55+dy}v32" class="cut-line"/>`;}}
 }else if(dim===5){const minutes=value*60,turn=(minutes%60)/60*2*Math.PI;b=`<circle cx="300" cy="145" r="95" fill="#f3ede4" stroke="#783d53"/>`+Array.from({length:60},(_,i)=>{const a=i*Math.PI/30;return `<path d="M${300+85*Math.sin(a)} ${145-85*Math.cos(a)}L${300+94*Math.sin(a)} ${145-94*Math.cos(a)}" class="cut-line"/>`}).join('')+`<path d="M300 145L${300+75*Math.sin(turn)} ${145-75*Math.cos(turn)}" stroke="#783d53" stroke-width="5"/>`+txt(150,280,stage>=2?`${fmt(value)} h = ${fmt(minutes)} min`:'Eine volle Runde entspricht 60 Minuten');}
 else {b=txt(40,35,'Ein Kilogramm in Gramm darstellen')+box(40,85,520,90,colors.whole);if(stage>=1)for(let i=0;i<10;i++)b+=`<path d="M${40+i*52} 85v90" class="cut-line"/>`;b+=txt(40,220,stage>=2?'10 Gruppen · je 100 g = 1000 g':'Ein Ganzes bleibt ein Ganzes.');}
 const out=reverse?value/factor:value*factor,label=stage===0?`${fmt(value)} ${u[reverse?1:0]}`:stage===1?dim<=3?Array(power).fill('10').join(' · ')+' kleine Einheiten pro großer Einheit':`Umrechnung mit ${factor}`:stage===2?`${fmt(value)} ${reverse?':':'·'} ${factor}`:`${fmt(value)} ${u[reverse?1:0]} ${dim===5&&reverse&&Math.round(value*10)%3?'≈':'='} ${fmt(out)} ${u[reverse?0:1]}`;
 // The value is shown separately from the unit template; no fixed drawing is labelled as the variable amount.
 const bands=stage>=2?'<div class="amount-bands"><b>Gewählte Menge: '+fmt(value)+' '+u[reverse?1:0]+'</b>'+Array.from({length:Math.ceil(value)},(_,j)=>'<div class="bar"><i class="on" style="flex:none;width:'+Math.min(1,Math.max(0,value-j))*100+'%"></i></div>').join('')+'</div>':'';
 return svg(b,dim===3?345:dim===1?180:320,'Aufbau einer einzelnen Bezugseinheit')+bands+note('Das Bild zeigt eine große Einheit. Rechne mit demselben Faktor für deine Menge.')+eq(label);
}

const scenes={portion:portionScene,transform:transformScene,bundle:bundleScene,compare:compareScene,share:shareScene,line:lineScene,place:placeScene,decimal:decimalScene,units:unitsScene};
const lab=$('#werkzeug');if(!lab)return;
const topic=document.body.dataset.topic;
const config={
 brueche:{title:'Anteil und Ganzes im Bild verstehen',kind:'portion',v:{n:3,d:4,known:21,back:true,unit:'Kinder'},steps:['Bekannten Anteil ansehen','Einen Teil bestimmen','Das Ganze ergänzen','Zusammenhang erkennen']},
 gleichwertig:{title:'Andere Einteilung – gleich viel Fläche',kind:'transform',v:{n:2,d:3,k:2},steps:['Ausgangsbruch','Neue Schnitte setzen','Neue Stücke zählen','Beide Schreibweisen verbinden']},
 gemischt:{title:'Bruchstücke wirklich zu Ganzen bündeln',kind:'bundle',v:{n:11,d:4},steps:['Einzelne Stücke','Volle Gruppen bilden','Rest hervorheben','Als Zahl schreiben']},
 zahlenstrahl:{title:'Mit der Lupe zwischen Zahlen schauen',kind:'line',v:{a:.15,b:.151},steps:['Überblick','Ausschnitt vergrößern','Zwischenzahl sichtbar machen','Weiter verfeinern']},
 quotienten:{title:'Pizzen auf Kinderteller verteilen',kind:'share',v:{n:3,d:4},steps:['Pizzen und Kinder','Gleich große Stücke schneiden','Auf alle Teller verteilen','Einen Teller betrachten']},
 vergleichen:{title:'Zwei Brüche auf dieselbe Einteilung bringen',kind:'compare',v:{a:2,b:3,c:3,d:4},steps:['Verschiedene Stückgrößen','Passende Schnittlinien finden','Beide gleich einteilen','Vergleich ablesen']},
 dezimal:{title:'Hundertstel zu Zehnteln und Ganzen bündeln',kind:'place',v:{hundredths:125},steps:['Einzelne Hundertstel','Zehn Stücke bündeln','Mit Stellenwerttafel verbinden','Als Zahl schreiben']},
 dezimalvergleich:{title:'Die entscheidende Stelle im Bild verfolgen',kind:'decimal',v:{a:.43,b:.418},steps:['Stellen untereinander','Entscheidende Stelle markieren','Lage am Zahlenstrahl','Vergleich begründen']},
 groessen:{title:'Eine Einheit zerlegen – den Faktor verstehen',kind:'units',v:{dim:2,value:1},steps:['Eine große Einheit','In Richtungen zerlegen','Kleine Einheiten zählen','Auf die Menge übertragen']}
};
let cfg=config[topic],state=0,alternate=false;const mainValues={...cfg.v};
function select(id,label,opts){return `<div class="control-box"><label for="${id}">${label}</label><select id="${id}">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></div>`}
function range(id,label,min,max,v,step=1){return `<div class="control-box"><label for="${id}">${label}: <output id="${id}-out">${fmt(v)}</output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${v}"></div>`}
let ui='';
if(topic==='brueche')ui=select('lab-situation','Welche Größe ist bekannt?',[[1,'Anteil: 21 Kinder sind drei Viertel'],[2,'Ganzes: 60 Birnen, davon zwei Drittel'],[3,'Rest: 320 g sind vier Fünftel']]);
if(topic==='gleichwertig')ui=range('lab-factor','Unterteilungen je altem Stück',2,5,2)+select('lab-direction','Richtung',[['split','Erweitern: zusätzliche Schnitte'],['join','Kürzen: Stücke zusammenfassen']]);
if(topic==='gemischt')ui=range('lab-pieces','Stücke insgesamt',1,24,11)+select('lab-den','Stücke je Ganzem',[[3,'Drittel: 3'],[4,'Viertel: 4'],[5,'Fünftel: 5']]);
if(topic==='quotienten')ui=range('lab-pizzas','Pizzen',1,4,3)+range('lab-children','Kinder',2,6,4);
if(topic==='vergleichen')ui=select('lab-pair','Zwei Brüche',[[1,'2/3 und 3/4'],[2,'3/4 und 3/8'],[3,'2/3 und 4/6'],[4,'−2/3 und −1/3']]);
if(topic==='zahlenstrahl')ui=select('lab-interval','Welcher Zwischenraum?',[[1,'0,15 bis 0,151'],[2,'−0,41 bis −0,40'],[3,'1/3 bis 2/3']]);
if(topic==='dezimal')ui=range('lab-hundredths','Hundertstel insgesamt',1,199,125);
if(topic==='dezimalvergleich')ui=select('lab-decimals','Zahlenpaar',[[1,'0,43 und 0,418'],[2,'0,6 und 0,600'],[3,'−0,41 und −0,40'],[4,'0,15 und 0,151']]);
if(topic==='groessen')ui=select('lab-dimension','Eine große Einheit',[[1,'Länge: dm in cm'],[2,'Fläche: dm² in cm²'],[3,'Raum: dm³ in cm³'],[4,'Masse: kg in g'],[5,'Zeit: h in min']])+select('lab-body-mode','Am Würfel betrachten',[['fill','Rauminhalt: Würfel füllen'],['surface','Oberfläche: Hülle auffalten']])+range('lab-quantity','Menge der Ausgangseinheit',.1,3,1,.1);
lab.innerHTML=`<div class="eyebrow">BILD UND RECHNUNG GEHÖREN ZUSAMMEN</div><h2>${cfg.title}</h2><div class="lab-legend"><span class="part-key">Bekannter Anteil</span><span class="whole-key">Das Ganze</span><span class="unit-key">Ein Teil / Rest</span></div><div class="controls">${ui}</div><div class="scene-stage"><div class="stage-dots" aria-label="Erklärschritte"></div><h3 class="stage-title"></h3><div class="scene-board" id="scene-board"></div></div><div class="scene-actions"><button type="button" id="scene-prev">← Zurück</button><output id="scene-status" aria-live="polite"></output><button type="button" id="scene-next">Nächsten Bildschritt zeigen →</button></div><details class="invariant"><summary>Was verändert sich – was bleibt gleich?</summary><div id="invariant-body"></div></details><div class="transfer-switch"><button type="button" id="scene-transfer">Gleicher Gedanke in einer anderen Aufgabe</button><div id="scene-transfer-note" hidden></div></div>`;
const board=$('#scene-board');
function invariant(){return {portion:['Die bekannte Menge wird auf gleich große Teile verteilt.','Die Größe eines einzelnen Teils bleibt beim Ergänzen gleich.'],transform:['Anzahl und Größe der Stücke verändern sich.','Gefärbte Fläche und Größe des Ganzen bleiben gleich.'],bundle:['Die Anordnung verändert sich.','Anzahl und Größe aller Bruchstücke bleiben gleich.'],compare:['Die Schnittlinien und die Stückzahlen verändern sich.','Die beiden gefärbten Längen bleiben gleich.'],share:['Die Stücke wechseln von der Pizza auf die Teller.','Alle Kinder erhalten gleich viel. Die Gesamtmenge bleibt erhalten.'],line:['Der sichtbare Ausschnitt wird vergrößert.','Zahlenwerte, Reihenfolge und Lage im Überblick bleiben erhalten.'],place:['Die kleinen Quadrate werden anders gruppiert.','Die Menge der Hundertstel bleibt gleich.'],decimal:['Die Schreibweise wird angeglichen und die wichtige Stelle hervorgehoben.','Der Zahlenwert und seine Lage am Zahlenstrahl ändern sich nicht.'],units:['Maßzahl und Einheit ändern sich.','Die gemessene Größe bleibt dieselbe.']}[cfg.kind]}
function paint(){
 if(cfg.kind==='portion')cfg.steps=cfg.v.back?['Bekannten Anteil ansehen','Einen Teil bestimmen','Das Ganze ergänzen','Zusammenhang erkennen']:['Das Ganze ansehen','Einen Teil bestimmen','Den gesuchten Anteil nehmen','Zusammenhang erkennen'];
 if(cfg.kind==='transform')cfg.steps=cfg.v.reverse?['Ausgangsbruch','Stücke zu Gruppen verbinden','Innere Grenzen entfernen','Gleichen Wert bestätigen']:['Ausgangsbruch','Neue Schnitte setzen','Neue Stücke zählen','Beide Schreibweisen verbinden'];
 if(cfg.kind==='units')cfg.steps=cfg.v.surface?['Würfelhülle ansehen','Sechs Flächen auffalten','Jede Fläche unterteilen','Oberfläche bestimmen']:['Eine große Einheit','In Richtungen zerlegen','Kleine Einheiten zählen','Auf die Menge übertragen'];
 $('.stage-title',lab).textContent=cfg.steps[state];board.innerHTML=scenes[cfg.kind](cfg.v,state);
 $('.stage-dots',lab).innerHTML=cfg.steps.map((x,i)=>`<span class="${i<=state?'done':''}" aria-label="${i+1}: ${E(x)}">${i+1}</span>`).join('');
 $('#scene-status').textContent=`Bildschritt ${state+1} von 4`;$('#scene-prev').disabled=state===0;$('#scene-next').textContent=state===3?'Von vorn ansehen ↺':'Weiter im Bild →';
 $('#invariant-body').innerHTML='<ul class="explain">'+invariant().flatMap(points).map(x=>'<li>'+E(x)+'</li>').join('')+'</ul>';
 $$('input[type=range]',lab).forEach(el=>$('#'+el.id+'-out').textContent=fmt(el.value));
}
$('#scene-prev').addEventListener('click',()=>{state=Math.max(0,state-1);paint()});$('#scene-next').addEventListener('click',()=>{state=(state+1)%4;paint()});
$('.controls',lab).addEventListener('input',readControls);$('.controls',lab).addEventListener('change',readControls);
function readControls(){
 alternate=false;$('.controls',lab).hidden=false;$$('.controls input,.controls select',lab).forEach(el=>el.disabled=false);$('#scene-transfer').textContent='Gleicher Gedanke in einer anderen Aufgabe';$('#scene-transfer-note').hidden=true;cfg.v={...mainValues};
 const v=id=>+$('#'+id).value;
 if(topic==='brueche')cfg.v=v('lab-situation')===1?{n:3,d:4,known:21,back:true,unit:'Kinder'}:v('lab-situation')===2?{n:2,d:3,known:60,unit:'Birnen'}:{n:4,d:5,known:320,back:true,unit:'g'};
 if(topic==='gleichwertig'){const k=v('lab-factor'),reverse=$('#lab-direction').value==='join';cfg.v={n:reverse?2*k:2,d:reverse?3*k:3,k,reverse};}
 if(topic==='gemischt')cfg.v={n:v('lab-pieces'),d:v('lab-den')};
 if(topic==='quotienten')cfg.v={n:v('lab-pizzas'),d:v('lab-children')};
 if(topic==='vergleichen'){const pairs=[[2,3,3,4],[3,4,3,8],[2,3,4,6],[2,3,1,3]],p=pairs[v('lab-pair')-1];cfg.v={a:p[0],b:p[1],c:p[2],d:p[3],negative:v('lab-pair')===4};}
 if(topic==='zahlenstrahl'){const p=[[.15,.151],[-.41,-.40],[1/3,2/3]][v('lab-interval')-1];cfg.v={a:p[0],b:p[1]};}
 if(topic==='dezimal')cfg.v={hundredths:v('lab-hundredths')};
 if(topic==='dezimalvergleich'){const p=[[.43,.418],[.6,.6],[-.41,-.40],[.15,.151]][v('lab-decimals')-1];cfg.v={a:p[0],b:p[1]};}
 if(topic==='groessen'){const dim=v('lab-dimension');cfg.v={dim,value:v('lab-quantity'),surface:dim===3&&$('#lab-body-mode').value==='surface'};$('#lab-body-mode').closest('.control-box').hidden=dim!==3;$('#lab-quantity').closest('.control-box').hidden=cfg.v.surface;}
 state=0;paint();
}
$('#scene-transfer').addEventListener('click',()=>{
 alternate=!alternate;$('.controls',lab).hidden=alternate;$$('.controls input,.controls select',lab).forEach(el=>el.disabled=alternate);$('#scene-transfer').textContent=alternate?'Zur Ausgangsaufgabe zurück':'Gleicher Gedanke in einer anderen Aufgabe';
 const alternatives={brueche:{n:3,d:4,known:12,back:true,unit:'Kästchen'},gleichwertig:{n:3,d:4,k:2},gemischt:{n:17,d:5},zahlenstrahl:{a:.32,b:.33},quotienten:{n:2,d:5},vergleichen:{a:4,b:5,c:5,d:6},dezimal:{hundredths:75},dezimalvergleich:{a:.52,b:.7},groessen:{dim:3,value:.5}};
 const messages={brueche:'Vorher Kinder, jetzt Kästchen: Ein bekannter Anteil führt über EINEN Teil zum Ganzen.',gleichwertig:'Andere Zahlen: Wieder müssen Zähler und Nenner denselben Faktor erhalten.',gemischt:'Andere Stückgröße: Jetzt bilden fünf Fünftel jeweils ein Ganzes.',zahlenstrahl:'Andere Grenzen: Überblick und Lupe beschreiben weiterhin denselben Zahlenstrahl.',quotienten:'Andere Pizzenzahl und Kinderzahl: Von jedem Ganzen bekommt jedes Kind denselben Anteil.',vergleichen:'Andere Nenner: Die passenden Schnittlinien müssen wieder zu beiden Einteilungen passen.',dezimal:'Andere Menge: Zehn Hundertstel werden weiterhin zu einem Zehntel gebündelt.',dezimalvergleich:'Andere Ziffern: Wieder entscheidet die erste unterschiedliche Stelle.',groessen:'Vom Quadrat zum Würfel: Es kommt eine dritte Richtung dazu.'};
 if(alternate)cfg.v={...alternatives[topic]};else{readControls();return}
 $('#scene-transfer-note').hidden=false;$('#scene-transfer-note').innerHTML=miniList(messages[topic]);state=0;paint();
});
if(topic==='groessen'){$('#lab-body-mode').closest('.control-box').hidden=true;$('#lab-dimension').value='2';}if(topic==='gemischt')$('#lab-den').value='4';
paint();

// A second layer connects the book-like worked examples to their picture model.
const cases={};
function register(t,id,kind,v){cases[t+':type-'+id]={kind,v};}
[[1,4,9,9,false,'Felder'],[2,2,3,60,false,'Birnen'],[3,3,4,21,true,'Kinder'],[6,5,6,60,false,'Minuten'],[8,5,6,18,false,'Kästchen'],[9,3,4,12,true,'Kästchen'],[10,4,5,320,true,'g'],[13,3,4,80,false,'Liter'],[14,7,10,10,false,'Würfel']].forEach(([id,n,d,known,back,unit])=>register('brueche',id,'portion',{n,d,known,back,unit}));
[[1,2,3,4,false],[2,12,16,4,true],[3,18,24,6,true],[4,2,5,4,false],[5,3,4,5,false],[6,3,4,2,false],[8,18,30,6,true]].forEach(([id,n,d,k,reverse])=>register('gleichwertig',id,'transform',{n,d,k,reverse}));
[[1,11,4],[2,17,5],[3,12,4],[4,11,4],[5,17,5]].forEach(([id,n,d])=>register('gemischt',id,'bundle',{n,d,negative:id===4}));
[[1,3,7,5,7],[2,3,4,3,8],[3,2,3,3,4],[4,2,3,4,6],[5,2,3,1,3],[11,4,3,5,4]].forEach(([id,a,b,c,d])=>register('vergleichen',id,'compare',{a,b,c,d,negative:id===5||id===11}));
register('quotienten',2,'share',{n:8,d:12});register('quotienten',1,'transform',{n:18,d:12,k:6,reverse:true});
[[1,7],[2,75],[3,40],[4,45],[6,120],[8,35],[9,75]].forEach(([id,hundredths])=>register('dezimal',id,'place',{hundredths}));
[[1,.43,.418],[2,.6,.6],[3,-.7,-.65],[4,.6,.58],[6,.4,.5],[7,.5,.56],[8,1.205,1.25],[10,-.41,-.40]].forEach(([id,a,b])=>register('dezimalvergleich',id,id===6||id===10?'line':'decimal',{a,b}));
register('zahlenstrahl',6,'line',{a:1/3,b:2/3});register('vergleichen',10,'line',{a:3/5,b:4/5});register('dezimal',11,'line',{a:-2,b:-1});
// Only show amount-bound models when their values and units match the example.
register('groessen',12,'units',{dim:5,value:1.05});
$$('.case').forEach(card=>{
 const spec=cases[topic+':'+card.id],worked=$('.worked',card);if(!worked)return;
 const picture=$('.case-model',card);if(!spec&&!picture)return;
 const panel=document.createElement('div');panel.className='linked-picture';panel.innerHTML='<div class="eyebrow">DAS BILD GEHÖRT ZU DIESER RECHNUNG</div><div class="linked-board"></div><div class="linked-state" aria-live="polite">Bekanntes ansehen · Rechenweg noch verdeckt</div>';
 worked.insertBefore(panel,$('.work-steps',worked));
 const draw=(i,total)=>{
  let level=i===0?0:Math.min(3,Math.floor(i/total*3));if(topic==='brueche'&&card.id==='type-10')level=[0,0,0,1,3][i]??3;$$('.work-steps>li',worked).forEach((li,j)=>li.classList.toggle('current-step',j===i-1));
  if(spec){let params=spec.v;if(topic==='gleichwertig'&&card.id==='type-3'){params=i===1?{n:18,d:24,k:2,reverse:true}:i===2?{n:9,d:12,k:3,reverse:true}:spec.v;if(i===1||i===2)level=2;}$('.linked-board',panel).innerHTML=scenes[spec.kind](params,level);if(i>0&&i<total)$$('.scene-equation',panel).forEach(el=>el.hidden=true);}
  else if(picture){$('.linked-board',panel).innerHTML=picture.innerHTML;$('.linked-board',panel).classList.toggle('picture-focus',i>0);}
  $('.linked-state',panel).textContent=i===0?'Bekanntes ansehen · Rechenweg noch verdeckt':`Bild zu Schritt ${i} von ${total}`;
 };
 card.addEventListener('merkheft:step',e=>draw(e.detail.index,e.detail.total));draw(0,$$('.work-steps>li',worked).length);
});
const relations=[
 {label:'Ein Teil ist bekannt – das Ganze wird gesucht',items:[['brueche',3,'Kinderzahl einer Klasse'],['brueche',9,'Vollständige Kästchenfigur'],['brueche',10,'Teiggewicht vor dem Backen']],idea:'Bekannten Anteil erkennen → einen Teil bestimmen → alle Teile ergänzen.'},
 {label:'Ein Ganzes ist bekannt – ein Anteil wird gesucht',items:[['brueche',2,'Anteil einer Menge'],['brueche',6,'Bruchteil einer Stunde'],['brueche',13,'Tankanzeige in Litern']],idea:'Ganzes durch den Nenner teilen → so viele Teile nehmen, wie der Zähler angibt.'},
 {label:'Andere Einteilung – derselbe Zahlenwert',items:[['gleichwertig',1,'Bruch erweitern'],['gleichwertig',2,'Bruch kürzen'],['dezimal',2,'Bruch als Dezimalzahl']],idea:'Die Schreibweise verändert sich. Die Menge und der Punkt auf dem Zahlenstrahl bleiben gleich.'},
 {label:'Eine unbekannte Schrittweite entschlüsseln',items:[['zahlenstrahl',7,'Unbeschriftete Teilstriche'],['groessen',9,'Abschnitte einer Gewichtsskala'],['dezimal',11,'Sprünge zurückverfolgen']],idea:'Abstand der bekannten Werte bestimmen → durch die Zahl der gleich großen Abschnitte teilen.'}
];
$$('.case .transfer').forEach(details=>{const card=details.closest('.case');const relation=relations.find(r=>r.items.some(([t,id])=>t===topic&&card.id==='type-'+id));if(!relation)return;const block=document.createElement('div');block.className='relation-group';block.innerHTML='<b>'+relation.label+'</b>'+miniList(relation.idea)+'<nav class="topics" aria-label="Gleicher Gedanke in anderen Aufgaben">'+relation.items.filter(([t,id])=>t!==topic||card.id!=='type-'+id).map(([t,id,label])=>'<a href="'+t+'.html#type-'+id+'">'+label+' →</a>').join('')+'</nav>';details.append(block);});
})();
