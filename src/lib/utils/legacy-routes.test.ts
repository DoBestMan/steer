import { URLS } from '../constants/urls';
import { getLegacyAccountURL, getLegacyCheckoutURL } from './legacy-routes';

describe('utils/legacy-routes', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = {
      ...OLD_ENV,
    };
  });

  describe('getLegacyAccountURL', () => {
    it('returns a default URL', () => {
      expect(getLegacyAccountURL()).toBe(`${URLS.ACCOUNT_INTEGRATION}`);
    });

    it('returns a production URL', () => {
      process.env.NOW_GITHUB_COMMIT_REF = 'master';

      expect(getLegacyAccountURL()).toBe(`${URLS.ACCOUNT_PRODUCTION}`);
    });
  });

  describe('getLegacyCheckoutURL', () => {
    it('returns URL for checking out a single size tire', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          quantity: { front: 4 },
        }),
      ).toBe(`${URLS.CHECKOUT_INTEGRATION}/MyCart/add/12345/4`);
    });

    it('returns URL for checking out a single size tire (rear)', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          rear: '09876',
          quantity: { front: 0, rear: 4 },
        }),
      ).toBe(`${URLS.CHECKOUT_INTEGRATION}/MyCart/add/09876/4`);
    });

    it('returns URL for checking out both front and rear', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          rear: '09876',
          quantity: { front: 1, rear: 2 },
        }),
      ).toBe(
        `${URLS.CHECKOUT_INTEGRATION}/MyCart/addstaggered/12345/1/09876/2`,
      );
    });

    it('returns URL for checking out with road hazard', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          rear: '09876',
          quantity: { front: 1, rear: 2 },
          roadHazard: true,
        }),
      ).toBe(
        `${URLS.CHECKOUT_INTEGRATION}/MyCart/addstaggered/12345/1/09876/2?rh=1`,
      );
    });

    it('returns URL for checking out with zip code', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          quantity: { front: 1, rear: 2 },
          rear: '09876',
          roadHazard: false,
          userZip: '11201',
        }),
      ).toBe(
        `${URLS.CHECKOUT_INTEGRATION}/MyCart/addstaggered/12345/1/09876/2?zipCode=11201`,
      );
    });

    it('returns URL for checking out with either road hazard and zip code', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          quantity: { front: 1, rear: 2 },
          rear: '09876',
          roadHazard: true,
          userZip: '11201',
        }),
      ).toBe(
        `${URLS.CHECKOUT_INTEGRATION}/MyCart/addstaggered/12345/1/09876/2?rh=1&zipCode=11201`,
      );
    });

    it('returns a production URL', () => {
      process.env.NOW_GITHUB_COMMIT_REF = 'master';

      expect(
        getLegacyCheckoutURL({
          front: '12345',
          quantity: { front: 4 },
        }),
      ).toBe(`${URLS.CHECKOUT_PRODUCTION}/MyCart/add/12345/4`);
    });
  });
});
