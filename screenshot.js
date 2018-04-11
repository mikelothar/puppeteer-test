const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1050, height: 2000, deviceScaleFactor: 2 });
  await page.goto('https://danskespil.dk/oddset');
  
  async function screenshotDOMElement(selector) {
    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const {x, y, width, height} = element.getBoundingClientRect();
      return {left: x, top: y, width, height, id: element.id};
    }, selector);

    return await page.screenshot({
      path: 'mest-spillede-kampe.png',
      clip: {
        x: rect.left + 263,
        y: rect.top + 200,
        width: 503,
        height: 284
      }
    });
  }

  await screenshotDOMElement('iframe.js-oddset-game-iframe');
  // await page.screenshot({ path: 'oddset.png' });

  await browser.close();
})();