const UserService = require('../services/UserService');
const userService = new UserService();

function userDTO(_id, name, collectedCoins, deaths) {
  this._id = _id;
  this.name = name;
  this.collectedCoins = collectedCoins || 0;
  this.deaths = deaths || 0;
}
class UserController {
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

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      let user = await userService.getUserByID(id);

      if (!user) {
        return res.status(401).send({ error: 'There is no user with this ID' });
      }

      const collectedCoins = await userService.getUserCoins(user._id);
      const deaths = await userService.countPlayerDeaths(user._id);

      return res.send(
        new userDTO(
          user._id,
          user.name,
          collectedCoins[0].coins,
          deaths[0].deaths,
        ),
      );
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while trying to fetch user', detail: err });
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

      return res.send(
        new userDTO(
          user._id,
          user.name,
          collectedCoins[0].coins,
          deaths[0].deaths,
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

  async killPlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: 'Insufficient information' });
    }

    try {
      await userService.killPlayer(id);

      return res.send('Player is dead.');
    } catch (err) {
      return res.status(500).send({
        error: "Error while recording user's death",
        detail: err.message,
      });
    }
  }
}
module.exports = new UserController();
