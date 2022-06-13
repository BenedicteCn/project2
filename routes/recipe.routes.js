const router = require("express").Router();

const Recipe = require("../models/Recipe");

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
    const oneRecipe = await Recipe.find({ name: req.params.name });
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
    const oneRecipeByCat = await Recipe.find({ category: req.query.category });
    res.status(200).json(oneRecipeByCat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
