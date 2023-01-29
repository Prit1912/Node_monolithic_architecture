const { joinTruthy } = require("../../../utils/string");

module.exports = function () {
  return joinTruthy(this.firstName, this.middleName, this.lastName);
};
