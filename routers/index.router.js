const express = require("express");
const assetsRouter = require("./assets.router");
const userRouter = require("./user.router");

const routes = (app) => {
  const v1Router = express.Router();

  v1Router.use("/assets", assetsRouter);
  v1Router.use("/users", userRouter);

  app.use("/v1/", v1Router);
};

module.exports = routes;
