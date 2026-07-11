const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to 1080p
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  // Wait a bit for animations and hydration
  await new Promise(r => setTimeout(r, 4000));
  
  const data = await page.evaluate(() => {
    const getRect = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { top: rect.top, height: rect.height, visible: rect.height > 0 && rect.width > 0, text: el.innerText.substring(0, 50) };
    };
    
    return {
      main: getRect(document.querySelector('main')),
      hero: getRect(document.querySelector('section:nth-of-type(1)')), 
      about: getRect(document.getElementById('about')),
      stays: getRect(document.getElementById('stays')),
      attractions: getRect(document.getElementById('attractions'))
    };
  });
  
  console.log(JSON.stringify(data, null, 2));
  
  // Let's also grab console errors
  const errors = await page.evaluate(() => window.errors || []);
  console.log('Errors:', errors);
  
  await browser.close();
})();
