const router = require("express").Router();

const Comment = require("../models/Comment");
const isAuthenticated = require("../middleware/isAuthenticated");

// See all comments
router.get("/", async (req, res, next) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json(allComments);
  } catch (err) {
    next(err);
  }
});

// create a comment: route to be discussed (should have recipe id?)
router.post("/create", isAuthenticated, async (req, res) => {
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

router.post("/:id", isAuthenticated, async (req, res, next) => {
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

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const deletedThing = await Comment.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted ${deletedThing.name}` });
  } catch (err) {
    next(err);
  }
});
module.exports = router;