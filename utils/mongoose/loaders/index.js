/* eslint-disable global-require */
/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");
const { isFile, filenameWithoutExtension } = require("../../file");
const { lowerCaseFirst } = require("../../string");

const modelWhatLoader = (schema, dir, what) => {
  fs.readdirSync(dir)
    .filter(isFile)
    .forEach((file) => {
      const name = filenameWithoutExtension(file);
      schema[what][name] = require(path.join(dir, file));
    });
};

const modelMethodsLoader = (schema, dir) => {
  const _dir = path.join(dir, "methods");
  modelWhatLoader(schema, _dir, "methods");
};

/*
 * Loads files like this:
 *
 * myModel
 *   /virtuals
 *     getFoo.js (virtual getter for 'foo')
 *     setFoo.js (virtual setter for 'foo')
 */
const modelVirtualsLoader = (schema, dir) => {
  const _dir = path.join(dir, "virtuals");
  fs.readdirSync(_dir)
    .filter(isFile)
    .forEach((file) => {
      const name = filenameWithoutExtension(file);
      const isGet = name.startsWith("get");
      const isSet = name.startsWith("set");
      if (!(isGet || isSet)) {
        throw new Error(
          `virtual filename ${name} needs to start with set or get`
        );
      }
      const virtualName = lowerCaseFirst(name.slice(3));
      if (!virtualName) {
        throw new Error("virtual filename must be in format setX or getY");
      }
      const virtualType = isGet ? "get" : "set";
      schema.virtual(virtualName)[virtualType](require(path.join(_dir, file)));
    });
};

const modelStaticsLoader = (schema, dir) => {
  const _dir = path.join(dir, "statics");
  modelWhatLoader(schema, _dir, "statics");
};

module.exports = {
  modelMethodsLoader,
  modelVirtualsLoader,
  modelStaticsLoader,
};
