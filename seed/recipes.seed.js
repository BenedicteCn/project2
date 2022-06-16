const Recipe = require("../models/Recipe.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");

const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[3]/picture/img'
  );
  const src = await el.getProperty("src");
  const srcTxt = await src.jsonValue();
  // console.log(srcTxt);

  const [el1] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[2]/div[1]/h1'
  );
  const title = await el1.getProperty("textContent");
  const rawTxt = await title.jsonValue();
  // console.log(rawTxt);

  const [el2] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/ul'
  );
  const instruction = await el2.getProperty("textContent");
  const rawTxt2 = await instruction.jsonValue();
  // console.log(rawTxt2);
  const [el3] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/p/a[3]/span/span'
  );
  const category = await el3.getProperty("textContent");
  const rawTxt3 = await category.jsonValue();
  // console.log(rawTxt3);

  const [el4] = await page.$x(
    '//*[@id="__next"]/div[3]/main/div/div/div[1]/div[1]/div[7]/div[3]/div/div/div'
  );
  const quantity = await el4.getProperty("textContent");
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
    name: "Easy crêpes",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pancakes-235859b.jpg?quality=90&webp=true&resize=300,272",
    instruction:
      "STEP 1: Weigh the flour in a large jug or bowl. Crack in the eggs, add half the milk and a pinch of salt. Whisk to a smooth, thick batter. Add the remaining milk and whisk again. Set aside for at least 30 mins. STEP 2 : Heat a large non-stick crêpe pan or frying pan. Add a drizzle of oil, then wipe out the excess with kitchen paper. When the pan is hot, add enough batter to just cover the surface, swirling it and pouring any excess back into the bowl. The pancake should be as thin as possible. When the edges are peeling away from the sides of the pan, shake it to see if the pancake easily releases and is browning on the underside. If not, cook a little longer. Flip and cook the other side for a minute or two. Serve, or keep warm in a low oven.",
    preparation_time: "5 minutes",
    baking_time: "20 minutes + resting",
    category: "Dessert",
    ingredients: [
      "3760324840306",
      "3760084050182",
      "3267031703004",
      "6191533301291",
    ],
    quantity_of_ingredients:
      "175g plain flour, 3 large eggs, 450ml milk, sunflower oil (for frying)",
  },

  {
    name: "Strawberry Agua Fresca",
    image: "https://www.lovebakesgoodcakes.com/strawberry-agua-fresca/",
    instruction:
      "Blend the strawberries with 1 cup water, lime juice and honey. You can adjust the lime and honey to taste. The sweetener is very minimal, but it is nice to have otherwise it turns out very tart. Add the remaining cold water. You can drink immediately, or store for up to 3 days!",
    preparation_time: "10 minutes",
    category: "Drinks",
    ingredients: [
      "3276554567963",
      "3564707083621",
      "3701128701189",
      "26003481",
    ],
    quantity_of_ingredients:
      "500g Fresh strawberries, 1 Lime, 1/2 cup honey ,1/2 cup water",
  },

  {
    name: "Banana Oat Smoothie",
    image:
      "https://littlesunnykitchen.com/wp-content/uploads/2019/08/Banana-Oatmeal-Smoothie-3.jpg",
    instruction:
      "Add rolled oats to a blender and blend until the oats are the size of a fine crumb. Add the banana and milk and blend well. Pour in a glass. Enjoy!",
    preparation_time: "8 minutes",
    category: "Drinks",
    ingredients: ["2860151006898", "3760222470629", "3267031703004"],
    quantity_of_ingredients:
      "½ cup rolled oats(50 g), 1 banana,1 cup milk(240 mL), of choice",
  },

  {
    name: "Basic Omelette",
    image:
      "https://www.franceinter.fr/emissions/on-va-deguster/on-va-deguster-08-aout-2020",
    instruction:
      "STEP 1: Pour the eggs into the pan, tilt the pan ever so slightly from one side to another to allow the eggs to swirl and cover the surface of the pan completely. Let the mixture cook for about 20 seconds then scrape a line through the middle with a spatula. STEP 2: Tilt the pan again to allow it to fill back up with the runny egg. Repeat once or twice more until the egg has just set.",
    preparation_time: "10 minutes",
    category: "Breakfast/Brunch",
    ingredients: ["3560070874989", "3536590053159"],
    quantity_of_ingredients: "3 eggs, 1 tsp olive oil",
  },

  {
    name: "Sugar-free strawberry roll ups",
    image:
      "https://img.kidspot.com.au/qn6x3587/w643-h428-cfill-q90/kk/2019/07/rollups-601440-1.jpg",
    instruction:
      "STEP 1: Preheat oven to 120°C and line a large baking tray with baking paper. STEP 2: Place strawberries, lemon juice and seeds into a high speed blender and puree. Pour strawberry puree onto baking tray. Evenly smooth out with a spatula to make a thin, even layer. STEP 3: Cook in the oven for 3 hours*. Once cooked, transfer to a wire rack and allow to cool until firm. Carefully remove baking paper and slice into pieces with a sharp knife. Store in an airtight container in the pantry. Enjoy!",
    preparation_time: "20 minutes",
    baking_time: "3h in the oven + resting",
    category: "Dessert",
    ingredients: ["3276554567963", "3273120022536", "3766494840849"],
    quantity_of_ingredients:
      "2 cup strawberries, washed and sliced, 3 tbs chia seeds or hemp seeds, 1/2 lemon, juiced",
  },

  {
    name: "3 ingredient pineapple cake",
    image:
      "https://us.123rf.com/450wm/karammiri/karammiri0910/karammiri091000211/5795456-cake.jpg?ver=6",
    instruction:
      "STEP 1: Preheat oven to 180°C. Line a loaf tin with baking paper and set aside. STEP 2: Mix all ingredients together until well combined. STEP 3: Pour into the loaf tin and bake for 55-60 minutes.",
    preparation_time: "5 minutes",
    baking_time: "1h in the oven + resting",
    category: "Dessert",
    ingredients: ["3080920982942", "3329757003865", "3347431080315"],
    quantity_of_ingredients:
      "2 cups flour , 1 cup caster sugar, 1 can crushed pineapple (undrained)",
  },

  {
    name: "Simple fruit cake",
    image:
      "https://img.kidspot.com.au/i8B3eEqm/w643-h428-cfill-q90/kk/2015/03/4710-501099-1.jpg",
    instruction:
      "STEP 1: Place mixed dried fruit in a medium saucepan and pour over 2 cups of fruit juice. Bring to the boil, reduce heat to low and simmer for 3 minutes. Remove from heat and leave to cool for 2 hours. STEP 2: Preheat oven to 150°C fan-forced or 170°C conventional. Line a 20cm round spring form tin with baking paper and set aside. STEP 3: Sift the self-raising flour over the soaked fruit and stir well until completely combined. Use the remaining half cup of juice if needed to make a moist mixture. STEP 4: Pour into cake tin and bake for 2 hours on the lowest shelf. Remove from oven and leave cake to cool entirely in the tin. Wrap in foil and keep in an airtight container for 2-3 days before slicing.",
    preparation_time: "15 minutes",
    baking_time: "2h in the oven + resting",
    category: "Dessert",
    ingredients: ["3080920982942", "3329757003865", "3347431080315"],
    quantity_of_ingredients:
      "1 kg mixed dried fruit, 1/2 cup fruit juice, 2 cups self-raising flour",
  },

  {
    name: "Chicken casserole",
    image:
      "https://img.kidspot.com.au/-jb8Arhf/w643-h428-cfill-q90/kk/2015/03/5373-501386-1.jpg",
    instruction:
      "STEP 1: Preheat oven to 180°C (160°C fan-forced). Grease a square 20cm x 20cm baking dish and set aside. Gather your ingredients. STEP 2: Remove all meat from chicken and chop. Heat the condensed soup in a frying pan over medium heat until warmed. Add chicken and bring to the boil. You may need to add 1/2 cup of water if it is too thick. Remove from heat. STEP 3: Pour chicken mixture into the baking dish. Slice potatoes thinly and place overlapping each slice to cover the entire dish. Bake for 25-30 minutes or until potatoes are cooked through. Serve with steamed vegetables.",
    preparation_time: "20 minutes",
    baking_time: "30 minutes in the oven",
    category: "Main dish",
    ingredients: ["00568296", "2201270035824", "20271978"],
    quantity_of_ingredients:
      "1 can cream of chicken condensed soup, 1 rotisserie chicken, 4 large potatoes (large, washed)",
  },

  {
    name: "Garlic Broccoli",
    image:
      "https://www.thespruceeats.com/vegan-broccoli-in-sweet-garlic-sauce-3377796",
    instruction:
      " Step 1 Preheat oven to 190 degrees.Spread out broccoli in a medium rectangular casserole dish Step 2 Stir the garlic together in a separate bowl. Sprinkle the cheese evenly over broccoli and add salt and pepper to taste.",
    category: "Main Dish",
    preparation_time: "60 minutes",
    baking_time: "25 minutes",
    ingredients: ["3250392053659", "0819377008393"],
    quantity_of_ingredients: " 3 crowns broccoli,3 cloves garlic",
  },

  {
    name: "Whipped Frozen Lemonade",
    image: "https://www.eatingwell.com/recipe/280098/whipped-frozen-lemonade/",
    instruction:
      " To prepare simple syrup: Bring sugar and water to a simmer in a small saucepan over medium heat, stirring occasionally until the sugar dissolves. Stir in lemon zest and remove from heat. Cover and let steep for 1 hour, then strain the syrup through a fine-mesh sieve; discard the zest.",
    category: "Drinks",
    preparation_time: "5 minutes",
    ingredients: ["3564707083621", "8857122685095", "3701128701189"],
    quantity_of_ingredients:
      " 2 lemons,1 cup full-fat coconut milk, 1 tsp honey",
  },

  {
    name: "Spinach-Avocado Smoothie",
    image: "https://www.eatingwell.com/recipe/262759/spinach-avocado-smoothie/",
    instruction:
      "Combine yogurt, spinach, banana, avocado, water and honey in a blender. Puree until smooth.",
    category: "Drinks",
    preparation_time: "5 minutes",
    ingredients: [
      "0898248001008",
      "3248650014948",
      "2860151006898",
      "3701128701189",
      "26003481",
    ],
    quantity_of_ingredients:
      "1 cup nonfat plain yogurt,1 cup fresh spinach, 1 frozen banana,1/4 avocado,2 tsp water, 1 tsp honey",
  },
];

async function seedRecipes() {
  await openConnection;
  await Recipe.deleteMany();

  const recipeScrappedInfo = await scrapeProduct(
    "https://www.marmiton.org/recettes/recette_crumble-pommes-fraises-rhubarbe-aux-speculoos_30908.aspx"
  );
  console.log(recipeScrappedInfo);

  // add a new recipe with the scrapped info to the recipes array
  const scrappedRecipe = {
    name: recipeScrappedInfo.name,
    image: recipeScrappedInfo.image,
    instruction: recipeScrappedInfo.instruction,
    category: recipeScrappedInfo.category,
    ingredients: [
      "3385630043984",
      "3760324840306",
      "3276554567963",
      "3760253520706",
      "3700476611638",
      "3329757003865",
    ],
    quantity_of_ingredients: recipeScrappedInfo.quantity,
  };
  recipes.push(scrappedRecipe);
  const createdRecipes = await Recipe.create(recipes);
  console.log(`Created ${createdRecipes.length} recipes.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedRecipes();
