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
