const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.get("/getUsers", userController.getUsers);

module.exports = userRouter;
