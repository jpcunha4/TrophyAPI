const User = require('../models/User');

class UserService {
  async getUserByID(userId) {
    const result = await User.findById(userId);

    return result;
  }

  async getUserByName(name) {
    const result = await User.findOne({ name });

    return result;
  }

  async createUser(name) {
    const newUser = User.create({
      name,
    });

    return newUser;
  }
}

module.exports = UserService;
