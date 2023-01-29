// user types
const USER_TYPE_NORMAL = "normal";
const USER_TYPE_ADMIN = "admin";

const USER_TYPES = [USER_TYPE_NORMAL, USER_TYPE_ADMIN];

// gender types
const GENDER_MALE = "Male";
const GENDER_FEMALE = "Female";
const GENDER_OTHER = "Other";
const GENDER_UNKNOWN = "Unknown";

const GENDERS = [GENDER_MALE, GENDER_FEMALE, GENDER_OTHER, GENDER_UNKNOWN];

// fields to omit when enforceout user
const OMMIITED_FIELDS_OF_USER_FOR_ENFORCE_OUT = ["password"];

module.exports = {
  USER_TYPE_ADMIN,
  USER_TYPE_NORMAL,
  USER_TYPES,
  GENDERS,
  OMMIITED_FIELDS_OF_USER_FOR_ENFORCE_OUT,
};
