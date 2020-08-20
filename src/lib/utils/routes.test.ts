import { CATALOG_ROUTES, CATALOG_ROUTES_REGEX } from '~/lib/constants';

import { validTiresQuery } from './regex';
import {
  getParsedHash,
  getUrlObject,
  interpolateRoute,
  isInRouteList,
  isInRouteRegexList,
  isRouteDiameterFormat,
  isSamePath,
  trimSlash,
  validateRoute,
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

  describe('isInRouteRegexList', () => {
    it('returns true if given url is a given list of regexes', () => {
      expect(isInRouteRegexList('/', CATALOG_ROUTES_REGEX)).toBe(false);
      expect(
        isInRouteRegexList(
          '/brands/toyota/categories/[categoryOrType]',
          CATALOG_ROUTES_REGEX,
        ),
      ).toBe(true);
      expect(
        isInRouteRegexList('/tire-sizes/14-5R10', CATALOG_ROUTES_REGEX),
      ).toBe(true);
    });
  });

  describe('isSamePath', () => {
    it('returns true if the two given paths have the same pathname and query params', () => {
      expect(isSamePath('/', '/')).toBe(true);
      expect(isSamePath('/', '/vehicles/honda-tires/civic/2019')).toBe(false);
      expect(
        isSamePath(
          '/vehicles/honda-tires/civic/2019',
          '/vehicles/honda-tires/civic/2019',
        ),
      ).toBe(true);
      expect(
        isSamePath(
          '/vehicles/honda-tires/civic/2019?tireSize=1-2-3&trim=Sport%20Sedan%20%26%20Coupe',
          '/vehicles/honda-tires/civic/2019?tireSize=1-2-3&trim=Sport%20Sedan%20%26%20Coupe',
        ),
      ).toBe(true);
      // different query params
      expect(
        isSamePath(
          '/vehicles/honda-tires/civic/2019?tireSize=1-2-3&trim=Sport%20Sedan%20%26%20Coupe',
          '/vehicles/honda-tires/civic/2019?tireSize=1-2-3',
        ),
      ).toBe(false);
      // same query params, but different order
      expect(
        isSamePath(
          '/vehicles/honda-tires/civic/2019?tireSize=1-2-3&trim=Sport%20Sedan%20%26%20Coupe',
          '/vehicles/honda-tires/civic/2019?trim=Sport%20Sedan%20%26%20Coupe&tireSize=1-2-3',
        ),
      ).toBe(true);
    });
  });

  describe('validateRoute', () => {
    it('returns true for validated brand routes', () => {
      expect(validateRoute('continental-tires', validTiresQuery)).toBeTruthy();
      expect(validateRoute('jk-tyre-tires', validTiresQuery)).toBeTruthy();
      expect(
        validateRoute('friendly-tires-tires', validTiresQuery),
      ).toBeTruthy();
      expect(
        validateRoute('special-character%20 +.~-tires', validTiresQuery),
      ).toBeTruthy();
    });

    it('returns false in case of bad brand param', () => {
      expect(validateRoute('continental', validTiresQuery)).toBeFalsy();
      expect(validateRoute('-tires', validTiresQuery)).toBeFalsy();
      expect(
        validateRoute('continental-tires-abc', validTiresQuery),
      ).toBeFalsy();
      expect(
        validateRoute('special-character%20 +.~-tire', validTiresQuery),
      ).toBeFalsy();
    });
  });

  describe('getParsedHash', () => {
    it('returns null in case of missing hash', () => {
      expect(
        getParsedHash('/brands/continental-tires/surecontact-rx'),
      ).toBeNull();
      expect(
        getParsedHash(
          '/brands/continental-tires/surecontact-rx?tireSize=200-r14',
        ),
      ).toBeNull();
    });

    it('returns null in case of regular/anchor hash (no hashstring)', () => {
      expect(
        getParsedHash(
          '/brands/continental-tires/surecontact-rx#section-to-anchor',
        ),
      ).toEqual({ anchor: 'section-to-anchor' });
    });

    it('returns parsed single hash', () => {
      expect(
        getParsedHash(
          '/brands/continental-tires/surecontact-rx#tireSize=200-r14',
        ),
      ).toEqual({
        tireSize: '200-r14',
      });
    });

    it('returns parsed multiple hash', () => {
      expect(
        getParsedHash(
          '/brands/continental-tires/surecontact-rx#tireSize=200-r14&rearSize=200-r15',
        ),
      ).toEqual({
        tireSize: '200-r14',
        rearSize: '200-r15',
      });
    });

    it('returns parsed multiple hash with possible empty value', () => {
      expect(
        getParsedHash(
          '/brands/continental-tires/surecontact-rx#tireSize=&rearSize=200-r15',
        ),
      ).toEqual({
        tireSize: '',
        rearSize: '200-r15',
      });
    });
  });
});
