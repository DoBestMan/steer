import {
  SiteProductInstallation,
  SiteProductInstallationStatusEnum,
} from '~/data/models/SiteProductInstallation';

import { mapDataToInstallation } from './installation';
import { siteProductMock } from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/installation', () => {
  it('returns parsed installation props', () => {
    expect(
      mapDataToInstallation({
        siteProduct: siteProductMock,
      }),
    ).toStrictEqual({
      sceneryType: 'scenery--urban',
      vehicleType: 'car--sedan',
    });
  });

  it('returns null if installation is not available', () => {
    expect(
      mapDataToInstallation({
        siteProduct: {
          ...siteProductMock,
          siteProductInstallation: {
            ...siteProductMock.siteProductInstallation,
            status:
              SiteProductInstallationStatusEnum.SiteProductInstallationUnavailable,
          } as SiteProductInstallation,
        },
      }),
    ).toStrictEqual(null);
  });
});
