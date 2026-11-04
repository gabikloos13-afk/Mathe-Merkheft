const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/../';
const context={window:{},document:{body:{dataset:{topic:'zahlenstrahl'}},querySelector(){return null;}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(root+'course-data.js','utf8'),context);
const other=JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig);
context.window.MerkheftPictures={render(){return 'other'},learning(){return 'other'}};
vm.runInContext(fs.readFileSync(root+'zahlenstrahl-kapitel.js','utf8'),context);
const c=context.window.MERKHEFT_COURSES.zahlenstrahl,model=context.window.MerkheftNumberline;
assert.equal(c.lessons.length,4);assert.equal(c.groups.flat().length,12);assert(!c.groups.flat().some(id=>c.lessons.some(l=>l.id===id)));
assert.equal(JSON.stringify(context.window.MERKHEFT_COURSES.gleichwertig),other);
let pictures=0,eqs=0;
function math(html){return html.replace(/<span class="fraction"[^>]*><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,(_,a,b)=>`FRAC[(${a})/(${b})]`).replace(/(\d+)\s+FRAC\[(.*?)\]/g,'($1+($2))').replace(/FRAC\[(.*?)\]/g,'($1)').replace(/<br>/g,';').replace(/<[^>]*>/g,'').replaceAll('&nbsp;',' ').replaceAll('·','*').replaceAll(':','/').replaceAll('−','-').replace(/(\d),(\d)/g,'$1.$2').replace(/(?<=\d)[ \u202f](?=\d{3}(?:\D|$))/g,'');}
for(const r of Object.values(c.cases)){
 assert(r.startHint&&r.check.length&&r.trap.length);assert(!r.intro.includes(r.recognize));
 for(let i=-1;i<r.steps.length;i++){
  const s=i<0?r.preview:r.steps[i].picture,html=context.window.MerkheftPictures.render('zahlenstrahl',r.id,i,r);
  assert(html.includes('<svg'));assert(!/undefined|NaN|\?/.test(html));pictures++;
  const val=p=>Array.isArray(p)?p[0]/p[1]:p,min=val(s.min),max=val(s.max);
  for(const p of s.points||[])assert(val(p.v)>=min-1e-9&&val(p.v)<=max+1e-9);
  const tickValues=[...html.matchAll(/data-zs-tick="([^"]+)"/g)].map(m=>Number(m[1]));
  for(let j=1;j<tickValues.length;j++)assert(tickValues[j]>tickValues[j-1]);
  if(tickValues.length>2){const delta=tickValues[1]-tickValues[0];for(let j=2;j<tickValues.length;j++)assert(Math.abs(tickValues[j]-tickValues[j-1]-delta)<1e-9);}
  for(const m of html.matchAll(/\s(?:cx|x)="([\d.-]+)"/g)){assert(Number(m[1])>=0&&Number(m[1])<=400,`Fall ${r.id} Bild ${i}: x=${m[1]}`);}
  if(i<0)continue;const st=r.steps[i];assert(st.title&&st.hint.length&&st.explain.length);
  for(const part of math(st.html).split(/;|\bund\b/)){
   if(!part.includes('=')||part.includes('cm')||part.includes('FRAC'))continue;
   const sides=part.split('=').map(x=>x.trim());if(!sides.every(x=>/^[\d\s()+*/.\-]+$/.test(x)))continue;
   const vals=sides.map(x=>vm.runInNewContext(x));for(const v of vals)assert(Math.abs(v-vals[0])<1e-9,part);eqs++;
  }
 }
}
assert(eqs>=30);
for(const [id,start,cmPerUnit] of [[5,2,6],[13,-2,8]]){
 const html=c.cases[id].steps[4].html;
 for(const row of html.matchAll(/<tr>(.*?)<\/tr>/g)){
  const cells=[...row[1].matchAll(/<td>(.*?)<\/td>/g)].map(m=>m[1]);if(!cells.length)continue;
  const target=vm.runInNewContext(math(cells[0].replace(/^[A-Z]\s*:\s*/,'')));
  const cm=Number([...cells[2].matchAll(/(\d+)\s*cm/g)].at(-1)[1]);
  assert(Math.abs((target-start)*cmPerUnit-cm)<1e-10,`Maßzeichnung ${id}: ${target}`);
 }
}

// Einzutragende Punkte dürfen nicht schon in der Vorschau markiert sein.
for(const id of [2,3,4,5,6,12,13,14,104])assert(!(c.cases[id].preview.points||[]).length);
for(const [a,b] of [[[1,3],[2,3]],[[18,17],[19,17]],[[-3,4],[-1,2]]]){
 const mid=model.mid(a,b),v=x=>x[0]/x[1];assert(Math.abs(v(mid)-v(a)-(v(b)-v(mid)))<1e-12);
 const inner=model.mid(a,mid);assert(v(inner)>v(a)&&v(inner)<v(mid));
}
let toolStates=0;
for(const d of [2,3,4,5,6,8,10,12])for(let n=-24;n<=24;n++){
 const start=Math.floor(n/d)-1,p=model.figure({min:start,max:start+3,den:d,points:[{v:[n,d],name:'P',value:true}]});
 assert(p.includes(`data-zs-point="${n/d}"`));assert(!/NaN|undefined/.test(p));toolStates++;
 for(const x of [0,.25,.5,.75,1])assert(Number.isInteger(model.snap(x,start,3,d)));
}
assert.equal(model.snap(-1,-1,3,4),-4);assert.equal(model.snap(2,-1,3,4),8);
console.log(`PASS: ${Object.keys(c.cases).length} Lern-/Beispielfälle, ${pictures} Bildzustände, ${eqs} echte Zahlengleichungen; ${toolStates} Werkzeugzustände; gleiche Lücken und exakte Mittelpunkte`);
console.log(JSON.stringify({lessons:c.lessons.map(l=>({id:l.id,steps:c.cases[l.id].steps.length})),examples:c.groups.flat().map(id=>({id,steps:c.cases[id].steps.length}))}));
