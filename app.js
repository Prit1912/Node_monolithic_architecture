const config = require("./config/index");
const loaders = require("./loaders");
const express = require("express");

const app = express();

loaders({ app })
  .then(() => {
    app.listen(config.PORT, (err) => {
      if (err) {
        console.log("Something went wrong", err);
      }
      console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
