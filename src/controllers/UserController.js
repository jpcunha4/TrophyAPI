const UserService = require('../services/UserService');
const userService = new UserService();

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
      const user = await userService.getUserByID(id);

      if (!user) {
        return res.status(401).send({ error: 'There is no user with this ID' });
      }

      return res.send(user);
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while trying to fetch user', detail: err });
    }
  }

  async getUserByName(req, res) {
    const { name } = req.params;
    try {
      const user = await userService.getUserByName(name);

      if (!user) {
        return res
          .status(401)
          .send({ error: 'There is no user with this name' });
      }

      return res.send(user);
    } catch (err) {
      return res
        .status(500)
        .send({ error: 'Error while trying to fetch user', detail: err });
    }
  }
}
module.exports = new UserController();
