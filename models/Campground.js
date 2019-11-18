var mongoose = require('mongoose');

var CampgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: String,
  lat: Number,
  lng: Number,
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
