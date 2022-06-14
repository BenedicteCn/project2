const Recipe = require('../models/Recipe.js');
const openConnection = require('../db/index.js');
const { default: mongoose } = require('mongoose');

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
  // console.log(srcTxt);

  const [el1] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[2]/div[1]/h1'
  );
  const title = await el1.getProperty('textContent');
  const rawTxt = await title.jsonValue();
  // console.log(rawTxt);

  const [el2] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/ul'
  );
  const instruction = await el2.getProperty('textContent');
  const rawTxt2 = await instruction.jsonValue();
  // console.log(rawTxt2);
  const [el3] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/p/a[3]/span/span'
  );
  const category = await el3.getProperty('textContent');
  const rawTxt3 = await category.jsonValue();
  // console.log(rawTxt3);

  const [el4] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[7]/div[3]/div/div/div'
  );
  const quantity = await el4.getProperty('textContent');
  const rawTxt4 = await quantity.jsonValue();

  browser.close();
  return {
    image: srcTxt,
    name: rawTxt,
    instruction: rawTxt2,
    category: rawTxt3,
    quantity: rawTxt4,
  };
}

const recipes = [
  {
    name: 'Easy crêpes',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pancakes-235859b.jpg?quality=90&webp=true&resize=300,272',
    instruction:
      'STEP 1: Weigh the flour in a large jug or bowl. Crack in the eggs, add half the milk and a pinch of salt. Whisk to a smooth, thick batter. Add the remaining milk and whisk again. Set aside for at least 30 mins. STEP 2 : Heat a large non-stick crêpe pan or frying pan. Add a drizzle of oil, then wipe out the excess with kitchen paper. When the pan is hot, add enough batter to just cover the surface, swirling it and pouring any excess back into the bowl. The pancake should be as thin as possible. When the edges are peeling away from the sides of the pan, shake it to see if the pancake easily releases and is browning on the underside. If not, cook a little longer. Flip and cook the other side for a minute or two. Serve, or keep warm in a low oven.',
    preparation_time: '5 minutes',
    baking_time: '20 minutes + resting',
    category: 'Dessert',
    ingredients: [
      '3760324840306',
      '3760084050182',
      '3267031703004',
      '6191533301291',
    ],
    quantity_of_ingredients:
      '175g plain flour, 3 large eggs, 450ml milk, sunflower oil (for frying)',
  },

  {
    name: 'Strawberry Agua Fresca',
    image: 'https://www.lovebakesgoodcakes.com/strawberry-agua-fresca/',
    instruction:
      'Blend the strawberries with 1 cup water, lime juice and honey. You can adjust the lime and honey to taste. The sweetener is very minimal, but it is nice to have otherwise it turns out very tart. Add the remaining cold water. You can drink immediately, or store for up to 3 days!',
    preparation_time: '10 minutes',
    category: 'Drinks',
    ingredients: [
      '3276554567963',
      '3564707083621',
      '3701128701189',
      '26003481',
    ],
    quantity_of_ingredients:
      '500g Fresh strawberries, 1 Lime, 1/2 cup honey ,1/2 cup water',
  },

  {
    name: 'Banana Oat Smoothie',
    image:
      'https://littlesunnykitchen.com/wp-content/uploads/2019/08/Banana-Oatmeal-Smoothie-3.jpg',
    instruction:
      'Add rolled oats to a blender and blend until the oats are the size of a fine crumb. Add the banana and milk and blend well. Pour in a glass. Enjoy!',
    preparation_time: '8 minutes',
    category: 'Drinks',
    ingredients: ['2860151006898', '3760222470629', '3267031703004'],
    quantity_of_ingredients:
      '½ cup rolled oats(50 g), 1 banana,1 cup milk(240 mL), of choice',
  },

  {
    name: 'Basic Omelette',
    image:
      'https://www.franceinter.fr/emissions/on-va-deguster/on-va-deguster-08-aout-2020',
    instruction:
      'STEP 1: Pour the eggs into the pan, tilt the pan ever so slightly from one side to another to allow the eggs to swirl and cover the surface of the pan completely. Let the mixture cook for about 20 seconds then scrape a line through the middle with a spatula. STEP 2: Tilt the pan again to allow it to fill back up with the runny egg. Repeat once or twice more until the egg has just set.',
    preparation_time: '10 minutes',
    category: 'Breakfast/Brunch',
    ingredients: ['3560070874989', '3536590053159'],
    quantity_of_ingredients: '3 eggs, 1 tsp olive oil',
  },
];

async function seedRecipes() {
  await openConnection;

  const recipeScrappedInfo = await scrapeProduct(
    'https://www.marmiton.org/recettes/recette_crumble-pommes-fraises-rhubarbe-aux-speculoos_30908.aspx'
  );
  console.log(recipeScrappedInfo);

  // add a new recipe with the scrapped info to the recipes array
  const scrappedRecipe = {
    name: recipeScrappedInfo.name,
    image: recipeScrappedInfo.image,
    instruction: recipeScrappedInfo.instruction,
    category: recipeScrappedInfo.category,
    ingredients: [
      '3385630043984',
      '3760324840306',
      '3276554567963',
      '3760253520706',
      '3700476611638',
      '3329757003865',
    ],
    quantity_of_ingredients: recipeScrappedInfo.quantity,
  };
  recipes.push(scrappedRecipe);
  const createdRecipes = await Recipe.create(recipes);
  console.log(`Created ${createdRecipes.length} recipes.`);
  await mongoose.connection.close();
  console.log('Connection closed.');
}

seedRecipes();
