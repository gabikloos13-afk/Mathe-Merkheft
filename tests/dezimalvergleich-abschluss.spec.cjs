'use strict';
const {test,expect}=require('@playwright/test');
for(const width of [320,375,768,1280])test('Dezimalvergleich: Erklärung vor Anwendung, alle Blatttypen '+width,async({page})=>{
 await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:8000/dezimalvergleich.html');
 await expect(page.getByRole('heading',{level:1})).toHaveText('Größenvergleich von Dezimalzahlen');
 const children=await page.locator('#learn-pane').evaluate(el=>[...el.children].map(x=>x.id));
 expect(children[0]).toBe('vergleich-regeln');expect(children[1]).toBe('grundlagenweg');
 for(const title of ['1. Verstehen: Was heißt „größer“?','2. Die Regel anwenden','3. Dein Aufgabentyp vom Blatt'])await expect(page.getByRole('heading',{name:title,exact:true})).toBeVisible();
 const cases=[[1,'0,45 ? 0,4455'],[2,'0,6 ? 0,600'],[3,'−2,004 ? −1,9999'],[4,'47/100 ? 9/20'],[8,'−3 1/3 ? −3 1/5'],[5,'5,□ > 5,7'],[12,'−73,08 < −7□,88'],[6,'0,0034□ = 0,0034'],[7,'1/5; 0,3; 9/10; 0,56; 3/50; 63/100']];
 await expect(page.locator('.dv-types a')).toHaveCount(9);
 for(const [id,question]of cases){
  await page.locator('.dv-types a[href="#type-'+id+'"]').click();await expect(page.locator('[data-mode="examples"]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('.task-copy')).toContainText(question);await expect(page.locator('.current-line')).toHaveCount(0);await page.locator('[data-mode="learn"]').click();
 }
 await page.locator('.dv-types a[href="#type-12"]').click();
 for(let i=0;i<2;i++){await page.locator('#step-next').click();await page.locator('[data-think-reveal]').click();}
 await expect(page.locator('.stage-picture .basis-first-difference')).not.toHaveCount(0);
 await expect(page.locator('.step-explanation')).toContainText('erste unterschiedliche Stelle');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(2);expect(errors).toEqual([]);
});
