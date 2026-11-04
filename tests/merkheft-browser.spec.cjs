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
      if(topic==='quotienten'){
        const tool=page.locator('#q-tool');
        await expect(tool).toBeVisible();
        const before=await tool.locator('#q-tool-title').textContent();
        await tool.locator('#q-next').click();
        await expect(tool.locator('#q-tool-title')).not.toHaveText(before);
      }else if(topic==='zahlenstrahl'){
        // This chapter intentionally uses the dedicated #zs-tool rather than #anfasslabor.
        const tool=page.locator('#zs-tool');
        await expect(tool).toBeVisible();
        await expect(tool).toHaveAttribute('data-zs-n','3');
        await tool.locator('[data-zs-action="left"]').click();
        await expect(tool).toHaveAttribute('data-zs-n','2');
      }else{
        const tool=page.locator('#anfasslabor');
        await expect(tool).toBeVisible();
        if(topic==='brueche'){
          const answer=await tool.locator('.hands-answer').textContent();
          await tool.locator('[data-piece="0"]').click();
          await expect(tool.locator('.hands-answer')).not.toHaveText(answer);
        }else if(topic==='gleichwertig'){
          await tool.locator('[data-do="work-show"]').click();
          await expect(tool.locator('.workshop-calculation')).toBeVisible();
        }else if(topic==='gemischt'){
          await tool.locator('[data-do="auto-piece"]').click();
          await expect(tool.locator('.loose-pieces')).toBeVisible();
        }else if(topic==='vergleichen'){
          await tool.locator('[data-do="common"]').click();
          await expect(tool.locator('.hands-board')).toBeVisible();
        }else if(topic==='dezimal'){
          await tool.locator('[data-do="ten-h"]').click();
          await expect(tool.locator('.place-machine-row')).toHaveCount(2);
        }else if(topic==='dezimalvergleich'){
          await tool.locator('[data-loupe="2"]').first().click();
          await expect(tool.locator('[data-loupe="2"]').first()).toHaveAttribute('aria-pressed','true');
        }else if(topic==='groessen'){
          await tool.locator('[data-choice="unitdimension"][data-value="2"]').click();
          await expect(tool.locator('.area-unit-grid')).toBeVisible();
        }
      }

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

// Auch sämtliche 522 Denkphasen (34 Lernwege, 111 Beispiele) auf Desktop und Smartphone prüfen.
require('./merkheft-vollstaendig.spec.cjs');
