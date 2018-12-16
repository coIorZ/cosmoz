/* eslint no-param-reassign: 0 */
const defaultColors = ['magenta', 'cyan', 'yellow', 'red', 'blue', 'green'];

module.exports = (chalk, colors = defaultColors) => {
  const len = colors.length;
  let i = 0;

  function* gen() {
    while (true) {
      yield chalk[colors[i % len]];
    }
  }
  const color = gen();

  chalk.next = () => {
    const ret = color.next().value;
    i += 1;
    return ret;
  };
  chalk._reset = () => {
    i = 0;
    return chalk;
  };

  return chalk;
};
