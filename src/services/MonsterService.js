const Monster = require('../models/Monster');
const Deaths = require('../models/Deaths');

class MonsterService {
  createMonster(name) {
    return Monster.create({
      name,
    });
  }

  killPlayer(userId) {
    Deaths.create({
      user_id: userId,
    });
  }
}

module.exports = MonsterService;
