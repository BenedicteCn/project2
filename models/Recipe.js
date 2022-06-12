const { Schema, SchemaTypes, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    name: String,
    instruction: String,
    category: {
      type: SchemaTypes.String,
      enum: ['Dessert', 'Plat', 'Entree'],
      required: true,
    },
    ingredients: [{ type: String }],

    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
