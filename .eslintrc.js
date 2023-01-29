module.exports = {
  env: {
    // browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: { "no-unexpected-multiline": 0, "no-useless-escape": 0 },
};
