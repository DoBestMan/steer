import {
  getWidthFromMaxHeight,
  numberWithDecimal,
  percentageFromNumber,
  ratioToPercentage,
} from './number';

describe('utils/number', () => {
  describe('getWidthFromMaxHeight', () => {
    it('returns a new width from an old width/height and a new height', () => {
      expect(getWidthFromMaxHeight(100, 100, 50)).toBe(50);
      expect(getWidthFromMaxHeight(200, 100, 50)).toBe(100);
      expect(getWidthFromMaxHeight(100, 400, 50)).toBe(12.5);
    });
  });

  describe('numberWithDecimal', () => {
    it('returns a decimal from a number', () => {
      expect(numberWithDecimal(5)).toBe('5.0');
      expect(numberWithDecimal(2.3)).toBe('2.3');
      expect(numberWithDecimal(3)).toBe('3.0');
    });
  });

  describe('percentageFromNumber', () => {
    it('returns a percentage based on two numbers', () => {
      expect(percentageFromNumber(50, 100)).toBe(50);
      expect(percentageFromNumber(2, 1)).toBe(200);
      expect(percentageFromNumber(3, 10)).toBe(30);
    });
  });

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
