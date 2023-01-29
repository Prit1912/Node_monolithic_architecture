const express = require("express");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routers/index.router");

module.exports = ({ app }) => {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(expressFileUpload());

  // load routers
  routes(app);
};
