const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/../';
const context={window:{},document:{body:{dataset:{topic:'gemischt'}},addEventListener(){},querySelector(){return null;}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(root+'course-data.js','utf8'),context);
const other=JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig);
context.window.MerkheftPictures={render(){return 'other';},learning(){return 'other';}};
vm.runInContext(fs.readFileSync(root+'gemischt-kapitel.js','utf8'),context);
const c=context.window.MERKHEFT_COURSES.gemischt;
const lessons=c.lessons.map(l=>l.id),examples=c.groups.flat();
assert.equal(lessons.length,3);assert.equal(examples.length,8);
assert(!examples.some(id=>lessons.includes(id)),'Lernen und Beispiele müssen getrennt sein');
assert.equal(JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig),other);
// Prüfe echte numerische Gleichungen aus den angezeigten Rechenzeilen.
// Brüche werden vor dem Entfernen der HTML-Tags als eigene Ausdrücke markiert.
function mathLine(html){
 let s=html.replace(/<span class="fraction"[^>]*><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,(_,a,b)=>`FRAC[(${a})/(${b})]`);
 s=s.replace(/(\d+)\s+FRAC\[(.*?)\]/g,'($1+($2))').replace(/FRAC\[(.*?)\]/g,'($1)');
 return s.replace(/<[^>]*>/g,'').replaceAll('&nbsp;',' ').replaceAll('·','*').replaceAll(':','/').replaceAll('−','-');
}
let equations=0,pictures=0;
for(const r of Object.values(c.cases)){
 assert(r.startHint&&r.answer.length&&r.check.length&&r.trap.length);
 assert(!r.intro.includes(r.recognize),"Einstieg darf sich nicht doppeln");
 for(let i=-1;i<r.steps.length;i++){
  const pic=context.window.MerkheftPictures.render('gemischt',r.id,i,r);
  assert(pic.includes('<figure'));assert(!pic.includes('undefined'));assert(!pic.includes('NaN'));assert(!pic.includes('?'));
  pictures++;
  if(i<0)continue;
  const step=r.steps[i];assert(step.title&&step.explain.length&&step.hint.length);
  assert.equal(pic,context.window.MerkheftPictures.learning('gemischt',r.id,step,r));
  for(const piece of mathLine(step.html).split(/;|\bund\b/)){
   if(!piece.includes('=')||piece.includes('□'))continue;
   const sides=piece.split('=').map(x=>x.trim());
   if(!sides.every(x=>/^[\d\s()+*/.\-]+$/.test(x)))continue;
   const values=sides.map(x=>vm.runInNewContext(x));
   for(const v of values)assert(Math.abs(v-values[0])<1e-10,`Falsche Gleichung: ${piece}`);
   equations++;
  }
 }
}
assert(equations>=35);assert.equal(pictures,48);
assert.equal(context.window.MerkheftPictures.render('other'), 'other');
console.log(`PASS: ${equations} numerische Gleichungen, ${pictures} Bildzustände, getrennte Aufgabenformen und unverändertes Referenzkapitel`);
