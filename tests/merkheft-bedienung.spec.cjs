'use strict';
const {test,expect}=require('@playwright/test');
for(const width of [320,1280])for(const topic of ['brueche','gleichwertig','gemischt','zahlenstrahl','quotienten','vergleichen','dezimal','dezimalvergleich','groessen']){
 test(topic+' Navigation, Nachschlagen und Lösungsneustart '+width,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('http://127.0.0.1:8000/'+topic+'.html');
  const title=await page.locator('#example-title').textContent();
  await expect(page.locator('.stage-picture').first()).not.toBeEmpty();
  await page.locator('[data-mode="reference"]').click();
  for(const name of ['Kurz merken','So entscheide ich','Rechenmuster finden','Typische Fehler'])await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();
  await page.locator('.reference-patterns a').first().click();
  await expect(page.locator('[data-mode="examples"]')).toHaveAttribute('aria-pressed','true');
  const example=await page.locator('#example-title').textContent();
  await page.goBack();await expect(page.locator('[data-mode="reference"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-mode="learn"]').click();await expect(page.locator('#example-title')).toHaveText(title);
  await page.locator('#step-next').click();
  if(await page.locator('[data-think-choice]').count())await page.locator('[data-think-choice="0"]').click();
  await page.locator('[data-think-reveal]').click();await expect(page.locator('.current-line')).toBeVisible();
  const order=await page.locator('.learning-stage').evaluate(el=>[...el.children].map(x=>x.className));
  expect(order).toEqual(['stage-picture','stage-note','stage-calculation']);
  await page.locator('#step-next').click();await expect(page.locator('.think-history')).toBeVisible();
  await expect(page.locator('.current-line')).toHaveCount(0);
  await page.locator('#step-back').click();await expect(page.locator('.current-line')).toBeVisible();
  await page.locator('[data-mode="examples"]').click();await expect(page.locator('#example-title')).toHaveText(example);
  await expect(page.locator('.current-line')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(2);
 });
}

test('Anteil-Lernaufgaben verwenden durchgängig eigene Zahlen und setzen Färbung zurück',async({page})=>{
 await page.goto('http://127.0.0.1:8000/brueche.html');
 for(const [id,answer] of [[1,'zwei Sechstel'],[2,'24 Birnen'],[3,'27 Kinder'],[8,'9 Kästchen']]){
  await page.locator('[data-lesson="'+id+'"]').click();
  for(let p=0;p<3;p++){await page.locator('#step-next').click();await page.locator('[data-think-choice="0"]').click();await page.locator('[data-think-reveal]').click();}
  await expect(page.locator('.current-line')).toContainText(answer);
  if(id===8){
   await expect(page.locator('[data-paint-cell][aria-pressed="true"]')).toHaveCount(9);
   await page.locator('#step-next').click();await page.locator('#think-restart').click();
   await expect(page.locator('[data-paint-cell][aria-pressed="true"]')).toHaveCount(0);
  }
 }
});
