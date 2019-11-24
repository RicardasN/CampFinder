const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

var Campground = require('../models/Campground');
var Review = require('../models/Review');

// @route       GET   api/campgrounds/:id/reviews
// @desc        Get all campground's reviews
// @access      Public
router.get('/:id/reviews', async (req, res) => {
  try {
    let campground = await Campground.findById(req.params.id)
      .populate({
        path: 'reviews',
        model: 'Review'
      })
      .exec();
    if (campground.reviews == null || campground.reviews.length < 1) {
      return res
        .status(404)
        .json({ message: 'Cant find reviews for the campground' });
    }
    res.json(campground.reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST   api/campgrounds/:id/reviews
// @desc        Add a new review
// @access      Private
router.post(
  '/:id/reviews',
  [
    auth,
    [
      check('text', 'Comment cannot be empty')
        .not()
        .isEmpty(),
      check('rating', 'Rating is a required field')
        .not()
        .isEmpty(),
      check('rating', 'Please submit a valid rating value').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { text, rating } = req.body;

    try {
      const newReview = new Review({
        text,
        rating,
        author: req.user.id
      });
      const review = await newReview.save();
      res.json(review);
    } catch (error) {
      res.status(500).json('Server Error');
    }
  }
);

// @route       GET   api/campgrounds/:id/reviews/:review_id
// @desc        Get a specific review
// @access      Public
router.get('/:id/reviews/:review_id', async function(req, res) {
  try {
    let review = await Review.findById(req.params.review_id);
    if (review == null) {
      return res.status(404).json({ message: 'Cant find the review' });
    }
    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT   api/campgrounds/:id/reviews/:review_id
// @desc        Update a review
// @access      Private
router.put('/:id/reviews/:review_id', auth, async (req, res) => {
  const { text, rating } = req.body;
  //Build comment object
  const reviewFields = {};
  if (text) reviewFields.text = text;
  if (rating) reviewFields.rating = rating;
  try {
    let review = await Review.findById(req.params.review_id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });
    const user = await User.findById(req.user.id).select('-password');
    //Make sure user owns the campground
    if (campground.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    review = await Review.findByIdAndUpdate(
      req.params.review_id,
      { $set: reviewFields },
      { new: true }
    );
    res.json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE   api/campgrounds/:id/reviews/:review_id
// @desc        Delete a review
// @access      Private
router.delete('/:id/reviews/:review_id', auth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.review_id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });
    const user = await User.findById(req.user.id).select('-password');
    //Make sure user owns the campground
    if (campground.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    //delete the review itself
    await Review.findByIdAndRemove(req.params.review_id);
    res.json({ msg: 'Review removed successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
