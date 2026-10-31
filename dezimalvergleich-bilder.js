'use strict';
(function decimalCompareArt(){
  const colors={ink:"#473f4f",sub:"#587080",rose:"#98536e",blue:"#3b7f9f",green:"#569580",sand:"#f3e5cf",pale:"#f2eef3",paper:"#fffcf7",line:"#c4b7c4"};
  const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const T=(x,y,value,size=17,color=colors.ink,anchor="middle")=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}">${E(value)}</text>`;
  const R=(x,y,w,h,color=colors.pale,rx=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}"/>`;
  const C=(x,y,r,color=colors.rose)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  const P=(d,color=colors.blue,width=2)=>`<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  const svg=(b,alt)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 182" role="img" aria-label="${E(alt)}">${R(0,0,360,182,colors.paper,0)}${b}</svg>`;
  const num=s=>Number(String(s).replace("−","-").replace(",",".")),fmt=n=>Number(n).toLocaleString("de-DE",{maximumFractionDigits:5});
  const pct=(n,d)=>Math.max(0,Math.min(1,n/d));
  const row=(a,label,options={})=>{
    const digits=String(a).replace("−","").split(","),v=(digits[1]||"").split(""),whole=digits[0],n=Math.max(3,options.width||3);
    return [whole,...Array.from({length:n},(_,i)=>v[i]??"0")];
  };
  function cards(values,caption="Das ist gegeben"){
    const size=values.length>3?15:values.length===3?19:25;
    let b=T(180,22,caption,17);
    const n=values.length,h=n>4?26:38,startY=n>4?35:45;
    for(let i=0;i<n;i++){
      const y=startY+i*(h+4),isOdd=i%2===1;
      b+=R(42,y,276,h,isOdd?"#e8f3f7":"#f5e7ef",7)+T(180,y+h*.7,values[i],size,colors.ink);
    }
    return svg(b,caption+": "+values.join("; "));
  }
  function placeTable(a,b,highlight=-1,stage=0,caption="Stellen vergleichen"){
    const av=row(a,"A"),bv=row(b,"B"),names=["Einer","Zehntel","Hundertstel","Tausendstel"],width=67,x=62;
    let s=T(180,20,caption,16);
    for(let i=0;i<4;i++){
      const xx=x+i*width;
      s+=R(xx,32,width-4,32,highlight===i?"#e8d1dc":"#e5f2f6",3)+T(xx+(width-4)/2,52,names[i],i===3?10:12,colors.sub);
      for(const [j,digits] of [av,bv].entries()){
        const yy=69+j*40;
        s+=R(xx,yy,width-4,36,highlight===i?"#f4dce6":j?"#eff3f5":"#f7f0f3",3)+T(xx+(width-4)/2,yy+26,digits[i],25,highlight===i?colors.rose:colors.ink);
      }
    }
    s+=T(26,92,"A",16)+T(26,132,"B",16);
    if(stage>=2)s+=T(180,171,num(a)>num(b)?fmt(num(a))+" > "+fmt(num(b)):num(a)<num(b)?fmt(num(a))+" < "+fmt(num(b)):fmt(num(a))+" = "+fmt(num(b)),16,colors.rose);
    else s+=T(180,171,highlight>=0?"Hier fällt die Entscheidung.":"Von links nach rechts prüfen",14,colors.blue);
    return svg(s,caption+": "+a+" und "+b+"."+(highlight>=0?" Hervorgehobene Stelle: "+names[highlight]+".":""));
  }
  function line({left,right,markers=[],label="",min=null,max=null,ticks=null}){
    const lo=min??Math.min(num(left),num(right)),hi=max??Math.max(num(left),num(right));const interval=hi-lo||1;
    const X=v=>35+(v-lo)/interval*290;
    let s=T(180,20,label||"Zahlen auf dem Zahlenstrahl",16)+P("M30 96H333m-7 -6 7 6-7 6",colors.blue,2.8);
    const n=ticks??10;
    for(let i=0;i<=n;i++){const x=35+290*i/n;s+=P(`M${x} ${i%5===0?83:90}v${i%5===0?25:12}`,colors.line,1.2);}
    s+=T(37,135,left,17,colors.sub)+T(324,135,right,17,colors.sub);
    for(const m of markers){
      const x=X(num(m.value));if(x<30||x>330)continue;
      s+=C(x,96,m.middle?7:6,m.middle?colors.rose:colors.blue);
      s+=T(Math.max(34,Math.min(324,x)),m.top?73:160,m.label||m.value,m.middle?17:15,m.middle?colors.rose:colors.blue);
    }
    return svg(s,(label||"Zahlenstrahl")+": von "+left+" bis "+right+"."+(markers.length?" Markierte Werte: "+markers.map(x=>x.label||x.value).join("; ")+".":""));
  }
  function decision(a,b,symbol,title="Vergleich"){
    let s=T(180,23,title,17)+R(19,45,322,91,colors.pale)+T(180,102,a+" "+symbol+" "+b,25,colors.rose)+T(180,167,"Gleiche Stellenwerte vergleichen",14,colors.blue);
    return svg(s,title+": "+a+" "+symbol+" "+b+".");
  }
  function strips(leftNumber,rightNumber,output){
    const a=num(leftNumber),b=num(rightNumber);
    let s=T(180,23,"Gleich große Ganze",16);
    for(const [y,n,label,col] of [[48,a,leftNumber,colors.rose],[106,b,rightNumber,colors.blue]]){
      s+=R(26,y,303,29,colors.pale,4)+R(26,y,303*n,29,col,3);
      for(let j=1;j<10;j++)s+=P(`M${26+j*303/10} ${y}v29`,colors.paper,.8);
      s+=T(340,y+20,label,13,col,"end");
    }
    s+=T(180,166,output?"Gleich groß: "+output:"Vergleiche beide Streifen",15,colors.ink);
    return svg(s,"Zwei gleich lange Ganze: "+leftNumber+" und "+rightNumber+(output?". Beide sind gleich viel.":"."));
  }
  function fractionVsDecimal(stage,id=4){
    if(id===4){
      if(stage<0){
        let s=T(180,22,"Welche Angabe ist größer?",17)+R(22,48,140,77,colors.pale)+R(197,48,140,77,colors.pale);
        s+=T(92,92,"3/5",26)+T(267,92,"0,58",26);
        return svg(s,"Vergleiche 3/5 und 0,58. Noch kein Vergleichszeichen.");
      }
      if(stage===0)return svg(T(180,24,"Beide Angaben in Hundertstel",17)+R(30,46,300,97,colors.pale)+T(180,81,"3/5 = 60/100",24,colors.rose)+T(180,120,"= 0,60",24,colors.blue),"3/5 wird zu 60/100 und damit zu 0,60.");
      if(stage===1)return line({left:"0,58",right:"0,60",markers:[{value:"0,58",label:"0,58",top:true},{value:"0,60",label:"0,60"}],label:"60 Hundertstel sind mehr als 58"});
      return decision("3/5","0,58",">","Bruch und Kommazahl");
    }
    if(stage<0)return cards(["0,□9","13/20"],"Welche Ziffern passen?");
    if(stage===0)return svg(T(180,24,"Zuerst den Bruch umwandeln",17)+R(20,45,320,94,colors.pale)+T(180,85,"13/20 = 65/100",22,colors.rose)+T(180,121,"= 0,65",24,colors.blue),"Dreizehn Zwanzigstel sind 65 Hundertstel, also 0,65.");
    return svg(T(180,22,"Welche Zehntelziffer passt?",17)+R(17,43,326,101,colors.pale)+T(180,76,"0,59 < 0,65",21,colors.blue)+T(180,111,"0,69 > 0,65",21,colors.rose)+T(180,166,"Erlaubt: 0 bis 5",18),"Ziffern 0, 1, 2, 3, 4 und 5 passen. 0,69 wäre größer als 0,65.");
  }
  function order(stage,values=["0,506","0,56","0,5"]){
    if(stage<0)return cards(values,"Drei Zahlen – noch nicht sortiert");
    const special=values.includes("0,704");
    const padded=special?["0,704","0,740","0,700"]:["0,506","0,560","0,500"];
    if(stage===0)return cards(padded,"Mit Endnullen, noch nicht sortiert");
    if(stage===1&&special)return decision("0,700","0,704","<","Die kleinste Zahl finden");
    const sorted=special?["0,700","0,704","0,740"]:["0,500","0,506","0,560"];
    if(stage===2&&special)return cards(sorted,"Von klein nach groß");
    if(stage>=2&&!special)return cards(["0,5","0,506","0,56"],"Originalzahlen geordnet");
    return cards(special?["0,7","0,704","0,74"]:sorted,"Originalzahlen geordnet");
  }
  function between(stage,a="0,4",b="0,5",candidate="0,45"){
    const marked=stage>0;
    const markers=marked?[{value:candidate,label:candidate,middle:true}]:[];
    if(stage===2){
      const s=T(180,22,"Beide Grenzen überprüfen",17)+P("M30 97H330m-8 -6 8 6-8 6",colors.blue,2.8)
      +C(175,97,7,colors.rose)+T(38,135,a,16)+T(320,135,b,16)
      +T(175,72,candidate,19,colors.rose)+T(180,171,a+" < "+candidate+" < "+b,19);
      return svg(s,a+" ist kleiner als "+candidate+", und "+candidate+" ist kleiner als "+b+".");
    }
    return line({left:a,right:b,markers,label:marked?"Eine mögliche Zahl dazwischen":"Zwischen den Grenzen ist noch Platz"});
  }
  function gapDigits(stage){
    if(stage<0)return cards(["0,4□ < 0,43"],"Gesuchte Hundertstelziffer");
    if(stage<=2)return decision(["0,40","0,41","0,42"][stage],"0,43","<","Ziffer "+stage+" einsetzen");
    return cards(["0, 1 oder 2 passen","3 ergäbe Gleichheit"],"Alle erlaubten Ziffern");
  }
  function hundredthsRange(phase){
    const x=k=>34+(k-95)*29;
    let s=T(180,22,"Von 0,95 bis 1,05",17)+P("M28 103H334m-8 -6 8 6-8 6",colors.blue,2.8);
    for(let k=95;k<=105;k++){
      const x0=x(k),border=k===95||k===105;
      s+=P(`M${x0} ${border?88:96}v${border?26:14}`,colors.line,1.5);
      if(phase>=0&&k>95&&k<105)s+=C(x0,103,5,colors.rose);
      if(border||k===100)s+=T(x0,140,(k/100).toFixed(2).replace(".",","),15);
      if(border)s+=`<path d="M${x0} 93l9 10-9 10" fill="none" stroke="${colors.rose}" stroke-width="1.6"/>`;
    }
    s+=T(180,169,phase<0?"Die Grenzen zählen nicht mit.":"Neun erlaubte Hundertstel",15,colors.blue);
    return svg(s,"Hundertstel-Zahlenstrahl von 0,95 bis 1,05."+(phase>=0?" Neun Punkte von 0,96 bis 1,04, Endpunkte ausgeschlossen.":" Ohne markierte Lösungen."));
  }
  function midpoint(stage){
    const mid=stage>=2;
    let s=T(180,21,"Von −0,410 bis −0,400",16)+P("M26 98H334m-8 -6 8 6-8 6",colors.blue,2.8);
    for(let i=0;i<=10;i++){
      const x=32+i*29.6;s+=P(`M${x} ${i===0||i===10?84:92}v${i===0||i===10?24:12}`,colors.line,1.5);
    }
    s+=T(36,135,"−0,410",15)+T(322,135,"−0,400",15);
    if(stage===1)s+=T(180,167,"Halber Abstand = 0,005",16,colors.blue);
    else if(mid){s+=C(180,98,8,colors.rose)+T(180,73,"−0,405",19,colors.rose);}
    else if(stage===0)s+=T(180,167,"Abstand: 0,010",17,colors.blue);
    return svg(s,"Zahlenstrahl von −0,410 bis −0,400."+(mid?" Mitte markiert: −0,405.":stage===1?" Halber Abstand 0,005.":stage===0?" Abstand 0,010.":" Gesuchte Mitte noch nicht markiert."));
  }
  function cardsArrange(stage){
    const digits=["8","0","5","4"];let s=T(180,22,"Jede Ziffer genau einmal",17);
    if(stage<0){
      for(let i=0;i<4;i++)s+=R(31+i*76,48,60,67,i%2?"#e6f2f6":"#f4e8ed")+T(61+i*76,91,digits[i],35);
      s+=T(180,157,"Größte und kleinste Zahl legen",16);
    }else{
      const val=stage===0?"8,540":"0,458";
      s+=T(180,67,stage===0?"Größte Zahl":"Kleinste Zahl",17)+R(42,84,276,58,colors.pale)+T(180,126,val,34,colors.rose);
      s+=T(180,169,stage===0?"8 vor dem Komma":"0 vor dem Komma",16);
    }
    return svg(s,"Ziffernkarten 8, 0, 5, 4."+(stage<0?" Noch nicht angeordnet.":stage===0?" Größte Zahl 8,540.":" Kleinste Zahl 0,458."));
  }
  function patternTable(stage){
    let s=T(180,21,"Zeilen und Spalten getrennt",16);
    if(stage<0){
      const rows=[["2,3","2,9","2,27"],["4,3","4,9","4,27"]];
      for(let r=0;r<2;r++)for(let col=0;col<3;col++){const x=25+col*104,y=40+r*50;s+=R(x,y,96,43,r===0?"#f5e8ed":"#eaf2f4")+T(x+48,y+29,rows[r][col],22);}
      s+=T(180,165,"Zeile 5 · Spalte 5 gesucht",16);
      return svg(s,"Tabelle mit Zeilen 2,3;2,9;2,27 und 4,3;4,9;4,27. Gesuchter Eintrag in Zeile fünf, Spalte fünf.");
    }
    if(stage===0)return cards(["Zeile 1: 2","Zeile 2: 4","Zeile 3: 8","Zeile 4: 16","Zeile 5: 32"],"Die Zahlen vor dem Komma");
    if(stage===1)return cards(["Spalte 1: 3","Spalte 2: 9","Spalte 3: 27","Spalte 4: 81","Spalte 5: 243"],"Die Ziffernfolge nach dem Komma");
    return svg(T(180,23,"Zeile 5 · Spalte 5",17)+R(24,47,312,96,colors.pale)+T(180,91,"32,243",31,colors.rose)+T(180,123,"32 | 243",18,colors.blue)+T(180,167,"Beide Muster zusammenführen",14),"Zeile fünf, Spalte fünf enthält 32,243.");
  }
  function lesson(step){
    const v=step.chapterVisual;if(!v)return cards([],"Lernbild");
    if(v.kind==="zeros"){
      if(v.step===0)return svg(T(180,20,"Sieben Zehntel",17)+R(26,53,306,52,colors.pale)+R(26,53,306*.7,52,colors.rose)+T(180,156,"0,7 = 7/10",25),"0,7 sind sieben Zehntel.");
      if(v.step===1)return strips(v.left,v.right,null).replace("Vergleiche beide Streifen","700/1000 = 7/10");
      return strips(v.left,v.right,"0,7 = 0,700");
    }
    if(v.kind==="place")return placeTable(v.a,v.b,v.step>=1?2:-1,v.step,"Stellenwerte vergleichen");
    if(v.kind==="order")return order(v.step,v.values);
    if(v.kind==="between")return between(v.step,v.a,v.b,v.middle);
    return cards([],"Lernbild");
  }
  function render(id,index,r){
    const preview=index<0;
    if(preview&&r.learningPreview)return cards(r.givenTokens,"Deine Lernaufgabe");
    if(id===1){
      if(preview)return cards(["0,43","0,418"],"Welche Zahl ist größer?");
      if(index===0)return placeTable("0,430","0,418",2,1);
      return decision("0,43","0,418",">");
    }
    if(id===2){
      if(preview)return cards(["0,6","0,600"],"Ändern die Nullen den Wert?");
      return strips("0,6","0,600","0,6 = 0,600");
    }
    if(id===3){
      if(preview)return line({left:"−0,70",right:"−0,65",markers:[],label:"Zwei negative Kommazahlen"});
      if(index===0)return line({left:"−0,70",right:"−0,65",markers:[{value:"−0,70",label:"−0,70",top:true},{value:"−0,65",label:"−0,65"}],label:"Endnull ergänzt, Werte unverändert"});
      return decision("−0,70","−0,65","<","Bei negativen Zahlen");
    }
    if(id===4)return fractionVsDecimal(preview?-1:index,4);
    if(id===5)return gapDigits(index);
    if(id===6)return between(index===-1?-1:index===0?1:2,"0,4","0,5","0,45");
    if(id===7)return order(index===-1?-1:index===0?0:3);
    if(id===8){
      if(preview)return cards(["Lena: 1,205 km","Max: 1,25 km"],"Wer läuft weiter?");
      return placeTable("1,205","1,250",2,2,"Lena und Max in Kilometern");
    }
    if(id===9)return hundredthsRange(index);
    if(id===10)return midpoint(index);
    if(id===11)return cardsArrange(index);
    if(id===12)return fractionVsDecimal(index,12);
    if(id===13)return patternTable(index);
    return cards(r.givenTokens,"Das ist gegeben");
  }
  window.MerkheftDecimalComparisonPictures={render,learning:lesson};
})();
