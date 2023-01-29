/*
 * Execute a function on a single item or an array of items
 */
const mapOrExecute = (data, fn = () => null) =>
  Array.isArray(data) ? data.map((e) => fn(e)) : fn(data);

module.exports = { mapOrExecute };
