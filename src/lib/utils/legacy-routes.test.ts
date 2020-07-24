import { URLS } from '../constants/urls';
import { getLegacyCheckoutURL } from './legacy-routes';

describe('utils/legacy-routes', () => {
  describe('getLegacyCheckoutURL', () => {
    it('returns URL for checking out a single size tire', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          quantity: { front: 4 },
        }),
      ).toBe(`${URLS.CHECKOUT_STAGING}/MyCart/add/12345/4`);
    });

    it('returns URL for checking out a single size tire (rear)', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          rear: '09876',
          quantity: { front: 0, rear: 4 },
        }),
      ).toBe(`${URLS.CHECKOUT_STAGING}/MyCart/add/09876/4`);
    });

    it('returns URL for checking out both front and rear', () => {
      expect(
        getLegacyCheckoutURL({
          front: '12345',
          rear: '09876',
          quantity: { front: 1, rear: 2 },
        }),
      ).toBe(`${URLS.CHECKOUT_STAGING}/MyCart/addstaggered/12345/1/09876/2`);
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
        `${URLS.CHECKOUT_STAGING}/MyCart/addstaggered/12345/1/09876/2?rh=1`,
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
        `${URLS.CHECKOUT_STAGING}/MyCart/addstaggered/12345/1/09876/2?zipCode=11201`,
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
        `${URLS.CHECKOUT_STAGING}/MyCart/addstaggered/12345/1/09876/2?rh=1&zipCode=11201`,
      );
    });
  });
});
