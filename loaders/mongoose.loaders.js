const mongoose = require("mongoose");
const config = require("../config");

const { DB_URI } = config;
console.log(DB_URI);
const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, mongooseConnectionOptions);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Error connecting database");
  }
};

/* if it gives error connection refuse error in local follow these steps
Go to Control Panel and click on Administrative Tools.
Double click on Services. A new window opens up.
Search MongoDB.exe. Right click on it and select Start. */
