'use strict';
// Reusable foundations: exact rational arithmetic; no automatic grading of free thoughts.
((host)=>{
const abs=n=>n<0n?-n:n;
const gcd=(a,b)=>{a=abs(a);b=abs(b);while(b){[a,b]=[b,a%b];}return a||1n;};
const rat=(n,d=1n)=>{if(!d)throw Error('Durch null darfst du nicht teilen.');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return{n:n/g,d:d/g};};
function parse(value){
 const s=String(value).trim().replace(/−/g,'-').replace(/\s+/g,' ');
 let m=s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);
 if(m){const w=BigInt(m[2]),n=BigInt(m[3]),d=BigInt(m[4]);if(n>=d)throw Error('Bei einer gemischten Zahl muss der Bruchteil kleiner als 1 sein.');return rat((m[1]?-1n:1n)*(w*d+n),d);}
 m=s.match(/^(-?\d+)\/(\d+)$/);if(m)return rat(BigInt(m[1]),BigInt(m[2]));
 m=s.match(/^(-?)(\d{1,12})(?:[,.](\d{1,9}))?$/);
 if(!m)throw Error('Schreibe eine Zahl, zum Beispiel 2,35, −0,7, 3/4 oder 2 3/8. Keine Tausenderpunkte.');
 return rat((m[1]?-1n:1n)*BigInt(m[2]+(m[3]||'')),10n**BigInt((m[3]||'').length));
}
const mul=(a,b)=>rat(a.n*b.n,a.d*b.d);
const divide=(a,b)=>rat(a.n*b.d,a.d*b.n);
const cmp=(a,b)=>a.n*b.d<a.d*b.n?-1:a.n*b.d>a.d*b.n?1:0;
const integer=a=>a.d===1n;
const frac=a=>(a.n<0n?'−':'')+abs(a.n)+(a.d===1n?'':'/'+a.d);
function decimals(a){let d=a.d,k=0;while(d%2n===0n){d/=2n;k++;}let f=0;while(d%5n===0n){d/=5n;f++;}if(d!==1n)throw Error('Dieser Bruch hat keine endliche Kommazahl. Nutze dafür das Beispiel zu periodischen Kommazahlen.');return Math.max(k,f);}
function fmt(a,pad=0){const k=Math.max(decimals(a),pad),v=abs(a.n)*10n**BigInt(k)/a.d,s=v.toString().padStart(k+1,'0');return(a.n<0n?'−':'')+(k?s.slice(0,-k)+','+s.slice(-k):s);}
const label=a=>{try{return fmt(a);}catch(_){return frac(a);}};
const unitGroups={
 length:[['km',1000000],['m',1000],['dm',100],['cm',10],['mm',1]],
 mass:[['t',1000000000],['kg',1000000],['g',1000],['mg',1]],
 money:[['€',100],['ct',1]],
 area:[['km²',1000000000000],['ha',10000000000],['a',100000000],['m²',1000000],['dm²',10000],['cm²',100],['mm²',1]],
 volume:[['m³',1000000000],['dm³',1000000],['cm³',1000],['mm³',1]],
 time:[['h',3600],['min',60],['s',1]]
};
const units=Object.fromEntries(Object.entries(unitGroups).flatMap(([kind,rows])=>rows.map(([name,factor])=>[name,{kind,factor:BigInt(factor)}])));
function convert(value,from,to){if(!units[from]||!units[to]||units[from].kind!==units[to].kind)throw Error('Wähle zwei Einheiten derselben Größenart.');return mul(parse(value),rat(units[from].factor,units[to].factor));}
function choose(value,from){const a=parse(value),u=units[from];if(!u)throw Error('Unbekannte Einheit.');for(const [to,f]of unitGroups[u.kind])if(BigInt(f)<u.factor&&integer(convert(value,from,to)))return to;throw Error('Mit den angebotenen kleineren Einheiten entsteht keine ganze Maßzahl. Prüfe die Angabe.');}
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const box=(title,body)=>'<div class="basis-picture"><b>'+E(title)+'</b>'+body+'</div>';
const equation=(a,op,b,result)=>box('Rechenweg','<div class="basis-equation">'+E(a)+' '+E(op)+' '+E(b)+' = '+E(result)+'</div>');
const placeNames={0:'Einer',1:'Zehner',2:'Hunderter',3:'Tausender',4:'Zehntausender',5:'Hunderttausender',6:'Millionen',7:'Zehnmillionen',8:'Hundertmillionen',9:'Milliarden',10:'Zehnmilliarden',11:'Hundertmilliarden','-1':'Zehntel','-2':'Hundertstel','-3':'Tausendstel','-4':'Zehntausendstel','-5':'Hunderttausendstel','-6':'Millionstel','-7':'Zehnmillionstel','-8':'Hundertmillionstel','-9':'Milliardstel'};
function table(values,focus=null){
 const clean=values.map(x=>({label:x.label,value:fmt(x.value,x.pad||0)}));
 const left=Math.max(1,...clean.map(x=>x.value.replace('−','').split(',')[0].length)),right=Math.max(0,...clean.map(x=>(x.value.split(',')[1]||'').length));
 const names=placeNames;
 let cols=Array.from({length:left+right},(_,i)=>left-1-i);
 let html='<div class="basis-table-wrap" tabindex="0" role="region" aria-label="Stellenwerttafel, bei Bedarf seitlich verschieben"><table><thead><tr><th>Zahl</th><th>Zeichen</th>'+cols.map(p=>'<th'+((p===0||p===focus)?' class="'+(p===0?'basis-comma ':'')+(p===focus?'basis-first-difference':'')+'"':'')+'>'+E(names[p]||('10 hoch '+p))+'</th>').join('')+'</tr></thead><tbody>';
 for(const row of clean){const [l,r='']=row.value.replace('−','').split(',');html+='<tr><th>'+E(row.label)+'</th><td>'+ (row.value.startsWith('−')?'−':'+')+'</td>'+cols.map(p=>'<td'+((p===0||p===focus)?' class="'+(p===0?'basis-comma ':'')+(p===focus?'basis-first-difference':'')+'"':'')+'>'+E(p>=0?l[l.length-1-p]||'0':r[-p-1]||'0')+'</td>').join('')+'</tr>';}
 return box('Jede Ziffer hat einen Platz',html+'</tbody></table></div><p>Die dicke Linie trennt Einer und Zehntel. Dort steht das Komma. Jede Stelle rechts zählt ein Zehntel der Stelle links daneben.</p>');
}
function ladder(kind,from,to){return box('Die Einheiten ordnen','<div class="basis-units">'+unitGroups[kind].map(([u,f],i,rows)=>'<span class="'+(u===from?'basis-from':u===to?'basis-to':'')+'">'+E(u)+'</span>'+(i<rows.length-1?'<small> Faktor '+(BigInt(f)/BigInt(rows[i+1][1]))+' → </small>':'')).join('')+'</div><p>Links sind die größeren Einheiten. Rechts sind die kleineren. Die Zahl am Pfeil sagt, wie viele kleinere Einheiten eine größere bilden.</p>');}
function dimensionPicture(kind){
 if(!['area','volume'].includes(kind))return '';
 let cells='';for(let y=0;y<10;y++)for(let x=0;x<10;x++)cells+='<rect x="'+(18+x*15)+'" y="'+(30+y*15)+'" width="14" height="14" fill="'+(y%2?'#e8cdd8':'#d6e9e9')+'" stroke="#326b82" stroke-width=".4"/>';
 let layers='';if(kind==='volume')for(let i=0;i<10;i++)layers+='<rect x="220" y="'+(30+i*15)+'" width="155" height="13" fill="'+(i%2?'#e8cdd8':'#d6e9e9')+'" stroke="#326b82"/><text x="297" y="'+(40+i*15)+'" text-anchor="middle" style="font-size:10px">Schicht '+(i+1)+' · 100</text>';
 return box(kind==='area'?'Zwei Richtungen: 10 · 10':'Drei Richtungen: 10 · 10 · 10','<svg viewBox="0 0 400 220" role="img" aria-label="'+(kind==='area'?'Zehn Reihen mit je zehn Kästchen: hundert Quadrat-Einheiten.':'Eine Schicht mit hundert kleinen Würfeln. Zehn solche Schichten ergeben tausend Kubik-Einheiten.')+'">'+cells+layers+'<text x="93" y="20" text-anchor="middle">10 pro Reihe</text><text x="93" y="206" text-anchor="middle" style="font-size:14px">10 Reihen = 100</text>'+(kind==='volume'?'<text x="297" y="206" text-anchor="middle" style="font-size:14px">10 Schichten = 1000</text>':'<text x="282" y="107" text-anchor="middle">100 Kästchen</text>')+'</svg><p>'+(kind==='area'?'Wird jede Seitenlänge in zehn kleine Einheiten geteilt, entstehen 100 kleine Quadrate.':'Länge und Breite ergeben 100 Plätze in einer Schicht. Zehn Schichten übereinander ergeben 1000 Plätze.')+'</p>');
}
function linePicture(a,b,displayA=label(a),displayB=label(b)){
 const lo=cmp(a,b)<=0?a:b,hi=cmp(a,b)<=0?b:a,span=rat(hi.n*lo.d-lo.n*hi.d,hi.d*lo.d),zero=rat(0n);
 const px=v=>span.n===0n?300:90+Number((v.n*lo.d-lo.n*v.d)*span.d)/Number(v.d*lo.d*span.n)*420;
 const zeroInside=cmp(lo,zero)<=0&&cmp(hi,zero)>=0;
 const caption=span.n===0n?'Beide Angaben liegen auf demselben Punkt.':'Vergrößerter Ausschnitt zwischen den beiden Zahlen.'+(zeroInside?' Die Null liegt im Ausschnitt.':cmp(hi,zero)<0?' Die Null liegt rechts außerhalb.':' Die Null liegt links außerhalb.');
 return box('Weiter rechts bedeutet größer','<svg viewBox="0 0 600 110" role="img" aria-label="'+E(displayA+' und '+displayB+' am Zahlenstrahl. '+caption)+'"><path d="M20 65H580m-8 -5 8 5-8 5" stroke="currentColor" fill="none"/>'+(zeroInside?'<path d="M'+px(zero)+' 58v14" stroke="currentColor"/><text x="'+px(zero)+'" y="97" text-anchor="middle">0</text>':'')+'<circle cx="'+px(a)+'" cy="65" r="6" fill="#783d53"/><text x="'+px(a)+'" y="24" text-anchor="middle">'+E(displayA)+'</text><circle cx="'+px(b)+'" cy="65" r="6" fill="#326b82"/><text x="'+px(b)+'" y="45" text-anchor="middle">'+E(displayB)+'</text></svg><p>'+E(caption)+'</p>');
}
const phase=(ask,why,picture,trap)=>({ask,why,picture,trap});
function conversionPath(value,from,to,chooseUnit=false){
 const a=parse(value),u=units[from];if(!u)throw Error('Wähle eine bekannte Einheit.');if(a.n<0n)throw Error('Nimm für diese Größenaufgabe eine nicht negative Zahl. Negative Zahlen kannst du im Vergleichsweg untersuchen.');
 if(chooseUnit)to=choose(value,from);
 const result=convert(value,from,to),v=units[to],ratio=rat(u.factor,v.factor),down=u.factor>v.factor,same=u.factor===v.factor,op=down?'·':':',factor=down?ratio.n:ratio.d;
 const out=[];
 out.push(phase('Was ist gegeben, und was soll am Ende dastehen?',['Die gegebene Maßzahl ist '+fmt(a)+'. Die Einheit ist '+from+'.',chooseUnit?'Gesucht ist eine kleinere Einheit, bei der die neue Maßzahl ganz ist.':'Gesucht ist dieselbe Größe in '+to+'.','Zahl und Einheit gehören zusammen. Die Größe selbst bleibt unverändert.'],box('Start und Ziel','<div class="basis-equation">'+E(fmt(a)+' '+from)+' → ? '+(chooseUnit?'kleinere Einheit':E(to))+'</div>'),'Nur die Einheit austauschen: Dann würdest du eine andere Größe beschreiben.'));
 if(chooseUnit){
  const candidates=unitGroups[u.kind].filter(([,f])=>BigInt(f)<u.factor);let html='<ul>';
  for(const [name]of candidates){const r=convert(value,from,name);html+='<li>'+E(name+': Faktor '+(u.factor/units[name].factor))+' — '+(integer(r)?'damit entsteht eine ganze Maßzahl, die Einheit passt':'danach bleiben Nachkommastellen, wähle kleiner')+'</li>';if(name===to)break;}
  out.push(phase('Wie findest du die erste passende kleinere Einheit?',['Gehe in der Einheitenreihe nach rechts.','Rechne zur nächsten angebotenen kleineren Einheit um. Bleibt ein Komma, gehe weiter.','Hier passt '+to+'. Andere noch kleinere Einheiten können ebenfalls richtig sein.'],box('Die Einheit begründet wählen',html+'</ul>'),'Die Einheit willkürlich wählen, ohne zu prüfen, ob die Maßzahl ganz wird.'));
 }
 out.push(phase('Ist die Zieleinheit größer oder kleiner?',same?['Beide Einheiten sind gleich. Die Maßzahl ändert sich nicht.']:['Die Zieleinheit '+to+' ist '+(down?'kleiner':'größer')+' als '+from+'.',a.n===0n?'Bei null bleibt auch die neue Maßzahl null.':down?'Für dieselbe positive Größe brauchst du mehr kleine Einheiten. Die Maßzahl wird größer.':'Für dieselbe positive Größe brauchst du weniger große Einheiten. Die Maßzahl wird kleiner.'],ladder(u.kind,from,to),'Kleinere Einheit heißt nicht kleinere Maßzahl. Viele kleine Stücke können ein großes Stück ersetzen.'));
 out.push(phase('Welche Umrechnungszahl brauchst du?',same?['Der Faktor ist 1.']:['Die Einheitenbeziehung lautet: 1 '+(down?from:to)+' = '+factor+' '+(down?to:from)+'.',u.kind==='area'?'Bei benachbarten Quadrat-Einheiten gilt 10 · 10 = 100, weil Länge und Breite zählen.':u.kind==='volume'?'Bei benachbarten Kubik-Einheiten gilt 10 · 10 · 10 = 1000, weil drei Richtungen zählen.':u.kind==='time'?'Bei Stunden und Minuten gilt 60. Hier darfst du das Komma nicht einfach verschieben.':'Lies jeden Pfeil zwischen Start und Ziel. Multipliziere die Faktoren bei mehreren Pfeilen.'],box('Eine ganze Einheit als Anker','<div class="basis-equation">1 '+E(down?from:to)+' = '+factor+' '+E(down?to:from)+'</div>')+dimensionPicture(u.kind),'Bei Flächen oder Rauminhalten den Längenfaktor 10 nehmen oder bei der Zeit mit 100 rechnen.'));
 if(same){out.push(phase('Was ist bei gleicher Einheit zu tun?',['Du kannst die Angabe unverändert abschreiben.'],equation(fmt(a),'·','1',fmt(result)),'Ohne Einheitenwechsel die Maßzahl verändern.'));}
 else if(u.kind==='time'){
  out.push(phase('Musst du malnehmen oder teilen?', [down?'Du wechselst zur kleineren Einheit: mal '+factor+'.':'Du wechselst zur größeren Einheit: durch '+factor+'.',fmt(a)+' '+op+' '+factor+' ist die gesuchte Rechnung.'],box('Die Rechnung aufstellen','<div class="basis-equation">'+E(fmt(a)+' '+op+' '+factor)+' = ?</div>'),'90 Minuten als 0,90 Stunden schreiben. Eine Stunde hat 60 Minuten, nicht 100.'));
  if(!down&&from==='min'&&to==='h'&&a.d===1n){const whole=a.n/60n,rest=a.n%60n;out.push(phase('Wie zerlegst du die Minuten in volle Stunden und einen Rest?',[whole+' volle Stunden enthalten '+whole*60n+' Minuten.','Es bleiben '+rest+' Minuten. Dieser Rest ist '+rest+'/60 einer Stunde.','Kürze den Restbruch: '+frac(rat(rest,60n))+'.'],box('Stunden und Rest','<div class="basis-equation">'+a.n+' min = '+whole+' h + '+rest+' min</div><div class="basis-strip"><span style="flex:'+Number(whole*60n||1n)+'">volle Stunden</span><span style="flex:'+Number(rest||1n)+'">Rest</span></div>'),'Den Rest als Hundertstel einer Stunde lesen. 30 Minuten sind eine halbe Stunde, nicht 0,30 Stunden.'));}
  if(!down&&from==='min'&&to==='h'&&a.d===1n){
   const whole=a.n/60n,rest=a.n%60n,part=rat(rest,60n),k=decimals(part),d=10n**BigInt(k),f=d/part.d;
   out.push(phase('Wie wird aus dem Minutenrest ein Teil einer Stunde?', ['Der Rest sind '+rest+'/60 Stunden. Gekürzt: '+frac(part)+' Stunden.','Erweitere oben und unten mit '+f+': '+(part.n*f)+'/'+d+' = '+fmt(part)+'.',rest+' Minuten entsprechen also '+fmt(part)+' Stunden.'],table([{label:'Stundenrest',value:part,pad:k}]),'30 Minuten als 0,30 Stunden schreiben. 30 von 60 sind eine Hälfte.'));
   out.push(phase('Wie setzt du ganze Stunden und Stundenrest zusammen?', ['Volle Stunden: '+whole+'.','Stundenrest: '+fmt(part)+'.','Zusammen: '+whole+' + '+fmt(part)+' = '+fmt(result)+' Stunden.'],equation(whole,'+',fmt(part),fmt(result)),'Die volle Stunde beim Umrechnen des Rests vergessen.'));
  }
  out.push(phase('Wie lautet das Ergebnis der Rechnung?',[fmt(a)+' '+op+' '+factor+' = '+fmt(result)+'.','Die Zieleinheit ist '+to+'.'],equation(fmt(a),op,factor,fmt(result)),'Die Einheit der Ausgangszahl hinter das neue Ergebnis schreiben.'));
 }else{
  const count=factor.toString().length-1;if(10n**BigInt(count)!==factor)throw Error('Für diese Einheit ist kein Zehnerfaktor hinterlegt.');
  out.push(phase('Wie viele Stellen und welche Richtung?', ['Die Umrechnungszahl '+factor+' hat '+count+' Null'+(count===1?'':'en')+'.','Das sind '+count+' Stellen nach '+(down?'rechts':'links')+'.','Die Ziffern behalten ihre Reihenfolge. In der Stellenwerttafel wandern sie '+(down?'nach links zu größeren Stellen':'nach rechts zu kleineren Stellen')+'.'],table([{label:'Start',value:a}]),'Ziffern vertauschen oder beim Anhängen einer Null zwischen bestehende Ziffern greifen.'));
  for(let i=1;i<=count;i++){const before=mul(a,down?rat(10n**BigInt(i-1)):rat(1n,10n**BigInt(i-1))),after=mul(a,down?rat(10n**BigInt(i)):rat(1n,10n**BigInt(i)));out.push(phase('Was geschieht bei Stelle '+i+' von '+count+'?', [fmt(before)+' '+(down?'· 10':': 10')+' = '+fmt(after)+'.',down?'Jede Ziffer zählt jetzt zehnmal so viel.':'Jede Ziffer zählt jetzt nur noch ein Zehntel so viel.','Fehlende Plätze füllst du mit Nullen. Ganze Zahlen haben ein unsichtbares Komma rechts hinter der Einerziffer.'],table([{label:'vorher',value:before},{label:'nachher',value:after}]),'Eine nötige Null weglassen. Der Platz einer Ziffer bestimmt ihren Wert.'));}
 }
 out.push(phase('Was schreibst du auf, und wie prüfst du es?', [fmt(a)+' '+from+' = '+fmt(result)+' '+to+'.',same?'Die Angabe ist unverändert.':'Rückwärts: '+fmt(result)+' '+(down?':':'·')+' '+factor+' = '+fmt(a)+'.',chooseUnit?'Die Maßzahl ist ganz. Damit ist die Bedingung „ohne Komma“ erfüllt.':a.n===0n?'Null bleibt null, unabhängig von der gewählten Einheit.':u.kind==='time'?'Prüfe zusätzlich: 1 h entspricht 60 min.':down?'Die kleinere Einheit hat die größere Maßzahl.':'Die größere Einheit hat die kleinere Maßzahl.'],box('Ergebnis und Rückprobe','<div class="basis-equation">'+E(fmt(a)+' '+from+' = '+fmt(result)+' '+to)+'</div>'),'Nur die Zahl ohne Zieleinheit hinschreiben.'));
 return{task:fmt(a)+' '+from+' → '+(chooseUnit?'eine passende kleinere Einheit ohne Komma':to),phases:out,result:fmt(result)+' '+to};
}
function compareConversion(value){
 const k=decimals(value),d=10n**BigInt(k),f=d/value.d,n=value.n*f,out=[];
 if(f!==1n){
  out.push(phase('Welche Malzahl führt vom Nenner '+value.d+' zum Zehnernenner?', ['Mit dem Nenner '+d+' lassen sich die Stellen nach dem Komma direkt lesen.','Suche die fehlende Malzahl: '+value.d+' · ? = '+d+'.','Die Malzahl ist '+f+', denn '+d+' : '+value.d+' = '+f+'.'],box('Den passenden Nenner herstellen','<div class="basis-equation">'+value.d+' · '+f+' = '+d+'</div>'),'Den Nenner durch '+d+' ersetzen, ohne den Zähler mitzunehmen.'));
  out.push(phase('Was passiert gleichzeitig mit dem Zähler?', ['Multipliziere oben und unten mit '+f+'.','Zähler: '+value.n+' · '+f+' = '+n+'.','Nenner: '+value.d+' · '+f+' = '+d+'.'],box('Den Wert erhalten','<div class="basis-equation">'+value.n+'/'+value.d+' = '+n+'/'+d+'</div>'),'Nur unten multiplizieren. Zähler und Nenner müssen denselben Faktor erhalten.'));
 }
 out.push(phase('Wie liest du '+n+'/'+d+' als Kommazahl?', ['Nenner '+d+' bedeutet '+k+' Stellen nach dem Komma.','Trage den Zähler passend in die Stellenwerttafel ein. Leere Stellen bekommen eine Null.','Die Kommazahl ist '+fmt(value)+'.'],table([{label:frac(value),value,pad:k}]),'Den Zähler einfach hinter das Komma schreiben und nötige Nullen weglassen.'));
 return out;
}
function comparisonPath(left,right){
 const a=parse(left),b=parse(right),fa=String(left),fb=String(right),sign=cmp(a,b),symbol=sign<0?'<':sign>0?'>':'=',neg=a.n<0n&&b.n<0n;let finite=true,pad=0;try{pad=Math.max(decimals(a),decimals(b),...([left,right].map(x=>/^[-−]?\d+[,.]\d+$/.test(String(x))?String(x).split(/[,.]/)[1].length:0)));}catch(_){finite=false;}
 const out=[phase('Was bedeuten die drei Vergleichszeichen?',['Die offene Seite zeigt zur größeren Zahl. Die Spitze zeigt zur kleineren.','< bedeutet kleiner, > bedeutet größer, = bedeutet gleich groß.'],box('Die Zeichen lesen','<div class="basis-equation">2 &lt; 5 &nbsp; · &nbsp; 5 &gt; 2 &nbsp; · &nbsp; 5 = 5</div>'),'Nur die Form des Zeichens auswendig lernen, ohne den Satz von links nach rechts zu lesen.')];
 if(finite)for(const [input,value]of [[left,a],[right,b]])if(String(input).includes('/')){
  const m=String(input).replace('−','-').match(/^(-?)(\d+) (\d+)\/(\d+)$/);
  if(m)out.push(phase('Wie wandelst du die gemischte Zahl in einen Bruch um?', ['Multipliziere den ganzen Teil mit dem Nenner. Addiere danach den Zähler.','Hier: '+m[2]+' · '+m[4]+' + '+m[3]+' = '+(BigInt(m[2])*BigInt(m[4])+BigInt(m[3]))+'.','Ein Minus gilt für die gesamte Zahl.'],box('Ganze und Bruchteile verbinden','<div class="basis-equation">'+E(input+' = '+frac(value))+'</div>'),'Den ganzen Teil und den Zähler einfach addieren, ohne den Nenner zu beachten.'));
  out.push(...compareConversion(value));
 }
 out.push(phase('Steht ein Minus vor einer Zahl?', ['Ohne Minus ist eine positive Zahl größer als jede negative Zahl. Null ist größer als jede negative Zahl.',neg?'Beide Zahlen sind negativ. Vergleiche zuerst ihre Abstände zu null. Am Ende ist der größere Abstand die kleinere Zahl.':'Vergleiche bei gleichem positiven Vorzeichen die Stellen von links nach rechts.'],box('Vorzeichen zuerst','<div class="basis-equation">'+E(fa)+' &nbsp; ? &nbsp; '+E(fb)+'</div>'),'Ein Minus übersehen oder bei zwei negativen Zahlen die gewöhnliche positive Reihenfolge übernehmen.'));
 if((a.n<0n)===(b.n<0n)&&finite){
  const aa=rat(abs(a.n),a.d),bb=rat(abs(b.n),b.d);
  out.push(phase('Wie machst du die Stellen gut vergleichbar?', ['Schreibe Einer unter Einer, Zehntel unter Zehntel und Hundertstel unter Hundertstel.','Nur am Ende nach dem Komma darfst du Nullen ergänzen. Der Wert bleibt gleich.'],table([{label:'links: Abstand',value:aa,pad},{label:'rechts: Abstand',value:bb,pad}]),'0,45 mit 0,445 nur nach der Anzahl der Ziffern vergleichen.'));
  const sa=fmt(aa,pad).split(','),sb=fmt(bb,pad).split(','),size=Math.max(sa[0].length,sb[0].length);const da=(sa[0].padStart(size,'0')+(sa[1]||'')).split(''),db=(sb[0].padStart(size,'0')+(sb[1]||'')).split('');
  for(let i=0;i<da.length;i++){const p=size-1-i,label=placeNames[p]||('Stelle '+p),diff=da[i]!==db[i];out.push(phase('Was zeigen die '+label+'?', ['Links steht '+da[i]+', rechts '+db[i]+'.',diff?'Hier unterscheiden sich die Zahlen zum ersten Mal. Diese Stelle entscheidet; spätere Stellen können das nicht ändern.':i===da.length-1?'Alle Stellen sind gleich. Die beiden Angaben haben denselben Wert.':'Diese Stelle ist gleich. Vergleiche die nächste Stelle rechts davon.'],box('Von links nach rechts','<div class="basis-digit-pair"><span>'+da.map((d,j)=>'<i class="'+(j===i?'basis-focus':'')+'">'+d+(j===size-1&&pad?',':'')+'</i>').join('')+'</span><span>'+db.map((d,j)=>'<i class="'+(j===i?'basis-focus':'')+'">'+d+(j===size-1&&pad?',':'')+'</i>').join('')+'</span></div>'),'Nach einer entscheidenden Stelle mit einer späteren Ziffer die Entscheidung wieder ändern.'));if(diff)break;}
 }
 if(!finite){
  for(const [input,value]of [[left,a],[right,b]]){
   const m=String(input).replace('−','-').match(/^(-?)(\d+) (\d+)\/(\d+)$/);
   if(m){const n=BigInt(m[2])*BigInt(m[4])+BigInt(m[3]);out.push(phase('Wie schreibst du '+input+' als einen Bruch?', ['Der ganze Teil besteht aus '+m[2]+' · '+m[4]+' = '+BigInt(m[2])*BigInt(m[4])+' Bruchteilen.','Addiere den Bruchzähler: '+BigInt(m[2])*BigInt(m[4])+' + '+m[3]+' = '+n+'.',m[1]?'Das Minus gilt für die ganze Zahl. Der neue Zähler ist −'+n+'.':'Der neue Zähler ist '+n+'.'],box('Ganze und Bruchteile verbinden','<div class="basis-equation">'+E(input+' = '+frac(value))+'</div>'),'Den ganzen Teil und den Zähler addieren, ohne die Ganzen zuerst in Bruchteile zu zerlegen.'));}
  }
  const d=a.d/gcd(a.d,b.d)*b.d,na=a.n*(d/a.d),nb=b.n*(d/b.d),ka=d/a.d,kb=d/b.d;
  const multiples=(den,k)=>k<=12n?Array.from({length:Number(k)},(_,i)=>String(den*BigInt(i+1))).join(', '):den+' · '+k+' = '+d;
  out.push(phase('Wie findest du einen gemeinsamen Nenner?', ['Suche eine Zahl, die in beiden Malreihen vorkommt.','Malreihe von '+a.d+': '+multiples(a.d,ka)+'.','Malreihe von '+b.d+': '+multiples(b.d,kb)+'. Gemeinsamer Nenner: '+d+'.'],box('Gleich große Bruchteile finden','<div class="basis-equation">'+a.d+' · '+ka+' = '+d+'<br>'+b.d+' · '+kb+' = '+d+'</div>'),'Die Zähler direkt vergleichen, obwohl die Teile noch unterschiedlich groß sind.'));
  for(const [v,k,n]of [[a,ka,na],[b,kb,nb]])out.push(phase('Wie erweiterst du '+frac(v)+' auf den Nenner '+d+'?', ['Die passende Malzahl ist '+k+'.','Zähler: '+v.n+' · '+k+' = '+n+'.','Nenner: '+v.d+' · '+k+' = '+d+'. Der Wert bleibt gleich.'],box('Oben und unten dieselbe Malzahl','<div class="basis-equation">'+v.n+'/'+v.d+' = '+n+'/'+d+'</div>'),'Nur den Nenner verändern. Dann wäre der Bruch nicht mehr gleich viel.'));
  out.push(phase('Was entscheidet bei gleichem Nenner?', ['Die Teile sind jetzt gleich groß. Vergleiche die Zähler mit ihren Vorzeichen.',na<0n&&nb<0n?'Bei zwei negativen Zahlen ist die Zahl mit dem größeren Abstand von null kleiner.':'Der größere Zähler beschreibt mehr gleich große Teile.','Es gilt '+na+' '+symbol+' '+nb+'. Also gilt auch '+na+'/'+d+' '+symbol+' '+nb+'/'+d+'.'],box('Gleich große Teile vergleichen','<div class="basis-equation">'+na+' '+E(symbol)+' '+nb+'</div>'),'Bei negativen Zählern die Vorzeichen weglassen.'));
 }
 out.push(phase(neg?'Wie wirkt sich das Minus auf die Reihenfolge aus?':'Welche Zahl liegt weiter rechts?', [neg?'Je größer der Abstand links von null, desto kleiner ist die negative Zahl.':'Auf dem Zahlenstrahl ist die Zahl weiter rechts größer.',fa+' '+symbol+' '+fb+'.'],linePicture(a,b,fa,fb),'−0,70 für größer als −0,65 halten, weil 70 größer als 65 ist.'));
 out.push(phase('Wie liest du dein Ergebnis als Satz?', [fa+' ist '+(sign<0?'kleiner als':sign>0?'größer als':'gleich groß wie')+' '+fb+'.','Prüfe: Die offene Seite des Zeichens zeigt zur größeren Zahl.'],box('Das passende Zeichen','<div class="basis-equation">'+E(fa+' '+symbol+' '+fb)+'</div>'),'Das richtige Zahlenpaar finden, aber das Zeichen andersherum schreiben.'));
 return{task:left+' ? '+right,phases:out,result:fa+' '+symbol+' '+fb};
}
function firstDifference(a,b,pad){
 if((a.n<0n)!==(b.n<0n))return{focus:null,why:['Eine negative Zahl ist kleiner als null und als jede positive Zahl. Die Vorzeichen entscheiden schon.']};
 const aa=fmt(rat(abs(a.n),a.d),pad).split(','),bb=fmt(rat(abs(b.n),b.d),pad).split(','),left=Math.max(aa[0].length,bb[0].length),da=aa[0].padStart(left,'0')+(aa[1]||''),db=bb[0].padStart(left,'0')+(bb[1]||'');
 const i=[...da].findIndex((d,j)=>d!==db[j]);if(i<0)return{focus:null,why:['Alle Stellen stimmen überein. Endnullen ändern den Wert nicht. Die Zahlen sind gleich groß.']};
 const focus=left-1-i,neg=a.n<0n&&b.n<0n;
 return{focus,why:['Alle Stellen links davon sind gleich. Die erste unterschiedliche Stelle: '+placeNames[focus]+'. Links steht '+da[i]+', rechts '+db[i]+'.',neg?'Ohne Minus gilt '+fmt(rat(abs(a.n),a.d),pad)+(da[i]>db[i]?' > ':' < ')+fmt(rat(abs(b.n),b.d),pad)+'. Mit Minus kehrt sich die Reihenfolge um.':'Die größere Ziffer an dieser ersten unterschiedlichen Stelle gehört zur größeren Zahl.']};
}
function gapPath(left,right,symbol){
 if(((left+' '+right).match(/□/g)||[]).length!==1||!['<','>','='].includes(symbol))throw Error('Setze genau ein Kästchen □ in eine der beiden Zahlen.');
 const out=[phase('Was verlangt das Zeichen, und an welcher Stelle steht die Lücke?',['Das Kästchen steht für genau eine Ziffer: 0 bis 9.','Die übrigen Ziffern und das Vorzeichen bleiben unverändert.','Das Zeichen '+symbol+' verlangt '+(symbol==='<'?'echt kleiner':symbol==='>'?'echt größer':'genau gleich')+'.'],box('Die Aufgabe lesen','<div class="basis-equation">'+E(left+' '+symbol+' '+right)+'</div>'),'Die Ziffer 0 vergessen oder bei < und > Gleichheit zulassen.')],answers=[];
 for(let d=0;d<=9;d++){
  const l=left.replace('□',String(d)),r=right.replace('□',String(d)),a=parse(l),b=parse(r),c=cmp(a,b),ok=symbol==='<'?c<0:symbol==='>'?c>0:c===0;
  if(ok)answers.push(d);
  const pad=Math.max(...[l,r].map(x=>(x.split(/[,.]/)[1]||'').length)),proof=firstDifference(a,b,pad);
  out.push(phase('Passt die Ziffer '+d+'?', ['Setze nur diese Ziffer ein: '+l+' '+symbol+' '+r+'.',...proof.why,fmt(a,pad)+' ist '+(c<0?'kleiner als':c>0?'größer als':'gleich groß wie')+' '+fmt(b,pad)+'.',ok?'Die verlangte Aussage stimmt. Merke diese Ziffer.':'Die verlangte Aussage stimmt nicht. Diese Ziffer passt nicht.'],table([{label:'links',value:a,pad},{label:'rechts',value:b,pad}],proof.focus),a.n<0n&&b.n<0n?'Die Vorzeichen weglassen und die Abstände unverändert vergleichen. Bei zwei negativen Zahlen kehrt sich die Reihenfolge um.':'Nur die eingesetzte Ziffer vergleichen. Du musst die vollständigen Zahlen und ihre erste unterschiedliche Stelle beachten.'));
 }
 out.push(phase('Hast du wirklich alle passenden Ziffern gefunden?',['Alle zehn Ziffern wurden geprüft.','Passend: '+(answers.length?answers.join(', '):'keine')+'.','Lies mit jeder passenden Ziffer die ganze Aussage nochmals.'],box('Vollständige Auswahl','<div class="basis-units">'+Array.from({length:10},(_,i)=>'<span class="'+(answers.includes(i)?'basis-to':'')+'">'+i+'</span>').join('')+'</div>'),'Nach der ersten richtigen Ziffer aufhören, obwohl alle passenden Ziffern gefragt sind.'));
 return{task:left+' '+symbol+' '+right,phases:out,result:answers.join(', ')||'Keine passende Ziffer'};
}
function sortPath(input){
 const original=Array.isArray(input)?input:String(input).split(';').map(x=>x.trim()).filter(Boolean);
 if(original.length<2||original.length>8)throw Error('Schreibe zwei bis acht Zahlen, getrennt durch Semikolon.');
 const values=original.map(text=>({text,value:parse(text)}));values.forEach(x=>decimals(x.value));
 const out=[phase('Was bedeutet: Ordne der Größe nach?', ['Beginne mit der kleinsten Zahl. Die Zahlen werden nach rechts größer.','Die Antwort wird mit < verbunden. Gleiche Werte verbindest du mit =.'],box('Noch nicht geordnet','<div class="basis-equation">'+original.map(E).join('; ')+'</div>'),'In der Reihenfolge des Arbeitsblatts abschreiben, ohne die Werte zu vergleichen.')];
 for(const x of values){
  if(x.text.includes('/'))out.push(...compareConversion(x.value));
 }
 const pad=Math.max(...values.map(x=>decimals(x.value)));
 out.push(phase('Wie bereitest du alle Zahlen zum Vergleichen vor?', ['Schreibe die Kommas untereinander.','Ergänze nur Endnullen nach dem Komma. Alle Zahlen behalten ihren Wert.'],table(values.map(x=>({label:x.text,value:x.value,pad}))),'Nullen mitten in die Zahl einsetzen.'));
 const remaining=[...values],ordered=[];
 while(remaining.length>1){let best=0;for(let j=1;j<remaining.length;j++){
  const a=remaining[best],b=remaining[j],c=cmp(a.value,b.value),take=c>0,proof=firstDifference(a.value,b.value,pad);
  out.push(phase('Welche der beiden Zahlen ist kleiner?', [a.text+' = '+fmt(a.value,pad)+'; '+b.text+' = '+fmt(b.value,pad)+'.',...proof.why,take?b.text+' ist kleiner. Vergleiche mit dieser Zahl weiter.':a.text+(c===0?' ist gleich groß. Beide behalten ihren Platz.':' ist kleiner. Vergleiche mit dieser Zahl weiter.')],table([{label:a.text,value:a.value,pad},{label:b.text,value:b.value,pad}],proof.focus),'Nach einer großen ersten Ziffer eine spätere kleine Ziffer als entscheidend ansehen.'));
  if(take)best=j;
 }
 const chosen=remaining.splice(best,1)[0];ordered.push(chosen);
 out.push(phase('Welche Zahl steht jetzt als Nächstes in der Reihe?', [chosen.text+' ist die kleinste der noch übrigen Zahlen.','Schreibe sie rechts an die bisherige Reihe. Suche danach die kleinste der übrigen Zahlen.'],box('Bisher geordnet','<div class="basis-equation">'+ordered.map((x,i)=>(i?(cmp(ordered[i-1].value,x.value)===0?' = ':' &lt; '):'')+E(x.text)).join('')+'</div>'),'Eine schon eingeordnete Zahl nochmals verwenden oder eine Zahl auslassen.'));
 }
 ordered.push(remaining[0]);let result=ordered[0].text;
 for(let i=1;i<ordered.length;i++)result+=' '+(cmp(ordered[i-1].value,ordered[i].value)===0?'=':'<')+' '+ordered[i].text;
 out.push(phase('Wie prüfst du die vollständige Reihenfolge?', ['Die Reihe lautet: '+result+'.','Prüfe jedes benachbarte Paar. Links darf der Wert nie größer sein.','Jede ursprüngliche Zahl muss genau einmal vorkommen. Schreibe wieder die ursprünglichen Brüche und Kommazahlen.'],box('Vollständige Reihe','<div class="basis-equation">'+E(result)+'</div>'),'Nur die umgewandelten Zahlen notieren, wenn die ursprünglichen Angaben geordnet werden sollen.'));
 return{task:'Beginne mit der kleinsten Zahl: '+original.join('; '),phases:out,result};
}
function fractionPath(value,direction){
 const a=parse(value),out=[];
 if(direction==='decimal'){
  const k=decimals(a),target=10n**BigInt(k),factor=target/a.d,n=a.n*factor;
  out.push(phase('Wie liest du den Bruch?', ['Zähler: '+a.n+'. Nenner: '+a.d+'.','Der Nenner sagt, in wie viele gleich große Teile ein Ganzes geteilt ist.','Ein Minus bleibt bei allen Umformungen erhalten.'],box('Zähler und Nenner','<div class="basis-equation">'+E(frac(a))+'</div>'),'Den Zähler als Zahl vor dem Komma und den Nenner als Zahl dahinter schreiben.'));
  out.push(phase('Welcher Nenner 10, 100 oder 1000 passt?', ['Der gekürzte Nenner '+a.d+' muss auf eine Zehnerpotenz erweitert werden.','Hier passt '+target+'. '+a.d+' · '+factor+' = '+target+'.','Erweitern ändert nur die Einteilung, nicht den Wert.'],equation(a.d,'·',factor,target),'Den Nenner auf 100 setzen, ohne zu prüfen, ob eine ganze Malzahl passt.'));
  out.push(phase('Was musst du gleichzeitig am Zähler tun?', ['Multipliziere oben und unten mit derselben Zahl '+factor+'.',a.n+' · '+factor+' = '+n+'.',frac(a)+' = '+n+'/'+target+'.'],box('Beide Zahlen gleich behandeln','<div class="basis-equation">'+a.n+' · '+factor+'<br>────────<br>'+a.d+' · '+factor+'</div>'),'Nur den Nenner erweitern. Dann ändert sich der Bruchwert.'));
  out.push(phase('An welcher Nachkommastelle endet der Zähler?', ['Nenner '+target+' bedeutet '+k+' Nachkommastelle'+(k===1?'':'n')+'.','Fülle leere Stellen mit Nullen. Zum Beispiel 7/100 = 0,07.','Das Ergebnis lautet '+fmt(a)+'.'],table([{label:'Kommazahl',value:a,pad:k}]),'7/100 als 0,7 schreiben. 0,7 sind sieben Zehntel.'));
 }else{
  const original=String(value).replace('−','-').replace('.',',');if(!/^-?\d+(,\d+)?$/.test(original))throw Error('Gib hier eine Kommazahl ein, zum Beispiel −0,125.');
  const k=(original.split(',')[1]||'').length,target=10n**BigInt(k),n=BigInt(original.replace(',','')),g=gcd(n,target);
  out.push(phase('Wie viele Stellen stehen hinter dem Komma?', ['In '+value+' sind es '+k+' Nachkommastelle'+(k===1?'':'n')+'.','Jede Stelle zählt: Zehntel, Hundertstel, Tausendstel.'],table([{label:'gegeben',value:a,pad:k}]),'Nullen innerhalb einer Zahl überlesen.'));
  out.push(phase('Welcher Nenner gehört dazu?', ['Bei '+k+' Nachkommastellen ist der Nenner '+target+'.','Die Ziffern ohne Komma ergeben den Zähler '+n+'.',value+' = '+n+'/'+target+'.'],box('Stellen werden Bruchteile','<div class="basis-equation">'+E(value)+' = '+n+'/'+target+'</div>'),'Die Anzahl der Ziffern vor dem Komma für den Nenner mitzählen.'));
  let cn=n,cd=target;
  while(gcd(cn,cd)>1n){
   const f=cn%2n===0n&&cd%2n===0n?2n:5n,nextn=cn/f,nextd=cd/f;
   out.push(phase('Kannst du Zähler und Nenner noch durch '+f+' teilen?', [f===2n?'Beide Zahlen sind gerade. Ihre letzte Ziffer ist 0, 2, 4, 6 oder 8.':'Beide Zahlen enden auf 0 oder 5. Beide lassen sich deshalb durch 5 teilen.','Teile oben und unten durch dieselbe Zahl '+f+'.',cn+' : '+f+' = '+nextn+'; '+cd+' : '+f+' = '+nextd+'.'],box('Ein Kürzungsschritt','<div class="basis-equation">'+cn+'/'+cd+' = ('+cn+' : '+f+') / ('+cd+' : '+f+') = '+nextn+'/'+nextd+'</div>'),'Nur eine Zahl teilen oder ohne Prüfung behaupten, der Bruch sei schon vollständig gekürzt.'));
   cn=nextn;cd=nextd;
  }
  out.push(phase('Welcher gekürzte Bruch bleibt?', [value+' = '+frac(a)+'.','Zähler und Nenner haben jetzt keinen gemeinsamen Teiler größer als 1.'],box('Gleicher Wert','<div class="basis-equation">'+E(value+' = '+frac(a))+'</div>'),'Ein Minus beim Kürzen verlieren.'));
 }
 out.push(phase('Wie prüfst du die Umwandlung?', ['Bruch und Kommazahl müssen denselben Wert haben.','Ein Bruch kleiner als 1 muss eine Kommazahl kleiner als 1 ergeben.','Ein Minus bleibt ein Minus. Prüfe Zähler, Nenner und die Anzahl der Nachkommastellen.'],box('Rückblick','<div class="basis-equation">'+E(frac(a)+' = '+fmt(a))+'</div>'),'Nur das Ergebnis abschreiben, ohne Stellenzahl und Vorzeichen zu prüfen.'));
 return{task:value+' → '+(direction==='decimal'?'Kommazahl':'vollständig gekürzter Bruch'),phases:out,result:direction==='decimal'?fmt(a):frac(a)};
}
const Core={parse,rat,fmt,convert,choose,cmp,conversionPath,comparisonPath,gapPath,sortPath,fractionPath};host.MerkheftBasis=Core;
if(typeof document==='undefined')return;
const topic=document.body.dataset.topic;if(!['groessen','dezimalvergleich','dezimal'].includes(topic))return;
const mount=document.querySelector('#learn-pane');if(!mount)return;
const root=document.createElement('section');root.className='basis-course';root.id='grundlagenweg';
root.innerHTML='<h2>Schritt für Schritt selbst herleiten</h2><p>Wähle deinen Aufgabentyp. Du kannst die Zahlen aus deinem Blatt einsetzen. Jeder Gedanke erscheint einzeln.</p><div class="basis-paths"></div><form class="basis-form"></form><div class="basis-error" role="alert"></div><div class="basis-reader" hidden></div>';
const intro=mount.querySelector('.dv-intro');if(intro)intro.after(root);else mount.prepend(root);
const paths=topic==='groessen'?[['convert','Einheit vorgegeben'],['choose','Ohne Komma schreiben'],['time','Minuten und Stunden']]:topic==='dezimalvergleich'?[['compare','Zahlen vergleichen'],['gap','Alle Ziffern für eine Lücke'],['order','Zahlen ordnen']]:[['fraction','Bruch → Kommazahl'],['decimal','Kommazahl → Bruch']];
let mode=paths[0][0],path=null,index=0,shown=false;
const menu=root.querySelector('.basis-paths'),form=root.querySelector('form'),reader=root.querySelector('.basis-reader'),error=root.querySelector('.basis-error');
const field=(id,label,value)=>'<label for="basis-'+id+'">'+label+'<input id="basis-'+id+'" name="'+id+'" value="'+E(value)+'" autocomplete="off" spellcheck="false"></label>';
const select=(id,label,values,value)=>'<label for="basis-'+id+'">'+label+'<select id="basis-'+id+'" name="'+id+'">'+values.map(x=>'<option value="'+E(x)+'"'+(x===value?' selected':'')+'>'+E(x)+'</option>').join('')+'</select></label>';
function config(){path=null;reader.hidden=true;error.textContent='';menu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.basisMode===mode)));
 if(['convert','choose','time'].includes(mode)){
  const all=mode==='time'?['h','min','s']:Object.keys(units).filter(u=>units[u].kind!=='time');
  form.innerHTML=field('value','Gegebene Maßzahl',mode==='choose'?'1,5':mode==='time'?'90':'2,35')+select('from','Gegebene Einheit',all,mode==='choose'?'kg':mode==='time'?'min':'km')+(mode==='choose'?'':select('to','Gesuchte Einheit',all,mode==='time'?'h':'m'));
  const from=form.elements.from,to=form.elements.to;if(to)from.addEventListener('change',()=>{const kind=units[from.value].kind;const old=to.value;to.innerHTML=unitGroups[kind].map(([u])=>'<option>'+E(u)+'</option>').join('');if(units[old]?.kind===kind)to.value=old;});
  if(to){const selected=to.value,kind=units[from.value].kind;to.innerHTML=unitGroups[kind].map(([u])=>'<option>'+E(u)+'</option>').join('');to.value=selected;}
 }else if(mode==='compare')form.innerHTML=field('left','Linke Zahl (auch Brüche möglich)','−2,004')+field('right','Rechte Zahl','−1,9999');
 else if(mode==='gap')form.innerHTML=field('pattern','Linke Zahl (□ für eine Lücke)','−73,08')+select('symbol','Vergleichszeichen',['<','>','='],'<')+field('right','Rechte Zahl (□ für eine Lücke)','−7□,88');
 else if(mode==='order')form.innerHTML=field('values','Zahlen mit Semikolon trennen','1/5; 0,3; 9/10; 0,56; 3/50; 63/100');
 else form.innerHTML=field('value',mode==='fraction'?'Bruch, zum Beispiel 5/8':'Kommazahl, zum Beispiel −0,125',mode==='fraction'?'5/8':'−0,125');
 form.insertAdjacentHTML('beforeend','<button type="submit">Meinen Denkweg beginnen</button>');
}
for(const [key,label]of paths){const b=document.createElement('button');b.type='button';b.dataset.basisMode=key;b.textContent=label;b.addEventListener('click',()=>{mode=key;config();});menu.append(b);}
function render(){reader.hidden=false;const s=path.phases[index],previous=index?path.phases[index-1]:null;
 reader.innerHTML='<div class="basis-task"><b>Deine Aufgabe</b><p>'+E(path.task)+'</p></div><p class="basis-status">Gedanke '+(index+1)+' von '+path.phases.length+'</p><h3 tabindex="-1">'+E(s.ask)+'</h3>'+(shown?s.picture:previous?'<details><summary>Bild zum vorigen Gedanken</summary>'+previous.picture+'</details>':'<p>Schau zuerst auf die gegebenen Zahlen und Einheiten.</p>')+(shown?'<ul>'+s.why.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul><details class="basis-trap"><summary>Warum dieser andere Weg scheitert</summary><p>'+E(s.trap)+'</p></details>':'<p>Überlege kurz. Wenn du noch keinen Anfang findest, lass dir diesen einen Gedanken erklären.</p>')+'<div class="basis-actions"><button type="button" data-basis-action="back"'+(index===0?' disabled':'')+'>← Ein Gedanke zurück</button>'+(shown?index<path.phases.length-1?'<button type="button" data-basis-action="next">Nächsten Gedanken überlegen →</button>':'<p class="basis-result"><b>Ergebnis: '+E(path.result)+'</b></p>':'<button type="button" data-basis-action="reveal">Diesen Gedanken erklären</button>')+'<button type="button" data-basis-action="reset">Ohne Lösung neu beginnen</button></div>';
}
form.addEventListener('submit',e=>{e.preventDefault();error.textContent='';try{const f=form.elements;path=['convert','choose','time'].includes(mode)?conversionPath(f.value.value,f.from.value,f.to?.value,mode==='choose'):mode==='compare'?comparisonPath(f.left.value,f.right.value):mode==='gap'?gapPath(f.pattern.value,f.right.value,f.symbol.value):mode==='order'?sortPath(f.values.value):fractionPath(f.value.value,mode==='fraction'?'decimal':'fraction');index=0;shown=false;render();reader.querySelector('h3').focus();}catch(err){reader.hidden=true;error.textContent=err.message;}});
reader.addEventListener('click',e=>{const action=e.target.closest('[data-basis-action]')?.dataset.basisAction;if(!action)return;if(action==='next'){index++;shown=false;}else if(action==='back'){index--;shown=true;}else if(action==='reset'){index=0;shown=false;}else shown=true;render();reader.querySelector('h3').focus();});
form.addEventListener('input',()=>{reader.hidden=true;path=null;error.textContent='';});
config();
})(typeof window==='undefined'?globalThis:window);
