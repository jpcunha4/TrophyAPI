const mongoose = require('mongoose');

const collectedCoins = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('CollectedCoins', collectedCoins);
