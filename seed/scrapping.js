const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[3]/picture/img'
  );
  const src = await el.getProperty('src');
  const srcTxt = await src.jsonValue();
  console.log(srcTxt);

  const [el1] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[2]/div[1]/h1'
  );
  const title = await el1.getProperty('textContent');
  const rawTxt = await title.jsonValue();
  console.log(rawTxt);

  const [el2] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/ul'
  );
  const instruction = await el2.getProperty('textContent');
  const rawTxt2 = await instruction.jsonValue();
  console.log(rawTxt2);
  browser.close();
}

scrapeProduct(
  'https://www.marmiton.org/recettes/recette_crumble-pommes-fraises-rhubarbe-aux-speculoos_30908.aspx'
);

console.log(scrapeProduct);
