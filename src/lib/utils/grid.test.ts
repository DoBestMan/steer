import { getColumnsCalc } from './grid';

describe('utils/grid', () => {
  describe('getColumnsCalc', () => {
    it('returns a calc() with one column, no gutter for small breakpoint', () => {
      expect(getColumnsCalc({ breakpoint: 'S', columns: 1 })).toEqual(
        'calc((100vw - 20px * 2 - 20px * 3) / 4 * 1)',
      );
    });

    it('returns a calc() with one column, no gutter for large breakpoint', () => {
      expect(getColumnsCalc({ breakpoint: 'L', columns: 1 })).toEqual(
        'calc((100vw - 60px * 2 - 30px * 11) / 12 * 1)',
      );
    });

    it('returns a calc() with two columns, no gutter at the end', () => {
      expect(getColumnsCalc({ breakpoint: 'L', columns: 2 })).toEqual(
        'calc((100vw - 60px * 2 - 30px * 11) / 12 * 2 + 30px * 1)',
      );
    });

    it('returns a calc() with two columns, with gutter at the end', () => {
      expect(
        getColumnsCalc({
          breakpoint: 'L',
          columns: 2,
          includeExtraGutter: true,
        }),
      ).toEqual(
        'calc((100vw - 60px * 2 - 30px * 11) / 12 * 2 + 30px * 1 + 30px)',
      );
    });

    it('returns a calc() with two columns, with gutter at the end and container margin', () => {
      expect(
        getColumnsCalc({
          breakpoint: 'L',
          columns: 2,
          includeExtraGutter: true,
          includeContainerMargin: true,
        }),
      ).toEqual(
        'calc((100vw - 60px * 2 - 30px * 11) / 12 * 2 + 30px * 1 + 30px + 60px)',
      );
    });
  });
});
