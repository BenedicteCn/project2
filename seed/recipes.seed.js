const Recipe = require("../models/Recipe.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");
const recipes = [
  {
    name: "Brownies",
    instruction:
      "1/ In a small saucepan, melt chocolate chips with water; stir until smooth. Stir a small amount of hot chocolate mixture into egg yolk; return all to the pan, stirring constantly. Cook and stir for 2 minutes or until slightly thickened. Remove from the heat; stir in vanilla. Quickly transfer to a small bowl. Stir occasionally until completely cooled. 2/ In a small bowl, beat whipping cream until it begins to thicken. Add sugar; beat until soft peaks form. Fold into cooled chocolate mixture. Cover and refrigerate for at least 2 hours. If desired, garnish with whipped cream and raspberries. 1/4 cup semisweet chocolate chips, 1 tablespoon water, 1 large egg yolk, lightly beaten, 1-1/2 teaspoons vanilla extract, 1/2 cup heavy whipping cream, 1 tablespoon sugar,",
    category: "Dessert",
    ingredients: [
      "3/4 cup All-purpose flour, 3068110702235",
      "1/4 tsp Baking soda",
    ],
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
