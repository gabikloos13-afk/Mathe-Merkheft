'use strict';
(function decimalModule(){
 const C={ink:'#493b50',berry:'#98536e',blue:'#497e99',gold:'#d8a449',pale:'#eee8f0'};
 const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 const fmt=n=>Number(n).toLocaleString('de-DE',{maximumFractionDigits:5});
 const T=(x,y,s,size=17,color=C.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${esc(s)}</text>`;
 const R=(x,y,w,h,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${color}"/>`;
 const SVG=(body,label)=>`<svg viewBox="0 0 360 180" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${R(0,0,360,180,'#fffcf7')}${body}</svg>`;
 const fraction=p=>`${p.n<0?'−':''}${Math.abs(p.n)}/${p.d}`;
 function given(lines,label='Das ist gegeben'){
  let b=T(180,24,label,18);
  for(let i=0;i<lines.length;i++){let y=44+i*36;b+=R(16,y,328,32,i%2===0?'#f4e7ec':'#eaf2f4')+T(180,y+23,lines[i],20);}
  return SVG(b,label+': '+lines.join('; '));
 }
 function strip(n,d,x,y,width=138,height=39){
  let s=R(x,y,width,height,C.pale)+`<rect x="${x}" y="${y}" width="${width*n/d}" height="${height}" rx="4" fill="${C.berry}"/>`;
  if(d<=40)for(let j=1;j<d;j++)s+=`<path d="M${x+j*width/d} ${y}v${height}" stroke="#fffcf7" stroke-width="1.4"/>`;
  return s;
 }
 function fractionPicture(p,label='Dieser Bruch ist gegeben'){
  let b=T(180,24,label,16);
  if(p.n>=0&&p.n<=p.d)b+=strip(p.n,p.d,30,51,300,65);
  else b+=R(80,49,200,68,C.pale);
  b+=T(180,149,fraction(p),27,C.berry);
  return SVG(b,label+'. '+fraction(p)+'.');
 }
 function pair(a,b,heading='Gleich viel, anders eingeteilt'){
  const proper=[a,b].every(p=>p.n>=0&&p.n<=p.d);
  let out=T(180,23,heading,15);
  if(proper)out+=strip(a.n,a.d,17,46)+strip(b.n,b.d,203,46);
  else out+=R(17,46,138,39,C.pale)+R(203,46,138,39,C.pale);
  out+=T(85,111,fraction(a),21)+T(273,111,fraction(b),21)+T(180,150,'Gleicher Wert',19,C.blue);
  return SVG(out,'Brüche '+fraction(a)+' und '+fraction(b)+' sind gleich viel.');
 }
 function hundred(n,reveal=false,label=''){
  const count=Math.max(0,Math.min(200,n)),twice=count>100;
  let b=T(180,18,'Ein Ganzes sind 100 Hundertstel',16);
  for(let g=0;g<(twice?2:1);g++){
   const x=twice?42+g*169:123,filled=Math.max(0,Math.min(100,count-100*g));
   for(let i=0;i<100;i++)b+=`<rect x="${x+(i%10)*11}" y="${33+Math.floor(i/10)*11}" width="10" height="10" rx="1" fill="${i<filled?C.berry:C.pale}" stroke="#fffcf7" stroke-width=".4"/>`;
   b+=T(x+54,157,twice&&g===0?'1 Ganzes':twice?filled/10+' Zehntel':filled+' Hundertstel',13);
  }
  b+=T(180,175,reveal?(label||count+'/100 = '+fmt(count/100)):'Welche Kommazahl passt?',14,C.blue);
  return SVG(b,count+' Hundertstel im '+(twice?'zwei':'einem')+' Hunderterraster.'+(reveal?' Dezimalwert '+fmt(count/100)+'.':''));
 }
 function tenths(n,reveal=false,label=''){
  const twice=n>10,x=twice?28:65,w=twice?130:230;
  let b=T(180,21,'Ein Ganzes sind 10 Zehntel',16);
  for(let group=0;group<(twice?2:1);group++){
   const xx=x+group*(w+24),filled=Math.max(0,Math.min(10,n-10*group));
   for(let i=0;i<10;i++)b+=`<rect x="${xx+i*w/10}" y="48" width="${w/10-.8}" height="62" rx="1" fill="${i<filled?C.berry:C.pale}"/>`;
   b+=T(xx+w/2,138,filled+'/10',17);
  }
  b+=T(180,170,reveal?(label||n+'/10 = '+fmt(n/10)):'Zehntel zählen',18,C.blue);
  return SVG(b,n+' von '+(twice?20:10)+' Zehnteln markiert.'+(reveal?' Dezimalwert '+fmt(n/10)+'.':''));
 }
 function position(decimal){
  const parts=decimal.replace('−','').split(','),digits=parts[1]||'',names=['Zehntel','Hundertstel','Tausendstel'],w=300/(digits.length+1);
  let b=T(180,24,'Welche Stelle ist gemeint?',17);
  for(let i=0;i<=digits.length;i++){const x=30+i*w;
   b+=R(x,48,w-5,83,i===0?'#eaf2f4':'#f5e8ee')+T(x+(w-5)/2,75,i===0?'Ganze':names[i-1],13)+T(x+(w-5)/2,115,i===0?parts[0]:digits[i-1],29,C.berry);
  }
  b+=T(180,162,'Stellenwert beachten',16);
  return SVG(b,'Stellenwerttafel zu '+decimal+'.');
 }
 function target(p,targetDen){
  const k=targetDen/p.d;let b=T(180,24,'Ein gemeinsamer Schritt: erweitern',16);
  b+=strip(p.n,p.d,18,48)+strip(p.n*k,targetDen,204,48);
  b+=T(87,113,fraction(p),20)+T(273,113,'□/'+targetDen,20);
  b+=T(180,160,p.d+' · '+k+' = '+targetDen,19,C.blue);
  return SVG(b,'Aus '+p.d+' Teilen werden '+targetDen+' Teile. Der Zähler wird noch gesucht.');
 }
 function recurring(n,d,phase){
  const repeating=d===3?'3':'6',number=d===3?'0,333…':'0,1666…';
  let b=T(180,26,n+' : '+d+' = '+number,24,C.berry)+R(22,45,316,92,C.pale);
  b+=T(180,77,d===3?'10 : 3 = 3 Rest 1':'10 : 6 = 1 Rest 4',18);
  b+=T(180,113,d===3?'Nochmals 10 : 3 = 3 Rest 1':'40 : 6 = 6 Rest 4',17);
  b+=T(180,162,phase===0?'Der Rest verschwindet nicht.':'Die '+repeating+' wiederholt sich.',16,C.blue);
  return SVG(b,n+'/'+d+' ergibt '+number+'. Die '+repeating+' wiederholt sich ohne Ende.');
 }
 function negative(phase){
  const X=v=>31+(v+1)*295,before=phase===0?'−0,15 = −15/100':'−15/100 = −3/20';
  let b=T(180,21,'Das Minus bleibt erhalten.',17)+`<path d="M27 97H333m-8 -6 8 6-8 6" stroke="${C.blue}" stroke-width="3" fill="none"/>`;
  for(const n of [-1,-.5,0])b+=`<path d="M${X(n)} 90v14" stroke="${C.blue}" stroke-width="2"/>`+T(X(n),129,fmt(n),15);
  b+=`<circle cx="${X(-.15)}" cy="97" r="7" fill="${C.berry}"/>`+T(X(-.15),76,'−0,15',17,C.berry)+T(180,164,before,19);
  return SVG(b,before+' auf dem Zahlenstrahl links von 0.');
 }
 function equality(phase){
  let b='';
  if(phase<0)b=T(180,23,'Welche Angaben sind gleich?',17)+R(17,43,326,102,C.pale)+T(180,77,'0,75   3/4   6/8',20)+T(180,117,'0,750   3/8',20);
  else if(phase===0)b=T(180,23,'Diese vier Angaben gehören zusammen',16)+R(17,42,326,105,'#eaf2f4')+T(180,80,'0,75 = 3/4 = 6/8',20,C.blue)+T(180,122,'= 0,750',22,C.berry);
  else b=T(180,23,'Eine Angabe passt nicht',17)+R(17,42,326,105,C.pale)+T(180,80,'3/8 = 0,375',22,C.berry)+T(180,120,'0,375 ist nicht 0,75',18);
  return SVG(b,phase<0?'Fünf Zahlen; noch keine Entscheidung.':phase===0?'0,75, 3/4, 6/8, 0,750 sind gleich viel.':'3/8 ist 0,375 und damit nicht gleich 0,75.');
 }
 function jumps(stage){
  const X=i=>30+i*15;
  let b=T(180,22,'Von −2 bis −1: 20 gleiche Sprünge',16)+`<path d="M24 98H337m-8 -6 8 6-8 6" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
  for(let i=0;i<=20;i++)b+=`<path d="M${X(i)} ${i===0||i===10||i===20?85:93}v${i===0||i===10||i===20?25:11}" stroke="${C.blue}" stroke-width="1.5"/>`;
  b+=T(30,134,'−2',18)+T(330,134,'−1',18);
  if(stage===1)b+=`<circle cx="${X(10)}" cy="98" r="7" fill="${C.berry}"/>`+T(180,77,'Start: −1,5',18,C.berry);
  b+=T(180,169,stage===0?'1 : 20 = 0,05 je Sprung':stage===1?'10 Sprünge vom Rand zum Start':'Wo liegt der Start?',16,C.blue);
  return SVG(b,'Zahlenstrahl von minus zwei bis minus eins, 20 gleich große Sprünge.'+(stage===1?' Start minus 1,5.':stage===0?' Jeder Sprung 0,05.':''));
 }
 function preview(id,r){
  if(id===1)return hundred(9,false);
  if(id===2)return fractionPicture({n:2,d:5},'Diesen Bruch wandelst du um');
  return given(r.givenTokens||[],'Diese Kommazahl ist gegeben');
 }
 function learning(step){
  const v=step.chapterVisual;
  if(!v)return given([],'Lernbild');
  if(v.kind==='hundred-place')return hundred(v.n,v.showDecimal,v.showDecimal?v.n+'/100 = '+fmt(v.n/100):'');
  if(v.kind==='fraction-target')return target({n:v.n,d:v.d},v.target);
  if(v.kind==='fraction-pair')return pair(v.a,v.b);
  if(v.kind==='tenths')return tenths(v.n,v.showDecimal);
  if(v.kind==='decimal-place')return position(v.decimal);
  return given([],'Lernbild');
 }
 function render(id,index,r){
  const isPreview=index<0;
  if(r.learningPreview&&isPreview)return preview(id,r);
  if(id===1)return hundred(7,!isPreview,'7/100 = 0,07');
  if(id===2)return isPreview?fractionPicture({n:3,d:4},'Drei Viertel'):index===0?pair({n:3,d:4},{n:75,d:100}):hundred(75,true,'75/100 = 0,75');
  if(id===3)return isPreview?given(['800/2000'],'Dieser Bruch ist gegeben'):index===0?pair({n:800,d:2000},{n:4,d:10}):tenths(4,true);
  if(id===4)return isPreview?given(['0,45'],'Diese Kommazahl ist gegeben'):index===0?hundred(45,true,'0,45 = 45/100'):pair({n:45,d:100},{n:9,d:20});
  if(id===5)return isPreview?given(['−0,15'],'Diese Kommazahl ist gegeben'):negative(index);
  if(id===6)return isPreview?given(['1,2'],'Diese Kommazahl ist gegeben'):tenths(12,true,index===0?'1,2 = 12/10':'12/10 = 6/5 = 1,2');
  if(id===7)return isPreview?fractionPicture({n:1,d:3},'Dieser Bruch ist gegeben'):recurring(1,3,index);
  if(id===8)return isPreview?given(['□/20 = 0,35'],'Welche Zahl fehlt?'):index===0?hundred(35,true,'0,35 = 35/100'):index===1?pair({n:35,d:100},{n:7,d:20}):given(['7/20 = 0,35','Kästchen = 7'],'Gesuchter Zähler');
  if(id===9)return equality(index);
  if(id===10)return isPreview?given(['3/12','1/6','7/40'],'Welche Kommazahlen enden?'):index===0?hundred(25,true,'3/12 = 1/4 = 0,25'):index===1?recurring(1,6,0):given(['7/40 = 175/1000','= 0,175'],'Drei Stellen nach dem Komma');
  if(id===11)return jumps(index);
  return given(r.givenTokens||[],'Daten der Aufgabe');
 }
 window.MerkheftDecimalPictures={render,learning};
})();
