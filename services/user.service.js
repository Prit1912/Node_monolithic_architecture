const { User } = require("../models");

module.exports = {
  async addUser(userData) {
    const user = new User(userData);
    await user.save();
    const fullName = user.fullName();
    console.log({ fullName });
    return user;
  },
  async getUsers() {
    const users = await User.find();
    return users;
  },
};
