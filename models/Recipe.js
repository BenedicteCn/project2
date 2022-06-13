const { Schema, SchemaTypes, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: String,
    image: String,
    instruction: String,
    preparation_time: String,
    baking_time: String,
    category: {
      type: SchemaTypes.String,
      enum: [
        "Dessert",
        "Main Dish",
        "Starter",
        "Drinks",
        "Breakfast/Brunch",
        "Appetizer",
      ],
      required: true,
    },
    quantity_of_ingredients: String,
    ingredients: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
