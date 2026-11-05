'use strict';
const {test,expect}=require('@playwright/test');
const url='http://127.0.0.1:8000/laengen.html';

test('Längen: ein Meter als 100 Zentimeter, 90 cm und 35 cm begreifen',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(url);
 await expect(page.getByRole('heading',{name:'Längen verstehen und umrechnen'})).toBeVisible();
 await expect(page.locator('#meter-result')).toHaveText('90 cm = 9 dm = 0,9 m');
 await expect(page.locator('#meter-band .meter-cm span.filled')).toHaveCount(90);
 await page.locator('#meter-range').evaluate((el,n)=>{el.value=String(n);el.dispatchEvent(new Event('input',{bubbles:true}));},35);
 await expect(page.locator('#meter-result')).toHaveText('35 cm = 3,5 dm = 0,35 m');
 await expect(page.locator('#meter-band .meter-cm span.filled')).toHaveCount(35);
 await page.locator('#meter-range').evaluate((el,n)=>{el.value=String(n);el.dispatchEvent(new Event('input',{bubbles:true}));},100);
 await expect(page.locator('#meter-result')).toHaveText('100 cm = 10 dm = 1 m');
 await expect(page.locator('#meter-band .meter-cm span.filled')).toHaveCount(100);
 expect(errors).toEqual([]);
});

test('Komma: 90 cm wird nicht vorzeitig als 0,9 m gezeigt',async({page})=>{
 await page.goto(url);
 const stage=page.locator('#comma-stage');
 await expect(stage).not.toContainText('0,9 m');
 await page.locator('#comma-next').click();
 await expect(stage).toContainText('9,0 dm');
 await expect(stage).not.toContainText('0,9 m');
 await page.locator('#comma-next').click();
 await expect(stage).toContainText('0,9 m');
 await expect(page.locator('#comma-next')).toBeDisabled();
 await page.locator('#comma-back').click();
 await expect(stage).not.toContainText('0,9 m');
});

test('Umrechner: Einheiten und Komma-Schritte vor der Lösung wählen',async({page})=>{
 await page.goto(url);
 await page.locator('#tab-tool').click();
 await expect(page.locator('#conversion-result')).toBeHidden();
 await expect(page.locator('#convert')).toBeDisabled();
 await page.locator('[data-predict="down"]').click();
 await expect(page.locator('#convert')).toBeEnabled();
 await page.locator('#convert').click();
 await expect(page.locator('#conversion-result')).toContainText('90 cm = 0,9 m');
 await expect(page.locator('#conversion-result')).toContainText('9 dm');
 await page.locator('#amount').fill('0,9');
 await page.locator('#from').selectOption('m');
 await page.locator('#to').selectOption('cm');
 await page.locator('[data-predict="up"]').click();
 await page.locator('#convert').click();
 await expect(page.locator('#conversion-result')).toContainText('0,9 m = 90 cm');
 await page.locator('#amount').fill('125');
 await page.locator('#from').selectOption('cm');
 await page.locator('#to').selectOption('m');
 await page.locator('[data-predict="down"]').click();
 await page.locator('#convert').click();
 await expect(page.locator('#conversion-result')).toContainText('125 cm = 1,25 m');
});

test('Längen-Lupe und Beispiele decken Schritte kontrolliert auf',async({page})=>{
 await page.goto(url);
 await page.locator('#tab-tool').click();
 await expect(page.locator('#zoom-caption')).toContainText('1 m besteht aus 10');
 await page.locator('#zoom-deeper').click();
 await expect(page.locator('#zoom-caption')).toContainText('1 dm besteht aus 10');
 await page.locator('#zoom-deeper').click();
 await expect(page.locator('#zoom-caption')).toContainText('1 cm besteht aus 10');
 await page.locator('#zoom-back').click();
 await expect(page.locator('#zoom-caption')).toContainText('1 dm besteht aus 10');
 await page.locator('#tab-examples').click();
 await expect(page.locator('#example-stage')).not.toContainText('0,9 m');
 await page.locator('#example-next').click();
 await page.locator('#example-next').click();
 await expect(page.locator('#example-stage')).not.toContainText('0,9 m');
 await page.locator('#example-next').click();
 await expect(page.locator('#example-stage')).toContainText('0,9 m');
});

for(const width of [320,375,768,1280]){
 test('Längen: mobile und breite Bedienung '+width,async({page})=>{
  await page.setViewportSize({width,height:850});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(url);
  for(const tab of ['learn','examples','tool','reference']){
   await page.locator('#tab-'+tab).click();
   await expect(page.locator('#pane-'+tab)).toBeVisible();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
   expect(overflow,'Horizontaler Überlauf bei '+width+' px, Tab '+tab).toBeLessThanOrEqual(2);
  }
  expect(errors).toEqual([]);
 });
}
