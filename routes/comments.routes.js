const router = require("express").Router();

const Comment = require("../models/Comment.model");

// create a comment: route to be discussed (should have recipe id?)

router.post("/create", async (req, res) => {
  try {
    const createOneComment = await Comment.create(req.body);
  } catch (e) {
    console.error(e);
  }
  const comment = req.body;
  res.status(201).json({
    message: `${comment.title} has been CREATED`,
  });
});

// update a comment

router.post("/comment/:id", async (req, res, next) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateComment);
  } catch (err) {
    next(err);
  }
});

// delete a comment

router.delete("/comment/:id", async (req, res, next) => {
  try {
    const deletedThing = await Comment.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted ${deletedThing.name}` });
  } catch (err) {
    next(err);
  }
});
