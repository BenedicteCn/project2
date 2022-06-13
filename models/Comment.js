const { Schema, SchemaTypes, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    recipe: {
      type: SchemaTypes.ObjectId,
      ref: "Recipe",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
