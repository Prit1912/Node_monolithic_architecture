const { emailRegex } = require("../regex");

const validateEmail = (email) => {
  return emailRegex.test(email);
};

module.exports = { validateEmail };
