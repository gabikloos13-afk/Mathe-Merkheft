const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const dataScope={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../course-data.js','utf8'),dataScope);
const chapter=dataScope.window.MERKHEFT_COURSES.gleichwertig,source=fs.readFileSync(__dirname+'/../course.js','utf8');
const parse=source.slice(source.indexOf('function parseRoute(){'),source.indexOf("window.addEventListener('hashchange'"));
for(const [hash,mode,id,canonical] of [
 ['#type-2','learn',2,'lernen-type-2'],['#lernen-type-7','examples',7,'type-7'],
 ['#lernen-type-3','examples',3,'type-3'],['#type-1','examples',1,null],
 ['#lernen-type-1','learn',1,null],['#lernen-type-2','learn',2,null],
 ['#werkzeug','tool',null,null],['#nachschlagen','reference',null,null]
]){
 const state={mode:'learn',learn:1,examples:1},location={hash};let routed=null;
 const context={c:chapter,ordered:chapter.groups.flat(),state,location,route(){routed=state.mode==='learn'?'lernen-type-'+state.learn:'type-'+state.examples},render(){
  if(state.mode==='examples')assert(context.ordered.includes(state.examples),'never select an absent example');
 }};
 vm.runInNewContext(parse+'parseRoute();',context);assert.equal(state.mode,mode);
 if(id)assert.equal(state[mode==='learn'?'learn':'examples'],id);assert.equal(routed,canonical);
}
console.log('PASS: Alte Links führen zum richtigen Lernweg oder Beispiel; keine ungültige Beispielposition.');
