const { execSync } = require('child_process');
const path = require('path');
const ck = require('chalk');
const nextify = require('./nextify');

const chalk = nextify(ck);
const cwd = process.cwd();

function getChangedPackages(cli) {
  console.log(chalk.blue('Detecting changed packages...'));
  let packages = [];
  try {
    packages = JSON.parse(
      execSync(`lerna list --since ${cli.target || 'master'} --json --all`, {
        encoding: 'utf8',
        cwd,
      }),
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
  } catch (e) {
    console.log(chalk.red('Failed to detect changed packages', e));
    process.exit(1);
  }
  return packages;
}

function getPackageJson(pkg) {
  /* eslint import/no-dynamic-require: 0 */
  /* eslint global-require: 0 */
  return require(path.join(pkg.location, 'package.json'));
}

function testPackages(packages = []) {
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
  console.log(chalk.green.bold('Complete testing...\n'));
}

function buildPackages(packages = []) {
  console.log(chalk.blue.bold('Start building...'));
  chalk._reset();
  packages.forEach((pkg) => {
    console.log();
    console.log(chalk.next().bold(pkg.name));
    const { scripts } = exports.getPackageJson(pkg);
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
  console.log(chalk.green.bold('Complete building...\n'));
}

function run(cli) {
  console.log(chalk.blue.bold('@cosmoz/ci start'));
  const packages = exports.getChangedPackages(cli);
  if (cli.test) {
    exports.testPackages(packages);
  }
  if (cli.build) {
    exports.buildPackages(packages);
  }
  console.log(chalk.blue.bold('@cosmoz/ci complete'));
}

exports.run = run;
exports.getChangedPackages = getChangedPackages;
exports.testPackages = testPackages;
exports.buildPackages = buildPackages;
exports.getPackageJson = getPackageJson;
