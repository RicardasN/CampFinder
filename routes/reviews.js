const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Campground = require('../models/Campground');
const Review = require('../models/Review');
const User = require('../models/User');

const router = express.Router();

// @route       GET   api/campgrounds/:id/reviews
// @desc        Get all campground's reviews
// @access      Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          select: '-password -__v -date -email'
        }
      })
      .exec();
    if (campground === null) {
      return res
        .status(404)
        .json({ msg: 'Cant find reviews for the campground' });
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
      check('text', 'Review text cannot be empty')
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
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { text, rating } = req.body;

    try {
      const newReview = new Review({
        text,
        rating,
        author: req.user.id
      });
      const review = await newReview.save();

      const campground = await Campground.findById(req.params.id).populate(
        'reviews'
      );
      campground.reviews.push(review);
      const campRating = await calculateAverage(campground.reviews);
      campground.rating = campRating;
      await campground.save();

      res.json(review);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET   api/campgrounds/:id/reviews/:review_id
// @desc        Get a specific review
// @access      Public
router.get('/:id/reviews/:review_id', async function(req, res) {
  // is ID valid?
  if (!req.params.review_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Review not found' });
  }
  try {
    const review = await Review.findById(req.params.review_id);
    if (review == null) {
      return res.status(404).json({ msg: 'Review not found' });
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
  // is ID valid?
  if (!req.params.review_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Review not found' });
  }
  // Build comment object
  const reviewFields = {};
  if (text) reviewFields.text = text;
  if (rating) reviewFields.rating = rating;
  try {
    let review = await Review.findById(req.params.review_id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });
    const user = await User.findById(req.user.id).select('-password');
    // Make sure user owns the review
    if (review.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    review = await Review.findByIdAndUpdate(
      req.params.review_id,
      { $set: reviewFields },
      { new: true }
    );
    const campground = await Campground.findById(req.params.id).populate(
      'reviews'
    );
    const campRating = await calculateAverage(campground.reviews);
    campground.rating = campRating;
    await campground.save();

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
  // is ID valid?
  if (!req.params.review_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ msg: 'Review not found' });
  }
  try {
    const review = await Review.findById(req.params.review_id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });
    const user = await User.findById(req.user.id).select('-password');
    // Make sure user owns the review
    if (review.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    // Handle review in a campground
    const campground = await Campground.findByIdAndUpdate(
      req.params.id,
      { $pull: { reviews: req.params.review_id } },
      { new: true }
    ).populate('reviews');
    // recalculate campground average
    const campRating = await calculateAverage(campground.reviews);
    campground.rating = campRating;
    //save changes
    campground.save();
    // delete the review itself
    await Review.findByIdAndRemove(req.params.review_id);
    res.json({ msg: 'Review removed successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

const calculateAverage = async reviews => {
  if (reviews.length === 0) {
    return 0;
  }
  var sum = 0;
  reviews.forEach(element => {
    sum += element.rating;
  });
  return sum / reviews.length;
};

module.exports = router;
