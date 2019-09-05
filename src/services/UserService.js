const User = require('../models/User');
const CollectedCoins = require('../models/CollectedCoins');
const Deaths = require('../models/Deaths');
const mongoose = require('mongoose');
class UserService {
  getUserByID(userId) {
    return User.findById(userId);
  }

  getUserByName(name) {
    return User.findOne({ name: name });
  }

  createUser(name) {
    return User.create({
      name,
    });
  }

  collectCoin(userId, value) {
    CollectedCoins.create({
      user_id: userId,
      value,
    });
  }

  getUserCoins(userId) {
    return CollectedCoins.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$user_id', coins: { $sum: '$value' } } },
    ]);
  }

  killPlayer(userId) {
    Deaths.create({
      user_id: userId,
    });
  }

  countPlayerDeaths(userId) {
    return Deaths.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$user_id', deaths: { $sum: 1 } } },
    ]);
  }
}

module.exports = UserService;
