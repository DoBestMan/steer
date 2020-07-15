import {
  getUrlObject,
  interpolateRoute,
  isRouteDiameterFormat,
  trimSlash,
} from './routes';

describe('utils/routes', () => {
  describe('trimSlash', () => {
    it('trims leading and trailing backslash if it exists', () => {
      expect(trimSlash('/tire-sizes/')).toEqual('tire-sizes');
      expect(trimSlash('tire-sizes/')).toEqual('tire-sizes');
      expect(trimSlash('/tire-sizes')).toEqual('tire-sizes');
      expect(trimSlash('tire-sizes')).toEqual('tire-sizes');
      expect(trimSlash('/tire-sizes/nested-route')).toEqual(
        'tire-sizes/nested-route',
      );
    });
  });

  describe('isRouteDiameterFormat', () => {
    it('returns true if given path is in diameter + category format', () => {
      expect(isRouteDiameterFormat('/12-inch-winter-tires/')).toBe(true);
      expect(isRouteDiameterFormat('12-inch-winter-tires')).toBe(true);
      expect(isRouteDiameterFormat('/p195-45r16')).toBe(false);
    });
  });

  describe('interpolateRoute', () => {
    it('returns interpolated route', () => {
      expect(
        interpolateRoute('/brands/[brand]/[productLine]', {
          brand: 'continental-tires',
          productLine: 'pro-contact',
        }),
      ).toBe('/brands/continental-tires/pro-contact');
    });
  });

  describe('getUrlObject', () => {
    it('returns url object', () => {
      expect(
        getUrlObject(
          '/vehicles/honda-tires/civic/2019',
          'trim=Sport%20Sedan%20%26%20Coupe',
        ),
      ).toEqual({
        pathname: '/vehicles/honda-tires/civic/2019',
        query: {
          trim: 'Sport Sedan & Coupe',
        },
      });
    });
  });
});
