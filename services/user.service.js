const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const { UnprocessableEntityError } = require("../utils/error");

module.exports = {
  async addUser(userData) {
    try {
      console.log("called");
      const user = new User(userData);
      await user.save();
      const fullName = user.fullName();
      console.log({ fullName });
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  async getUsers() {
    const users = await User.find();
    return users;
  },
  async sigunUp(user) {
    console.log(user);
    try {
      const doesUserExists = await User.findOne({ email: user?.email || "" });
      if (doesUserExists) {
        console.log("called");
        throw new UnprocessableEntityError("Email already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);
      const userData = { ...user, password };
      const newUser = new User(userData);
      const result = await newUser.save();
      const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY, {
        algorithm: process.env.ALGORITHM,
        expiresIn: "7d",
      });
      console.log(token);
      return {
        user: result,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async login(credentials) {
    try {
      const existingUser = await User.findOne({
        email: credentials?.email || "",
      });
      if (!existingUser) {
        throw new UnprocessableEntityError("Account does not exists");
      }

      if (!existingUser.isEnabled) {
        throw new UnprocessableEntityError("Account cannot be accessed");
      }

      const isValidPassword = await bcrypt.compare(
        credentials?.password,
        existingUser?.password
      );

      if (!isValidPassword) {
        throw new UnprocessableEntityError("Invalid email or password");
      }

      const token = jwt.sign({ user: existingUser }, process.env.SECRET_KEY, {
        algorithm: process.env.ALGORITHM,
        expiresIn: "7d",
      });
      return {
        user: existingUser,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
};
