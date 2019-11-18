var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Reply', ReplySchema);
