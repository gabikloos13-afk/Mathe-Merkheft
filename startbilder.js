'use strict';
// Der gleiche Bildvertrag für Einstieg, Denkzustand und Aufdeckung.
(()=>{
 const previous=window.MerkheftPictures;
 const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const svg=(body,alt)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" role="img" aria-label="'+esc(alt)+'">'+body+'</svg>';
 const text=(x,y,s,color='#326b82')=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" fill="'+color+'" font-size="22">'+esc(s)+'</text>';
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
  if(r.unitChoiceModel)return unitChoice(r.unitChoiceModel,-1);
  if(r.amountModel)return amount(r.amountModel,-1);
  // Die Vorschauen der Fachrenderer enthalten Gegebenes und keine Rechnung.
  // Eine Ausnahme: 3/8 wird im Beispiel als gegebener Vergleichswert gezeigt,
  // nicht als bereits ausgewählte Antwort markiert.
  return previous.render(topic,id,-1,r);
 }
 window.MerkheftPictures={
  ...previous,initial,
  render:(topic,id,index,r)=>r.unitChoiceModel?unitChoice(r.unitChoiceModel,index):previous.render(topic,id,index,r),
  learning:(topic,id,step,r)=>r.amountModel?amount(r.amountModel,step.source):previous.learning(topic,id,step,r)
 };
})();
