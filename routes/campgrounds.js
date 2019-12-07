const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

var Campground = require('../models/Campground');
var Review = require('../models/Review');
var Comment = require('../models/Comment');
var User = require('../models/User');

// @route       GET   api/campgrounds
// @desc        Get all campgrounds
// @access      Public
router.get('/', async (req, res) => {
  try {
    const campgrounds = await Campground.find({}).sort({ createdAt: -1 });
    if (campgrounds == null) {
      return res.status(404).json({ message: 'Cant find any campgrounds' });
    }
    res.json(campgrounds);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST   api/campgrounds
// @desc        Add new campground
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('image', 'Image is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check(
        'description',
        'Description can not be shorter than 20 characters'
      ).isLength({ min: 20 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, image, description, price, location } = req.body;

    try {
      const newCampground = new Campground({
        name,
        image,
        description,
        price,
        location,
        author: req.user.id
      });
      const campground = await newCampground.save();
      res.json(campground);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET   api/campgrounds/:id
// @desc        Get a specific campground
// @access      Public
router.get('/:id', async function(req, res) {
  try {
    //is ID valid?
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: 'Cant find the campground' });
    }
    //find the campground with provided ID
    let campground = await Campground.findById(req.params.id);
    /*.populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 } }
      })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'comments.replies',
          model: 'Reply'
        }
      })
      .exec();*/
    if (campground == null) {
      return res.status(404).json({ message: 'Cant find the campground' });
    }
    res.json(campground);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route       PUT   api/campgrounds/:id
// @desc        Update a campground
// @access      Private
router.put('/:id', auth, async (req, res) => {
  //is ID valid?
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: 'Cant find the campground' });
  }
  const { name, image, description, price, location } = req.body;
  //Build campground object
  const campgroundFields = {};
  if (name) campgroundFields.name = name;
  if (image) campgroundFields.image = image;
  if (description) campgroundFields.description = description;
  if (price) campgroundFields.price = price;
  if (location) campgroundFields.location = location;
  try {
    let campground = await Campground.findById(req.params.id);
    if (!campground)
      return res.status(404).json({ msg: 'Campground not found' });
    const user = await User.findById(req.user.id).select('-password');
    //Make sure user owns the campground
    if (campground.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    campground = await Campground.findByIdAndUpdate(
      req.params.id,
      { $set: campgroundFields },
      { new: true }
    );
    res.json(campground);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE   api/campgrounds/:id
// @desc        Delete a campground
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  //is ID valid?
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: 'Cant find the campground' });
  }
  try {
    let campground = await Campground.findById(req.params.id);
    if (!campground)
      return res.status(404).json({ msg: 'Campground not found' });
    const user = await User.findById(req.user.id).select('-password');
    //Make sure user owns the campground
    if (campground.author.toString() !== req.user.id && !user.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized to access this resource' });
    }
    // delete all comments associated with the campground
    await Comment.deleteMany({ _id: { $in: campground.comments } });
    // delete all reviews associated with the campground
    await Review.deleteMany({ _id: { $in: campground.reviews } });
    //delete the campground itself
    await Campground.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Campground removed successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
