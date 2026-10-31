'use strict';
(function sizesArt(){
 const col={ink:"#403e4e",muted:"#637581",blue:"#4c849b",rose:"#96546c",green:"#5e957f",pale:"#edf1f2",soft:"#f6e7ee",paper:"#fffcf8",line:"#a8b9c0",gold:"#edc77e"};
 const E=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
 const t=(x,y,s,sz=17,c=col.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz}" fill="${c}">${E(s)}</text>`;
 const rect=(x,y,w,h,fill=col.pale,rad=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${fill}"/>`;
 const line=(d,c=col.blue,sw=2)=>`<path d="${d}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;
 const svg=(b,alt)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 185" role="img" aria-label="${E(alt)}">${rect(0,0,360,185,col.paper,0)}${b}</svg>`;
 const fmt=n=>Number(n).toLocaleString("de-DE",{maximumFractionDigits:7});
 function chips(lines,label="Das ist gegeben"){
  let b=t(180,23,label,17),arr=lines.slice(0,6),h=arr.length>=5?25:arr.length>=4?30:40;
  for(let i=0;i<arr.length;i++){let y=35+i*(h+4);b+=rect(20,y,320,h,i%2?col.pale:col.soft)+t(180,y+h*.69,arr[i],arr[i].length>24?15:20)}
  return svg(b,label+": "+arr.join("; "));
 }
 function conversion({quantity,from,to,factor,stage,operation="times"}){
  const toValue=operation==="divide"?quantity/factor:quantity*factor;const fromText=fmt(quantity)+" "+from,target=fmt(toValue)+" "+to;
  const anchor="1 "+(operation==="divide"?to:from)+" = "+fmt(factor)+" "+(operation==="divide"?from:to);
  if(stage<0)return chips([fromText,"? "+to],"Rechne die Einheit um");
  let s=t(180,22,stage===0?"Die Einheiten verbinden":stage===1?"Die Maßzahl umrechnen":"Gleiche Größe – andere Einheit",17);
  s+=rect(24,45,132,55,col.pale)+rect(204,45,132,55,col.soft);
  s+=t(90,80,stage===0?"1 "+(operation==="divide"?to:from):fromText,19);
  s+=t(270,80,stage===0?fmt(factor)+" "+(operation==="divide"?from:to):stage===1?"? "+to:target,18,col.rose);
  s+=line("M162 75H198m-8 -5 8 5-8 5");
  const eq=stage===0?anchor:stage===1?fmt(quantity)+(operation==="divide"?" : ":" · ")+fmt(factor)+" = "+fmt(toValue):fromText+" = "+target;
  s+=t(180,144,eq,eq.length>27?16:20,col.blue)+t(180,172,operation==="divide"?"Zur größeren Einheit: teilen":"Zur kleineren Einheit: malnehmen",14,col.muted);
  return svg(s,eq+". Gleiche Größe, passende Einheiten.");
 }
 function ratioGrid(kind,stage){
  const volume=kind==="volume",factor=volume?1000:100,unit=volume?"Kubik":"Quadrat";
  let s=t(180,20,unit+"-Einheiten: Schritt um 10",16);
  if(!volume){
   for(let i=0;i<100;i++){const x=103+(i%10)*15,y=34+Math.floor(i/10)*11;
    s+=rect(x,y,14,10,i%2?col.soft:col.pale,1)}
   s+=t(180,160,"10 · 10 = 100",19,col.blue);
  }else{
   s+=`<path d="M109 65l45 -24h99l-45 24z" fill="#e4d1dd" stroke="#927887"/>`;
   s+=`<path d="M208 65l45 -24v91l-45 25z" fill="#bfd7d7" stroke="#718e9d"/>`;
   s+=rect(109,65,99,91,"#f0dfa7",1);
   for(let i=1;i<10;i++){
    s+=line(`M${109+i*9.9} 65v91`,col.paper,.5);
    s+=line(`M109 ${65+i*9.1}h99`,col.paper,.5);
   }
   s+=t(185,175,"10 · 10 · 10 = 1000",16,col.blue);
  }
  return svg(s,`Bei ${unit.toLowerCase()}einheiten werden pro Stufe ${volume?"drei":"zwei"} Richtungen mit 10 geteilt, Faktor ${factor}.`);
 }
 function metricArea(stage){
  const steps=[
   ["1 m² = 100 dm²","Ein Meter hat 10 dm in Länge und Breite."],
   ["1,2 m² = 120 dm²","1,2 mal 100 ergibt 120."],
   ["1 dm² = 100 cm²","Ein Dezimeter hat 10 cm in beiden Richtungen."],
   ["120 dm² = 12 000 cm²","120 mal 100 ergibt 12 000."]
  ];
  if(stage<0)return chips(["1,2 m²","? cm²"],"Fläche umrechnen");
  const x=steps[stage],base=ratioGrid("area",stage);let b=t(180,22,"Fläche: 10 mal 10",16);
  for(let y=0;y<10;y++)for(let xx=0;xx<10;xx++)b+=rect(110+14*xx,32+11*y,13,10,y%2?col.soft:col.pale,1);
  b+=t(180,155,x[0],19,col.rose)+t(180,178,stage%2?"Die Maßzahl ist jetzt umgerechnet.":"Zwei Richtungen bestimmen den Faktor.",13,col.blue);
  return svg(b,x[0]+". "+x[1]);
 }
 function metricVolume(stage){
  if(stage<0)return chips(["0,003 m³","? cm³"],"Rauminhalt umrechnen");
  const eq=["1 m³ = 1000 dm³","0,003 m³ = 3 dm³","1 dm³ = 1000 cm³","3 dm³ = 3000 cm³"][stage];
  let b=t(180,24,"Drei Richtungen",17);
  b+=`<path d="M110 69l43 -25h97l-43 25z" fill="#e4d1dd" stroke="#927887"/>`;
  b+=`<path d="M207 69l43 -25v80l-43 24z" fill="#bfd7d7" stroke="#718e9d"/>`;
  b+=rect(110,69,97,79,"#f0dfa7",1);
  b+=t(185,161,eq,eq.length>19?17:20,col.rose);
  b+=t(180,181,stage%2?"Die Werte bleiben gleich.":"10 · 10 · 10 = 1000",13,col.blue);
  return svg(b,eq+". Bei Rauminhalten zählen drei Richtungen.");
 }
 function money(stage){
  if(stage<0)return chips(["3,50 €","75 ct"],"Zwei Geldbeträge addieren");
  let b=t(180,24,stage===0?"Erst dieselbe Einheit":"Jetzt Geldbeträge addieren",17);
  b+=rect(28,47,304,42,col.pale)+rect(28,47,304*.75,42,col.gold);
  for(let i=1;i<4;i++)b+=line(`M${28+304*i/4} 47v42`,col.paper,1);
  b+=t(180,115,stage===0?"75 ct = 0,75 €":"3,50 € + 0,75 €",22);
  b+=t(180,159,stage===0?"100 ct = 1 €":"= 4,25 €",23,col.rose);
  return svg(b,stage===0?"75 Cent sind 0,75 Euro.":"3,50 Euro plus 0,75 Euro ergeben 4,25 Euro.");
 }
 function twoBars(stage){
  if(stage<0)return chips(["0,7 km","650 m"],"Welche Strecke ist länger?");
  const x=27,width=286;let b=t(180,22,"Beide Strecken in Metern",16);
  for(const [y,n,label,color]of [[49,700,"700 m",col.rose],[109,650,"650 m",col.blue]]){
   b+=rect(x,y,width,27,col.pale)+rect(x,y,width*n/750,27,color);
   b+=t(180,y+49,label,18);
  }
  return svg(b,stage===0?"0,7 Kilometer sind 700 Meter; 650 Meter sind gegeben.":"700 Meter sind länger als 650 Meter.");
 }
 function scaledSegments(stage){
  let b=t(180,21,"0 bis 2 kg: acht gleiche Lücken",16);
  b+=line("M24 91H334m-7 -5 7 5-7 5",col.blue,2.5);
  for(let i=0;i<=8;i++){let x=28+38*i;b+=line(`M${x} 80v24`,col.blue,1.8);if(i===0||i===8||stage>=2)b+=t(x,132,stage>=1?fmt(i*.25)+(stage===2?" kg":""):i===0?"0":"2 kg",i===0||i===8?13:11)}
  if(stage>=0)b+=t(180,168,stage===0?"2 kg : 8 = 0,25 kg":stage===1?"0,25 kg = 250 g":"Jede Lücke: 250 g",17,col.rose);
  else b+=t(180,168,"Wie viel zeigt eine Lücke?",17,col.blue);
  return svg(b,"Zahlenstrahl von null bis zwei Kilogramm mit acht gleich großen Lücken."+(stage>=0?" Je Lücke "+(stage===0?"0,25 kg":"250 g")+".":" Noch keine Schrittweite angezeigt."));
 }
 function landArea(stage){
  if(stage<0)return chips(["0,005 km² → ? a","7,1 m² → ? a"],"Flächen in Ar umrechnen");
  const eq=["1 km² = 100 ha","0,005 km² = 0,5 ha","1 ha = 100 a","0,5 ha = 50 a","1 a = 100 m²","7,1 m² = 0,071 a"][stage];
  let b=t(180,22,stage<4?"Erste Fläche: über Hektar":"Zweite Fläche: in Ar",17);
  for(let i=0;i<100;i++)b+=rect(110+(i%10)*14,38+Math.floor(i/10)*10,13,9,i%2?col.pale:col.soft,1);
  b+=t(180,166,eq,eq.length>20?17:19,col.rose);
  return svg(b,"Flächenumrechnung: "+eq+".");
 }
 function literVolume(stage){
  if(stage<0)return chips(["0,5 m³ → ? l","77,3 ml → ? dm³"],"Liter und Kubikmaße");
  const eq=["1 m³ = 1000 l","0,5 m³ = 500 l","1 ml = 1 cm³","77,3 ml = 77,3 cm³","1000 cm³ = 1 dm³","77,3 cm³ = 0,0773 dm³"][stage];
  let b=t(180,24,"Rauminhalt: gleich großer Raum",16);
  b+=`<path d="M122 73l39 -22h91l-39 22z" fill="#e4d1dd" stroke="#927887"/>`;
  b+=`<path d="M213 73l39 -22v62l-39 23z" fill="#bfd7d7" stroke="#718e9d"/>`;
  b+=rect(122,73,91,63,"#f0dfa7",2);
  b+=t(180,168,eq,eq.length>23?16:20,col.rose);
  return svg(b,eq+". Liter und Kubikmaße beschreiben denselben Rauminhalt.");
 }
 function timeClock(stage,variant="example"){
  const lesson=variant==="lesson",minutes=lesson?75:63,wholeMinutes=60,extra=lesson?15:3;
  const arcParts=lesson?4:6,totalParts=variant==="lesson"?4:6;
  let b=t(180,21,stage<3?"Eine Stunde hat 60 Minuten":"Eine Minute hat 60 Sekunden",16);
  const segments=stage<3?12:totalParts,active=stage>=4?(lesson?3:5):stage>=1&&stage<3?(lesson?3:1):0;
  const cx=180,cy=89,rad=48;
  b+=`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="#f7f1e9" stroke="#ba9fac" stroke-width="2"/>`;
  for(let i=0;i<segments;i++){
   const theta=-Math.PI/2+i*2*Math.PI/segments,x=cx+rad*Math.cos(theta),y=cy+rad*Math.sin(theta),xx=cx+(rad-10)*Math.cos(theta),yy=cy+(rad-10)*Math.sin(theta);
   b+=line(`M${x} ${y}L${xx} ${yy}`,i<active?col.rose:col.blue,i%3===0?2:1.2);
  }
  const exampleEq=["1 h = 60 min","0,05 h = 3 min","1,05 h = 63 min","60 s : 6 = 10 s","5 · 10 s = 50 s"];
  const lessonEq=["1 h = 60 min","0,25 h = 15 min","1,25 h = 75 min","60 s : 4 = 15 s","3 · 15 s = 45 s"];
  b+=t(180,165,stage<0?"Wie viel Zeit ist gemeint?":(lesson?lessonEq:exampleEq)[stage],stage<0?16:18,col.rose);
  return svg(b,(stage<0?"Zeitangaben; noch kein Ergebnis.":(lesson?lessonEq:exampleEq)[stage])+". Zeit wird mit 60 umgerechnet.");
 }
 function areaTiles(stage,variant="example"){
  const lesson=variant==="lesson",whole=lesson?4:6,halves=lesson?2:4,side=0.5,combined=whole+halves/2;
  let b=t(180,22,"Ein Kästchen hat 0,5 cm Seitenlänge",15);
  for(let i=0;i<whole+halves;i++){
   const x=28+(i%5)*61,y=38+Math.floor(i/5)*51;
   b+=rect(x,y,48,43,col.pale,3);
   if(i<whole)b+=rect(x+2,y+2,44,39,col.rose,2);
   else b+=`<path d="M${x+2} ${y+41}L${x+2} ${y+2}L${x+46} ${y+41}Z" fill="${col.rose}"/>`;
   b+=line(`M${x} ${y}h48v43h-48z`,col.line,1);
  }
  const eqs=lesson?["2 halbe = 1 ganzes","4 + 1 = 5 Kästchen","0,5 · 0,5 = 0,25 cm²","5 · 0,25 = 1,25 cm²"]:
  ["0,5 · 0,5 = 0,25 cm²","4 halbe = 2 ganze","6 + 2 = 8 Kästchen","8 · 0,25 = 2 cm²"];
  b+=t(180,166,stage<0?whole+" ganze + "+halves+" halbe":eqs[stage],stage<0?18:17,col.blue);
  return svg(b,whole+" ganze und "+halves+" halbe Kästchen."+(stage<0?" Noch kein Ergebnis.":" "+eqs[stage]+"."));
 }
 function cuboid(stage,variant="example"){
  const lesson=variant==="lesson",len=lesson?3:2,wid=lesson?2:1.5,hgt=1;
  const v=len*wid*hgt,front=2*len*hgt,side=2*wid*hgt,top=2*len*wid,area=front+side+top;
  const phase=stage<0?-1:stage;
  const face=phase===1?"front":phase===2?"side":phase===3?"top":"all";
  const frontCol=face==="front"?col.rose:"#e9c77e",sideCol=face==="side"?col.rose:"#afd4ca",topCol=face==="top"?col.rose:"#e1c6d3";
  let b=t(180,21,phase<0?"Quader: Was ist innen, was außen?":phase===0?"Rauminhalt: drei Richtungen":"Oberfläche: Flächenpaare",16);
  b+=`<path d="M98 76l56 -32h109l-56 32Z" fill="${topCol}" stroke="#947a86" stroke-width="1.2"/>`;
  b+=`<path d="M207 76l56 -32v78l-56 31Z" fill="${sideCol}" stroke="#718e9d" stroke-width="1.2"/>`;
  b+=rect(98,76,109,77,frontCol,0)+line("M98 76v77h109v-77",col.muted,1);
  b+=t(153,172,fmt(len)+" cm",13)+t(282,98,fmt(wid)+" cm",13)+t(75,113,fmt(hgt)+" cm",13);
  if(phase>=0){const eq=phase===0?"V = "+fmt(v)+" cm³":phase===1?fmt(front)+" cm² vorne + hinten":phase===2?fmt(side)+" cm² links + rechts":phase===3?fmt(top)+" cm² oben + unten":"O = "+fmt(area)+" cm²";
    b+=t(180,42,eq,eq.length>23?14:17,col.rose);}
  return svg(b,"Quader mit Länge "+fmt(len)+", Breite "+fmt(wid)+", Höhe "+fmt(hgt)+" Zentimetern."+(phase<0?" Noch keine Rechnung.":phase===0?" Rauminhalt "+fmt(v)+" Kubikzentimeter.":phase===1?" Vorn und hinten zusammen "+fmt(front)+" Quadratzentimeter.":phase===2?" Links und rechts zusammen "+fmt(side)+" Quadratzentimeter.":phase===3?" Oben und unten zusammen "+fmt(top)+" Quadratzentimeter.":" Oberfläche "+fmt(area)+" Quadratzentimeter."));
 }
 function twoViews(stage){
  if(stage<0){let b=t(180,20,"Von oben und von vorn",17)+rect(26,46,130,69,col.pale)+rect(205,46,130,69,col.soft);
   b+=t(91,77,"80 cm × 50 cm",15)+t(91,98,"oben",15,col.blue)+t(270,76,"Höhe 1 m",17)+t(270,98,"vorn",15,col.rose);
   return svg(b,"Draufsicht 80 Zentimeter mal 50 Zentimeter; Vorderansicht Höhe ein Meter.");}
  const vals=["80 cm : 100 = 0,8 m","50 cm : 100 = 0,5 m","Höhe: 1 m","0,8 m · 0,5 m · 1 m = 0,4 m³"];
  return chips([vals[stage]],stage===3?"Rauminhalt des Quaders":"Drei Maße in Metern");
 }
 function micro(stage){
  if(stage<0)return chips(["6 µg → ? g","4 µm → ? m"],"Mikro: Millionstel");
  const eq=["1 g = 1 000 000 µg","6 : 1 000 000 = 0,000006","6 µg = 0,000006 g","1 m = 1 000 000 µm","4 : 1 000 000 = 0,000004","4 µm = 0,000004 m"][stage];
  let b=t(180,23,"Mikro bedeutet ein Millionstel",16);
  b+=rect(28,55,304,65,col.pale)+t(180,90,eq,eq.length>27?15:19,col.rose);
  b+=t(180,162,stage<3?"Masse: Mikrogramm und Gramm":"Länge: Mikrometer und Meter",16,col.blue);
  return svg(b,"Mikro-Umrechnung: "+eq+".");
 }
 function frame(stage){
  let b=t(180,20,stage===3?"Ein Dreieck als halbes Rechteck":"Außenfläche minus Innenfläche",16);
  b+=rect(62,39,236,105,col.rose,2);
  if(stage!==3)b+=rect(98,59,166,65,col.paper,1);
  else b+=`<path d="M62 144L298 39L298 144Z" fill="${col.paper}"/>`;
  b+=t(180,166,["3 · 2 = 6 cm²","2 · 1 = 2 cm²","6 − 2 = 4 cm²","6 : 2 = 3 cm²"][Math.max(0,stage)],18,col.blue);
  return svg(b,stage<0?"Rechteckiger Rahmen mit Außenmaßen drei mal zwei und Innenmaßen zwei mal ein Zentimeter. Noch kein Ergebnis.":stage===0?"Außenfläche sechs Quadratzentimeter.":stage===1?"Innenfläche zwei Quadratzentimeter.":stage===2?"Rahmenfläche vier Quadratzentimeter.":"Halbes Rechteck hat drei Quadratzentimeter.");
 }
 function examples(id,stage,r){
  if(id===1)return conversion({quantity:1.25,from:"m",to:"cm",factor:100,stage});
  if(id===2)return conversion({quantity:0.075,from:"kg",to:"g",factor:1000,stage});
  if(id===3)return conversion({quantity:250,from:"g",to:"kg",factor:1000,stage,operation:"divide"});
  if(id===4)return metricArea(stage);
  if(id===5)return metricVolume(stage);
  if(id===6){if(stage<0)return chips(["1,5 m = 150 □"],"Welche Einheit fehlt?");
   return chips(stage===0?["1 m = 100 cm","1,5 m = 150 cm"]:["□ = cm"],"Fehlende Einheit");}
  if(id===7)return money(stage);
  if(id===8)return twoBars(stage);
  if(id===9)return scaledSegments(stage);
  if(id===10)return landArea(stage);
  if(id===11)return literVolume(stage);
  if(id===12)return stage<0?chips(["1,05 h","5/6 min"],"Zwei Zeitangaben umrechnen"):timeClock(stage);
  if(id===13)return areaTiles(stage);
  if(id===14)return cuboid(stage);
  if(id===15)return twoViews(stage);
  if(id===16)return micro(stage);
  if(id===17)return stage<0?svg(t(180,23,"Rahmen und Dreieck",17)+rect(62,44,236,100,col.rose)+rect(98,64,166,60,col.paper)+t(180,169,"Außen 3 × 2 · innen 2 × 1",15),"Rahmen mit Außenmaßen drei mal zwei und Innenmaßen zwei mal ein Zentimeter."):frame(stage);
  return chips(r.givenTokens||[],"Aufgabe");
 }
 function lesson(id,step){
  const v=step.chapterVisual;const stage=v.stage;
  if(v.kind==="length"||v.kind==="mass")return conversion({...v,quantity:v.n,stage});
  if(v.kind==="time")return timeClock(stage,"lesson");
  if(v.kind==="area")return areaTiles(stage,"lesson");
  if(v.kind==="cuboid")return cuboid(stage,"lesson");
  return chips(step.tokens||[],"Lernschritt");
 }
 function preview(id,r){
  if(id===1)return conversion({quantity:2.4,from:"m",to:"cm",factor:100,stage:-1});
  if(id===2)return conversion({quantity:0.32,from:"kg",to:"g",factor:1000,stage:-1});
  if(id===12)return chips(["1,25 h","3/4 min"],"Zwei Zeitangaben umrechnen");
  if(id===13)return areaTiles(-1,"lesson");
  if(id===14)return cuboid(-1,"lesson");
  return chips(r.givenTokens||[],"Gegeben");
 }
 window.MerkheftSizesPictures={render:(id,stage,r)=>stage<0&&r.learningPreview?preview(id,r):examples(id,stage,r),learning:(step,r)=>lesson(r.id,step)};
})();
