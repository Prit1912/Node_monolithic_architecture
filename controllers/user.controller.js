const enforceOut = require("../models/user/statics/enforceOut");
const userService = require("../services/user.service");
const { errorResponse } = require("../utils/error");

module.exports = {
  async addUser(req, res) {
    try {
      console.log("called1");
      const result = await userService.addUser(req.body);
      console.log(result);
      return res.send(enforceOut(result));
    } catch (error) {
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "Could not add user",
      });
    }
  },
  async getUsers(req, res) {
    try {
      const result = await userService.getUsers();
      return res.send(enforceOut(result));
    } catch (error) {
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "Could not get users",
      });
    }
  },
  async sigunUp(req, res) {
    try {
      const user = req.body;
      const result = await userService.sigunUp(user);
      return res.send({ ...result, user: enforceOut(result.user) });
    } catch (error) {
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "Could not signup",
      });
    }
  },
  async signIn(req, res) {
    try {
      const credentials = req.body;
      const result = await userService.login(credentials);
      return res.send({ ...result, user: enforceOut(result.user) });
    } catch (error) {
      console.log(error);
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "There was an error login in",
      });
    }
  },
};
