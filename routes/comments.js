const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Campground = require('../models/Campground').default;
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const User = require('../models/User');

const router = express.Router();

// @route       GET   api/campgrounds/:id/comments
// @desc        Get all campground's comments
// @access      Public
router.get('/:id/comments', async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id)
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'comments.replies',
          model: 'Reply'
        }
      })
      .exec();
    if (campground.comments == null || campground.comments.length < 1) {
      return res.status(404).json({ msg: 'Comments not found' });
    }
    res.json(campground.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST   api/campgrounds/:id/comments
// @desc        Add a new comment
// @access      Private
router.post(
  '/:id/comments',
  [
    auth,
    [
      check('text', 'Comment cannot be empty')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { text } = req.body;

    try {
      const newComment = new Comment({
        text,
        author: req.user.id
      });
      const comment = await newComment.save();
      const campground = await Campground.findById(req.params.id);
      campground.comments.push(comment);
      campground.save();
      res.json(comment);
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server Error');
    }
  }
);

// @route       GET   api/campgrounds/:id/comments/:comment_id
// @desc        Get a specific comment
// @access      Public
router.get('/:id/comments/:comment_id', async function(req, res) {
  // is ID valid?
  if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Comment not found' });
  }
  try {
    const comment = await Comment.findById(req.params.comment_id);
    if (comment == null) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT   api/campgrounds/:id/comments/:comment_id
// @desc        Update a comment
// @access      Private
router.put('/:id/comments/:comment_id', auth, async (req, res) => {
  // is ID valid?
  if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Comment not found' });
  }
  const { text } = req.body;
  // Build comment object
  const commentFields = {};
  if (text) commentFields.text = text;
  try {
    let comment = await Comment.findById(req.params.comment_id);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });
    const user = await User.findById(req.user.id).select('-password');
    // Make sure user owns the comment
    if (comment.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    comment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      { $set: commentFields },
      { new: true }
    );
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE   api/campgrounds/:id/comments/:comment_id
// @desc        Delete a comment
// @access      Private
router.delete('/:id/comments/:comment_id', auth, async (req, res) => {
  // is ID valid?
  if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Comment not found' });
  }
  try {
    const comment = await Comment.findById(req.params.comment_id);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });
    const user = await User.findById(req.user.id).select('-password');
    // Make sure user owns the campground
    if (comment.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    await Campground.update(
      { _id: req.params.id },
      { $pull: { comments: comment._id } }
    );
    // delete all replies associated with the comment
    await Reply.deleteMany({ _id: { $in: comment.replies } });
    // delete the comment itself
    await Comment.findByIdAndRemove(req.params.comment_id);
    res.json({ msg: 'Comment removed successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
