const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const html = await page.evaluate(() => document.querySelector('main').outerHTML);
  fs.writeFileSync('rendered_main.html', html, 'utf8');
  
  await browser.close();
})();
