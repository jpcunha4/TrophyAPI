const mongoose = require('mongoose');

const killedMonster = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  monster_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'monsters',
  },
});

module.exports = mongoose.model('killedMonsters', killedMonster);
