jest.mock('child_process');
const { execSync } = require('child_process');
const main = require('../bin/main.js');
const stub = require('../stub.js');

describe('run', () => {
  let packages;
  beforeEach(() => {
    packages = [{ name: 'foo' }, { name: 'bar' }];
    stub(main, 'testPackages', jest.fn());
    stub(main, 'buildPackages', jest.fn());
    stub(main, 'getChangedPackages', jest.fn(() => packages));
    stub(console, 'log', jest.fn());
  });
  test('should run test && not run build if called with --test flag', () => {
    main.run({ test: true });
    expect(main.testPackages).toHaveBeenCalledWith(packages);
    expect(main.buildPackages).not.toHaveBeenCalled();
  });
  test('should run build && not run test if called with --build flag', () => {
    main.run({ build: true });
    expect(main.buildPackages).toHaveBeenCalledWith(packages);
    expect(main.testPackages).not.toHaveBeenCalled();
  });
  test('should run test && build if called with -b -t flag', () => {
    main.run({ build: true, test: true });
    expect(main.buildPackages).toHaveBeenCalledWith(packages);
    expect(main.testPackages).toHaveBeenCalledWith(packages);
  });
  test('should not run build && test if called without flag', () => {
    main.run({});
    expect(main.testPackages).not.toHaveBeenCalled();
    expect(main.buildPackages).not.toHaveBeenCalled();
  });
});

describe('test packages', () => {
  let packages;
  beforeEach(() => {
    execSync.mockClear();
    packages = [{ name: 'foo' }, { name: 'bar' }];
    stub(console, 'log', jest.fn());
  });
  test('should not call execSync when packages are empty', () => {
    main.testPackages([]);
    expect(execSync).not.toHaveBeenCalled();
  });
  test('should call execSync when packages are not empty', () => {
    main.testPackages(packages);
    expect(execSync).toHaveBeenCalled();
  });
});

describe('build packages', () => {
  let packages;
  beforeEach(() => {
    execSync.mockClear();
    packages = [{ name: 'foo' }, { name: 'bar' }];
    stub(console, 'log', jest.fn());
  });
  test('should not call execSync when packages are empty', () => {
    main.buildPackages([]);
    expect(execSync).not.toHaveBeenCalled();
  });
  test('should not call execSync when no build scripts', () => {
    stub(main, 'getPackageJson', jest.fn(() => ({})));
    main.buildPackages(packages);
    expect(execSync).not.toHaveBeenCalled();
  });
  test('should call execSync when build scripts found', () => {
    stub(
      main,
      'getPackageJson',
      jest.fn(() => ({ scripts: { build: 'foo' } })),
    );
    main.buildPackages(packages);
    expect(execSync).toHaveBeenCalled();
  });
});
