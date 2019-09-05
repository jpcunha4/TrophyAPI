const User = require('../models/User');
const CollectedCoins = require('../models/CollectedCoins');
const mongoose = require('mongoose');
class UserService {
  async getUserByID(userId) {
    const result = await User.findById(userId);

    return result;
  }

  async getUserByName(name) {
    const result = await User.findOne({ name: name });

    return result;
  }

  async createUser(name) {
    const newUser = User.create({
      name,
    });

    return newUser;
  }

  async collectCoin(userId, value) {
    const result = await CollectedCoins.create({
      user_id: userId,
      value,
    });
    console.log(result);
  }

  async getUserCoins(userId) {
    const result = await CollectedCoins.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$user_id', coins: { $sum: '$value' } } },
    ]);

    return result;
  }
}

module.exports = UserService;
