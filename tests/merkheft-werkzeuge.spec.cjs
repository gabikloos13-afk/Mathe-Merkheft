'use strict';
const {test,expect}=require('@playwright/test');
const topics=['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
for(const width of [375,1280])for(const topic of topics){
 test(topic+' Werkzeug: Grenzen, Varianten, Tastatur '+width,async({page})=>{
  await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('http://127.0.0.1:8000/'+topic+'.html#werkzeug');
  const root=page.locator(topic==='zahlenstrahl'?'#zs-tool':topic==='quotienten'?'#q-tool':'#anfasslabor');
  await expect(root).toBeVisible();
  const initialAnswer=topic==='zahlenstrahl'||topic==='quotienten'?null:await root.locator('.hands-answer').innerText();
  async function valid(){
   expect(await root.innerText()).not.toMatch(/NaN|undefined|Infinity/);
   expect(await root.locator('svg').evaluateAll(xs=>xs.some(x=>/NaN|undefined|Infinity/.test(x.outerHTML)))).toBe(false);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(2);
  }
  const choices=await root.locator('[data-choice]').evaluateAll(xs=>xs.map(x=>({name:x.dataset.choice,value:x.dataset.value})));
  for(const c of choices){
   const b=root.locator('[data-choice="'+c.name+'"][data-value="'+c.value+'"]');
   if(await b.isVisible()) {await b.click();await expect(b).toHaveAttribute('aria-pressed','true');await valid();}
  }
  const ranges=await root.locator('input[type="range"]').evaluateAll(xs=>xs.map(x=>({id:x.id,min:x.min,max:x.max})));
  for(const r of ranges){
   const slider=root.locator('#'+r.id);await slider.press('Home');await expect(slider).toHaveValue(r.min);await valid();
   await slider.press('End');await expect(slider).toHaveValue(r.max);await valid();
  }
  const selectors=await root.locator('select:not([aria-hidden="true"])').evaluateAll(xs=>xs.map(x=>({id:x.id,values:[...x.options].map(o=>o.value)})));
  for(const s of selectors)for(const v of s.values){await root.locator('#'+s.id).selectOption(v);await valid();}
  if(topic==='zahlenstrahl'){
   await root.locator('[data-zs-action="reset"]').click();await expect(root).toHaveAttribute('data-zs-n','3');
   await root.locator('[data-zs-action="left"]').click();await expect(root).toHaveAttribute('data-zs-n','2');
   await root.locator('[data-zs-action="right"]').click();await expect(root).toHaveAttribute('data-zs-n','3');
   await root.locator('[data-zs-handle]').press('ArrowLeft');await expect(root).toHaveAttribute('data-zs-n','2');
  }else if(topic==='quotienten'){
   await root.locator('#q-reset').click();await expect(root.locator('#q-total')).toHaveValue('3');await expect(root.locator('#q-people')).toHaveValue('4');
   for(let i=0;i<3;i++)await root.locator('#q-next').click();
   await expect(root.locator('.q-tool-equation')).toContainText('3');await expect(root.locator('.q-tool-equation')).toContainText('4');
   await root.locator('#q-reduce').click();await expect(root.locator('.q-reduction')).toBeVisible();
   await root.locator('#q-reset').click();await expect(root.locator('.q-reduction')).toBeHidden();
  }else{
   await root.locator('[data-do="start-over"]').click();
   await expect(root.locator('.hands-answer')).toHaveText(initialAnswer,{useInnerText:true});
   await valid();
  }
  await valid();expect(errors).toEqual([]);
 });
}
