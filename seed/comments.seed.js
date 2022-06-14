const Comment = require("../models/Comment.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");

const comments = [
  {
    content: "great recipe!",
    user: "",
    recipe: "",
  },

  {
    content: "love it <3",
    user: "",
    recipe: "",
  },

  {
    content: "nice!",
    user: "",
    recipe: "",
  },

  {
    content: "will send it to grandma!",
    user: "",
    recipe: "",
  },

  {
    content: "cool",
    user: "",
    recipe: "",
  },
];

async function seedUsers() {
  await openConnection;
  const createdComments = await Comment.create(comments);
  console.log(`Created ${createdComments.length} comments.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedUsers();
