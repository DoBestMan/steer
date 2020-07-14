import { omit } from './object';

describe('utils/object', () => {
  describe('omit', () => {
    it('returns an object without keys in array', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['a'])).toStrictEqual({ b: 2, c: 3 });
      expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toStrictEqual({ b: 2 });
      expect(omit({ a: 1, b: 2, c: 3 }, ['d'])).toStrictEqual({
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
