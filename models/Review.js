const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true
  },
  text: {
    type: String
  },
  campground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campground'
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
