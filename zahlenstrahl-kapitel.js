'use strict';
(()=>{
if(document.body.dataset.topic!=='zahlenstrahl')return;
const F=(n,d)=>`<span class="fraction" aria-label="${n} durch ${d}"><span>${n}</span><span>${d}</span></span>`;
const M=(w,n,d)=>`${w} ${F(n,d)}`;
const V=p=>Array.isArray(p)?p[0]/p[1]:p;
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const label=p=>Array.isArray(p)?F(p[0],p[1]):String(p).replace('-','−');
const point=(v,name='',value=false)=>({v,name,value});
const pic=(min,max,den,points=[],more={})=>({min,max,den,points,...more});
// Exakte Bruchbeschriftungen und aufgabenbezogene Zahlenstrahlen.
function fractionSvg(x,y,p,color='#493b50'){
 if(!Array.isArray(p))return `<text x="${x}" y="${y+7}" text-anchor="middle" fill="${color}" font-size="23">${E(String(p).replace('-','−'))}</text>`;
 const [n,d]=p,w=Math.max(String(n).length,String(d).length)*13+10;
 return `<g fill="${color}" aria-label="${n} durch ${d}"><text x="${x}" y="${y-6}" text-anchor="middle" font-size="22">${E(String(n).replace('-','−'))}</text><path d="M${x-w/2} ${y}h${w}" stroke="${color}" stroke-width="1.5"/><text x="${x}" y="${y+24}" text-anchor="middle" font-size="22">${d}</text></g>`;
}
function figure(s){
 if(!s)return '';
 const min=V(s.min),max=V(s.max),span=max-min,X=v=>40+(V(v)-min)/span*320;
 if(!(span>0))throw Error('Ungültiger Zahlenstrahlausschnitt');
 const ticks=s.slots?Array.from({length:s.slots+1},(_,i)=>min+span*i/s.slots):s.den?Array.from({length:Math.max(0,Math.floor(max*s.den+1e-8)-Math.ceil(min*s.den-1e-8)+1)},(_,i)=>(Math.ceil(min*s.den-1e-8)+i)/s.den):[min,max];
 let content='<path d="M35 92H369m-7-5 7 5-7 5" stroke="#326b82" stroke-width="2" fill="none"/>';
 ticks.forEach(v=>{const whole=Math.abs(v-Math.round(v))<1e-8;content+=`<path data-zs-tick="${v}" d="M${X(v)} ${whole?80:85}v${whole?24:14}" stroke="#326b82" stroke-width="1.5"/>`;if(whole&&!s.ends)content+=fractionSvg(X(v),135,Math.round(v));});
 if(s.ends){content+=fractionSvg(40,135,s.min)+fractionSvg(360,135,s.max);}
 if(s.segment){const a=X(s.segment[0]),b=X(s.segment[1]);content+=`<path d="M${a} 72H${b}" stroke="#a17624" stroke-width="6"/><path d="M${a} 66v12M${b} 66v12" stroke="#a17624" stroke-width="2"/>`;}
  if(s.direction==='left'&&min<=0&&max>=0){
   const a=X(0),distanceTarget=s.countTo!==undefined?V(s.countTo):-1/s.den,b=X(Math.max(min,Math.min(0,distanceTarget)));
   content+='<path d="M'+a+' 63 H'+b+' m8 -6 l-8 6 8 6" stroke="#8b4268" stroke-width="2.6" fill="none" stroke-linejoin="round"/>';
  }

 if(s.countTo!==undefined){const from=V(s.countFrom??0),to=V(s.countTo),count=Math.round(Math.abs(to-from)*s.den),dir=to>=from?1:-1;for(let i=0;i<count;i++){const a=from+dir*i/s.den,b=a+dir/s.den;content+=`<path d="M${X(a)} 108Q${X((a+b)/2)} 124 ${X(b)} 108" fill="none" stroke="#97506b" stroke-width="2"/>`;if(count<=8)content+=`<text x="${X((a+b)/2)}" y="129" text-anchor="middle" font-size="17" fill="#783d53">${i+1}</text>`;}}
 const values=[];
 for(const [i,p] of (s.points||[]).entries()){
  const value=V(p.v);if(value<min-1e-8||value>max+1e-8)continue;
  const x=X(value),y=p.value?(i%2?170:32):(i%2?178:55),color=p.value?'#783d53':'#326b82';
  content+=`<circle data-zs-point="${value}" cx="${x}" cy="92" r="6" fill="${color}"/><path d="M${x} ${y<92?y+27:105}V${y<92?83:y-26}" stroke="${color}" stroke-width="1.3"/>`;
  if(p.value){content+=fractionSvg(x,y,p.v,color);if(p.name)content+=`<text x="${x+25}" y="${y+5}" font-size="16" fill="${color}">${E(p.name)}</text>`;}else content+=`<text x="${x}" y="${y+6}" text-anchor="middle" font-size="23" fill="${color}">${E(p.name)}</text>`;
  values.push(p.name+(p.value?' = '+(Array.isArray(p.v)?p.v.join('/'):p.v):''));
 }
 return `<figure class="zs-picture" data-zs-min="${min}" data-zs-max="${max}" data-zs-den="${s.den}"><svg viewBox="${s.compact?'0 55 400 112':'0 0 400 218'}" role="img" aria-label="Zahlenstrahl von ${E(Array.isArray(s.min)?s.min.join('/'):s.min)} bis ${E(Array.isArray(s.max)?s.max.join('/'):s.max)}${values.length?'; '+E(values.join('; ')):''}">${content}</svg>${s.caption?`<figcaption>${s.caption}</figcaption>`:''}</figure>`;
}
const previous=window.MerkheftPictures;
window.MerkheftPictures={render:(topic,id,index,r)=>topic==='zahlenstrahl'?figure(index<0?r.preview:r.steps[index]?.picture):previous.render(topic,id,index,r),learning:(topic,id,s,r)=>topic==='zahlenstrahl'?figure(s.picture):previous.learning(topic,id,s,r)};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const normalize=([n,d])=>{if(d===0)throw Error('Nenner 0');if(d<0){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const mid=(a,b)=>normalize([a[0]*b[1]+b[0]*a[1],2*a[1]*b[1]]);
const snap=(ratio,start,span,den)=>Math.max(-24,Math.min(24,Math.round((start+Math.max(0,Math.min(1,ratio))*span)*den)));
window.MerkheftNumberline={figure,normalize,mid,snap};
function installTool(){
 const lab=document.querySelector('#werkzeug');if(!lab)return;
 lab.innerHTML=`<h2>Brüche auf der Zahlenlinie bewegen</h2><div id="zs-tool"><div class="zs-instruction">Verschiebe den Punkt um eine Bruchlücke. Beobachte Zahl und Richtung.</div><div class="zs-tool-board"></div><div class="zs-tool-answer" aria-live="polite"></div><div class="zs-move"><button type="button" data-zs-action="left">← Eine Lücke</button><button type="button" data-zs-action="right">Eine Lücke →</button></div><div class="zs-controls"><label for="zs-den">Nenner: Lücken je ganzer Einheit</label><select id="zs-den">${[2,3,4,5,6,8,10,12].map(d=>`<option value="${d}" ${d===4?'selected':''}>${d} Lücken</option>`).join('')}</select><label for="zs-num">Zähler: <output id="zs-num-out">3</output></label><input id="zs-num" type="range" min="-24" max="24" step="1" value="3"></div><div class="zs-view-actions"><button type="button" data-zs-action="pan-left">Ausschnitt nach links</button><button type="button" data-zs-action="pan-right">Ausschnitt nach rechts</button><button type="button" data-zs-action="zoom">Näher heran</button><button type="button" data-zs-action="center">Punkt wiederfinden</button><button type="button" data-zs-action="reset">Zurück zu drei Vierteln</button></div><div class="zs-tool-note"></div></div><details class="zs-magnifier"><summary>Zwischen zwei Brüchen weiter vergrößern</summary><div id="zs-zoom"><div class="zs-zoom-presets" role="group" aria-label="Grenzen wählen"><button type="button" data-zs-pair="0">${F(1,3)} bis ${F(2,3)}</button><button type="button" data-zs-pair="1">${F(18,17)} bis ${F(19,17)}</button><button type="button" data-zs-pair="2">−${F(3,4)} bis −${F(1,2)}</button></div><h3 id="zs-zoom-title"></h3><div class="zs-zoom-board"></div><div class="zs-zoom-actions"><button type="button" id="zs-zoom-back">← Zurück</button><span id="zs-zoom-status" aria-live="polite"></span><button type="button" id="zs-zoom-next">Weiter →</button></div></div></details>`;
 const root=lab.querySelector('#zs-tool'),board=root.querySelector('.zs-tool-board'),answer=root.querySelector('.zs-tool-answer'),note=root.querySelector('.zs-tool-note'),denInput=root.querySelector('#zs-den'),numInput=root.querySelector('#zs-num');
 let n=3,d=4,start=-1,span=3,dragging=false;
 function draw(){
  const value=n/d,visible=value>=start&&value<=start+span,[a,b]=normalize([n,d]);
  const s=pic(start,start+span,d,visible?[point([n,d],'P',true)]:[]);
  board.innerHTML=figure(s);
  if(visible){board.querySelector('svg').setAttribute('role','group');const dot=board.querySelector('[data-zs-point]');dot.dataset.zsHandle='point';dot.setAttribute('role','slider');dot.setAttribute('tabindex','0');dot.setAttribute('aria-label','Bruchpunkt verschieben');dot.setAttribute('aria-valuenow',String(value));dot.setAttribute('aria-valuemin',String(-24/d));dot.setAttribute('aria-valuemax',String(24/d));dot.setAttribute('aria-valuetext',n+' durch '+d);dot.setAttribute('r','10');}
  root.dataset.zsN=n;root.dataset.zsD=d;root.dataset.zsStart=start;root.dataset.zsSpan=span;
  answer.innerHTML=`<b>Punkt: ${F(n,d)}${a===n&&b===d?'':' = '+(b===1?String(a).replace('-','−'):F(a,b))}</b><span>Eine Lücke: ${F(1,d)}</span>`;
  note.innerHTML=`<ul><li>${visible?'Nach rechts: Zähler um 1 erhöhen. Nach links: Zähler um 1 verringern.':'Der Punkt liegt '+(value<start?'links':'rechts')+' außerhalb des Ausschnitts. Wähle „Punkt wiederfinden“.'}</li><li>Beim Verschieben des Ausschnitts bleibt der Bruch gleich.</li><li>Ein anderer Nenner verändert die Schrittgröße und damit den Wert des gewählten Bruchs.</li></ul>`;
  root.querySelector('#zs-num-out').textContent=n;numInput.value=n;denInput.value=d;
  root.querySelector('[data-zs-action="left"]').disabled=n<=-24;root.querySelector('[data-zs-action="right"]').disabled=n>=24;
  root.querySelector('[data-zs-action="zoom"]').textContent=span===3?'Näher heran':'Überblick zeigen';
 }
 root.addEventListener('input',e=>{if(e.target===numInput){n=+numInput.value;draw();}});
 denInput.addEventListener('change',()=>{d=+denInput.value;draw();});
 root.addEventListener('click',e=>{const a=e.target.closest('[data-zs-action]')?.dataset.zsAction;if(!a)return;
  if(a==='left')n=Math.max(-24,n-1);if(a==='right')n=Math.min(24,n+1);
  if(a==='pan-left')start--;if(a==='pan-right')start++;
  if(a==='zoom'){span=span===3?1:3;start=Math.floor(n/d)-(span===3?1:0);}
  if(a==='center')start=Math.floor(n/d)-(span===3?1:0);
  if(a==='reset'){n=3;d=4;start=-1;span=3;}draw();
 });
 function move(e){const svg=board.querySelector('svg'),r=svg.getBoundingClientRect(),ratio=((e.clientX-r.left)/r.width*400-40)/320;n=snap(ratio,start,span,d);draw();}
 board.addEventListener('pointerdown',e=>{e.preventDefault();dragging=true;board.setPointerCapture(e.pointerId);move(e);});
 board.addEventListener('pointermove',e=>{if(dragging)move(e);});
 board.addEventListener('pointerup',e=>{if(dragging){move(e);dragging=false;if(board.hasPointerCapture(e.pointerId))board.releasePointerCapture(e.pointerId);}});
 board.addEventListener('pointercancel',()=>{dragging=false;});
 board.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();n=e.key==='Home'?-24:e.key==='End'?24:Math.max(-24,Math.min(24,n+(e.key==='ArrowRight'?1:-1)));if(n/d<start||n/d>start+span)start=Math.floor(n/d)-(span===3?1:0);draw();board.querySelector('[data-zs-handle]')?.focus();});
 draw();
 const z=lab.querySelector('#zs-zoom'),pairs=[[[1,3],[2,3]],[[18,17],[19,17]],[[-3,4],[-1,2]]];let pair=0,phase=0;
 function zoom(){const [a,b]=pairs[pair],m=mid(a,b),inner=mid(a,m);let images='';
  images=figure(pic(a,b,0,phase>=2?[point(m,'M',true)]:[],{ends:true,slots:phase>=1?2:1,caption:phase===0?'Die beiden gegebenen Grenzen.':phase===1?'Teile ihren Abstand in zwei gleich große Lücken.':`Mitte M = ${label(m)}`}));
  if(phase===3)images+=figure(pic(a,m,0,[point(inner,'N',true)],{ends:true,slots:2,caption:`Vergrößerter linker Abschnitt: ${label(a)} < ${label(inner)} < ${label(m)}`}));
  z.querySelector('.zs-zoom-board').innerHTML=images;
  z.querySelector('#zs-zoom-title').textContent=['Die Grenzen ansehen','Den Abstand halbieren','Die genaue Mitte zeigen','Den linken Abschnitt noch einmal halbieren'][phase];
  z.querySelector('#zs-zoom-status').textContent='Bildschritt '+(phase+1)+' von 4';z.querySelector('#zs-zoom-back').disabled=phase===0;z.querySelector('#zs-zoom-next').textContent=phase===3?'Von vorn ansehen':'Weiter →';
  z.querySelectorAll('[data-zs-pair]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.zsPair===pair)));
 }
 z.addEventListener('click',e=>{const chosen=e.target.closest('[data-zs-pair]');if(chosen){pair=+chosen.dataset.zsPair;phase=0;}else if(e.target.id==='zs-zoom-next')phase=(phase+1)%4;else if(e.target.id==='zs-zoom-back')phase=Math.max(0,phase-1);else return;zoom();});zoom();
}
installTool();
})();
