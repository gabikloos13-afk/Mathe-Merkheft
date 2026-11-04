const {test,expect}=require('@playwright/test');
const topics=['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen'];
for(const topic of topics){
 for(const [device,width,height] of [['desktop',1366,850],['smartphone',390,844]]){
  test(topic+' '+device+' – Lernen, alle Fälle, Werkzeug, Nachschlagen',async({page})=>{
   await page.setViewportSize({width,height});
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.goto('http://127.0.0.1:8765/'+topic+'.html');
   await expect(page.locator('#course-goal')).not.toBeEmpty();
   await expect(page.locator('#learn-reader #active-example')).toBeVisible();
   await expect(page.locator('#learn-reader .stage-calculation')).toBeEmpty();
   const learnButtons=page.locator('[data-lesson]');
   const n=await learnButtons.count();expect(n).toBeGreaterThan(0);
   for(let i=0;i<n;i++){
    await learnButtons.nth(i).click();
    const card=page.locator('#learn-reader #active-example');
    await expect(card).toHaveAttribute('data-phase','0');
    await page.locator('#step-next').click();
    await expect(card).toHaveAttribute('data-phase','1');
    const options=page.locator('.think-choices [data-think-choice]');
    expect(await options.count()).toBeGreaterThanOrEqual(2);
    const wrong=page.locator('.think-choices [data-think-choice]').first();
    await wrong.click();
    // Correct option is determined from visible feedback, not hard-coded button order.
    const firstOk=await page.locator('.think-feedback-ok').count();
    if(!firstOk){
     await expect(page.locator('.think-feedback-try')).toBeVisible();
     await expect(page.locator('#step-next')).toBeDisabled();
     await page.locator('.think-choices [data-think-choice]').last().click();
    }
    await expect(page.locator('.think-feedback-ok')).toBeVisible();
    await expect(page.locator('.think-reveal')).toBeVisible();
    await expect(page.locator('#learn-reader .stage-calculation')).toBeEmpty();
    await page.locator('.think-reveal').click();
    await expect(page.locator('#learn-reader .current-line')).toBeVisible();
   }
   await page.locator('[data-mode="examples"]').click();
   const select=page.locator('#example-select');
   const ids=await select.locator('option').evaluateAll(opts=>opts.map(o=>o.value));
   expect(ids.length).toBeGreaterThan(0);
   for(const [i,id] of ids.entries()){
    await select.selectOption(id);
    await expect(page.locator('#examples-pane #active-example')).toBeVisible();
    await expect(page.locator('#examples-pane .stage-calculation')).toBeEmpty();
    await page.locator('#step-next').click();
    await expect(page.locator('#examples-pane #active-example')).toHaveAttribute('data-phase','1');
    await expect(page.locator('#examples-pane .think-gate')).toBeVisible();
    await expect(page.locator('#step-next')).toBeDisabled();
    const options=page.locator('#examples-pane .think-choices [data-think-choice]');
    if(await options.count()){
     const first=options.first();await first.click();
     if(!(await page.locator('#examples-pane .think-feedback-ok').count()))await options.last().click();
     await page.locator('#examples-pane .think-reveal').click();
    }else{
     await page.locator('#examples-pane .think-reveal').click();
    }
    await expect(page.locator('#examples-pane .current-line')).toBeVisible();
   }
   await page.locator('[data-mode="tool"]').click();
   await expect(page.locator('#tool-pane')).toBeVisible();
   const lab=page.locator('#werkzeug');
   await expect(lab).toBeVisible();
   const toolControls=lab.locator('button, input,select,[role="slider"]');
   expect(await toolControls.count()).toBeGreaterThan(0);
   const actions=lab.locator('[data-do],[data-choice]');
   if(await actions.count()){
    const initial=await lab.locator('svg').first().innerHTML().catch(()=>null);
    const buttons=actions.filter({visible:true});
    if(await buttons.count())await buttons.first().click({timeout:5000});
    await expect(lab.locator('svg')).not.toHaveCount(0);
    const now=await lab.locator('svg').first().innerHTML().catch(()=>null);
    expect(now).not.toBeNull();
   }
   await page.locator('[data-mode="reference"]').click();
   await expect(page.locator('#reference-pane')).toBeVisible();
   const overflow=await page.evaluate(()=>({document:document.documentElement.scrollWidth,window:window.innerWidth}));
   expect(overflow.document).toBeLessThanOrEqual(overflow.window+4);
   expect(errors).toEqual([]);
   await page.screenshot({path:'test-results/screens/'+topic+'-'+device+'.png',fullPage:true});
  });
 }
}
