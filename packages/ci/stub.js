let stubs = [];

afterEach(() => {
  stubs.forEach(release => release());
  stubs = [];
});

module.exports = (obj, prop, value) => {
  const origin = obj[prop];
  obj[prop] = value;
  stubs.push(() => (obj[prop] = origin));
};
