const { test, expect } = require('@playwright/test');

const chapters = [
  'brueche','gleichwertig','gemischt','zahlenstrahl',
  'quotienten','vergleichen','dezimal','dezimalvergleich','groessen'
];
const viewports = [
  { label: 'desktop', width: 1280, height: 820 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'mobile', width: 375, height: 812 },
  { label: 'mobile-small', width: 320, height: 740 }
];

for (const width of viewports) {
  for (const topic of chapters) {
    test(topic+' – '+width.label+' – Lernen, Beispiel, Werkzeug', async ({page},testInfo) => {
      await page.setViewportSize({width: width.width,height:width.height});
      const pageErrors=[];
      page.on('pageerror',e=>pageErrors.push(String(e)));
      page.on('console',e=>{if(e.type()==='error'&&!/font|googleapis|ERR_NAME_NOT_RESOLVED|favicon/i.test(e.text()))pageErrors.push('console: '+e.text())});
      await page.goto('http://127.0.0.1:8000/'+topic+'.html',{waitUntil:'domcontentloaded'});
      await expect(page.locator('#step-next')).toBeVisible();
      await expect(page.locator('#example-title')).not.toHaveText('');
      await expect(page.locator('.stage-calculation')).toBeEmpty();
      await page.locator('#step-next').click();
      await expect(page.locator('.think-gate')).toBeVisible();
      await expect(page.locator('#step-next')).toBeDisabled();
      const choices=page.locator('[data-think-choice]');
      if(await choices.count()){
        await page.locator('[data-think-choice="1"]').click();
        await expect(page.locator('.think-feedback-try')).toBeVisible();
        await expect(page.locator('[data-think-reveal]')).toHaveCount(0);
        await page.locator('[data-think-choice="0"]').click();
        await expect(page.locator('.think-feedback-ok')).toBeVisible();
      }
      await page.locator('[data-think-reveal]').click();
      await expect(page.locator('.current-line')).toBeVisible();
      await expect(page.locator('#step-next')).toBeEnabled();

      await page.locator('[data-mode="examples"]').click();
      await expect(page.locator('#step-next')).toBeVisible();
      await page.locator('#step-next').click();
      await expect(page.locator('.think-gate')).toBeVisible();
      await expect(page.locator('[data-think-choice]')).toHaveCount(0);
      await page.locator('[data-think-reveal]').click();
      await expect(page.locator('.current-line')).toBeVisible();

      await page.locator('[data-mode="tool"]').click();
      await expect(page.locator('#werkzeug')).toBeVisible();
      if(topic==='quotienten')await expect(page.locator('#q-tool')).toBeVisible();
      else await expect(page.locator('#anfasslabor')).toBeVisible();

      const overflow=await page.evaluate(()=>({
        document:document.documentElement.scrollWidth,
        viewport:window.innerWidth
      }));
      expect(overflow.document,'Page overflow at '+width.width+'px: '+JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport+2);
      expect(pageErrors,'JavaScript errors in '+topic+': '+pageErrors.join(' | ')).toEqual([]);

      if(width.label==='mobile'||width.label==='desktop')
        await page.screenshot({path:testInfo.outputPath(topic+'-'+width.label+'.png'),fullPage:true});
    });
  }
}
