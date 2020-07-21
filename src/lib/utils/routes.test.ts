import { CATALOG_ROUTES } from '~/lib/constants';

import {
  getUrlObject,
  interpolateRoute,
  isInRouteList,
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

  describe('isInRouteList', () => {
    it('returns true if given route is a given list of routes', () => {
      expect(isInRouteList('/', CATALOG_ROUTES)).toBe(false);
      expect(
        isInRouteList('/vehicles/[make]/[model]/[year]', CATALOG_ROUTES),
      ).toBe(true);
      expect(
        isInRouteList(
          '/vehicles/[make]/[model]/[year]?trim=Sport%20Sedan%20%26%20Coupe',
          CATALOG_ROUTES,
        ),
      ).toBe(true);
    });
  });
});
