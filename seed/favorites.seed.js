const User = require("../models/User.model.js");
const Recipe = require("../models/Recipe.js");
const Favorite = require("../models/Favorite.js");

const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");

const favorites = [];

async function seedFavorites() {
  await openConnection;
  const allUsers = await User.find();
  const allRecipes = await Recipe.find();
  favorites.push({
    recipe: allRecipes[2]._id,
    user: "62a85d9d47c22609c4f949f4",
  });
  favorites.push({
    recipe: allRecipes[2]._id,
    user: "62a85d9d47c22609c4f949f4",
  });
  favorites.push({
    recipe: allRecipes[0]._id,
    user: "62a85d9d47c22609c4f949f4",
  });
  favorites.push({
    recipe: allRecipes[1]._id,
    user: "62a85d9d47c22609c4f949f4",
  });

  const createdFavorites = await Favorite.create(favorites);
  console.log(`Created ${createdFavorites.length} favorites.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedFavorites();
