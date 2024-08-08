/* eslint-disable */
module.exports = new Proxy(
  {},
  {
    get(target, key) {
      return key;
    },
  },
);
