const mongoose = require('mongoose');
//MODELS
const User = require('../models/User');
const CollectedCoins = require('../models/CollectedCoins');
const Deaths = require('../models/Deaths');
const KilledMonsters = require('../models/KilledMonsters');
class UserService {
  getAllUsers() {
    return User.find();
  }

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

  countPlayerDeaths(userId) {
    return Deaths.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$user_id', deaths: { $sum: 1 } } },
    ]);
  }

  killMonster(userId, monsterId) {
    KilledMonsters.create({
      user_id: userId,
      monster_id: monsterId,
    });
  }

  getAllKilledMonsters(userId) {
    return KilledMonsters.aggregate([
      { $match: { user_id: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$monster_id',
          amount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'monsters',
          localField: '_id',
          foreignField: '_id',
          as: 'monster',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$monster', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          amount: 1,
        },
      },
    ]);
  }
}

module.exports = UserService;
