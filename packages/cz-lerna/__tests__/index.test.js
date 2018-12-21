const { removeScope } = require('../index.js');

describe('cz-lerna', () => {
  test('should remove valid scope', () => {
    expect(removeScope('@foo/bar')).toBe('bar');
    expect(removeScope('@foo-bar/bar')).toBe('bar');
  });
  test('should remove nothing is no valid scope found', () => {
    expect(removeScope('@foobar')).toBe('@foobar');
    expect(removeScope('foo/bar')).toBe('foo/bar');
    expect(removeScope('f@oo/bar')).toBe('f@oo/bar');
  });
});
