const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

var User = require('../models/User');
var Reply = require('../models/Reply');
var Comment = require('../models/Comment');

// @route       GET   api/campgrounds/:id/comments/:comments_id/replies
// @desc        Get all comment's replies
// @access      Public
router.get('/:id/comments/:comment_id/replies', async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.comment_id)
      .populate({
        path: 'replies',
        model: 'Reply'
      })
      .exec();
    if (comment.replies == null || comment.replies.length < 1) {
      return res.status(404).json({ msg: 'Cant find replies' });
    } else {
      res.json(comment.replies);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST   api/campgrounds/:id/comments/:comments_id/replies
// @desc        Add a new reply
// @access      Private
router.post(
  '/:id/comments/:comment_id/replies',
  [
    auth,
    [
      check('text', 'Reply cannot be empty')
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
      const newReply = new Reply({
        text,
        author: req.user.id
      });
      //save reply
      const reply = await newReply.save();
      //add replies to comment's replies
      let comment = await Comment.findById(req.params.comment_id);
      comment.replies.push(reply);
      comment.save();
      res.json(reply);
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error');
    }
  }
);

// @route       GET   api/campgrounds/:id/comments/:comments_id/replies/:reply_id
// @desc        Get a specific reply
// @access      Public
router.get('/:id/comments/:comment_id/replies/:reply_id', async function(
  req,
  res
) {
  try {
    let reply = await Reply.findById(req.params.reply_id);
    if (reply.length < 1) {
      return res.status(404).json({ msg: 'Cant find the reply' });
    } else {
      res.json(reply);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT   api/campgrounds/:id/comments/:comments_id/replies/:reply_id
// @desc        Update a reply
// @access      Private
router.put(
  '/:id/comments/:comment_id/replies/:reply_id',
  auth,
  async (req, res) => {
    const { text } = req.body;
    //Build comment object
    const replyFields = {};
    if (text) replyFields.text = text;
    try {
      let reply = await Reply.findById(req.params.reply_id);
      if (!reply) return res.status(404).json({ msg: 'Reply not found' });
      //Make sure user owns the reply
      const user = await User.findById(req.user.id).select('-password');
      //Make sure user owns the campground
      if (campground.author.toString() !== req.user.id && !user.isAdmin) {
        return res
          .status(401)
          .json({ msg: 'Not authorized to access this resource' });
      }
      reply = await Reply.findByIdAndUpdate(
        req.params.reply_id,
        { $set: replyFields },
        { new: true }
      );
      res.json(reply);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE   api/campgrounds/:id/comments/:comments_id/replies/:reply_id
// @desc        Delete a reply
// @access      Private
router.delete(
  '/:id/comments/:comment_id/replies/:reply_id',
  auth,
  async (req, res) => {
    try {
      let reply = await Reply.findById(req.params.reply_id);
      if (!reply) return res.status(404).json({ msg: 'Comment not found' });
      //Make sure user own the campground
      const user = await User.findById(req.user.id).select('-password');
      //Make sure user owns the campground
      if (campground.author.toString() !== req.user.id && !user.isAdmin) {
        return res
          .status(401)
          .json({ msg: 'Not authorized to access this resource' });
      }
      //delete the reply
      await Reply.findByIdAndRemove(req.params.reply_id);
      res.json({ msg: 'Reply removed successfully!' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
