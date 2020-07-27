import { CATALOG_ROUTES } from '~/lib/constants';

import { validBrandQuery } from './regex';
import {
  getParsedHash,
  getUrlObject,
  interpolateRoute,
  isInRouteList,
  isRouteDiameterFormat,
  trimSlash,
  validateOrRedirectToNotFound,
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

  describe('validateOrRedirectToNotFound', () => {
    let mockSetHeader: any;
    let mockResponse: any;

    beforeEach(() => {
      mockSetHeader = jest.fn(() => {});
      mockResponse = {
        setHeader: mockSetHeader,
        statusCode: 200,
        end: () => {},
      };
    });

    it('returns undefined for validated brand routes', () => {
      validateOrRedirectToNotFound({
        param: 'continental-tires',
        pattern: validBrandQuery,
        response: mockResponse,
      });

      expect(mockSetHeader.mock.calls.length).toBe(0);
      expect(mockResponse.statusCode).toBe(200);
    });

    it('changes response header redirecting to 404 in case of bad brand param', () => {
      validateOrRedirectToNotFound({
        param: 'continental',
        pattern: validBrandQuery,
        response: mockResponse,
      });

      validateOrRedirectToNotFound({
        param: '-tires',
        pattern: validBrandQuery,
        response: mockResponse,
      });

      validateOrRedirectToNotFound({
        param: 'continental-tires-abc',
        pattern: validBrandQuery,
        response: mockResponse,
      });

      expect(mockSetHeader.mock.calls.length).toBe(3);
      expect(mockResponse.statusCode).toBe(302);
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
