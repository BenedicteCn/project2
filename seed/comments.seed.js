const Comment = require("../models/Comment.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");

const comments = [
  {
    content: "great recipe!",
    user: "62a9ba5b0630e31d2dc3e24c",
    recipe: "",
  },

  {
    content: "love it <3",
    user: "62a9ba5b0630e31d2dc3e24c",
    recipe: "",
  },

  {
    content: "nice!",
    user: "62a9ba5b0630e31d2dc3e24c",
    recipe: "",
  },

  {
    content: "will send it to grandma!",
    user: "62a9ba5b0630e31d2dc3e24d",
    recipe: "",
  },

  {
    content: "cool",
    user: "62a9ba5b0630e31d2dc3e24d",
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
