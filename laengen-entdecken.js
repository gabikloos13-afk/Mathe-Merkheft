'use strict';
(()=>{
const root=document.getElementById('len-hands');if(!root)return;
const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
const fmt=n=>new Intl.NumberFormat('de-DE',{maximumFractionDigits:3}).format(n);
const state={phase:0,count:0,understood:false,length:90,unit:'cm'};
const lengths=[90,100,125,35];
function bar(cm){
 const rows=cm>100?2:1;let html='';
 for(let r=0;r<rows;r++){
  const start=r*100;let blocks='';
  for(let b=0;b<10;b++){
   const base=start+b*10,filled=Math.max(0,Math.min(10,cm-base));
   const cells=Array.from({length:10},(_,i)=>'<span class="len-tick'+(base+i<cm?' filled':'')+'"></span>').join('');
   const tag=state.phase===0?'button':'div';
   const attr=state.phase===0?' type="button" data-len-block="'+b+'" aria-label="Bis '+((b+1)*10)+' cm legen"':'';
   blocks+='<'+tag+attr+' class="len-block'+(filled===10?' complete':filled>0?' partial':'')+'"><small>10 cm</small><span class="len-cells">'+cells+'</span></'+tag+'>';
  }
  html+='<div class="len-meter"><p class="len-meter-label">'+(r===0?'Erster Meter':'Zweiter Meter')+'</p><div class="len-bar">'+blocks+'</div><div class="len-axis"><span>'+start+' cm</span><span>'+(start+100)+' cm = '+(r+1)+' m</span></div></div>';
 }
 return html;
}
function explain(n,u){
 const d=Math.floor(n%100/10),c=n%10;
 if(u==='cm')return 'Du zählst die kleinen Zentimeter-Stücke. Die Strecke ist '+n+' cm lang.';
 if(u==='dm')return 'Je 10 cm bilden 1 dm: '+n+' : 10 = '+fmt(n/10)+' dm. Die restlichen Zentimeter werden Zehntel eines Dezimeters.';
 return '100 cm bilden 1 m: '+n+' : 100 = '+fmt(n/100)+' m. '+d+' volle Zehntel und '+c+' Hundertstel eines Meters. '+(n===90?'0,90 m ist genau dasselbe wie 0,9 m.':'');
}
function render(){
 qa('[data-len-phase]').forEach(b=>{
  const index=Number(b.dataset.lenPhase);
  b.setAttribute('aria-pressed',String(state.phase===index));
  b.disabled=(index===1&&state.count!==10)||(index===2&&!state.understood);
 });
 const cm=state.phase===0?state.count*10:state.phase===1?90:state.length;
 let html='';
 if(state.phase===0){
  html='<h3>Baue einen Meter – Stück für Stück</h3><p>Jedes breite Kästchen steht für <b>10 cm</b>. Lege zehn solcher Stücke nebeneinander. Du kannst die Kästchen antippen oder den Knopf benutzen.</p>'+bar(cm)+
   '<div class="len-readout"><strong>'+state.count+' von 10 Stücken gelegt</strong><span>Zusammen sind das '+cm+' cm.</span></div>'+
   '<div class="len-actions"><button class="len-main" data-len-add type="button" '+(state.count===10?'disabled':'')+'>+ 10 cm</button><button data-len-minus type="button" '+(state.count===0?'disabled':'')+'>− 10 cm</button><button data-len-reset type="button">Neu beginnen</button></div>';
  if(state.count===10)html+='<div class="len-success"><b>Jetzt ist der Streifen voll:</b> 10 mal 10 cm sind <b>100 cm</b>. Diese ganze Länge heißt <b>1 Meter</b>. Es ist keine neue Strecke entstanden.</div><div class="len-actions"><button class="len-main" data-len-next type="button">Weiter: 90 cm vergleichen →</button></div>';
 }
 if(state.phase===1){
  html='<h3>Sind 90 cm ein ganzer Meter?</h3><p>Auf dem gleichen Meterband sind jetzt <b>9 von 10 breiten Kästchen</b> gefüllt. Schau auf das rechte Ende.</p>'+bar(cm)+
   '<div class="len-readout"><strong>9 Stücke à 10 cm = 90 cm</strong><span>Das letzte 10-cm-Stück rechts ist noch leer.</span></div>'+
   '<p><b>Wie lang sind 90 cm verglichen mit 1 Meter?</b></p><div class="len-choices" role="group" aria-label="90 cm vergleichen"><button data-len-answer="less" type="button">Kürzer</button><button data-len-answer="equal" type="button">Gleich lang</button><button data-len-answer="more" type="button">Länger</button></div>'+
   '<div id="len-feedback" class="len-feedback'+(state.understood?' good':'')+'" role="status">'+(state.understood?'Du hast es gesehen: Für 1 m fehlen noch 10 cm. 90 cm sind <b>9 von 10 Teilen des Meters</b>. Diese neun breiten Stücke sind auch <b>9 dm</b>.':'Schau nach, wie viel vom ganzen Streifen noch leer ist. Du darfst es erneut versuchen.')+'</div>';
  if(state.understood)html+='<div class="len-actions"><button class="len-main" data-len-next type="button">Weiter: Die gleiche Strecke anders benennen →</button></div>';
 }
 if(state.phase===2){
  const n=state.length,digits=[Math.floor(n/100),Math.floor(n%100/10),n%10],order=['m','dm','cm'];
  const num=state.unit==='m'?fmt(n/100):state.unit==='dm'?fmt(n/10):fmt(n);
  html='<h3>Komma-Schieber: Ändere nur den Namen</h3><p>Die Strecke wird nicht länger und nicht kürzer. Wähle eine Strecke und dann die Einheit. <b>Die Ziffern stehen fest</b>; das Komma rückt zu einer anderen Einheitenstelle.</p>'+
   '<div class="len-switch" role="group" aria-label="Länge wählen">'+lengths.map(x=>'<button data-len-value="'+x+'" aria-pressed="'+(x===n)+'" type="button">'+x+' cm</button>').join('')+'</div>'+
   bar(n)+'<div class="len-readout"><strong>Die Strecke bleibt '+n+' cm lang.</strong><span>Nur die Beschriftung verändert sich.</span></div>'+
   '<div class="len-switch" role="group" aria-label="Einheit wählen">'+['cm','dm','m'].map(x=>'<button data-len-unit="'+x+'" aria-pressed="'+(x===state.unit)+'" type="button">In '+x+'</button>').join('')+'</div>'+
   '<div class="len-place" role="img" aria-label="Stellenwerttafel: '+digits[0]+' Meter, '+digits[1]+' Dezimeter, '+digits[2]+' Zentimeter">'+digits.map((x,i)=>'<div class="len-digit'+(order[i]===state.unit?' comma':'')+'"><small>'+order[i]+'</small><strong>'+x+'</strong></div>').join('')+'</div>'+
   '<p class="len-help">Das rote Komma steht hinter der Einheit, in der du messen möchtest. Rechts davon stehen die kleineren Teile.</p>'+
   '<div class="len-readout len-result"><strong>'+num+' '+state.unit+'</strong><span>'+explain(n,state.unit)+'</span></div>';
 }
 q('#len-scene').innerHTML=html;
 qa('[data-len-block]').forEach(b=>b.addEventListener('click',()=>{state.count=Number(b.dataset.lenBlock)+1;render()}));
 q('[data-len-add]')?.addEventListener('click',()=>{state.count=Math.min(10,state.count+1);render()});
 q('[data-len-minus]')?.addEventListener('click',()=>{state.count=Math.max(0,state.count-1);render()});
 q('[data-len-reset]')?.addEventListener('click',()=>{state.count=0;render()});
 q('[data-len-answer="less"]')?.addEventListener('click',()=>{state.understood=true;render()});
 for(const x of ['equal','more'])q('[data-len-answer="'+x+'"]')?.addEventListener('click',()=>{q('#len-feedback').textContent='Noch nicht: Das letzte Kästchen ist leer. Ein ganzer Meter hätte 10 gefüllte Stücke.'});
 qa('[data-len-next]').forEach(b=>b.addEventListener('click',()=>{state.phase=Math.min(2,state.phase+1);render()}));
 qa('[data-len-value]').forEach(b=>b.addEventListener('click',()=>{state.length=Number(b.dataset.lenValue);render()}));
 qa('[data-len-unit]').forEach(b=>b.addEventListener('click',()=>{state.unit=b.dataset.lenUnit;render()}));
}
qa('[data-len-phase]').forEach(b=>b.addEventListener('click',()=>{const x=Number(b.dataset.lenPhase);if(x===1&&state.count!==10||x===2&&!state.understood)return;state.phase=x;render()}));
render();
})();