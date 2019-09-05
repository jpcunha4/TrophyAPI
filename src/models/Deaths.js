const mongoose = require('mongoose');

const deaths = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('deaths', deaths);
