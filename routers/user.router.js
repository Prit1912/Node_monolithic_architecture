const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.get("/getUsers", userController.getUsers);
userRouter.post("/signup", userController.sigunUp);
userRouter.post("/signin", userController.signIn);

module.exports = userRouter;
