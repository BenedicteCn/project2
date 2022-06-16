const User = require("../models/User.model.js");
const Recipe = require("../models/Recipe.js");
const Comment = require("../models/Comment.js");

const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");

const comments = [];

async function seedComment() {
  await openConnection;
  await Comment.deleteMany();
  const allUsers = await User.find();
  const allRecipes = await Recipe.find();
  comments.push({
    content: "super good!",
    recipe: allRecipes[2]._id,
    user: allUsers[0]._id,
  });
  comments.push({
    content: "great!",
    recipe: allRecipes[1]._id,
    user: allUsers[0]._id,
  });
  comments.push({
    content: "love it!",
    recipe: allRecipes[0]._id,
    user: allUsers[0]._id,
  });
  comments.push({
    content: "amazing!",
    recipe: allRecipes[1]._id,
    user: allUsers[1]._id,
  });

  comments.push({
    content: "tasty:)",
    recipe: allRecipes[2]._id,
    user: allUsers[1]._id,
  });

  comments.push({
    content: "awesome!",
    recipe: allRecipes[3]._id,
    user: allUsers[3]._id,
  });

  const createdComments = await Comment.create(comments);
  console.log(`Created ${createdComments.length} comments.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedComment();
