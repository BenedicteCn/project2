const router = require('express').Router();

const Comment = require('../models/Comment');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User.model');

// See all comments
router.get('/', async (req, res, next) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json(allComments);
  } catch (err) {
    next(err);
  }
});

// create a comment: route to be discussed (should have recipe id?)
router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const createOneComment = await Comment.create(req.body);

    res.status(201).json({
      message: `Your comment has been CREATED 👏`,
    });
  } catch (e) {
    next(e);
  }
});

// update a comment

router.patch('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user;
    const comment = await Comment.findById(req.params.id);
    if (comment === undefined) {
      return res.status(404).json({
        error: {
          message: `Comment doesn't exist. 🤡`,
        },
      });
    }

    if (comment.user._id.toString() != user._id.toString()) {
      return res.status(401).json({
        error: {
          message: `You can only update your own comments. 💩`,
        },
      });
    }
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

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user;
    const comment = await Comment.findById(req.params.id);
    if (comment === undefined) {
      return res.status(404).json({
        error: {
          message: `Comment doesn't exist. 😖`,
        },
      });
    }

    if (comment.user._id.toString() != user._id.toString()) {
      return res.status(401).json({
        error: {
          message: `You can only delete your own comments. 🤭`,
        },
      });
    }
    const deletedThing = await Comment.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted your comment! 🤓` });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
