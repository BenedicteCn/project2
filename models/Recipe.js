const { Schema, SchemaTypes, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: String,
    instruction: String,
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
    ingredients: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
