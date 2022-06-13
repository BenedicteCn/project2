const Recipe = require("../models/Recipe.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");
const recipes = [
  {
    name: "Semisweet Chocolate Mousse",
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
];

async function seedRecipes() {
  await openConnection;
  const createdRecipes = await Recipe.create(recipes);
  console.log(`Created ${createdRecipes.length} recipes.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedRecipes();
