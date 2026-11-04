'use strict';
// Das Kapitel hat eigene Daten und Bilder; die anderen Themen bleiben unverändert.
(()=>{
if(document.body.dataset.topic!=='gemischt')return;
const F=(n,d)=>`<span class="fraction" aria-label="${n} durch ${d}"><span>${n}</span><span>${d}</span></span>`;
const M=(w,n,d)=>`${w} ${F(n,d)}`;
const c=window.MERKHEFT_COURSES.gemischt;
// Aufgabengenaue Bilder ohne vorgezogene Gruppierung in der Vorschau.
const partNames={3:'Drittel',4:'Viertel',5:'Fünftel',6:'Sechstel'};
function strip(n,d,label){return `<div class="mixed-strip-item"><div class="mixed-strip" role="img" aria-label="${n} von ${d} gleichen Teilen gefärbt" style="--parts:${d}">${Array.from({length:d},(_,i)=>`<span class="${i<n?'filled':''}"></span>`).join('')}</div>${label?`<span class="mixed-caption">${label}</span>`:''}</div>`;}
function picture(v){
 if(!v)return '';
 const {kind,n,d}=v,q=Math.floor(n/d),r=n%d,word=partNames[d]||'Bruchteile';
 let html='';
 if(kind==='whole')html=strip(d,d,`${d} ${word} = 1 Ganzes`);
 else if(kind==='loose'||kind==='negative-given')html=`<div class="mixed-loose" role="img" aria-label="${n} einzelne ${word}">${Array.from({length:n},()=>`<span>${F(1,d)}</span>`).join('')}</div><p>${n} ${word}${kind==='negative-given'?' ohne Minus betrachtet':''} · je ${d} bilden ein Ganzes</p>`;
 else if(kind==='negative'||kind==='negative-mixed'){
  if(kind==='negative-mixed')html=Array.from({length:q},()=>strip(d,d,'1 Ganzes')).join('')+strip(r,d,`${r} ${word}`);
  else{
   // Genau der benötigte Ausschnitt; der markierte Punkt ist bereits hergeleitet.
   const left=-(q+1),right=-q,x=35+(1-r/d)*290;
   html=`<svg viewBox="0 0 360 145" role="img" aria-label="Negative Zahl zwischen ${left} und ${right}"><path d="M35 80H325" stroke="#326b82" stroke-width="2"/>${Array.from({length:d+1},(_,i)=>`<path d="M${35+i*290/d} 70v20" stroke="#326b82"/>`).join('')}<text x="35" y="117" text-anchor="middle">${left}</text><text x="325" y="117" text-anchor="middle">${right}</text><circle cx="${x}" cy="80" r="7" fill="#783d53"/></svg><div class="mixed-point-label">Punkt: −${M(q,r,d)}</div>`;
  }
  html=`<div class="mixed-negative"><b>Minus für die gesamte Zahl</b><div class="mixed-strips">${html}</div></div>`;
 }
 else if(kind==='reduce')html=`<div class="mixed-reduce"><div><b>Rest vorher</b>${strip(2,6,'2 Sechstel')}</div><div><b>Je 2 Teile zusammenfassen</b>${strip(1,3,'1 Drittel')}</div></div><p>Der gefärbte Anteil bleibt gleich groß. Die 2 Ganzen bleiben gleich.</p>`;
 else{
  const whole=kind==='full'?v.whole:kind==='given-mixed'?v.whole:q;
  html=Array.from({length:whole},()=>strip(d,d,kind==='full'||v.labels||kind==='given-mixed'?'1 Ganzes':'')).join('');
  if(kind!=='full'&&(r||kind==='given-mixed'))html+=strip(kind==='given-mixed'?v.rest:r,d,v.labels||kind==='given-mixed'?`${kind==='given-mixed'?v.rest:r} ${word}`:'');
  if(kind==='separate')html=Array.from({length:n-v.rest},()=>`<span class="mixed-piece">${F(1,d)}</span>`).join('')+`<div class="mixed-known"><b>Bekannt: ${v.rest} ${word}</b>${Array.from({length:v.rest},()=>`<span class="mixed-piece">${F(1,d)}</span>`).join('')}</div>`;
  html=`<div class="mixed-strips">${html}</div>`;
 }
 return `<figure class="mixed-picture">${html}</figure>`;
}
const legend=document.querySelector(".lab-legend");
if(legend)legend.innerHTML='<span class="part-key">Bruchstücke</span><span class="whole-key">Rahmen für 1 Ganzes</span><span class="unit-key">Übrige Stücke</span>';
const original=window.MerkheftPictures;
window.MerkheftPictures={render:(topic,id,index,r)=>topic==='gemischt'?picture(index<0?r.preview:r.steps[index]?.picture):original.render(topic,id,index,r),learning:(topic,id,s,r)=>topic==='gemischt'?picture(s.picture):original.learning(topic,id,s,r)};
// Bilder im Nachschlagebereich erst nach dessen Aufbau ergänzen.
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('#reference-pane .reference-details .reference-card').forEach((el,i)=>{if(c.referenceCards[i].picture)el.insertAdjacentHTML('beforeend',picture(c.referenceCards[i].picture));});});
})();
