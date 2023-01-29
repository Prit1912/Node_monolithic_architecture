const lowerCaseFirst = (str = "") =>
  str.length ? str[0].toLowerCase() + str.slice(1) : str;

const joinTruthy = (...arr) =>
  arr.reduce((acc, curr) => {
    if (!curr) return acc;
    return acc ? `${acc} ${curr}` : curr;
  });

module.exports = { lowerCaseFirst, joinTruthy };
