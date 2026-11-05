'use strict';
const {test,expect}=require('@playwright/test');
const url='http://127.0.0.1:8000/groessen.html';
const work=[
 ['1','a','length','dm','up',10,1,'20 dm'],
 ['1','b','length','m','up',1000,3,'2.350 m'],
 ['1','c','money','€','down',100,2,'0,42 €'],
 ['1','d','volume','m³','down',1000,3,'0,000423 m³'],
 ['1','e','length','dm','down',10,1,'0,4 dm'],
 ['1','f','area','mm²','up',100,2,'81 mm²'],
 ['1','g','volume','dm³','up',1000,3,'17.000 dm³'],
 ['1','h','volume','mm³','up',1000,3,'280.400 mm³'],
 ['1','i','mass','kg','up',1000,3,'7.800 kg'],
 ['2','a','mass','g','up',1000,3,'1.500 g'],
 ['2','b','length','cm','up',10,1,'235 cm'],
 ['2','c','mass','kg','up',1000,3,'1.001 kg'],
 ['2','d','length','cm','up',100,2,'608 cm'],
 ['2','e','mass','g','up',1000,3,'31.030 g'],
 ['2','f','length','m','up',1000,3,'21.099 m'],
 ['2','g','money','ct','up',100,2,'5.656 ct'],
 ['2','h','length','m','up',1000,3,'100.043 m'],
 ['2','i','length','mm','up',10,1,'237 mm'],
 ['3','a','mass','kg','down',1000,3,'2,14 kg'],
 ['3','b','length','cm','down',10,1,'52,3 cm'],
 ['3','c','mass','t','down',1000,3,'0,0122 t'],
 ['3','d','length','km','down',1000,3,'0,252 km'],
 ['3','e','mass','kg','down',1000,3,'300 kg'],
 ['3','f','time','h','down',60,2,'1,5 h'],
 ['3','g','money','€','down',100,2,'6,66 €'],
 ['3','h','length','dm','up',10,1,'422 dm'],
 ['3','i','length','m','down',10,1,'32,1 m']
];
async function enter(page,t){
 const [mode,letter,kind,to,direction,factor,steps,expected]=t;
 await page.locator('[data-gw-mode="'+mode+'"]').click();
 await page.locator('#gw-select').selectOption(letter);
 await expect(page.locator('#gw-stage')).not.toContainText(expected);
 await expect(page.locator('#gw-next')).toBeDisabled();
 await page.locator('[data-gw-kind="'+kind+'"]').click();
 await expect(page.locator('#gw-next')).toBeEnabled();
 await page.locator('#gw-next').click();
 if(mode==='2'){
  await expect(page.locator('#gw-next')).toBeDisabled();
  await page.locator('[data-gw-to="'+to+'"]').click();
 }
 await expect(page.locator('#gw-next')).toBeEnabled();
 await page.locator('#gw-next').click();
 await expect(page.locator('#gw-next')).toBeDisabled();
 await page.locator('[data-gw-direction="'+direction+'"]').click();
 await page.locator('[data-gw-factor="'+factor+'"]').click();
 await expect(page.locator('#gw-next')).toBeEnabled();
 await page.locator('#gw-next').click();
 return {steps,expected};
}
async function finish(page,steps,expected){
 await expect(page.locator('#gw-next')).toBeDisabled();
 for(let s=0;s<steps;s++)await page.locator('[data-gw-advance]').click();
 await expect(page.locator('#gw-next')).toBeEnabled();
 await page.locator('#gw-next').click();
 await expect(page.locator('.gw-answer')).toContainText(expected);
}
for(const mode of ['1','2','3'])test('Schulbuch Aufgabe '+mode+': 9 Herleitungen und Ergebnisse',async({page})=>{
 const errs=[];page.on('pageerror',e=>errs.push(String(e)));
 await page.goto(url);
 for(const row of work.filter(x=>x[0]===mode)){
  const {steps,expected}=await enter(page,row);
  await finish(page,steps,expected);
 }
 expect(errs).toEqual([]);
});
test('Eine falsche Entscheidung gibt Hilfen, nicht sofort die Antwort',async({page})=>{
 await page.goto(url);
 await page.locator('[data-gw-kind="money"]').click();
 await expect(page.locator('#gw-next')).toBeDisabled();
 await expect(page.locator('#gw-stage')).toContainText('Noch nicht');
 await page.locator('[data-gw-kind="length"]').click();
 await page.locator('#gw-next').click();
 await expect(page.locator('.gw-ten button')).toHaveCount(10);
 await expect(page.locator('.gw-ten')).toContainText('100');
 await page.locator('[data-gw-zoom-next]').click();
 await expect(page.locator('.gw-ten')).toContainText('10');
 await page.locator('[data-gw-zoom-next]').click();
 await expect(page.locator('.gw-ten')).toContainText('1');
 await page.locator('#gw-next').click();
 await page.locator('[data-gw-direction="down"]').click();
 await page.locator('[data-gw-factor="10"]').click();
 await expect(page.locator('#gw-next')).toBeDisabled();
 await page.locator('[data-gw-direction="up"]').click();
 await page.locator('[data-gw-factor="1000"]').click();
 await expect(page.locator('#gw-next')).toBeEnabled();
 await page.locator('#gw-next').click();
 await expect(page.locator('.gw-number')).toContainText('2,35');
 await page.locator('[data-gw-advance]').click();
 await expect(page.locator('.gw-number')).toContainText('23,5');
 await page.locator('[data-gw-advance]').click();
 await expect(page.locator('.gw-number')).toContainText('235,0');
 await page.locator('[data-gw-advance]').click();
 await expect(page.locator('.gw-number')).toContainText('2350,0');
 await page.locator('#gw-next').click();
 await expect(page.locator('.gw-decompose')).toContainText('2.000 m');
 await expect(page.locator('.gw-decompose')).toContainText('300 m');
 await expect(page.locator('.gw-decompose')).toContainText('50 m');
});
test('Quadrat-Bild: 10 mal 10, kein einfacher Zehnerschritt',async({page})=>{
 await page.goto(url);await page.locator('#gw-select').selectOption('f');await page.locator('[data-gw-kind="area"]').click();await page.locator('#gw-next').click();
 await expect(page.locator('.gw-square span')).toHaveCount(100);
 await page.locator('#gw-rows').evaluate(el=>{el.value='10';el.dispatchEvent(new Event('input',{bubbles:true}))});
 await expect(page.locator('.gw-square .gw-marked')).toHaveCount(100);
 await expect(page.locator('#gw-stage')).toContainText('10 × 10 = 100');
});
test('Würfel-Bild: Zehn Schichten je 100, nicht 10',async({page})=>{
 await page.goto(url);await page.locator('#gw-select').selectOption('d');await page.locator('[data-gw-kind="volume"]').click();await page.locator('#gw-next').click();
 await expect(page.locator('.gw-mini-square span')).toHaveCount(100);
 await page.locator('#gw-layers').evaluate(el=>{el.value='10';el.dispatchEvent(new Event('input',{bubbles:true}))});
 await expect(page.locator('#gw-stage')).toContainText('10 × 100 = 1000');
});
test('Stunden: Ausnahmefaktor 60 mit 90 Minuten',async({page})=>{
 await page.goto(url);
 await page.locator('[data-gw-mode="3"]').click();await page.locator('#gw-select').selectOption('f');
 await page.locator('[data-gw-kind="time"]').click();await page.locator('#gw-next').click();
 await expect(page.locator('.gw-clock span')).toHaveCount(60);
 await expect(page.locator('#gw-stage')).toContainText('60 Minuten');
 await page.locator('#gw-next').click();
 await page.locator('[data-gw-direction="down"]').click();
 await page.locator('[data-gw-factor="60"]').click();
 await page.locator('#gw-next').click();
 await expect(page.locator('#gw-stage')).not.toContainText('1,5 h');
 await page.locator('[data-gw-advance]').click();
 await expect(page.locator('#gw-stage')).toContainText('60 min + 30 min');
 await page.locator('[data-gw-advance]').click();
 await page.locator('#gw-next').click();
 await expect(page.locator('.gw-answer')).toContainText('1,5 h');
});
test('Ohne Komma: zu große oder ungeeignete Einheiten abfangen',async({page})=>{
 await page.goto(url);await page.locator('[data-gw-mode="2"]').click();await page.locator('#gw-select').selectOption('a');
 await page.locator('[data-gw-kind="mass"]').click();await page.locator('#gw-next').click();
 await page.locator('[data-gw-to="kg"]').click();await expect(page.locator('#gw-next')).toBeDisabled();
 await page.locator('[data-gw-to="g"]').click();await expect(page.locator('#gw-next')).toBeEnabled();
});
for(const width of [320,375,768,1280])test('Ansicht ohne Überlauf bei '+width+' Pixeln',async({page})=>{
 await page.setViewportSize({width,height:860});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(url);
 async function check(){const v=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);expect(v,'Überlauf bei '+width).toBeLessThanOrEqual(2);}
 await check();await page.locator('[data-gw-kind="length"]').click();await page.locator('#gw-next').click();await check();
 await page.locator('#gw-next').click();await check();
 await page.locator('[data-gw-direction="up"]').click();await page.locator('[data-gw-factor="1000"]').click();await page.locator('#gw-next').click();await check();
 for(let i=0;i<3;i++)await page.locator('[data-gw-advance]').click();
 await page.locator('#gw-next').click();await check();
 expect(errors).toEqual([]);
});
