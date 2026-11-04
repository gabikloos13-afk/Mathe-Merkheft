'use strict';
// Der gleiche Bildvertrag für Einstieg, Denkzustand und Aufdeckung.
(()=>{
 const previous=window.MerkheftPictures;
 const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const svg=(body,alt)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" role="img" aria-label="'+esc(alt)+'">'+body+'</svg>';
 const text=(x,y,s,color='#326b82')=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" fill="'+color+'" font-size="22">'+esc(s)+'</text>';
 function pizza(stage){
  // Durchmesser im Verhältnis 1:2, daher Flächen im Verhältnis 1:4.
  // Flächenbalken sind Vergleichseinheiten, keine in den Kreis gelegten Pizzen.
  const smallOn=stage>=3,largeOn=stage>=2;
  let body='<defs><clipPath id="small-pizza"><circle cx="120" cy="85" r="32"/></clipPath><clipPath id="large-pizza"><circle cx="390" cy="85" r="64"/></clipPath></defs>';
  body+='<circle cx="120" cy="85" r="32" fill="#f3ece2" stroke="#326b82" stroke-width="2"/><circle cx="390" cy="85" r="64" fill="#f3ece2" stroke="#326b82" stroke-width="2"/>';
  if(smallOn)body+='<path d="M120 85V53A32 32 0 1 1 88 85Z" fill="#98536e"/>';
  if(largeOn)body+='<rect x="390" y="21" width="64" height="128" fill="#98536e" clip-path="url(#large-pizza)"/>';
  body+=text(120,145,'16 cm')+text(390,175,'32 cm');
  if(stage>=1){
   body+='<path d="M326 85H454M390 21V149" stroke="#326b82" stroke-width="2" stroke-dasharray="4 3"/>';

   const unit=56,x=165,y=232;
   body+='<rect x="'+x+'" y="'+y+'" width="'+unit+'" height="28" fill="#f3ece2" stroke="#326b82"/>';
   if(smallOn)body+='<rect x="'+x+'" y="'+y+'" width="42" height="28" fill="#98536e"/>';
   for(let i=0;i<4;i++)body+='<rect x="'+(x+i*unit)+'" y="278" width="'+unit+'" height="28" fill="'+(largeOn&&i<2?'#98536e':'#f3ece2')+'" stroke="#326b82"/>';
   body+=text(80,254,'klein')+text(80,300,'groß');

  }
  const alt=stage<1?'Zwei kreisförmige Pizzen mit Durchmessern sechzehn und zweiunddreißig Zentimeter.':stage===1?'Doppelte Breite und doppelte Höhe vervierfachen die Fläche.':stage===2?'Die Hälfte der großen Pizza entspricht zwei Flächen der kleinen.':stage===3?'Drei Viertel der kleinen Pizza sind weniger als eine kleine Pizza.':'Die Hälfte der großen Pizza ist größer als drei Viertel der kleinen.';
  return '<figure class="pizza-model"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 '+(stage>=1?320:190)+'" role="img" aria-label="'+alt+'">'+body+'</svg><figcaption>'+alt+(stage>=1?' Eine Balkeneinheit entspricht der Fläche der ganzen kleinen Pizza.':' Welche Wahl ergibt mehr Pizza?')+'</figcaption></figure>';
 }
 function amount(m,stage){
  if(m.kind==='fields'){
   let body='';for(let i=0;i<m.total;i++)body+='<rect x="'+(130+i%3*115)+'" y="'+(20+Math.floor(i/3)*70)+'" width="105" height="60" fill="'+(i<m.selected?'#98536e':'#f1e9e7')+'" stroke="#326b82"/>';
   return svg(body+text(300,198,stage<0?'Welche Bruchzahl passt?':stage===0?m.total+' gleich große Felder':stage===1?m.selected+' gefärbte Felder':m.selected+'/'+m.total),m.total+' gleich große Felder, davon '+m.selected+' gefärbt.');
  }
  const each=m.back?m.known/m.n:m.known/m.d,width=520/m.d;let body='';
  for(let i=0;i<m.d;i++){
   const x=40+i*width,known=!m.back||i<m.n||stage>=2,focus=stage===1?i===0:stage>=2?i<m.n:false;
   body+='<rect x="'+x+'" y="40" width="'+(width-8)+'" height="100" rx="8" fill="'+(focus?'#e5cbd7':known?'#e0edf1':'#fff')+'" stroke="#326b82" stroke-dasharray="'+(known?'0':'5 4')+'"/>';
   const label=stage<1?'?':stage===1&&i!==0?'?':known?each+' '+m.unit:'?';
   body+=text(x+(width-8)/2,100,label);
  }
  const caption=stage<0?(m.back?m.n+' von '+m.d+' Teilen sind zusammen '+m.known+' '+m.unit:'Das Ganze: '+m.known+' '+m.unit):stage===0?(m.back?'Bekannt: '+m.known+' '+m.unit+' für '+m.n+' Teile':'Das Ganze: '+m.known+' '+m.unit):stage===1?'Ein Teil: '+each+' '+m.unit:m.back?'Alle Teile: '+each*m.d+' '+m.unit:m.n+' Teile: '+each*m.n+' '+m.unit;
  return svg(body+text(300,190,caption),caption+'. Die '+m.d+' Felder sind gleich groß.');
 }
 function unitChoice(m,index){
  const body='<rect x="100" y="55" width="400" height="75" rx="12" fill="#e0edf1" stroke="#326b82"/>'+
   text(300,100,m.quantity+' '+m.from+' = '+(index<0?'? Einheit':index===0?'? '+m.to:index===1?'? '+m.to:m.result+' '+m.to))+
   (index===1?text(300,182,'Faktor: '+m.factor):index===2?text(300,182,'Die Masse bleibt gleich.'):text(300,182,'Welche kleinere Einheit passt?'));
  return svg(body,index<0?'Eine Masse von '+m.quantity+' '+m.from+'; kleinere Einheit gesucht.':index===0?'Eine mögliche Zieleinheit ist '+m.to+'.':index===1?'Umrechnungsfaktor '+m.factor+'.':m.quantity+' '+m.from+' sind '+m.result+' '+m.to+'.');
 }
 function initial(topic,id,r,mode){
  if(topic==='brueche'&&id===5)return pizza(-1);
  if(r.unitChoiceModel)return unitChoice(r.unitChoiceModel,-1);
  if(r.amountModel)return amount(r.amountModel,-1);
  // Die Vorschauen der Fachrenderer enthalten Gegebenes und keine Rechnung.
  // Eine Ausnahme: 3/8 wird im Beispiel als gegebener Vergleichswert gezeigt,
  // nicht als bereits ausgewählte Antwort markiert.
  return previous.render(topic,id,-1,r);
 }
 window.MerkheftPictures={
  ...previous,initial,
  render:(topic,id,index,r)=>topic==='brueche'&&id===5?pizza(index):r.unitChoiceModel?unitChoice(r.unitChoiceModel,index):previous.render(topic,id,index,r),
  learning:(topic,id,step,r)=>r.amountModel?amount(r.amountModel,step.source):previous.learning(topic,id,step,r)
 };
})();
