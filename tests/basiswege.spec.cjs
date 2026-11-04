'use strict';
const {test,expect}=require('@playwright/test');
const routes=[
 ['groessen','convert','2350 m'],['groessen','choose','1500 g'],['groessen','time','1,5 h'],
 ['dezimalvergleich','compare','−2,004 < −1,9999'],['dezimalvergleich','gap','0, 1, 2'],
 ['dezimal','fraction','0,625'],['dezimal','decimal','−1/8']
];
for(const width of [320,375,1280])for(const [topic,mode,result]of routes)test('Grundlagen '+mode+' bei '+width,async({page})=>{
 await page.setViewportSize({width,height:850});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:8000/'+topic+'.html');
 const root=page.locator('#grundlagenweg');await root.locator('[data-basis-mode="'+mode+'"]').click();
 await root.locator('button[type="submit"]').click();
 await expect(root.locator('.basis-error')).toBeEmpty();
 const reader=root.locator('.basis-reader');await expect(reader).toBeVisible();
 await expect(reader.locator('[data-basis-action="back"]')).toBeDisabled();
 let count=0;
 while(count++<40){
  await expect(reader.locator('.basis-result')).toHaveCount(0);
  await reader.locator('[data-basis-action="reveal"]').click();
  await expect(reader.locator('.basis-picture')).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(2);
  if(!await reader.locator('[data-basis-action="next"]').count())break;
  await reader.locator('[data-basis-action="next"]').click();
 }
 expect(count).toBeLessThan(40);await expect(reader.locator('.basis-result')).toContainText(result);
 await reader.locator('[data-basis-action="back"]').click();await expect(reader.locator('.basis-result')).toHaveCount(0);
 await reader.locator('[data-basis-action="reset"]').click();await expect(reader.locator('[data-basis-action="back"]')).toBeDisabled();await expect(reader.locator('.basis-picture')).toHaveCount(0);
 const first=root.locator('input').first();await first.fill('falsch');await expect(reader).toBeHidden();await root.locator('button[type="submit"]').click();await expect(root.locator('.basis-error')).not.toBeEmpty();
 expect(errors).toEqual([]);
});
test('Größenart und Zieleinheiten wechseln; eigene Blattwerte',async({page})=>{
 await page.goto('http://127.0.0.1:8000/groessen.html');const r=page.locator('#grundlagenweg');
 await r.locator('#basis-value').fill('0,81');await r.locator('#basis-from').selectOption('cm²');await r.locator('#basis-to').selectOption('mm²');await r.locator('button[type="submit"]').click();
 await expect(r.locator('.basis-error')).toBeEmpty();await expect(r.locator('.basis-task')).toContainText('0,81 cm² → mm²');
 await r.locator('#basis-from').selectOption('ct');await expect(r.locator('#basis-to option')).toHaveCount(2);
});
