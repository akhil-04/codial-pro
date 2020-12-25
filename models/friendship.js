const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    //   the user who sendss the request
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'from_user must belongs to current user'],
    },
    // who accepts the request 
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  });

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;