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
      "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/288676486_10227612822051581_8589344308614148183_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=xaZ6_iQeUpoAX-AnsyW&_nc_ht=scontent-lhr8-2.xx&oh=00_AT-M7oP3bJ4apzcd7Y-6Rooa6LB2TE-0fzz57YEoGh_sUg&oe=62B1EBA1",
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
    image:
      "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/288894926_10227612821131558_1243786640040088990_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=tFdP_rzHPUUAX_MZNUw&_nc_ht=scontent-lhr8-2.xx&oh=00_AT8sx_h_mvpvAFhF2nWnGNGh8YWiCn8xanX6Y7v1I1hx2g&oe=62B210B7",
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
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/288729118_10227612821091557_4142250259321011779_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=QUXJjbBfUIAAX9LRmIJ&_nc_ht=scontent-lhr8-1.xx&oh=00_AT84MV_x8l0Z0IRWmMa5OmbVd6a-EZFy3ElEB1kmLc2aKw&oe=62B19500",
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
      "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/288793309_10227612822011580_7949962265747183665_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=fZ0ixuhXSAcAX-ux3Ci&_nc_ht=scontent-lhr8-2.xx&oh=00_AT9QCgFQiCKVfq0jgnz41aUCnMGM_oPXrH5omnKf0fBQMQ&oe=62B0493B",
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
      "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/288681558_10227612821171559_3661450369810408318_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=DAqjG4sE-0kAX94gwmp&tn=qcK5pnPVjeR1hQ5x&_nc_ht=scontent-lhr8-2.xx&oh=00_AT-0hZkJnupviOfC-XUlgFUUQEeyvjPYaHBQMlqs7kmvyA&oe=62B22579",
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
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/288809085_10227612833171859_7881662773626159740_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=yCFLcRokfPIAX-8Pf7C&_nc_ht=scontent-lhr8-1.xx&oh=00_AT-P1L65BBNH88NU9hxYvmMGNdFMp3Kb0iXHr-z02mJ_Bg&oe=62B186B1",
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
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/288664944_10227612822891602_7030559592942156212_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=fhd4pTrLGW8AX8R7gmM&tn=qcK5pnPVjeR1hQ5x&_nc_ht=scontent-lhr8-1.xx&oh=00_AT--4wW2e7cMku6g5_G6pFihWBMAH_-OJOli0r1VIilWjA&oe=62B1CDB4",
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
      "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/288819384_10227612823891627_391993938082869773_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=3DaDbvJ4NgkAX99RBWD&_nc_oc=AQk_yhO_SsutKb7_eU0VqCTH49zK3lrXGdlEaiM7Fw7SdSe6t_rjV3ZBUASfRLlYbc4&_nc_ht=scontent-lhr8-2.xx&oh=00_AT_MR9J_bp9BNs4fIUS2I6DDOT0HCSMUAaEsu_kwdQL1LA&oe=62B209BD",
    instruction:
      "STEP 1: Preheat oven to 180°C (160°C fan-forced). Grease a square 20cm x 20cm baking dish and set aside. Gather your ingredients. STEP 2: Remove all meat from chicken and chop. Heat the condensed soup in a frying pan over medium heat until warmed. Add chicken and bring to the boil. You may need to add 1/2 cup of water if it is too thick. Remove from heat. STEP 3: Pour chicken mixture into the baking dish. Slice potatoes thinly and place overlapping each slice to cover the entire dish. Bake for 25-30 minutes or until potatoes are cooked through. Serve with steamed vegetables.",
    preparation_time: "20 minutes",
    baking_time: "30 minutes in the oven",
    category: "Main Dish",
    ingredients: ["00568296", "2201270035824", "20271978"],
    quantity_of_ingredients:
      "1 can cream of chicken condensed soup, 1 rotisserie chicken, 4 large potatoes (large, washed)",
  },

  {
    name: "Garlic Broccoli",
    image:
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/289012498_10227612823251611_632305840878674437_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=OPg4pSbWczcAX9s1M0K&tn=qcK5pnPVjeR1hQ5x&_nc_ht=scontent-lhr8-1.xx&oh=00_AT-Z1XkRo24-uqlyq-j72zTHNJkpzUIgIsH9uei0_ltoEg&oe=62B04A6A",
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
    image:
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/288692257_10227612823971629_8033094256513293683_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=R8bfCUUBws0AX-FBgbB&_nc_oc=AQmb0j8tOSPvY6Fkq1mAQ6M6w6IInrx-7H1RIXBObP5PjbxS3srPkE8R3ofhGyEBOxY&_nc_ht=scontent-lhr8-1.xx&oh=00_AT8hsbtrqY38kVG8jZ3of6jfXjF6NvzBzzsieKubM9LZrg&oe=62B0662A",
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
    image:
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/288752406_10227612823051606_3241469749907784272_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=mMKIjfuqGkYAX-B-VpN&tn=qcK5pnPVjeR1hQ5x&_nc_ht=scontent-lhr8-1.xx&oh=00_AT_sBSyHSJWyzC8hjLw4yBKijoTBNCHC6Hg5V6ARGNCBEw&oe=62B1E72A",
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
    "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F33a6cedb-51f7-4578-80b6-4ffd0098d906.2Ejpeg/400x400/quality/80/crop-from/center/crumble-pomme-framboises.jpeg"
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
