const _ = require("lodash");
const { mapOrExecute } = require("../../../utils/misc");
const { toObject } = require("../../../utils/mongoose");
const {
  OMMIITED_FIELDS_OF_USER_FOR_ENFORCE_OUT,
} = require("../../../constants/user");

module.exports = function (objectOrArray) {
  const enforcer = (_obj = {}) =>
    _.omit(toObject(_obj), [...OMMIITED_FIELDS_OF_USER_FOR_ENFORCE_OUT]);
  return mapOrExecute(objectOrArray, enforcer);
};
