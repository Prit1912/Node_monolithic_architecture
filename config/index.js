const dotenv = require("dotenv");
const path = require("path");

const NODE_ENV = (process.env.NODE_ENV || "development").trim();

dotenv.config({
  path: path.resolve(__dirname, "environments", `${NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV,
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  DB_URI:
    process.env.DB_URI ||
    `mongodb://127.0.0.1:27017/nodeDemo?keepAlive=true&socketTimeoutMS=360000&connectTimeoutMS=360000
  `,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || "",
  S3_BUCKET_PRIVATE: process.env.S3_BUCKET_PRIVATE || "",
  AWS_APP_USER_ACCESS_KEY: process.env.AWS_APP_USER_ACCESS_KEY || "",
  AWS_APP_USER_SECRET_ACCESS_KEY:
    process.env.AWS_APP_USER_SECRET_ACCESS_KEY || "",
  ALGORITHM: process.env.ALGORITHM || "",
  SECRET_KEY: process.env.SECRET_KEY || "",
};
