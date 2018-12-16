#!/usr/bin/env node
const program = require('commander');
const { run } = require('../bin/main.js');

program
  .option('-T --target [target]', 'target commitish')
  .option('-t --test [test]', 'run test')
  .option('-b --build [build]', 'run build')
  .parse(process.argv);

(function () {
  run(program);
}());
