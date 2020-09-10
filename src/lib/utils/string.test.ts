import {
  appendTiresToString,
  capitalize,
  formatDollars,
  numbersOnly,
  removeTireFromQueryParam,
} from './string';

describe('utils/routes', () => {
  describe('appendTiresToString', () => {
    it('returns a string with `-tires` appended', () => {
      expect(appendTiresToString('12-inch-winter')).toBe(
        '12-inch-winter-tires',
      );
      expect(appendTiresToString('continental')).toBe('continental-tires');
    });
  });

  describe('capitalize', () => {
    it('returns a capitalized string', () => {
      expect(capitalize('akuret')).toBe('Akuret');
      expect(capitalize('continental')).toBe('Continental');
    });
  });

  describe('formatDollars', () => {
    it('it returns a dollar formatted string', () => {
      expect(formatDollars('100')).toBe('$1.00');
      expect(formatDollars('210')).toBe('$2.10');
      expect(formatDollars('3599')).toBe('$35.99');
    });
  });

  describe('numbersOnly', () => {
    it('returns only the numbers of a string', () => {
      expect(numbersOnly('(123)-456 789 $%ABCabc')).toBe('123456789');
      expect(numbersOnly('123456789')).toBe('123456789');
    });

    it('returns empty if there is no number in the input string', () => {
      expect(numbersOnly('$%ABCabc')).toBe('');
    });
  });

  describe('removeTireFromQueryParam', () => {
    it('returns a string without `-tires` at the end', () => {
      expect(removeTireFromQueryParam('12-inch-winter-tires')).toBe(
        '12-inch-winter',
      );
    });

    it('does not remove `-tires` if it is in the middle of a string', () => {
      expect(removeTireFromQueryParam('winter-tires-another-string')).toBe(
        'winter-tires-another-string',
      );
      expect(removeTireFromQueryParam('winter--tiresanother-string')).toBe(
        'winter--tiresanother-string',
      );
    });
  });
});
