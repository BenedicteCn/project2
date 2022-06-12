const { Schema, SchemaTypes, model } = require('mongoose');

const favoriteSchema = new Schema(
  {
    recipe: {
      type: SchemaTypes.ObjectId,
      ref: 'Recipe',
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
