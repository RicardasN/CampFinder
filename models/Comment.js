const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply'
    }
  ]
});

module.exports = mongoose.model('Comment', CommentSchema);
