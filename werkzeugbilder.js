'use strict';
(()=>{
const c={ink:'#513b62',purple:'#a585c4',pink:'#e6b3c3',mint:'#a4cbbf',blue:'#71a9bc',gold:'#edba58',light:'#eee7f6'};
const box=(x,y,w,h,color,rx=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}"/>`;
const circle=(x,y,r,color)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const line=(x,y,X,Y,color=c.ink,width=2)=>`<path d="M${x} ${y}L${X} ${Y}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const text=(x,y,s)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="${c.ink}">${s}</text>`;
const strip=(y,d,n,color)=>box(28,y,184,26,'#fffdf8')+Array.from({length:d},(_,i)=>box(28+i*184/d,y,184/d-2,26,i<n?color:'#e7e1ed',2)).join('');
function art(topic){let b='';
 if(topic==='brueche'){
  b=circle(120,77,65,'white')+circle(120,75,58,'#d69a4c');
  for(let i=0;i<8;i++){let a=-Math.PI/2+i*Math.PI/4,z=a+Math.PI/4;const p=t=>`${120+53*Math.cos(t)},${75+53*Math.sin(t)}`;b+=`<path d="M120 75L${p(a)}A53 53 0 0 1 ${p(z)}Z" fill="${i<3?'#f6ce72':'#eee7f6'}" stroke="#fff9eb" stroke-width="2"/>`;if(i<3){let m=a+Math.PI/8;b+=circle(120+34*Math.cos(m),75+34*Math.sin(m),7,'#c95b50')}}
  b+=text(201,123,'3/8');
 }
 if(topic==='gleichwertig')b=strip(21,3,2,'#895442')+strip(62,6,4,'#895442')+strip(103,12,8,'#895442')+line(150,16,150,134,c.gold,2);
 if(topic==='gemischt'){
  for(let g=0;g<3;g++){b+=box(12+g*77,38,68,76,'white',12);for(let j=0;j<4;j++)b+=circle(29+g*77+j%2*32,59+Math.floor(j/2)*32,13,g<2||j<3?c.purple:'#eee7f6');}b+=text(120,141,'2 Ganze + 3/4');
 }
 if(topic==='zahlenstrahl'){
  b=box(12,64,216,28,c.light,14)+line(18,78,222,78);for(let i=0;i<9;i++)b+=line(20+i*25,70,20+i*25,86);b+=circle(145,78,10,c.ink)+box(122,22,46,31,c.gold,10)+text(145,44,'5/4')+text(20,116,'0')+text(120,116,'1')+text(220,116,'2');
 }
 if(topic==='quotienten'){
  for(let i=0;i<12;i++)b+=circle(65+i%6*22,20+Math.floor(i/6)*22,8,c.purple);
  for(let g=0;g<3;g++){b+=box(14+g*78,78,62,51,'white',12);for(let i=0;i<4;i++)b+=circle(32+g*78+i%2*25,94+Math.floor(i/2)*20,7,c.blue)}
  b+=line(120,49,120,69,c.ink,3);
 }
 if(topic==='vergleichen')b=strip(34,12,8,c.purple)+strip(91,12,9,c.blue)+line(151,25,151,128,c.gold,2)+text(120,18,'2/3')+text(120,83,'3/4');
 if(topic==='dezimal'){
  b=box(12,29,86,95,'white',12);for(let i=0;i<10;i++)b+=box(24+i%5*14,45+Math.floor(i/5)*27,10,18,c.purple,2);b+=line(108,75,141,75,c.ink,3)+`<path d="M133 68l9 7-9 7" fill="none" stroke="${c.ink}" stroke-width="3"/>`+box(157,27,57,99,c.blue,8);for(let i=1;i<10;i++)b+=line(160,27+i*9.9,211,27+i*9.9,'white',1);b+=text(55,145,'10 × 0,01')+text(185,145,'0,1');
 }
 if(topic==='dezimalvergleich'){
  b=box(17,37,206,73,'white',15)+text(96,67,'0 , 4 3 0')+text(96,95,'0 , 4 1 8')+circle(151,74,35,c.gold)+circle(151,74,28,'#fffaf1')+text(151,69,'3')+text(151,95,'1')+line(176,101,202,128,c.ink,12);
 }
 if(topic==='groessen'){
  b=`<path d="M64 52l52-34 70 23-52 34Z" fill="${c.mint}"/><path d="M64 52l70 23v65l-70-24Z" fill="${c.blue}"/><path d="M134 75l52-34v65l-52 34Z" fill="#698baf"/>`;
  for(let i=1;i<5;i++)b+=line(64,52+i*13,134,75+i*13,'#d8f1ed',1)+line(64+i*14,52+i*4.6,64+i*14,117+i*4.6,'#d8f1ed',1);
  b+=`<path d="M64 84l52-34 70 23-52 34Z" fill="${c.gold}" opacity=".9"/>`;
 }
 return `<svg viewBox="0 0 240 160" aria-hidden="true" focusable="false">${b}</svg>`;
}
function decorate(root=document){root.querySelectorAll('[data-tool-art]').forEach(el=>{if(!el.children.length)el.innerHTML=art(el.dataset.toolArt)})}
window.MerkheftArt={decorate};decorate();
})();
