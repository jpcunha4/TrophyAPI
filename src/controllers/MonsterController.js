const MonsterService = require('../services/MonsterService');
const monsterService = new MonsterService();

class MonsterController {
  async createMonster(req, res) {
    const { name } = req.params;

    if (!name) {
      return res.status(400).send({ error: 'Insufficient information!' });
    }

    try {
      const monster = await monsterService.createMonster(name);

      return res.send(monster);
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while creating a new monster' });
    }
  }

  async killPlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: 'Insufficient information' });
    }

    try {
      await monsterService.killPlayer(id);

      return res.send('Player is dead.');
    } catch (err) {
      return res.status(500).send({
        error: "Error while recording user's death",
        detail: err.message,
      });
    }
  }
}

module.exports = new MonsterController();
