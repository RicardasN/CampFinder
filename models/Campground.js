const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  rating: {
    type: Number,
    default: 0
  }
});
module.exports = mongoose.model('Campground', CampgroundSchema);
