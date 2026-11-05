'use strict';
(()=>{
 const root=document.getElementById('groessen-werkstatt');if(!root)return;
 // Die neue handlungsorientierte Werkstatt bleibt im Lernregister ganz oben.
 root.parentElement.prepend(root);
 const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
 const data={
  '1':[
   ['a','2','m','dm','length'],['b','2,35','km','m','length'],['c','42','ct','€','money'],
   ['d','0,423','dm³','m³','volume'],['e','4','cm','dm','length'],['f','0,81','cm²','mm²','area'],
   ['g','17','m³','dm³','volume'],['h','280,4','cm³','mm³','volume'],['i','7,8','t','kg','mass']],
  '2':[
   ['a','1,5','kg',null,'mass'],['b','23,5','dm',null,'length'],['c','1,001','t',null,'mass'],
   ['d','6,08','m',null,'length'],['e','31,030','kg',null,'mass'],['f','21,099','km',null,'length'],
   ['g','56,56','€',null,'money'],['h','100,043','km',null,'length'],['i','23,7','cm',null,'length']],
  '3':[
   ['a','2140','g','kg','mass'],['b','523','mm','cm','length'],['c','12,2','kg','t','mass'],
   ['d','252','m','km','length'],['e','300000','g','kg','mass'],['f','90','min','h','time'],
   ['g','666','ct','€','money'],['h','42,2','m','dm','length'],['i','321','dm','m','length']]
 };
 const sets={
  length:{name:'Länge',units:[['km',1000000],['hm',100000],['dam',10000],['m',1000],['dm',100],['cm',10],['mm',1]],message:'Wie lang ist etwas? Auf dem Meterstab entsprechen 100 cm genau 1 m.'},
  mass:{name:'Masse (Gewicht)',units:[['t',1000000000],['kg',1000000],['g',1000],['mg',1]],message:'Wie schwer ist etwas? Tausend Gramm ergeben ein Kilogramm.'},
  money:{name:'Geld',units:[['€',100],['ct',1]],message:'100 Cent sind ein Euro. Das Geld bleibt gleich viel wert.'},
  area:{name:'Fläche',units:[['km²',1000000000000],['ha',10000000000],['a',100000000],['m²',1000000],['dm²',10000],['cm²',100],['mm²',1]],message:'Eine Fläche hat Länge und Breite. Deshalb werden aus einem großen Quadrat 10 × 10 = 100 kleinere Quadrate.'},
  volume:{name:'Rauminhalt',units:[['m³',1000000000],['dm³',1000000],['cm³',1000],['mm³',1]],message:'Ein Raum hat Länge, Breite und Höhe. Deshalb werden aus einem großen Würfel 10 × 10 × 10 = 1.000 kleine Würfel.'},
  time:{name:'Zeit',units:[['h',3600],['min',60],['s',1]],message:'Zeit ist eine Ausnahme: Eine Stunde hat 60 Minuten – nicht 100. Das Komma lässt sich deshalb nicht einfach verschieben.'}
 };
 const names=Object.keys(sets), nfmt=n=>new Intl.NumberFormat('de-DE',{maximumFractionDigits:9}).format(Math.abs(n)<1e-10?0:n);
 const approx=n=>Math.round(n*1e12)/1e12;
 const number=s=>Number(String(s).replace(',','.'));
 const byUnit=(s,kind)=>sets[kind].units.find(x=>x[0]===s)?.[1];
 const taskLabel=(q,mode)=>q[1]+' '+q[2]+(mode==='2'?' → ohne Komma':(' → '+q[3]));
 const state={mode:'1',letter:'b',stage:0,kind:null,to:null,direction:null,factor:null,zoom:0,layer:1,steps:0,feedback:'',hint:false};
 const modeText={'1':'1 · Faktor und Kommarichtung','2':'2 · Ohne Komma schreiben','3':'3 · Als Kommazahl schreiben'};
 const q=()=>data[state.mode].find(x=>x[0]===state.letter)||data[state.mode][0];
 const target=()=>state.mode==='2'?state.to:q()[3];
 const ready=()=>{const a=q(),to=target();return !!to&&!!byUnit(a[2],a[4])&&!!byUnit(to,a[4]);};
 const ratio=()=>{const a=q();return byUnit(a[2],a[4])/byUnit(target(),a[4]);};
 const factor=()=>Math.round(Math.max(ratio(),1/ratio()));
 const direction=()=>ratio()>1?'up':ratio()<1?'down':'same';
 const answer=()=>approx(number(q()[1])*ratio());
 const placeCount=()=>direction()==='same'?0:Math.round(Math.log10(factor()));
 const escapeHTML=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 function resetProgress(){state.stage=0;state.kind=null;state.to=null;state.direction=null;state.factor=null;state.zoom=0;state.layer=1;state.steps=0;state.feedback='';state.hint=false;}
 function updatePicker(){
  const options=data[state.mode].map(x=>'<option value="'+x[0]+'"'+(x[0]===state.letter?' selected':'')+'>'+state.mode+x[0]+' · '+escapeHTML(taskLabel(x,state.mode))+'</option>').join('');
  $('#gw-select').innerHTML=options;
  $$('[data-gw-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gwMode===state.mode)));
 }
 function canNext(){
  return state.stage===0?state.kind===q()[4]:state.stage===1?ready():state.stage===2?state.direction===direction()&&state.factor===factor():state.stage===3?state.steps===(q()[4]==='time'?2:placeCount()):false;
 }
 const note=(s,good=false)=>'<p class="gw-feedback'+(good?' gw-good':'')+'" role="status">'+s+'</p>';
 const clickButtons=(items,attr)=>items.map(x=>'<button type="button" '+attr+'="'+escapeHTML(x.value)+'" aria-pressed="'+(String(x.value)===String(x.selected))+'">'+escapeHTML(x.label)+'</button>').join('');
 function renderTop(){
  $('#gw-statement').textContent='Schulbuchaufgabe '+state.mode+q()[0]+': '+taskLabel(q(),state.mode);
  $('#gw-progress').innerHTML=['Größenart','Bild entdecken','Faktor entscheiden','Komma herleiten','Ergebnis prüfen'].map((x,i)=>'<span class="'+(state.stage===i?'gw-current':i<state.stage?'gw-done':'')+'">'+(i+1)+' · '+x+'</span>').join('');
  $('#gw-prev').disabled=state.stage===0;
  $('#gw-next').hidden=state.stage===4;
  $('#gw-next').disabled=!canNext();
  $('#gw-next').textContent=state.stage===3?'Zur Kontrolle →':'Nächsten Gedanken →';
 }
 function stepZero(){
  const a=q();
  const headline=state.mode==='1'?'Du sollst den Faktor und die Kommarichtung finden.':state.mode==='2'?'Du sollst dieselbe Größe ohne Komma schreiben.':'Du sollst dieselbe Größe in der Zieleinheit als Kommazahl schreiben.';
  return '<h3>Was wird überhaupt gemessen?</h3><p>'+headline+'</p><div class="gw-question"><b>'+escapeHTML(a[1]+' '+a[2])+'</b><span>→</span><b>'+(state.mode==='2'?'eine passende kleinere Einheit':escapeHTML(a[3]))+'</b></div>'+
   '<p>Entscheide zuerst: Um welche Größenart geht es? Die hochgestellte ² bedeutet Fläche; die hochgestellte ³ bedeutet Rauminhalt.</p>'+
   '<div class="gw-choices gw-kind" role="group" aria-label="Größenart auswählen">'+clickButtons(names.map(k=>({label:sets[k].name,value:k,selected:state.kind})),'data-gw-kind')+'</div>'+
   (state.kind===a[4]?note('<b>Das passt:</b> '+sets[a[4]].message,true):state.feedback?note(state.feedback):'<p class="gw-muted">Tippe auf eine Größenart. Erst danach beginnt der Bildweg.</p>');
 }
 function unitOptions(){
  const a=q(),list=sets[a[4]].units,scale=byUnit(a[2],a[4]),smaller=list.filter(x=>x[1]<scale);
  const preferred=smaller.find(x=>Math.abs(number(a[1])*scale/x[1]-Math.round(number(a[1])*scale/x[1]))<1e-8);
  const candidates=[a[2],...smaller.map(x=>x[0])].filter((x,i,r)=>r.indexOf(x)===i);
  return {candidates,preferred:preferred?.[0]||null};
 }
 function ladder(){
  const a=q(),to=target();if(!to)return '';
  const arr=sets[a[4]].units,ia=arr.findIndex(x=>x[0]===a[2]),ib=arr.findIndex(x=>x[0]===to);
  const start=Math.min(ia,ib),end=Math.max(ia,ib);
  return '<div class="gw-chain" aria-label="Einheiten in Größenfolge">'+arr.slice(start,end+1).map((x,i,r)=>'<span>'+x[0]+'</span>'+(i<r.length-1?'<i>→ × '+arr[start+i][1]/arr[start+i+1][1]+'</i>':'')).join('')+'</div>'+
   '<p class="gw-muted">In der Reihe stehen die größeren Einheiten links und die kleineren rechts. Beim Zurückgehen wird geteilt.</p>';
 }
 function bars10(zoom,max,unit){
  const small=max/Math.pow(10,zoom+1),large=max/Math.pow(10,zoom);
  const label=v=>nfmt(v);
  return '<div class="gw-ten">'+Array.from({length:10},(_,i)=>'<button type="button" data-gw-zoom-piece="'+i+'" aria-label="Teil '+(i+1)+' ansehen">'+label(small)+'<small>'+unit+'</small></button>').join('')+'</div>'+
    '<p><b>'+label(large)+' kleine Stücke</b> werden zu <b>10 Gruppen mit je '+label(small)+'</b>. '+(zoom<Math.round(Math.log10(max))-1?'Tippe auf eine Gruppe, um sie weiter in zehn Stücke zu zerlegen.':'Jetzt siehst du die kleinste Stückgröße in dieser Aufgabe.')+'</p>';
 }
 function visual(){
  const a=q(),k=a[4],to=target();if(!to)return '';
  const f=factor(),big=byUnit(a[2],k)>byUnit(to,k)?a[2]:to,small=big===a[2]?to:a[2];
  const common='<p class="gw-visual-title">Wir betrachten <b>1 '+big+'</b> und zerlegen es in kleinere Stücke. Die Größe selbst bleibt gleich.</p>';
  if(k==='length'||k==='mass'||k==='money'){
   const maxZoom=Math.round(Math.log10(f));
   const zoom=Math.min(state.zoom,Math.max(0,maxZoom-1));
   return common+'<div class="gw-feature">'+bars10(zoom,f,small)+'</div><div class="gw-toolrow"><button type="button" data-gw-zoom-back '+(zoom===0?'disabled':'')+'>← Zusammenfassen</button><button type="button" data-gw-zoom-next '+(zoom===maxZoom-1?'disabled':'')+'>Ein Teilstück vergrößern →</button></div>'+
    '<p class="gw-muted">Ein großes Stück enthält '+nfmt(f)+' kleinere. Die Gruppen im Bild sind eine Vergrößerungsdarstellung, keine maßstabsgetreue Länge oder Masse.</p>';
  }
  if(k==='area'){
   const cells=Array.from({length:100},(_,i)=>'<span'+(i<state.layer*10?' class="gw-marked"':'')+' aria-hidden="true"></span>').join('');
   return common+'<div class="gw-grid-head"><span>10 kleine Quadrate in jeder Reihe</span><span>10 Reihen</span></div><div class="gw-square" role="img" aria-label="Quadrat mit 10 Reihen und 10 Spalten, insgesamt 100 kleine Quadrate">'+cells+'</div>'+
    '<div class="gw-toolrow"><label for="gw-rows">Wie viele der zehn Reihen färbst du? <output>'+state.layer+'</output></label><input type="range" id="gw-rows" min="1" max="10" value="'+state.layer+'"></div>'+
    '<p><b>'+state.layer+' × 10 = '+(state.layer*10)+'</b> kleine Quadrate. Ganze Fläche: 10 × 10 = <b>100</b>. Die zweite Richtung macht den Unterschied zu gewöhnlichen Längen.</p>'+
    (f!==100?'<p class="gw-muted">Bei mehreren Flächenschritten wiederholst du die Unterteilung in 100 kleinere Quadrate.</p>':'');
  }
  if(k==='volume'){
   const layer=state.layer;
   let svg='<svg viewBox="0 0 370 155" role="img" aria-label="Aufeinanderliegende Schichten mit jeweils 100 Würfeln" class="gw-cube-svg">';
   for(let i=0;i<10;i++){const y=125-i*10;svg+='<path d="M65 '+y+' L230 '+(y-30)+' L314 '+(y-5)+' L147 '+(y+25)+' Z" fill="'+(i<layer?'#9dc6d6':'#edf2f5')+'" stroke="#406b7e" opacity="'+(i<layer?'.9':'.5')+'"/>';}
   svg+='</svg>';
   const squares=Array.from({length:100},(_,i)=>'<span'+(i<100?' class="gw-marked"':'')+' aria-hidden="true"></span>').join('');
   return common+'<div class="gw-cube-row"><div>'+svg+'</div><div class="gw-mini-square" role="img" aria-label="Eine Schicht hat 10 mal 10, also 100 kleine Würfel">'+squares+'</div></div>'+
    '<div class="gw-toolrow"><label for="gw-layers">Wie viele Schichten stapelst du? <output>'+layer+'</output></label><input id="gw-layers" type="range" min="1" max="10" value="'+layer+'"></div>'+
    '<p>Jede Schicht enthält <b>10 × 10 = 100 Würfel</b>. '+layer+' Schichten enthalten <b>'+layer+' × 100 = '+(layer*100)+'</b> Würfel. Zehn Schichten ergeben <b>1.000</b>.</p>'+
    (f!==1000?'<p class="gw-muted">Bei mehreren Würfelschritten wiederholst du diese Tausender-Unterteilung.</p>':'');
  }
  if(k==='time'){
   const mins=number(a[1]),hours=Math.floor(mins/60),rest=mins%60;
   const marks=Array.from({length:60},(_,i)=>'<span class="'+(i<Math.min(rest,60)?'gw-lit':'')+'"></span>').join('');
   return '<p>Eine Stunde enthält <b>60 Minuten</b> – deshalb ist die Komma-Regel mit 10, 100 oder 1.000 hier falsch.</p>'+
    '<div class="gw-time-visual"><div class="gw-clock">'+marks+'</div><div><b>'+mins+' Minuten</b><p>'+hours+' ganze Stunde'+(hours===1?'':'n')+' ('+(hours*60)+' min) und '+rest+' Minuten bleiben übrig.</p><p>Die restlichen Minuten werden als Teil von 60 betrachtet: '+rest+'/60 Stunde.</p></div></div>';
  }
  return '';
 }
 function stepOne(){
  const a=q(),isChoice=state.mode==='2',opts=isChoice?unitOptions():null;
  let html='<h3>Die Einheiten im Bild verstehen</h3>';
  if(isChoice){
   html+='<p>Du willst <b>'+escapeHTML(a[1]+' '+a[2])+'</b> ohne Komma schreiben. Wähle eine kleinere Einheit. Eine passende Einheit macht aus den Nachkommastellen ganze kleine Teile.</p>'+
    '<div class="gw-choices" role="group" aria-label="Kleinere Einheit auswählen">'+clickButtons(opts.candidates.map(u=>({label:u,value:u,selected:state.to})),'data-gw-to')+'</div>';
   if(state.to)html+=note(state.feedback||'Du hast '+escapeHTML(state.to)+' gewählt. Vergleiche die kleinen und großen Einheiten.',ready());
  }
  if(ready()){
   const to=target(),smaller=ratio()>1;
   html+= '<p><b>Gegeben:</b> '+escapeHTML(a[1]+' '+a[2])+'. <b>Ziel:</b> dieselbe Größe in <b>'+escapeHTML(to)+'</b>.</p>'+
    ladder()+'<div class="gw-visual">'+visual()+'</div>';
  }else if(!isChoice)html+=note('Für dieses Beispiel ist keine gültige Zieleinheit vorhanden.');
  return html;
 }
 function stepTwo(){
  if(!ready())return note('Wähle zuerst die Zieleinheit.');
  const a=q(),f=factor(),k=a[4],r=ratio();
  const wanted=direction(),sel=state.direction;
  const opts=[10,100,1000,10000,100000,1000000,60].filter((x,i,arr)=>arr.indexOf(x)===i&&(x===f||x===10||x===100||x===1000||x===60));
  let html='<h3>Wird die Zahl größer oder kleiner?</h3><p><b>'+escapeHTML(a[1]+' '+a[2])+'</b> soll in <b>'+escapeHTML(target())+'</b> angegeben werden. Es bleibt dieselbe Länge, Masse, Fläche, derselbe Rauminhalt, Geldwert oder Zeitraum.</p>'+
   '<div class="gw-choices" role="group" aria-label="Richtung auswählen">'+clickButtons([{value:'up',label:'Zahl wird größer',selected:sel},{value:'down',label:'Zahl wird kleiner',selected:sel},{value:'same',label:'Zahl bleibt gleich',selected:sel}],'data-gw-direction')+'</div>';
  if(sel)html+=note(sel===wanted?'Das passt. '+(wanted==='up'?'Die Zieleinheit ist kleiner: Du brauchst mehr Stücke.':wanted==='down'?'Die Zieleinheit ist größer: Du brauchst weniger Stücke.':'Die Einheit ist gleich.'):'Überlege: Wäre ein Betrag in Cent als Zahl größer oder kleiner als derselbe Betrag in Euro? Bei der Zeit fragst du nach 60 Minuten je Stunde.',sel===wanted);
  html+='<h3>Wie viele Stücke passen hinein?</h3><p>Schau auf dein Bild aus dem vorigen Schritt. Die Umrechnungszahl kommt von der <b>Größe eines ganzen Stücks</b>, nicht aus einer auswendig gelernten Kommaregel.</p>'+
   '<div class="gw-choices" role="group" aria-label="Umrechnungsfaktor auswählen">'+clickButtons(opts.map(x=>({value:x,label:'Faktor '+nfmt(x),selected:state.factor})),'data-gw-factor')+'</div>';
  if(state.factor)html+=note(state.factor===f?'<b>Der Faktor passt.</b> '+(k==='time'?'1 Stunde = 60 Minuten.':'1 '+(r>1?a[2]:target())+' besteht aus '+nfmt(f)+' '+(r>1?target():a[2])+'.'): 'Das passt noch nicht. '+(k==='area'?'Bei Quadraten musst du zwei Richtungen zählen: 10 × 10.':k==='volume'?'Bei Würfeln sind es drei Richtungen: 10 × 10 × 10.':k==='time'?'Eine Stunde hat 60 Minuten.':'Vergrößere die Stücke und zähle, wie viele kleine in ein großes passen.'),state.factor===f);
  if(state.hint)html+='<p class="gw-muted">Hilfsfrage: Welche Zahl muss ich rechnen, damit <b>1 große Einheit</b> genau in kleinere Einheiten zerlegt wird? Das Bild im vorigen Schritt zeigt die Teilung.</p>';
  return html;
 }
 // Bei ×10 bzw. ÷10 wird die Kommaposition in der Zahlenschreibweise verändert.
 function commaText(raw,delta){
  let str=String(raw).replace('.',','),pos=str.indexOf(',');
  if(pos<0)pos=str.length;
  let digits=str.replace(',','');
  pos+=delta;
  while(pos<1){digits='0'+digits;pos++;}
  while(pos>=digits.length){digits+='0';}
  while(pos>1&&digits.startsWith('0')){digits=digits.slice(1);pos--;}
  let before=digits.slice(0,pos),after=digits.slice(pos);
  return {display:before+','+after,html:'<span class="gw-comma-digits">'+digits.slice(0,pos).split('').map(x=>'<b>'+x+'</b>').join('')+'<em>,</em>'+digits.slice(pos).split('').map(x=>'<b>'+x+'</b>').join('')+'</span>'};
 }
 function stepThree(){
  const a=q(),k=a[4],f=factor(),d=direction(),total=k==='time'?2:placeCount(),done=state.steps;
  if(k==='time'){
   const x=number(a[1]),whole=Math.floor(x/60),remain=x-whole*60;
   let html='<h3>Hier gilt die 60er-Regel, nicht das Komma-Schieben</h3><p>Teile die Minuten zuerst in volle Stunden und einen Rest. Du darfst jeden Gedanken einzeln aufdecken.</p><div class="gw-result-process"><b>'+nfmt(x)+' min</b>';
   if(done>=1)html+='<span>→ '+nfmt(whole*60)+' min + '+nfmt(remain)+' min</span><p>'+whole+' volle Stunde'+(whole===1?'':'n')+', '+remain+' Minuten Rest.</p>';
   if(done>=2)html+='<span>→ '+whole+' h + '+nfmt(remain)+'/60 h = '+nfmt(whole+remain/60)+' h</span><p>30 von 60 Minuten sind eine halbe Stunde, also 0,5 h.</p>';
   html+='</div>';
   if(done<total)html+='<button type="button" class="gw-main" data-gw-advance>Gedanken aufdecken →</button>';
   else html+=note('Jetzt ist die Zeit in Stunden umgerechnet. Prüfe am Ende die Antwort.',true);
   return html;
  }
  const sign=d==='up'?1:-1,step=done*sign,inter=approx(number(a[1])*Math.pow(10,step));
  const noteText=d==='up'?'Bei × 10 rückt das Komma eine Stelle nach rechts. Die Ziffern bekommen größere Stellenwerte.':'Bei ÷ 10 rückt das Komma eine Stelle nach links. Die Ziffern bekommen kleinere Stellenwerte.';
  let html='<h3>Das Komma Schritt für Schritt verfolgen</h3><p><b>Rechenweg:</b> '+escapeHTML(a[1]+' '+a[2])+' '+(d==='up'?'× ':'÷ ')+nfmt(f)+' → '+escapeHTML(target())+'. <b>Ein Klick zeigt immer nur einen Zehnerschritt.</b></p>'+
   '<div class="gw-step-counter">Aufgedeckt: '+done+' von '+total+' Kommaschritten</div><div class="gw-number">'+commaText(a[1],step).html+'</div>'+
   '<div class="gw-muted">Zahl nach '+done+' '+(done===1?'Schritt':'Schritten')+': '+nfmt(inter)+(done===total?' '+escapeHTML(target()):' (Zwischenzahl, noch nicht das Endergebnis)')+'.</div>';
  if(done>0)html+='<div class="gw-feedback">'+noteText+' '+(done===total?'Die letzte Zahl erhält jetzt die Zieleinheit.':'Dieses Zwischenergebnis ist noch keine eigene Maßeinheit.')+'</div>';
  if(done<total)html+='<button type="button" class="gw-main" data-gw-advance>Einmal '+(d==='up'?'× 10':'÷ 10')+' zeigen →</button>';
  else html+=note('Alle '+total+' Kommaschritte sind sichtbar. Jetzt kannst du die neue Maßzahl überprüfen.',true);
  if(k==='area')html+='<p class="gw-muted">Achtung: Bei einem einzigen Schritt von cm² nach mm² sind es zwei Kommaschritte (× 100), weil das Quadrat in 10 × 10 Teile zerlegt wird.</p>';
  if(k==='volume')html+='<p class="gw-muted">Achtung: Bei einem einzigen Würfelschritt sind es drei Kommaschritte (× 1.000), weil 10 × 10 × 10 kleine Würfel hineinpassen.</p>';
  return html;
 }
 function stepFour(){
  const a=q(),val=answer(),k=a[4],f=factor(),d=direction(),to=target();
  let html='<h3>Die Antwort begründen und kontrollieren</h3><div class="gw-answer">'+escapeHTML(a[1]+' '+a[2])+' = '+nfmt(val)+' '+escapeHTML(to)+'</div>';
  if(state.mode==='1')html+='<p>Deine Schulbuchantwort: <b>Faktor '+nfmt(f)+'</b>, das Komma '+(d==='up'?'nach rechts':d==='down'?'nach links':'gar nicht')+' verschieben – <b>'+ (k==='time'?'mit 60 rechnen, nicht das Komma verschieben':placeCount()+' '+(placeCount()===1?'Stelle':'Stellen'))+'</b>.</p>';
  if(state.mode==='2')html+='<p>Die Maßzahl '+nfmt(val)+' enthält <b>kein Komma</b>. Die kleinere Einheit '+to+' ist deshalb eine passende Wahl.</p>';
  if(k==='length'&&a[1]==='2,35'&&a[2]==='km'&&to==='m'){
    html+='<h3>Besonders wichtig: Woher kommen die 2.350 Meter?</h3><div class="gw-decompose"><div><b>2 km</b><span>2.000 m</span></div><div><b>0,3 km</b><span>300 m</span></div><div><b>0,05 km</b><span>50 m</span></div></div><p>2.000 m + 300 m + 50 m = <b>2.350 m</b>. Erst diese Zerlegung erklärt, warum wir das Komma drei Stellen nach rechts rücken dürfen.</p>';
  }
  if(k==='area')html+='<p>Flächen-Kontrolle: In jeder Richtung passen zehn kleinere Strecken. Deshalb ergeben zwei Richtungen den Faktor 100.</p>';
  if(k==='volume')html+='<p>Raum-Kontrolle: Zehn Reihen, zehn Spalten und zehn Schichten ergeben 1.000 kleinere Würfel. Das ist ein anderer Faktor als bei einer Länge.</p>';
  if(k==='time')html+='<p>Probe: '+nfmt(val)+' Stunden × 60 Minuten = '+escapeHTML(a[1])+' Minuten.</p>';
  else html+='<p><b>Rückprobe:</b> '+nfmt(val)+' '+escapeHTML(to)+' '+(d==='up'?'÷':d==='down'?'×':'=')+' '+(d==='same'?'1 ':nfmt(f)+' = ')+escapeHTML(a[1]+' '+a[2])+'.</p>';
  html+='<p class="gw-muted">Kontrollfrage: Ist die Zieleinheit größer, muss die positive Maßzahl kleiner sein – und umgekehrt. Das gilt nur bei gleicher Größenart und positiver Länge/Masse/Fläche usw.</p>'+
    '<div class="gw-toolrow"><button type="button" data-gw-restart>Diese Aufgabe neu ohne Lösung beginnen</button><button type="button" data-gw-next-task>Nächsten Schulbuchteil wählen →</button></div>';
  return html;
 }
 function render(){
  updatePicker();
  $('#gw-stage').innerHTML=[stepZero,stepOne,stepTwo,stepThree,stepFour][state.stage]();
  renderTop();
 }
 $$('[data-gw-mode]').forEach(b=>b.addEventListener('click',()=>{state.mode=b.dataset.gwMode;state.letter=state.mode==='1'?'b':'a';resetProgress();render()}));
 $('#gw-select').addEventListener('change',e=>{state.letter=e.target.value;resetProgress();render()});
 $('#gw-prev').addEventListener('click',()=>{state.stage=Math.max(0,state.stage-1);state.feedback='';render()});
 $('#gw-next').addEventListener('click',()=>{if(!canNext())return;state.stage=Math.min(4,state.stage+1);state.feedback='';render()});
 $('#gw-reset').addEventListener('click',()=>{resetProgress();render()});
 root.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button||!root.contains(button))return;
  if(button.dataset.gwKind){state.kind=button.dataset.gwKind===q()[4]?q()[4]:null;state.feedback=state.kind?'':'Noch nicht. Überlege, ob du eine Strecke, ein Gewicht, Geld, eine Fläche, einen Raum oder Zeit misst.';}
  else if(button.dataset.gwTo){const u=button.dataset.gwTo,a=q(),old=state.to;const base=byUnit(a[2],a[4]),toF=byUnit(u,a[4]),num=number(a[1])*base/toF;
   if(toF>=base){state.to=null;state.feedback='Wähle eine kleinere Einheit als '+a[2]+'. Damit entstehen mehr kleine Teile.';}
   else if(Math.abs(num-Math.round(num))>1e-8){state.to=null;state.feedback='Hier bleibt eine Kommazahl. Gehe zu einer kleineren Einheit, bis ganze kleine Teile entstehen.';}
   else{state.to=u;state.zoom=0;state.feedback='Diese Einheit passt: Die Zahl lässt sich ohne Komma schreiben.';}
   if(old!==state.to){state.direction=null;state.factor=null;state.steps=0;}
  }
  else if(button.dataset.gwDirection){state.direction=button.dataset.gwDirection;state.steps=0;}
  else if(button.dataset.gwFactor){state.factor=Number(button.dataset.gwFactor);state.steps=0;}
  else if(button.hasAttribute('data-gw-zoom-piece')||button.hasAttribute('data-gw-zoom-next')){state.zoom=Math.min(state.zoom+1,Math.max(0,placeCount()-1));}
  else if(button.hasAttribute('data-gw-zoom-back')){state.zoom=Math.max(0,state.zoom-1);}
  else if(button.hasAttribute('data-gw-advance')){state.steps=Math.min(state.steps+1,q()[4]==='time'?2:placeCount());}
  else if(button.hasAttribute('data-gw-restart')){resetProgress();}
  else if(button.hasAttribute('data-gw-next-task')){const seq=data[state.mode],idx=seq.findIndex(x=>x[0]===state.letter);state.letter=seq[(idx+1)%seq.length][0];resetProgress();}
  else return;
  render();
 });
 root.addEventListener('input',e=>{
  if(e.target.id==='gw-layers'||e.target.id==='gw-rows'){
   state.layer=Number(e.target.value);render();
  }
 });
 render();
})();
