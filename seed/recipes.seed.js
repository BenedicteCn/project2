const Recipe = require("../models/Recipe.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");
const recipes = [
  {
    name: "Brownies",
    instruction:
      "STEP 1: Cut 185g unsalted butter into small cubes and tip into a medium bowl. Break 185g dark chocolate into small pieces and drop into the bowl.",
    category: "Dessert",
    ingredients: ["3/4 cup All-purpose flour", "1/4 tsp Baking soda"],
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
