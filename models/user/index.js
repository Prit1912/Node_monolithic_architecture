const mongoose = require("mongoose");
const {
  USER_TYPE_NORMAL,
  USER_TYPES,
  GENDERS,
} = require("../../constants/user");
const { BLANK } = require("../../constants");
const { validateEmail } = require("../../utils/validators/email");
const { schemaOptions } = require("../../utils/mongoose");
const {
  modelMethodsLoader,
  modelStaticsLoader,
  modelVirtualsLoader,
} = require("../../utils/mongoose/loaders");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    type: {
      type: String,
      enum: USER_TYPES,
      required: [true, "User type is required"],
      default: USER_TYPE_NORMAL,
    },
    firstName: String,
    middleName: String,
    lastName: String,
    gender: {
      type: String,
      enums: [...GENDERS, BLANK],
    },
    email: {
      type: String,
      unique: [
        true,
        "Email already in use. If you already have an account please login otherwise try another email address",
      ],
      lowercase: true,
      // The sparse property in email , is what tells my database to allow null values which will later be filled with unique values .
      // sparse: true,
      // required: 'Email address is required.',
      validate: [validateEmail, "Please enter a valid email address"],
    },
    password: String,
    mobile: {
      type: String,
      // The sparse property in email , is what tells my database to allow null values which will later be filled with unique values .
      sparse: true,
      unique: [
        true,
        "Mobile number already in use. If you already have an account please login otherwise try another mobile number",
      ],
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions()
);

require("./hooks")(userSchema);
modelMethodsLoader(userSchema, __dirname);
modelStaticsLoader(userSchema, __dirname);
modelVirtualsLoader(userSchema, __dirname);

const User = mongoose.model("user", userSchema);

module.exports = { User };
