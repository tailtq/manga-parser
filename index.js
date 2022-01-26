import Cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const { default: $ } = Cheerio;
const url = 'http://fanfox.net/manga/level_up_in_mirror/c007/1.html#ipg1';
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
});
const page = await browser.newPage();
await page.setExtraHTTPHeaders({
  'Accept-Language': 'en'
});
console.log(`Running Puppeteer`);
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
await page.goto(url);
// size
const element = await page.$('.reader-main-img');
console.log(await element.boundingBox(), element.asElement());
// html
const content = await page.content();
await browser.close();
console.log(`End Puppeteer`);

// return content;

