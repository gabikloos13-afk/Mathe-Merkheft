'use strict';
(()=>{
const C={ink:'#493b50',berry:'#98536e',blue:'#497e99',gold:'#d8a449',mint:'#679c88',pale:'#eee8f0'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const fmt=n=>Number(n).toLocaleString('de-DE',{maximumFractionDigits:5});
const T=(x,y,s,size=17,color=C.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${esc(s)}</text>`;
const R=(x,y,w,h,color,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}" ${more}/>`;
const SVG=(body,label)=>`<svg viewBox="0 0 360 180" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${R(0,0,360,180,'#fffcf7')}<circle cx="337" cy="16" r="29" fill="#f5e6cc" opacity=".55"/>${body}</svg>`;
const arrow=(x,y)=>`<path d="M${x} ${y}h30m-8 -7 8 7-8 7" stroke="${C.blue}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
function strip(n,d,x,y,w=140,h=48){
 let b=R(x,y,w,h,C.pale)+`<rect x="${x}" y="${y}" width="${w*n/d}" height="${h}" rx="5" fill="${C.berry}"/>`;
 for(let i=1;d<=40&&i<d;i++)b+=`<path d="M${x+i*w/d} ${y}v${h}" stroke="#fffcf7" stroke-width="2"/>`;
 return b;
}
function groups(o,stage){
 const {n,d,known,unit,back}=o,one=back?known/n:known/d;
 if((unit==='Birnen'||unit==='Kinder')&&Number.isInteger(one)&&one<=30){
  let body='';const bw=Math.min(170,540/d),gap=12,start=(600-d*bw-(d-1)*gap)/2;
  for(let g=0;g<d;g++){
   const x=start+g*(bw+gap),active=stage===0?(back?g<n:true):stage===1?g===0:back||g<n,knownGroup=!back||g<n||stage>=2;
   body+=`<g opacity="${active?1:.3}"><rect x="${x}" y="24" width="${bw}" height="192" rx="20" fill="${active?'#fff0d8':'#f0ebe5'}" stroke="${active?'#d3a266':'#cdbeb0'}" stroke-width="2"/>`;
   if(unit==='Birnen')body+=`<path d="M${x+16} 34C${x+16} 4 ${x+bw-16} 4 ${x+bw-16} 34" fill="none" stroke="#c3945e" stroke-width="5"/><path d="M${x+8} 172h${bw-16}m0 40H${x+8}" stroke="#c3945e" stroke-width="3"/>`;
   if(knownGroup){const cols=unit==='Birnen'?5:4,rows=Math.ceil(one/cols),dx=(bw-24)/cols,dy=Math.min(30,132/rows);
    for(let j=0;j<one;j++){
     const px=x+12+j%cols*dx+dx/2,py=40+Math.floor(j/cols)*dy;
     body+=unit==='Birnen'?`<g class="counted-pear" style="--piece-order:${j}"><path d="M${px} ${py+6}C${px-4} ${py+1} ${px-8} ${py+11} ${px-9} ${py+18}C${px-11} ${py+32} ${px+12} ${py+32} ${px+9} ${py+18}C${px+8} ${py+10} ${px+4} ${py+3} ${px} ${py+6}Z" fill="#d7be4b" stroke="#b99a2f"/><path d="M${px} ${py+7}q-1-6 2-9" stroke="#795c34" stroke-width="2" fill="none"/><ellipse cx="${px+5}" cy="${py+1}" rx="5" ry="2.5" fill="#739866" transform="rotate(-25 ${px+5} ${py+1})"/><path d="M${px-5} ${py+17}q-2 6 1 8" stroke="#eee29b" stroke-width="2" fill="none"/></g>`:`<g class="counted-child"><circle cx="${px}" cy="${py+6}" r="6" fill="#e3bb91"/><path d="M${px-8} ${py+26}v-10q8-7 16 0v10Z" fill="${['#6b95b1','#b07d9c','#7da58e'][j%3]}"/><path d="M${px-4} ${py+26}v8m8-8v8" stroke="#6b5966" stroke-width="3"/></g>`;
    }
   }else body+=`<text x="${x+bw/2}" y="116" text-anchor="middle" font-size="50" fill="#ae9e92">?</text>`;
   body+=`<rect x="${x+8}" y="177" width="${bw-16}" height="31" rx="10" fill="${active?C.berry:'#d5cbd3'}"/><text x="${x+bw/2}" y="199" text-anchor="middle" font-size="21" fill="white">${stage===0?'?':active?fmt(one):'?'} ${esc(unit)}</text></g>`;
  }
  const label=stage===0?`${fmt(known)} ${unit}${back?' in '+n+' Teilen':''}`:stage===1?`1 Teil: ${fmt(one)} ${unit}`:`${back?d:n} Teile: ${fmt(back?one*d:one*n)} ${unit}`;
  return `<svg viewBox="0 0 600 270" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${body}<text x="300" y="253" text-anchor="middle" font-size="23" fill="${C.ink}">${esc(label)}</text></svg>`;
 }
 const cols=Math.min(d,5),w=Math.min(62,300/cols),gap=8;
 let b='',rows=Math.ceil(d/cols),h=rows>1?41:61;
 for(let i=0;i<d;i++){
  const active=stage===0?(back?i<n:true):stage===1?i===0:(back?true:i<n);
  const x=180-cols*(w+gap)/2+i%cols*(w+gap),y=36+Math.floor(i/cols)*(h+10);
  b+=R(x,y,w,h,active?C.berry:C.pale,`stroke="${active?'#85435c':'#d8cbdc'}" stroke-width="1"`);
  if((unit==='Birnen'||unit==='Kinder')&&Number.isInteger(one)&&one<=30&&(active||(!back&&stage===0))){
   const columns=unit==='Birnen'?5:4,rows=Math.ceil(one/columns),sz=Math.min(9,(w-12)/columns,Math.max(4,(h-25)/rows));
   for(let q=0;q<one;q++){const px=x+8+(q%columns)*(w-12)/columns,py=y+5+Math.floor(q/columns)*sz;
    b+=unit==='Birnen'?`<path d="M${px+3} ${py+1}c-4 1-4 7 0 7s4-6 0-7Z" fill="#f4dca0"/><path d="M${px+3} ${py+1}v-2" stroke="#d4e9cc"/>`:`<circle cx="${px+3}" cy="${py+2}" r="2" fill="#f4dca0"/><path d="M${px+1} ${py+8}v-3q2-2 4 0v3" fill="#f4dca0"/>`;
   }
  }
  b+=T(x+w/2,y+h-7,stage===0?'?':active?fmt(one):'?',18,active?'white':'#807187');
 }
 const label=stage===0?`${fmt(known)} ${unit}${back?' in '+n+' Teilen':''}`:stage===1?`1 Teil: ${fmt(one)} ${unit}`:`${back?d:n} Teile: ${fmt(back?one*d:one*n)} ${unit}`;
 b+=T(180,159,label,18);return SVG(b,label);
}
function transform(n,d,k,reverse=false){
 const goalN=reverse?n/k:n*k,goalD=reverse?d/k:d*k;
 const chocolate=(num,den,x)=>strip(num,den,x,52).replaceAll(C.berry,'#865342')+Array.from({length:den},(_,i)=>`<path d="M${x+i*140/den+3} 56h${Math.max(1,140/den-6)}v38" stroke="${i<num?'#b47c5c':'#d4c7b6'}" stroke-width="1.5" fill="none"/>`).join('');
 return SVG(T(82,30,'Vorher')+T(278,30,'Nachher')+chocolate(n,d,12)+arrow(164,77)+chocolate(goalN,goalD,208)+T(82,127,n+'/'+d,22)+T(278,127,goalN+'/'+goalD,22)+T(180,163,'Gleich viel Schokolade',17),'Vorher '+n+'/'+d+', nachher '+goalN+'/'+goalD+'. Die gefärbte Fläche bleibt gleich groß.');
}
function bundle(n,d,stage,negative=false){
 let b='',count=Math.ceil(n/d),w=Math.min(95,300/count),gap=9;
 for(let g=0;g<count;g++){
  let x=180-count*(w+gap)/2+g*(w+gap),parts=Math.min(d,n-g*d);
  b+=R(x,37,w,83,'#f0e9dc','stroke="#d2ba92" stroke-width="2"');
  if(d<=5){
   for(let i=0;i<d;i++){
    const cx=x+12+(i%2)*(w-24)/2+(w-24)/4,cy=49+Math.floor(i/2)*23;
    if(i<parts)b+=`<path d="M${cx-9} ${cy+2}h18l-3 12h-12Z" fill="#ce9573" stroke="#a57356"/><path d="M${cx-11} ${cy+2}q-2-7 5-8q5-8 10 0q8 0 6 8Z" fill="${g===count-1&&parts<d?'#e4bc64':'#91654f'}"/><circle cx="${cx-3}" cy="${cy-3}" r="1.5" fill="#493b37"/><circle cx="${cx+5}" cy="${cy}" r="1.5" fill="#493b37"/>`;
    else b+=`<rect x="${cx-10}" y="${cy-6}" width="20" height="20" rx="5" fill="none" stroke="#bfb3a4" stroke-dasharray="3 3"/>`;
   }
  }else for(let i=0;i<d;i++)b+=R(x+5,42+(d-i-1)*72/d,w-10,Math.max(3,72/d-3),i<parts?(g===count-1&&parts<d?C.gold:C.berry):'#fffcf7');
  b+=T(x+w/2,144,parts===d?'1 Ganzes':parts+'/'+d,15);
 }
 return SVG(b+T(180,20,negative?'Das Bild zeigt die Menge ohne Minus.':d<=5?'1 ganze Schachtel = '+d+' Muffins':n+' Stücke · je '+d+' bilden ein Ganzes',15),n+' Stücke in Gruppen mit je '+d+' Plätzen; '+Math.floor(n/d)+' Ganze und '+n%d+' Reststücke.');
}
function compare(a,b,c,d){
 return SVG(T(38,43,a+'/'+b,20)+strip(a,b,78,15,260,44)+T(38,111,c+'/'+d,20)+strip(c,d,78,83,260,44)+T(180,162,'Gleich lange Ganze vergleichen',17),'Gleich lange Bruchstreifen: '+a+'/'+b+' und '+c+'/'+d+'.');
}
function hundred(n){
 let body='',whole=Math.floor(n/100),rest=n%100;
 for(let i=0;i<100;i++)body+=R(18+i%10*13,23+Math.floor(i/10)*13,11,11,i<rest?C.berry:C.pale);
 body+=T(250,66,whole?whole+' Ganzes +':'100 kleine Felder',18)+T(250,100,rest+' Hundertstel',17)+T(250,136,fmt(n/100),28,C.berry);
 return SVG(body,n+' Hundertstel sind '+fmt(n/100)+'. '+(whole?whole+' Ganzes und ':'')+rest+' gefärbte Hundertstel im Raster.');
}
function line(a,b,mark,caption,ticks=8,zoom=false){
 const lo=zoom?Math.min(a,b):Math.floor(Math.min(a,b,Number.isFinite(mark)?mark:a)),hi=zoom?Math.max(a,b):Math.ceil(Math.max(a,b,Number.isFinite(mark)?mark:a)),range=hi-lo||1,X=n=>25+(n-lo)/range*310;
 let body=`<path d="M25 94H337m-9 -6 9 6-9 6" stroke="${C.blue}" stroke-width="3" fill="none"/>`;
 for(let i=0;i<=ticks;i++)body+=`<path d="M${25+i*310/ticks} 88v12" stroke="#b9aabb"/>`;
 body+=T(25,126,fmt(lo),16)+T(335,126,fmt(hi||lo+1),16);
 for(const [v,col,y] of [[a,C.blue,55],[b,C.mint,153]])body+=`<circle cx="${X(v)}" cy="94" r="6" fill="${col}"/>`+T(Math.max(28,Math.min(332,X(v))),y,fmt(v),17,col);
 if(mark!==undefined&&!zoom)body+=`<path d="M${X(mark)} 77v34" stroke="${C.berry}" stroke-width="4"/>`;
 return SVG(body+T(180,24,caption,16),caption+'. '+fmt(a)+' und '+fmt(b)+'.');
}
function unitPicture(from,to,k,divide=false){
 return SVG(R(14,36,130,80,'#e8f0f4')+T(79,68,'1 '+from,23,C.blue)+T(79,98,k+' '+to,18)+arrow(159,76)+R(211,36,135,80,'#f5e4eb')+T(278,70,divide?'größere Einheit':'kleinere Einheit',14)+T(278,100,(divide?'durch ':'mal ')+k,22,C.berry)+T(180,154,'Die Menge bleibt gleich.',17),'1 '+from+' = '+k+' '+to+'. '+(divide?'Teile':'Multipliziere')+' die Zahl mit '+k+'.');
}
function share(n,d,eachN=n,eachD=d){
 let b='';for(let i=0;i<Math.min(d,12);i++){
  let x=30+i%6*59,y=46+Math.floor(i/6)*56;
  b+=`<circle cx="${x}" cy="${y}" r="23" fill="#edf4f6" stroke="#bbd0d8"/><circle cx="${x}" cy="${y}" r="17" fill="#faf2df" stroke="#d6b97a"/>`;
  for(let j=0;j<eachD;j++){
   const a=-Math.PI/2+j*2*Math.PI/eachD,z=a+2*Math.PI/eachD,pt=t=>`${x+15*Math.cos(t)},${y+15*Math.sin(t)}`;
   b+=`<path d="M${x} ${y}L${pt(a)}A15 15 0 ${2*Math.PI/eachD>Math.PI?1:0} 1 ${pt(z)}Z" fill="${j<eachN?'#edbd5d':'#faf2df'}" stroke="#d6b97a" stroke-width=".5"/>`;
   if(j<eachN)b+=`<circle cx="${x+9*Math.cos((a+z)/2)}" cy="${y+9*Math.sin((a+z)/2)}" r="1.6" fill="#b25848"/>`;
  }
  b+=T(x,y+37,eachN+'/'+eachD,13,C.berry);
 }
 return SVG(T(180,18,n+' Pizzen für '+d+' Kinder',18)+b+T(180,166,'Jeder Teller bekommt gleich viel.',16),n+' Pizzen werden gleich auf '+d+' Kinder verteilt. Jeder erhält '+eachN+'/'+eachD+' Pizza.');
}
function cube(stage){
 const x=95,y=69;
 if(stage===0)return SVG(`<path d="M${x} ${y}l64 -38h100l-64 38Z" fill="#e6cbd7" stroke="#a47588"/><path d="M${x+100} ${y}l64 -38v77l-64 38Z" fill="#a6c9ba" stroke="#6c9b89"/>`+R(x,y,100,77,'#f0d59d')+T(145,165,'2 cm',17)+T(270,117,'1,5 cm',16)+T(53,110,'1 cm',16),'Quader: 2 cm lang, 1,5 cm breit und 1 cm hoch.');
 const sizes=[[130,47,'Vorne + hinten','2 × 2 cm²'],[90,47,'Links + rechts','2 × 1,5 cm²'],[130,70,'Oben + unten','2 × 3 cm²']];
 if(stage<=3){let [w,h,label,calc]=sizes[stage-1];return SVG(T(180,24,label,18)+R(35,54,w,h,stage===1?'#f0d59d':stage===2?'#a6c9ba':'#e6cbd7')+R(195,54,w,h,stage===1?'#f0d59d':stage===2?'#a6c9ba':'#e6cbd7')+T(180,159,calc,20),label+': '+calc);}
 return SVG(R(12,56,95,60,'#f0d59d')+T(59,93,'4 cm²',20)+T(119,92,'+',20)+R(135,56,95,60,'#a6c9ba')+T(182,93,'3 cm²',20)+T(241,92,'+',20)+R(256,56,95,60,'#e6cbd7')+T(303,93,'6 cm²',20)+T(180,155,'Alle 6 Seiten: 13 cm²',20),'Die drei Paare von Seitenflächen: 4 plus 3 plus 6 gleich 13 Quadratzentimeter.');
}
const specs={};const add=(topic,ids,fn)=>ids.forEach(id=>specs[topic+':'+id]=fn);
[[2,2,3,60,'Birnen',false],[3,3,4,21,'Kinder',true],[6,5,6,60,'min',false],[8,5,6,18,'Kästchen',false],[9,3,4,12,'Kästchen',true],[13,3,4,80,'l',false]].forEach(([id,n,d,known,unit,back])=>add('brueche',[id],i=>groups({n,d,known,unit,back},Math.min(i,2))));
add('brueche',[1],i=>SVG(Array.from({length:9},(_,j)=>R(111+j%3*47,15+Math.floor(j/3)*45,40,38,i===0?C.blue:j<4?C.berry:C.pale)).join('')+T(180,166,i===0?'9 gleich große Felder':i===1?'4 Felder sind gefärbt':'4 von 9: vier Neuntel',17),'9 gleich große Felder, davon 4 gefärbt.'));
[[1,2,3,4,false],[2,12,16,4,true],[3,18,24,2,true],[4,2,5,4,false],[5,3,4,5,false],[6,3,4,2,false],[8,18,30,6,true]].forEach(([id,n,d,k,rev])=>add('gleichwertig',[id],i=>id===3&&i>0?transform(9,12,3,true):transform(n,d,k,rev)));
[[1,11,4],[2,17,5],[3,12,4],[4,11,4],[5,17,5]].forEach(([id,n,d])=>add('gemischt',[id],i=>bundle(n,d,i,id===4)));
[[1,3,7,5,7],[2,3,4,3,8],[3,2,3,3,4],[4,2,3,4,6]].forEach(([id,a,b,c,d])=>add('vergleichen',[id],()=>compare(a,b,c,d)));
add('vergleichen',[8],()=>compare(4,16,3,10));
[[1,7],[2,75],[3,40],[4,45],[6,120],[8,35],[9,75]].forEach(([id,n])=>add('dezimal',[id],()=>hundred(n)));
[[1,.43,.418],[2,.6,.6],[3,-.7,-.65],[4,.6,.58],[6,.4,.5],[7,.5,.56],[8,1.205,1.25],[10,-.41,-.40]].forEach(([id,a,b])=>add('dezimalvergleich',[id],()=>line(a,b,(a+b)/2,'Links kleiner · rechts größer',10,true)));
add('dezimalvergleich',[2],()=>hundred(60));
[[1,0,1,2/3],[2,0,1,3/4],[3,2,3,11/4],[4,-3,-2,-7/3],[6,1/3,2/3,.5],[8,-.75,.75,-.75]].forEach(([id,a,b,m])=>add('zahlenstrahl',[id],()=>line(a,b,m,id===6?'Gleich weit von beiden Zahlen entfernt.':'Hier liegt der gesuchte Punkt.',{1:6,2:4,3:4,4:3,6:6,8:8}[id])));
add('quotienten',[1],i=>i===0?bundle(18,12,i):bundle(3,2,i));add('quotienten',[2],()=>share(8,12));add('quotienten',[5],()=>unitPicture('km','m',1000));
add('groessen',[1],()=>unitPicture('m','cm',100));add('groessen',[2],()=>unitPicture('kg','g',1000));add('groessen',[3],()=>unitPicture('kg','g',1000,true));
add('groessen',[4],i=>i<2?unitPicture('m²','dm²',100):unitPicture('dm²','cm²',100));add('groessen',[5],i=>i<2?unitPicture('m³','dm³',1000):unitPicture('dm³','cm³',1000));
add('groessen',[7],()=>unitPicture('€','ct',100,true));
add('groessen',[12],i=>i<3?SVG(`<circle cx="180" cy="85" r="58" fill="#ecf2f3" stroke="${C.blue}" stroke-width="3"/>`+Array.from({length:12},(_,j)=>{let a=j*Math.PI/6;return `<circle cx="${180+49*Math.sin(a)}" cy="${85-49*Math.cos(a)}" r="2" fill="${C.blue}"/>`}).join('')+T(180,81,'1 Stunde',17)+T(180,106,'60 Minuten',18)+T(180,164,'0,05 h = 3 min',17),'Eine Stunde hat 60 Minuten. 0,05 Stunden sind 3 Minuten.'):groups({n:5,d:6,known:60,unit:'s',back:false},i===3?1:2));
add('groessen',[14],cube);
function attach(row,picture,index){
 const frame=document.createElement('figure');frame.className='rechenbild';frame.innerHTML=picture;
 row.classList.add('illustrated-step');const math=row.querySelector('.school-calculation');
 if(math){const badge=document.createElement('span');badge.className='picture-step';badge.textContent=String(index+1);badge.setAttribute('aria-label','Rechenzeile '+(index+1));math.prepend(badge);}
 row.append(frame);
}
// The course reader asks for exactly one picture for the current school step.
// Preview pictures contain only values supplied by the task.
const amountCases={2:{n:2,d:3,known:60,unit:'Birnen',back:false},3:{n:3,d:4,known:21,unit:'Kinder',back:true},6:{n:5,d:6,known:60,unit:'min',back:false},8:{n:5,d:6,known:18,unit:'Kästchen',back:false},9:{n:3,d:4,known:12,unit:'Kästchen',back:true},13:{n:3,d:4,known:80,unit:'l',back:false}};
const basicTransform={1:[2,3],2:[12,16],3:[18,24],4:[2,5],5:[3,4],6:[3,4],7:[12,18],8:[18,30]};
const fractionValue=p=>p.n/p.d;
const fractionText=p=>fmt(p.n)+'/'+fmt(p.d);
function fractionPicture(p,label='Dieser Bruch ist gegeben.'){
 if(p.n>=0&&p.n<=p.d&&p.d<=50)return SVG(T(180,29,label,16)+strip(p.n,p.d,30,54,300,66)+T(180,158,fractionText(p),25),label+' '+fractionText(p));
 return givenPicture({givenTokens:[fractionText(p)]},'Bruch');
}
function beforeAfter(p,q){
 if(q&&typeof q.n==='number'&&typeof q.d==='number'&&Math.abs(fractionValue(p)-fractionValue(q))>1e-8)return fractionLine(p,q);
 if(p.n<0||p.n>p.d||(q&&typeof q.n==='number'&&typeof q.d==='number'&&(q.n<0||q.n>q.d)))return fractionLine(p,q&&typeof q.d==='number'?q:p);
 const qn=q?.n??'□',qd=q?.d??'□',right=q&&typeof q.n==='number'&&typeof q.d==='number'?strip(q.n,q.d,208,52):q&&typeof q.d==='number'?strip(p.n*q.d/p.d,q.d,208,52):R(208,52,140,48,C.pale)+T(278,85,'?',25);
 return SVG(T(82,28,'Vorher',17)+T(278,28,'Nachher',17)+strip(p.n,p.d,12,52)+arrow(164,76)+right+T(82,130,fractionText(p),23)+T(278,130,fmtOrBox(qn)+'/'+fmtOrBox(qd),23)+T(180,165,'Die gefärbte Menge bleibt gleich.',15),`Vorher ${fractionText(p)}. Nachher ${fmtOrBox(qn)}/${fmtOrBox(qd)}. Gleiche Menge.`);
}
function schoolFraction(x,y,p,size=20){
 const n=fmt(p.n),d=fmt(p.d),w=Math.max(n.length,d.length)*size*.33+8;
 return T(x,y,n,size,C.berry)+`<path d="M${x-w} ${y+8}H${x+w}" stroke="${C.ink}" stroke-width="1.5"/>`+T(x,y+31,d,size,C.blue);
}
function chapterKnown(p){
 if(p.n<0)return SVG(T(180,28,'Dieser Bruch ist gegeben.',17)+schoolFraction(180,78,p,27)+T(180,165,'Das Minus gehört zum Bruch.',16),'Gegeben: '+fractionText(p));
 return SVG(T(180,28,'Das ist gegeben.',18)+strip(p.n,p.d,30,49,300,59)+schoolFraction(180,137,p,20),'Gegeben: '+fractionText(p)+'. '+p.n+' von '+p.d+' Teilen sind gefärbt.');
}
function chapterFigure(v){
 const p=v.from,q=v.to,phase=v.phase;
 if(phase==='factor'){
  const target=v.targetDenominator,k=target/p.d;
  let body=T(180,22,'Vorher: '+p.d+' große Stücke',17)+strip(p.n,p.d,30,34,300,36)+T(180,96,'Ziel: '+target+' kleine Stücke',17)+strip(p.n*k,target,30,108,300,36);
  for(let j=0;j<=p.d;j++){const x=30+j*300/p.d;body+=`<path d="M${x} 108v36" stroke="${C.blue}" stroke-width="2.5"/>`;}
  body+=T(180,172,target+' : '+p.d+' = '+k+' → jedes Stück in '+k+' Teile',16);
  return SVG(body,'Malzahl finden: '+target+' : '+p.d+' = '+k+'. Jedes alte Stück wird in '+k+' kleine Stücke geteilt.');
 }
 if(phase==='known'||!q)return chapterKnown(p);
 if(p.n<0&&(phase==='color'||phase==='all')){
  const k=q.d>p.d?q.d/p.d:p.d/q.d,sign=q.d>p.d?' · ':' : ',top=phase==='color',num=v=>fmt(v).replace('-', '−');
  return SVG(T(180,30,top?'Oben rechnen':'Unten rechnen',19)+T(180,95,num(top?p.n:p.d)+sign+k+' = '+num(top?q.n:q.d),30)+T(180,162,top?'Das Minus bleibt stehen.':'Dieselbe Rechenzahl wie oben.',17),'Ein Rechenschritt: '+num(top?p.n:p.d)+sign+k+' = '+num(top?q.n:q.d));
 }
 if(p.n<0){
  const lo=Math.floor(p.n/p.d),hi=Math.ceil(p.n/p.d),span=hi-lo||1,x=25+(p.n/p.d-lo)/span*310;
  return SVG(schoolFraction(90,27,p,18)+T(180,45,'=',23)+schoolFraction(270,27,q,18)+`<path d="M25 110H335M25 104v12M335 104v12" stroke="${C.blue}" stroke-width="3"/><circle cx="${x}" cy="110" r="7" fill="${C.berry}"/>`+T(25,143,fmt(lo),16)+T(335,143,fmt(lo+span),16)+T(180,172,'Beide Brüche: derselbe Punkt.',16),'Vorher '+fractionText(p)+'. Nachher '+fractionText(q)+'. Beide Brüche liegen am selben Punkt.');
 }
 if(p.n>p.d)return beforeAfter(p,q);
 if(phase==='done'){
  return SVG(T(90,25,'Vorher',17)+T(270,25,'Nachher',17)+strip(p.n,p.d,20,43,140,49)+strip(q.n,q.d,200,43,140,49)+arrow(165,67)+schoolFraction(90,118,p,19)+schoolFraction(270,118,q,19)+T(180,171,'Gleiche Fläche. Andere Einteilung.',15),'Vorher '+fractionText(p)+'. Nachher '+fractionText(q)+'. Die gefärbte Fläche bleibt gleich.');
 }
 const expanding=q.d>p.d,k=expanding?q.d/p.d:p.d/q.d,x=30,y=45,w=300,h=63;
 let b=T(180,25,phase==='color'?'Nur die bunten Stücke':'Jetzt alle Stücke',18)+strip(p.n,p.d,x,y,w,h);
 if(expanding){
  const parts=phase==='color'?p.n:p.d;
  for(let piece=0;piece<parts;piece++)for(let j=1;j<k;j++){const cx=x+(piece+j/k)*w/p.d;b+=`<path d="M${cx} ${y}v${h}" stroke="#fffdf8" stroke-width="2"/>`;}
  for(let j=0;j<=p.d;j++){const cx=x+j*w/p.d;b+=`<path d="M${cx} ${y}v${h}" stroke="${C.blue}" stroke-width="2"/>`;}
  b+=T(180,141,(phase==='color'?p.n:p.d)+' · '+k+' = '+(phase==='color'?q.n:q.d)+(phase==='color'?' bunte Teile':' Teile insgesamt'),20)+T(180,170,'Jedes Stück wird in '+k+' Teile geteilt.',15);
 }else{
  const groups=phase==='color'?q.n:q.d;
  for(let j=0;j<groups;j++)b+=`<rect x="${x+j*k*w/p.d+2}" y="${y-3}" width="${k*w/p.d-4}" height="${h+6}" rx="4" fill="none" stroke="${C.gold}" stroke-width="3"/>`;
  b+=T(180,141,(phase==='color'?p.n:p.d)+' : '+k+' = '+groups+(phase==='color'?' bunte Gruppen':' Gruppen insgesamt'),20)+T(180,170,'Je '+k+' Stücke bilden eine Gruppe.',15);
 }
 return SVG(b,(expanding?'Feiner teilen: ':'Gruppen bilden: ')+(phase==='color'?'bunte Stücke':'alle Stücke')+'. '+(phase==='color'?p.n:p.d)+(expanding?' mal ':' geteilt durch ')+k+' ergibt '+(phase==='color'?q.n:q.d)+'.');
}
function fmtOrBox(v){return typeof v==='number'?fmt(v):v;}
function loosePieces(n,d){
 let b='';const cols=Math.min(n,8),w=Math.min(32,300/cols),rows=Math.ceil(n/cols);
 for(let i=0;i<n;i++)b+=R(25+i%cols*(w+7),35+Math.floor(i/cols)*Math.min(35,105/rows),w,25,C.berry);
 return SVG(T(180,20,n+' einzelne Stücke',18)+b+T(180,165,'Jedes Stück ist 1/'+d+' eines Ganzen.',16),n+' einzelne Stücke. Je '+d+' bilden ein Ganzes.');
}
function givenPicture(r,label='Das weißt du schon'){
 const values=(r.givenTokens||[]).slice(0,4);let b=T(180,23,label,17);
 values.forEach((s,i)=>{const x=16+i%2*170,y=40+Math.floor(i/2)*61;b+=R(x,y,158,49,i===0?'#f3e1e9':'#e8eff4')+T(x+79,y+31,s,19);});
 return SVG(b,label+': '+values.join('; '));
}
function fractionLine(a,b,mark){
 const av=fractionValue(a),bv=fractionValue(b),lo=Math.floor(Math.min(av,bv)),hi=Math.ceil(Math.max(av,bv)),span=hi-lo||1,X=v=>25+(v-lo)/span*310;
 let bdy=`<path d="M25 92H337m-8 -6 8 6-8 6" fill="none" stroke="${C.blue}" stroke-width="3"/>`+T(25,127,fmt(lo),15)+T(335,127,fmt(lo+span),15);
 for(const [p,y,col] of [[a,43,C.blue],[b,158,C.berry]])bdy+=`<circle cx="${X(fractionValue(p))}" cy="92" r="7" fill="${col}"/>`+T(Math.max(30,Math.min(330,X(fractionValue(p)))),y,fractionText(p),18,col);
 if(mark)bdy+=`<path d="M${X(fractionValue(mark))} 75v33" stroke="${C.gold}" stroke-width="5"/>`;
 return SVG(bdy,'Zahlenstrahl mit '+fractionText(a)+' und '+fractionText(b)+(mark?'. Markierung bei '+fractionText(mark):''));
}
function areaPicture(stage){
 let b='';const cell=48;
 if(stage===0)return SVG(R(120,40,100,100,'#d6b8ca')+T(170,26,'0,5 cm',17)+T(275,98,'0,5 cm',17)+T(180,167,'1 Kästchen = 0,25 cm²',19),'Ein Kästchen: 0,5 cm mal 0,5 cm = 0,25 Quadratzentimeter.');
 for(let i=0;i<(stage===1?4:8);i++){const x=30+i%4*77,y=34+Math.floor(i/4)*55;b+=R(x,y,cell,cell,C.pale);b+=stage===1?`<path d="M${x} ${y}h${cell}v${cell}Z" fill="${C.berry}"/>`:R(x,y,cell,cell,C.berry);}
 return SVG(b+T(180,165,stage===1?'4 halbe Kästchen = 2 ganze':stage===2?'Zusammen: 8 ganze Kästchen':'8 · 0,25 cm² = 2 cm²',17),'Kästchenfläche: '+(stage===1?'vier halbe ergeben zwei ganze':stage===2?'acht ganze Kästchen':'zwei Quadratzentimeter'));
}
function fieldPicture(stage){
 let s='';for(let j=0;j<9;j++){
  const x=111+j%3*47,y=15+Math.floor(j/3)*45,ink=stage===0?C.blue:stage===1&&j<4?C.gold:'#cbbdcb';
  s+=`<rect x="${x}" y="${y}" width="40" height="38" rx="7" fill="${j<4?C.berry:C.pale}" stroke="${ink}" stroke-width="${stage===0||stage===1&&j<4?3:1}" ${j<4?`data-count-field="${j}" role="button" tabindex="0" aria-label="Gefärbtes Feld ${j+1} zählen" aria-pressed="false"`:''}/>`;
 }
 const caption=stage<0?'9 Felder · 4 sind gefärbt':stage===0?'Alle Felder zählen: 9':stage===1?'Gefärbte Felder zählen: 4':'4 von 9: vier Neuntel';
 return SVG(s+T(180,166,caption,17),caption);
}
function coursePicture(topic,id,index,r){
 const preview=index<0,step=preview?null:r.steps[index],ps=step?.pairs||[],initial=r.givenPairs||[];
 if(topic==='gleichwertig'){
  if(preview&&initial.length===2)return SVG(T(90,25,'Erster Bruch',16)+T(270,25,'Zweiter Bruch',16)+schoolFraction(90,76,initial[0],25)+schoolFraction(270,76,initial[1],25)+T(180,165,id===7?'Ziel bei beiden: Nenner 30.':'Vergleiche diese beiden Brüche.',16),'Gegeben: '+fractionText(initial[0])+' und '+fractionText(initial[1]));
  return preview?chapterKnown(initial[0]):chapterFigure(step.chapterVisual);
 }
 if(topic==='brueche'&&id===8){
  let b='';for(let g=0;g<6;g++)for(let row=0;row<3;row++)b+=R(36+g*48,18+row*40,44,36,!preview&&index===2&&g<5?C.berry:C.pale);
  return SVG(b+T(180,165,preview?'18 Kästchen':index===0?'Das ganze Rechteck':index===1?'6 Gruppen mit je 3 Kästchen':'5 Gruppen mit je 3 Kästchen',17),'Rechteck aus 18 gleich großen Kästchen in sechs Spalten mit je drei Kästchen.');
 }
 if(topic==='brueche'&&amountCases[id])return groups(amountCases[id],preview?0:Math.min(index,2));
 if(topic==='brueche'&&id===1)return fieldPicture(index);
 if(topic==='gleichwertig'){
  const pair=basicTransform[id];if(pair){const p={n:pair[0],d:pair[1]};
   if(preview)return fractionPicture(p,'Diesen Anteil veränderst du.');
   if(ps.length>=2){
    const a=ps[0],b=ps[ps.length-1],k=b.d/a.d,divide=a.d/b.d;
    if(a.n>=0&&b.n>=0&&a.n<=a.d&&b.n<=b.d&&Math.abs(fractionValue(a)-fractionValue(b))<1e-8){
     if(Number.isInteger(k)&&k>=1)return transform(a.n,a.d,k);
     if(Number.isInteger(divide)&&divide>=1)return transform(a.n,a.d,divide,true);
    }
    return beforeAfter(a,b);
   }
   const nums=(step.plain||step.text).match(/\d+/g)||[];
   if(id===4&&nums.length)return beforeAfter(p,{d:20});
   if(id===5&&nums.length)return beforeAfter(p,{n:15});
   return fractionPicture(p,'Suche eine Zahl zum Teilen.');
  }
 }
 if(topic==='gemischt'){
  const nd={1:[11,4],2:[17,5],3:[12,4],4:[11,4],5:[17,5]}[id];
  if(preview)return loosePieces(...nd);
  return bundle(nd[0],nd[1],index,id===4);
 }
 if(topic==='vergleichen'&&initial.length>=2&&id!==8){
  let a=initial[0],b=initial[1];
  if(a.n<0||b.n<0)return fractionLine(a,b);
  if(!preview)for(let i=0;i<=index;i++){let row=r.steps[i].pairs;if(row.length>=2){let from=row[0],to=row[row.length-1];if(Math.abs(fractionValue(from)-fractionValue(to))<1e-8){if(Math.abs(fractionValue(from)-fractionValue(a))<1e-8)a=to;else if(Math.abs(fractionValue(from)-fractionValue(b))<1e-8)b=to;}}}
  if(id===7&&!preview){let middle;for(let i=0;i<=index;i++)if(r.steps[i].pairs.length>=3)middle=r.steps[i].pairs[1];return fractionLine(a,b,middle);}
  if(id===10&&!preview&&ps.length>=3)return betweenPicture(ps);
  if(a.n<=a.d&&b.n<=b.d)return compare(a.n,a.d,b.n,b.d);
  return fractionLine(a,b);
 }
 if(topic==='dezimal'){
  if(preview)return initial[0]?fractionPicture(initial[0]):givenPicture(r,'Diese Kommazahl ist gegeben.');
  const decimal=(step.plain||step.text).match(/−?\d+,\d+/);
  if(decimal){const value=Number(decimal[0].replace('−','-').replace(',','.'));if(value>=0&&value<2&&Number.isInteger(Math.round(value*1e6)/10000))return hundred(Math.round(value*100));}
  if(ps.length)return beforeAfter(ps[0],ps[ps.length-1]);
 }
 if(topic==='zahlenstrahl'){
  if(id===1)return line(0,1,4/6,'Zähle die Lücken von 0 bis zum Punkt.',6);
  if(id===2)return preview||index===0?line(0,1,undefined,'Von 0 bis 1: vier gleiche Lücken.',4):line(0,1,3/4,'Drei Lücken nach rechts.',4);
  if(id===3)return preview?loosePieces(11,4):line(2,3,11/4,'Zwei Ganze und noch drei Viertel.',4);
  if(id===4)return preview?givenPicture(r):line(-3,-2,-7/3,'Links von 0.',3);
  if(id===6)return fractionLine({n:1,d:3},{n:2,d:3},!preview&&index===r.steps.length-1?{n:1,d:2}:null);
 }
 if(topic==='dezimalvergleich'){
  const nums=(r.questionPlain||'').match(/−?\d+,\d+/g)||[];
  if(id===2)return preview?givenPicture(r):hundred(60);
  if(nums.length>=2){let a=Number(nums[0].replace('−','-').replace(',','.')),b=Number(nums[1].replace('−','-').replace(',','.'));
   const middle=id===10&&!preview&&index===r.steps.length-1;
   return decimalLine(a,b,middle?(a+b)/2:null);
  }
 }
 if(topic==='quotienten'&&id===2){if(preview)return givenPicture(r,'8 Pizzen für 12 Kinder');const per=ps[ps.length-1]||{n:8,d:12};return share(8,12,per.n,per.d);}
 if(topic==='groessen'){
  if(id===13&&!preview)return areaPicture(index);
  if(id===14)return cube(preview?0:index);
  if(id===1)return unitPicture('m','cm',100);
  if(id===2||id===3)return unitPicture('kg','g',1000,id===3);
  if(id===4&&!preview)return index<2?unitPicture('m²','dm²',100):unitPicture('dm²','cm²',100);
  if(id===5&&!preview)return index<2?unitPicture('m³','dm³',1000):unitPicture('dm³','cm³',1000);
 }
 if(!preview&&ps.length===1&&ps[0].n>=0&&ps[0].n<=ps[0].d&&ps[0].d<=40)return fractionPicture(ps[0],'Dieser Anteil gehört zur Rechnung.');
 if(!preview&&ps.length>=2)return beforeAfter(ps[0],ps[ps.length-1]);
 return givenPicture(preview?r:{givenTokens:step.tokens||[]},preview?'Das ist gegeben.':'Das zeigt die Rechnung.');
}
function betweenPicture(points){
 const lo=Math.min(...points.map(fractionValue)),hi=Math.max(...points.map(fractionValue)),X=p=>25+(fractionValue(p)-lo)/(hi-lo||1)*310;
 let s=`<path d="M25 88H335" stroke="${C.blue}" stroke-width="3"/>`;
 points.forEach((p,i)=>{const x=X(p),edge=i===0||i===points.length-1;s+=`<circle cx="${x}" cy="88" r="6" fill="${edge?C.blue:C.berry}"/>`+T(x,i%2?143:48,fractionText(p),16);});
 return SVG(s,'Zahlen zwischen den Grenzen: '+points.map(fractionText).join('; '));
}
function decimalLine(a,b,middle){
 const lo=Math.min(a,b),hi=Math.max(a,b),span=hi-lo||.1,X=n=>36+(n-lo)/span*288;
 let s=`<path d="M36 90H330m-7-6 7 6-7 6" stroke="${C.blue}" stroke-width="3" fill="none"/>`;
 for(const [v,y,c] of [[a,48,C.blue],[b,143,C.berry]])s+=`<circle cx="${X(v)}" cy="90" r="7" fill="${c}"/>`+T(X(v),y,fmt(v),18,c);
 if(middle!==null)s+=`<path d="M${X(middle)} 72v36" stroke="${C.gold}" stroke-width="5"/>`+T(180,167,fmt(middle),20);
 return SVG(s,(middle===null?'Die beiden Zahlen auf dem Zahlenstrahl: ':'Die Mitte ist '+fmt(middle)+'. ')+fmt(a)+' und '+fmt(b));
}
window.MerkheftPictures={render:coursePicture,learning:(topic,id,step,r)=>topic==='gleichwertig'?chapterFigure(step.chapterVisual):step.visual?beforeAfter(step.visual.from,step.visual.to):coursePicture(topic,id,step.source,r)};
const topic=document.body.dataset.topic;
document.querySelectorAll('.case').forEach(card=>{
 const id=Number(card.id.slice(5)),draw=specs[topic+':'+id];if(!draw)return;
 card.classList.add('has-rechenbilder');card.querySelectorAll('.work-steps>li').forEach((row,i)=>attach(row,draw(i),i));
 // These are now beside the exact calculation, so the separate picture is redundant.
 card.querySelector('.linked-picture')?.remove();
});
const quickMap={brueche:[1,2,3],gleichwertig:[1,2,4],gemischt:[1,2,4],zahlenstrahl:[1,4,6],quotienten:[1,2,3],vergleichen:[1,2,3],dezimal:[2,4,6],dezimalvergleich:[1,2,3],groessen:[1,12,14]};
document.querySelectorAll('.quick-example').forEach((card,i)=>{
 const draw=specs[topic+':'+quickMap[topic]?.[i]];if(!draw)return;
 card.querySelector('.example-visual')?.remove();card.querySelectorAll('.quick-calculation>li').forEach((row,j)=>attach(row,draw(j),j));
});
})();
