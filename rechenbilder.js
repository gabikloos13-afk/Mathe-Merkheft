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
 for(let i=1;i<d;i++)b+=`<path d="M${x+i*w/d} ${y}v${h}" stroke="#fffcf7" stroke-width="2"/>`;
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
 const lo=zoom?Math.min(a,b):Math.floor(Math.min(a,b,mark)),hi=zoom?Math.max(a,b):Math.ceil(Math.max(a,b,mark)),range=hi-lo||1,X=n=>25+(n-lo)/range*310;
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
function share(n,d){
 let b='';for(let i=0;i<Math.min(d,12);i++){
  let x=30+i%6*59,y=46+Math.floor(i/6)*56;
  b+=`<circle cx="${x}" cy="${y}" r="23" fill="#edf4f6" stroke="#bbd0d8"/><circle cx="${x}" cy="${y}" r="17" fill="#faf2df" stroke="#d6b97a"/>`;
  for(let j=0;j<d;j++){
   const a=-Math.PI/2+j*2*Math.PI/d,z=a+2*Math.PI/d,pt=t=>`${x+15*Math.cos(t)},${y+15*Math.sin(t)}`;
   b+=`<path d="M${x} ${y}L${pt(a)}A15 15 0 ${2*Math.PI/d>Math.PI?1:0} 1 ${pt(z)}Z" fill="${j<n?'#edbd5d':'#faf2df'}" stroke="#d6b97a" stroke-width=".5"/>`;
   if(j<n)b+=`<circle cx="${x+9*Math.cos((a+z)/2)}" cy="${y+9*Math.sin((a+z)/2)}" r="1.6" fill="#b25848"/>`;
  }
  b+=T(x,y+37,n+'/'+d,13,C.berry);
 }
 return SVG(T(180,18,n+' Pizzen für '+d+' Kinder',18)+b+T(180,166,'Jeder Teller bekommt gleich viel.',16),n+' Pizzen werden gleich auf '+d+' Kinder verteilt. Jeder erhält '+n+'/'+d+' Pizza.');
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
