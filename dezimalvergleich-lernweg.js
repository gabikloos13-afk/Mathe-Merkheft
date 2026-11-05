'use strict';
// Diagramme der überarbeiteten Phasen; die Fachinhalte bleiben im kanonischen Datensatz.
(()=>{
 const old=window.MerkheftPictures;if(!old)return;
 window.MerkheftPictures={...old,
  initial:(topic,id,r,mode)=>topic==='dezimalvergleich'&&mode==='examples'&&r.startPicture?r.startPicture:old.initial(topic,id,r,mode),
  render:(topic,id,index,r)=>topic==='dezimalvergleich'&&r.startPicture&&!r.learningPreview?(index<0?r.startPicture:r.steps[index]?.diagram||old.render(topic,id,index,r)):old.render(topic,id,index,r)
 };
 if(typeof document==='undefined'||document.body.dataset.topic!=='dezimalvergleich')return;
 // Die fachlich neu gegliederten Beispielphasen beginnen ohne übernommene Lösungen.
 try{const key='merkheft:dezimalvergleich:regelstand';if(localStorage.getItem(key)!=='20261104-regel2'){localStorage.removeItem('merkheft:gesamtumbau:v2:dezimalvergleich');localStorage.setItem(key,'20261104-regel2');}}catch(_){}
})();
