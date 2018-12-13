#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const ck = require('chalk');
const program = require('commander');
const nextify = require('./nextify');

const chalk = nextify(ck);
const cwd = process.cwd();

program
  .option('-T --target [target]', 'target commitish')
  .option('-t --test [test]', 'run test')
  .option('-b --build [build]', 'run build')
  .parse(process.argv);

function getChangedPackages() {
  console.log(chalk.blue('Detecting changed packages...'));
  try {
    const packages = JSON.parse(
      execSync(
        `lerna list --since ${program.target || 'master'} --json --all`,
        {
          encoding: 'utf8',
          cwd,
        },
      ),
    );
    if (packages.length) {
      chalk._reset();
      console.log(
        chalk.cyan(
          'Found',
          chalk.magenta(packages.length),
          'package(s) changed:',
          packages.map(pkg => chalk.next().bold(pkg.name)).join(' '),
        ),
      );
    } else {
      console.log(
        chalk.yellow('Found', chalk.magenta(0), 'packages changed. End'),
      );
      process.exit(0);
    }
    return packages;
  } catch (e) {
    console.log(chalk.red('Failed to detect changed packages', e));
    process.exit(1);
  }
  return [];
}

function testPackages(packages) {
  console.log(chalk.blue.bold('Start testing...'));
  chalk._reset();
  packages.forEach((pkg) => {
    console.log();
    console.log(chalk.next().bold(pkg.name));
    try {
      execSync(`npm test ${pkg.location}`, { stdio: 'inherit' });
    } catch (e) {
      process.exit(1);
    }
  });
}

function buildPackages(packages) {
  console.log(chalk.blue.bold('Start building...'));
  chalk._reset();
  packages.forEach((pkg) => {
    console.log();
    console.log(chalk.next().bold(pkg.name));
    /* eslint import/no-dynamic-require: 0 */
    /* eslint global-require: 0 */
    const { scripts } = require(path.join(pkg.location, 'package.json'));
    if (scripts && scripts.build) {
      try {
        execSync(`lerna run build --scope ${pkg.name}`, {
          stdio: 'inherit',
        });
      } catch (e) {
        console.log(chalk.red('Failed to build', e));
        process.exit(1);
      }
    } else {
      console.log(chalk.yellow('No build script found. Skip'));
    }
  });
}

(function () {
  console.log(chalk.blue.bold('@cosmos/ci start'));
  const packages = getChangedPackages();
  if (program.test) {
    testPackages(packages);
  }
  if (program.build) {
    buildPackages(packages);
  }
  console.log(chalk.blue.bold('@cosmos/ci complete'));
}());
