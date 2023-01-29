const enforceOut = require("../models/user/statics/enforceOut");
const userService = require("../services/user.service");

module.exports = {
  async addUser(req, res) {
    const result = await userService.addUser(req.body);
    return res.send(enforceOut(result));
  },
  async getUsers(req, res) {
    const result = await userService.getUsers();
    return res.send(enforceOut(result));
  },
};
