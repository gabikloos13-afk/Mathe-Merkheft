'use strict';
// Complete browser traversal: every learning path and example, every reasoning phase.
// Run: python3 -m http.server 8000 & npx playwright test tests/merkheft-vollstaendig.spec.cjs
const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const vm=require('node:vm');
const topics=['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
const raw=JSON.parse(fs.readFileSync('course-data.js','utf8').replace(/^window\.MERKHEFT_COURSES\s*=\s*/,'').trim().replace(/;\s*$/,''));
const cases=[];
for(const topic of topics){
 const d=JSON.parse(JSON.stringify(raw));
 const window={MERKHEFT_COURSES:d,MerkheftPictures:{render(){return '';},learning(){return '';}}};
 const document={body:{dataset:{topic}},querySelector(){return null;},addEventListener(){}};
 if(['gemischt','quotienten','zahlenstrahl'].includes(topic))
   vm.runInNewContext(fs.readFileSync(topic+'-kapitel.js','utf8'),{window,document});
 const c=d[topic];
 for(const l of c.lessons){
   const r=c.cases[l.id],x=r.learning?{...r,...r.learning}:r;
   cases.push({topic,mode:'learn',id:l.id,count:(x.learnSteps||x.steps).length});
 }
 for(const id of c.groups.flat())cases.push({topic,mode:'examples',id,count:c.cases[id].steps.length});
}
const sizes=[{name:'desktop',width:1280,height:820},{name:'tablet',width:768,height:1024},{name:'mobile',width:375,height:812},{name:'small-mobile',width:320,height:740}];
for(const size of sizes){
 test.describe(size.name,()=>{
 test.use({viewport:{width:size.width,height:size.height},isMobile:size.width<768,hasTouch:size.width<768});
 for(const c of cases){
  test(c.topic+'/'+c.mode+'/'+c.id+' '+size.name+' all '+c.count+' steps',async({page})=>{
   await page.setViewportSize({width:size.width,height:size.height});
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.goto('http://127.0.0.1:8000/'+c.topic+'.html',{waitUntil:'domcontentloaded'});
   if(c.mode==='learn')await page.locator('[data-lesson="'+c.id+'"]').click();
   else{
    await page.locator('[data-mode="examples"]').click();
    await page.locator('#example-select').selectOption(String(c.id));
   }
   await expect(page.locator('.stage-calculation')).toBeEmpty();
   for(let p=1;p<=c.count;p++){
    await page.locator('#step-next').click();
    await expect(page.locator('.think-gate')).toBeVisible();
    await expect(page.locator('.current-line')).toHaveCount(0);
    await expect(page.locator('#step-next')).toBeDisabled();
    const choices=page.locator('[data-think-choice]');
    if(await choices.count()){
     await expect(choices).toHaveCount(2);
     await page.locator('[data-think-choice="1"]').click();
     await expect(page.locator('.think-feedback-try')).toBeVisible();
     await expect(page.locator('[data-think-reveal]')).toHaveCount(0);
     await page.locator('[data-think-choice="0"]').click();
     await expect(page.locator('.think-feedback-ok')).toBeVisible();
    }else{
     await expect(page.locator('[data-think-text]')).toBeVisible();
     await page.locator('[data-think-text]').fill('Ich habe den Rechenweg überlegt.');
    }
    await page.locator('[data-think-reveal]').click();
    await expect(page.locator('.current-line')).toBeVisible();
    await expect(page.locator('#step-next')).toBeEnabled();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),'Überlauf in Phase '+p).toBeLessThanOrEqual(2);
    await expect(page.locator('.think-trap')).toHaveCount(1);
    const badSvg=await page.locator('.stage-picture svg').evaluateAll(nodes=>nodes.some(svg=>/NaN|Infinity|undefined/.test(svg.outerHTML)));
    expect(badSvg,'Invalid SVG at phase '+p).toBe(false);
   }
   await page.locator('#step-next').click();
   await expect(page.locator('.final-answer')).toBeVisible();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
   expect(overflow,'Horizontal overflow').toBeLessThanOrEqual(2);
   expect(errors,'Page errors').toEqual([]);
  });
 }
 });
}
