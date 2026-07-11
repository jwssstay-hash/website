const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const data = await page.evaluate(() => {
    const stays = document.getElementById('stays');
    const attractions = document.getElementById('attractions');
    const about = document.getElementById('about');
    const style = window.getComputedStyle(stays);
    const attrStyle = window.getComputedStyle(attractions);
    const aboutStyle = window.getComputedStyle(about);
    
    return {
      stays: {
        display: style.display,
        position: style.position,
        height: style.height,
        padding: style.padding,
        className: stays.className
      },
      attractions: {
        display: attrStyle.display,
        height: attrStyle.height,
        className: attractions.className
      },
      about: {
        display: aboutStyle.display,
        height: aboutStyle.height,
        className: about.className
      }
    };
  });
  
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
