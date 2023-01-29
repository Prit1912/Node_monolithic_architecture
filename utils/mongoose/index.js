const schemaOptions = ({
  minimize = true,
  timestamps = true,
  ...rest
} = {}) => ({
  strict: true,
  useNestedStrict: true,
  toJSON: {
    virtuals: true,
    getters: true,
    depopulate: true,
    minimize,
  },
  toObject: {
    virtuals: true,
    getters: true,
    depopulate: true,
    minimize,
  },
  id: false,
  minimize,
  timestamps,
  ...rest,
});

const subschemaOptions = (options) => schemaOptions(options);

const toObject = (obj = {}) => ("toObject" in obj ? obj.toObject() : obj);

module.exports = { schemaOptions, subschemaOptions, toObject };
