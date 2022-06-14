const router = require("express").Router();

const Recipe = require("../models/Recipe");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticated = require("../middleware/isAuthenticated");

//Get all recipes (homepage)
router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (err) {
    next(err);
  }
});

//Get recipe by name
router.get("/:name", async (req, res, next) => {
  /**Your code goes here */
  try {
    const recipeName = req.params.name;
    const oneRecipe = await Recipe.find({
      name: { $regex: recipeName, $options: "i" },
    });
    res.status(200).json(oneRecipe);
  } catch (err) {
    next(err);
  }
});

//Get recipe by category name
router.get("category/:name", async (req, res, next) => {
  /**Your code goes here */
  try {
    req.query.category === "Dessert"; // true
    req.query.category === "Starter"; // true
    const oneRecipeByCat = await Recipe.find({
      category: { $regex: req.query.category, $options: "i" },
    });
    res.status(200).json(oneRecipeByCat);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const deletedThing = await Recipe.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted ${deletedThing.name}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
