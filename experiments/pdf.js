process.on('unhandledRejection', r => console.log(r));
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname,'../samples/vatter/vatter.html'), {
    waitUntil: 'networkidle2'
  });
  await page.pdf({
    path: 'vatter.pdf',
    format: 'Letter',
    displayHeaderFooter: true,
    // TODO how to align right?
    headerTemplate: `<p></p>`,
    footerTemplate: `<div style="margin: 0 auto; font-size: 6pt; font-family: MJXc-TeX-math-I,MJXc-TeX-math-Ix,MJXc-TeX-math-Iw, serif;"><span class='pageNumber'></span>`,
    margin: { top: '1.5cm', left: '0', bottom: '1.5cm', right: '0' }
  });

  await browser.close();
})();
