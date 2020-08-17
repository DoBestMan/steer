import format from 'date-fns/format';

import { defaultDateTemplate, formatOrNull, isValidPurchaseDate } from './date';

describe('utils/date', () => {
  const date = new Date();

  describe('formatOrNull', () => {
    it('should return a date width default format', () => {
      expect(formatOrNull(date)).toEqual(format(date, defaultDateTemplate));
    });

    it('should return a date width custom format', () => {
      const dateFormat = 'MMMM d, yyyy';

      expect(formatOrNull(date, dateFormat)).toEqual(format(date, dateFormat));
    });

    it('should return null', () => {
      expect(formatOrNull('string that is not a date')).toEqual(null);
    });
  });

  describe('isValidPurchaseDate', () => {
    it('should return true when date is in the correct format', () => {
      expect(isValidPurchaseDate('06/10/2020')).toEqual(true);
    });

    it('should return false when date is in the incorrect format', () => {
      expect(isValidPurchaseDate('14/10/2015')).toEqual(false);
      expect(isValidPurchaseDate('July 20 1998')).toEqual(false);
    });
  });
});
