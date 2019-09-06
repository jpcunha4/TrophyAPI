const UserService = require('../services/UserService');
const userService = new UserService();
const TrophyController = require('./TrophyController');

function userDTO(_id, name, collectedCoins, deaths, killedMonsters) {
  this._id = _id;
  this.name = name;
  this.collectedCoins = {
    amount: collectedCoins || 0,
    trophy: TrophyController.calculateCoinsTrophy(collectedCoins),
  };
  this.deaths = {
    amount: deaths || 0,
    trophy: TrophyController.calculateDeathsTrophy(deaths),
  };
  this.killedMonsters =
    killedMonsters.map(monster => {
      return {
        name: monster.name,
        amount: monster.amount,
        trophy: TrophyController.calculateMonstersKilledTrophy(monster.amount),
      };
    }) || [];
}
class UserController {
  async getAllUser(req, res) {
    try {
      const users = await userService.getAllUsers();

      const allUsers = [];

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const collectedCoins = await userService.getUserCoins(user._id);
        const deaths = await userService.countPlayerDeaths(user._id);
        const killedMonsters = await userService.getAllKilledMonsters(user._id);

        console.log(collectedCoins);

        allUsers.push(
          new userDTO(
            user._id,
            user.name,
            collectedCoins.length && collectedCoins[0].coins,
            deaths.length && deaths[0].deaths,
            killedMonsters,
          ),
        );
      }

      return res.send(allUsers);
    } catch (err) {
      return res.status(500).send({
        error: 'Error while fetching all users!',
        detail: err.message,
      });
    }
  }

  async createUser(req, res) {
    const { name } = req.params;

    if (!name) {
      return res.status(401).send({ error: 'The field name is required!' });
    }

    try {
      const test = await userService.getUserByName(name);

      if (test) {
        return res.status(400).send({ error: 'User already recorded!' });
      }

      const user = await userService.createUser(name);

      return res.send(user);
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while trying to create user', detail: err });
    }
  }

  async getUserByName(req, res) {
    const { name } = req.params;
    try {
      let user = await userService.getUserByName(name);

      if (!user) {
        return res
          .status(401)
          .send({ error: 'There is no user with this name' });
      }

      const collectedCoins = await userService.getUserCoins(user._id);
      const deaths = await userService.countPlayerDeaths(user._id);
      const killedMonsters = await userService.getAllKilledMonsters(user._id);

      return res.send(
        new userDTO(
          user._id,
          user.name,
          collectedCoins[0].coins,
          deaths[0].deaths,
          killedMonsters,
        ),
      );
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while trying to fetch user', detail: err });
    }
  }

  async collectCoin(req, res) {
    const { userId, value } = req.query;

    if (!userId || !value) {
      return res.status(400).send({ error: 'Insufficient information' });
    }

    try {
      await userService.collectCoin(userId, value);

      return res.send(`${value} coin(s) collected successfully!`);
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while recording a coin collection!' });
    }
  }

  async killMonster(req, res) {
    const { userId, monsterId } = req.query;

    if (!userId || !monsterId) {
      return res.status(400).send({ error: 'Insuffincient information!' });
    }

    try {
      await userService.killMonster(userId, monsterId);

      return res.send('Monster killed!');
    } catch (err) {
      return res.status(500).send({
        error: "Error while recording a monster's death",
        detail: err.message,
      });
    }
  }
}

module.exports = new UserController();
