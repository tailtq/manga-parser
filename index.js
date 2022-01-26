import Cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const { default: $ } = Cheerio;

console.log(`Running Puppeteer`);
// mangafreak
// mangapark
// bato.to
// truyentranhtuan
// ---- error 1020
// nettruyen
// blogtruyen
const url = 'https://blogtruyen.vn/c663645/ho-ly-bien-bien-4-hoc-an-hoc-noi-hoc-goi-hoc-mo';
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
});
const page = await browser.newPage();
await page.setExtraHTTPHeaders({
  'Accept-Language': 'en',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
});
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('read_load', 'f');
});
await page.goto(url);
const maxSizeImageIndex = await page.evaluate(() => {
  const imageElements = Array.from(document.getElementsByTagName('img'));
  const areas = imageElements.map((element) => element.naturalWidth * element.naturalHeight);
  const maxArea = Math.max(...areas);

  return areas.indexOf(maxArea);
});
if (maxSizeImageIndex >= 0) {
  const body = await page.$('body');
  const content = await (await body.getProperty('innerHTML')).jsonValue();
  const images = $(content).find('img');
  if (images.length === 0) {
    throw new Error();
  }
  let { parentNode } = images[maxSizeImageIndex].parentNode;
  for (let level = 1; level <= 3; level += 1) {
    if ($(parentNode).find('img').length > 1) {
      break;
    }
    parentNode = parentNode.parentNode;
  }
  Array.from($(parentNode).find('img')).forEach((img) => {
    // output is here
    console.log(img.attribs.src);
  });
}
await browser.close();
