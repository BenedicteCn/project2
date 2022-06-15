const User = require("../models/User.model.js");
const openConnection = require("../db/index.js");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const users = [
  {
    username: "tzu",
    email: "tzu@gmail.com",
    password: bcrypt.hashSync("tzu123", 10),
    role: "admin",
  },

  {
    username: "bene",
    email: "bene@gmail.com",
    password: "bene123",
  },

  {
    username: "robert",
    email: "robert@gmail.com",
    password: "robert123",
  },

  {
    username: "kate",
    email: "kate@gmail.com",
    password: "kate123",
  },
];

async function seedUsers() {
  await openConnection;
  const createdUsers = await User.create(users);
  console.log(`Created ${createdUsers.length} users.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedUsers();
