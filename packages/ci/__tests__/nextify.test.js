const ck = require('chalk');

const nextify = require('../bin/nextify.js');

describe('nextify', () => {
  let colors;
  let chalk;
  beforeEach(() => {
    colors = ['blue', 'red'];
    chalk = nextify(ck, colors);
  });
  test('should pick next color when next is called', () => {
    expect(chalk.next()('foo')).toBe(ck.blue('foo'));
    expect(chalk.next()('bar')).toBe(ck.red('bar'));
    expect(chalk.next()('foobar')).toBe(ck.blue('foobar'));
  });
  test('should reset to first color when _reset is called', () => {
    expect(chalk.next()('foo')).toBe(ck.blue('foo'));
    expect(chalk._reset().next()('bar')).toBe(ck.blue('bar'));
  });
});
