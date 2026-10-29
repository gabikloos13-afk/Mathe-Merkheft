'use strict';
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const main=$('main'),examples=$('#typen'),lab=$('#werkzeug');if(!examples||!lab)return;
document.body.classList.add('simple-layout');
// A single set of examples replaces the separate short and detailed entrances.
$('#grundlage')?.remove();$('main > .nav')?.remove();$('main > .eyebrow')?.remove();
$$(':scope > .eyebrow,:scope > h2',examples).forEach(e=>e.remove());
const switcher=document.createElement('div');switcher.className='simple-tabs';switcher.setAttribute('role','group');switcher.setAttribute('aria-label','Ansicht wählen');
const exampleButton=document.createElement('button'),toolButton=document.createElement('button');
exampleButton.textContent='Beispiele ↓';toolButton.textContent='Ausprobieren ↓';exampleButton.type=toolButton.type='button';
exampleButton.setAttribute('aria-controls','typen');toolButton.setAttribute('aria-controls','werkzeug');switcher.append(exampleButton,toolButton);
const subtitle=$('main > .subtitle');(subtitle||$('h1')).after(switcher);
main.insertBefore(lab,examples);
// The model stays visible. These buttons only move down or up the same page.
examples.hidden=false;lab.hidden=false;
exampleButton.addEventListener('click',()=>examples.scrollIntoView({block:'start'}));toolButton.addEventListener('click',()=>lab.scrollIntoView({block:'start'}));
// One ordinary selection field; no drawer containing a search and another selector.
const jump=$('#task-jump'),choice=document.createElement('div');choice.className='simple-choice';
const label=document.createElement('label');label.htmlFor=jump.id;label.textContent='Beispiel auswählen';choice.append(label,jump);examples.prepend(choice);
jump.options[0].textContent='Beispiel wählen';
$('.task-picker')?.remove();$('.reader-current')?.remove();
const pagers=$$('.case-pager');pagers[0]?.remove();
if(pagers[1]){const buttons=$$('button',pagers[1]);buttons[0].textContent='← Zurück';buttons[1].textContent='Weiter →';pagers[1].setAttribute('aria-label','Beispiel wechseln');}
const scrollToExample=()=>requestAnimationFrame(()=>$('.case:not([hidden])')?.scrollIntoView({block:'start',behavior:'auto'}));
jump.addEventListener('change',scrollToExample);pagers[1]?.addEventListener('click',event=>{if(event.target.closest('button'))scrollToExample();});
// Help has one level. Nothing inside it needs opening again.
function flatten(source,target){
 for(const node of [...source.children]){
  if(node.tagName==='SUMMARY')continue;
  if(node.tagName==='DETAILS'){
   const heading=document.createElement('h4');heading.textContent=$('summary',node)?.textContent||'Hinweis';target.append(heading);flatten(node,target);
  }else target.append(node);
 }
}
$$('.case').forEach(card=>{
 const help=document.createElement('details');help.className='simple-help';const summary=document.createElement('summary');summary.textContent='Brauchst du Hilfe?';help.append(summary);
 for(const source of $$(':scope > .thought,:scope > .pit',card)){
  const title=document.createElement('h4');title.textContent=source.classList.contains('pit')?'Achte darauf':'Kurzer Tipp';help.append(title);flatten(source,help);source.remove();
 }
 const control=$('.control',card);
 if(control){const title=document.createElement('h4');title.textContent='So kannst du prüfen';help.append(title);flatten(control,help);const placeholder=document.createElement('div');placeholder.className='control';placeholder.hidden=true;placeholder.setAttribute('aria-hidden','true');control.replaceWith(placeholder);}
 // The old step renderer still owns this node; the empty control stays inert.
 card.append(help);
 const worked=$('.worked',card);$('summary',worked).textContent='So geht’s';
 const action=$('.step-actions',worked);if(action)action.hidden=false;
 // A single picture in the solution replaces a second picture-only disclosure.
 for(const extra of $$(':scope > details',card)){
  if(extra===worked||extra===help)continue;
  const model=$('.case-model',extra);
  if(model&&!$('.linked-picture,.rechenbild',worked))worked.insertBefore(model,$('.work-steps',worked));
  extra.remove();
 }
 $('.type',card)?.remove();
});
// One optional dictionary, after the example. No repeated panel navigation.
const words=$('#woerter'),rules=$('#kurz');
if(words||rules){const reference=document.createElement('details');reference.className='simple-reference';const summary=document.createElement('summary');summary.textContent='Wörter und Merksätze nachsehen';reference.append(summary);
 for(const block of [rules,words])if(block){$$('a',block).forEach(e=>e.remove());reference.append(...block.childNodes);block.remove();}
 main.append(reference);
}
// Keep the direct model. The separate guided laboratory repeats the same idea.
for(const child of [...lab.children])if(child.tagName==='DETAILS'&&child.classList.contains('guided-follow')){
 const heading=$(':scope > summary',child);if(heading)heading.textContent='Schau dir die Bildschritte an';
}
$$(':scope > .eyebrow',lab).forEach(e=>e.remove());
const toolTitles={brueche:'Brüche entdecken',gleichwertig:'Kürzen und Erweitern ausprobieren',gemischt:'Ganze und Reststücke',zahlenstrahl:'Zahlenstrahl',quotienten:'Gerecht verteilen',vergleichen:'Brüche nebeneinander',dezimal:'Zehntel und Hundertstel',dezimalvergleich:'Kommazahlen vergleichen',groessen:'Größen entdecken'};
const toolTitle=$(':scope > h2',lab);if(toolTitle)toolTitle.textContent=toolTitles[document.body.dataset.topic];
})();
