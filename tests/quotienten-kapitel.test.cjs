const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/../',context={window:{},document:{body:{dataset:{topic:'quotienten'}},querySelector(){return null;}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(root+'course-data.js','utf8'),context);
const before=JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig);
context.window.MerkheftPictures={render(){return 'other'},learning(){return 'other'}};
vm.runInContext(fs.readFileSync(root+'quotienten-kapitel.js','utf8'),context);
const c=context.window.MERKHEFT_COURSES.quotienten,m=context.window.MerkheftDivision;
assert.equal(c.lessons.length,4);assert.equal(c.groups.flat().length,12);
assert(!c.groups.flat().some(id=>c.lessons.some(l=>l.id===id)));
assert.equal(JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig),before);
const math=html=>html.replace(/<span class="fraction"[^>]*><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,(_,a,b)=>`FRAC[(${a})/(${b})]`).replace(/(\d+)\s+FRAC\[(.*?)\]/g,'($1+($2))').replace(/FRAC\[(.*?)\]/g,'($1)').replace(/<br>/g,';').replace(/<[^>]*>/g,'').replaceAll('&nbsp;',' ').replaceAll('·','*').replaceAll(':','/').replaceAll('−','-').replace(/(\d),(\d)/g,'$1.$2');
let figures=0,equations=0,states=0;
for(const r of Object.values(c.cases)){
 assert(r.startHint&&r.check.length&&r.answer.length&&r.trap.length);assert(!r.intro.includes(r.recognize));
 for(let i=-1;i<r.steps.length;i++){
  const s=i<0?r.preview:r.steps[i].picture,html=context.window.MerkheftPictures.render('quotienten',r.id,i,r);
  assert(html.includes('<figure'));assert(!/undefined|NaN/.test(html));figures++;
  if(s.kind==='share'&&s.phase===2)assert.equal((html.match(/data-q-cell="filled"/g)||[]).length,s.n*s.d);
  if(s.kind==='amount')assert.equal((html.match(/data-q-cell="filled"/g)||[]).length,s.n);
  if(s.kind==='objects')assert.equal((html.match(/data-q-object/g)||[]).length,s.n);
  if(i<0)continue;const step=r.steps[i];assert(step.title&&step.hint.length&&step.explain.length);
  for(const piece of math(step.html).split(/;|\bund\b/)){
   if(!piece.includes('=')||piece.includes('Rest'))continue;
   const sides=piece.split('=').map(x=>x.trim());if(!sides.every(x=>/^[\d\s()+*/.\-]+$/.test(x)))continue;
   const values=sides.map(x=>vm.runInNewContext(x));assert(values.every(Number.isFinite),piece);
   for(const v of values)assert(Math.abs(v-values[0])<1e-9,piece);equations++;
  }
 }
}
for(let n=0;n<=6;n++)for(let d=1;d<=8;d++){
 const model=m.model(n,d);assert.equal(model.recipients*model.amountEach,n);assert.equal(model.pieces,model.recipients*model.piecesEach);
 for(let phase=0;phase<4;phase++){
  const html=m.figure({kind:'share',n,d,phase});assert(!/NaN|undefined/.test(html));
  const filled=(html.match(/data-q-cell="filled"/g)||[]).length;
  if(phase===1||phase===2)assert.equal(filled,n*d);
  if(phase===3)assert.equal(filled,n);
  states++;
 }
 const [a,b]=m.simplify(n,d);assert.equal(a*d,n*b);assert(b>0);
}
assert.throws(()=>m.model(3,0));assert.throws(()=>m.simplify(3,0));
assert(equations>=25);
assert.equal(20*300,6000);assert.equal(300/1000,3/10);
// Das vierte Minusbeispiel braucht einen eigenen Schritt und ein positives Ergebnis.
assert(c.cases[4].steps[3].html.includes('D = −(−'));assert(c.cases[4].steps[3].html.includes('= +'));
assert(c.cases[6].steps[6].html.includes('10 : 5 = 2'));
assert(!m.figure(c.cases[104].preview).includes('q-plate'));
assert(!m.figure(c.cases[1].preview).includes('3 : 2'));
assert.equal(context.window.MerkheftPictures.render('other'),'other');
console.log(`PASS: ${Object.keys(c.cases).length} Fälle, ${figures} Bildzustände, ${equations} Zahlengleichungen, ${states} Werkzeugzustände; Mengen- und Werterhaltung, Vorzeichen, Null und Zahlenmengen`);
console.log(JSON.stringify({lessons:c.lessons.map(l=>({id:l.id,steps:c.cases[l.id].steps.length})),examples:c.groups.flat().map(id=>({id,steps:c.cases[id].steps.length}))}));
