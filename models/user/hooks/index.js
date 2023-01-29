module.exports = (schema) => {
  schema.pre("validate", require("./preValidate/index"));
  schema.post("validate", require("./postValidate/index"));
  schema.pre("save", require("./preSave/index"));
  schema.post("save", require("./postSave/index"));
};
