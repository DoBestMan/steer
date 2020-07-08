import { ratioToPercentage } from './number';

describe('utils/number', () => {
  describe('ratioToPercentage', () => {
    it('returns a percentage based on a aspect ratio', () => {
      expect(ratioToPercentage('1/1')).toBe(100);
      expect(ratioToPercentage('2/1')).toBe(50);
      expect(ratioToPercentage('1/2')).toBe(200);
      expect(ratioToPercentage('4/3')).toBe(75);
      expect(ratioToPercentage('16/9')).toBe(56.25);
    });
  });
});
