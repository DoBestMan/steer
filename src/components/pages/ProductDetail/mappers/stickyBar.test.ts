import { siteProductMock } from './ProductDetail.mock';
import { mapDataToStickyBar } from './stickyBar';

describe('pages/ProductDetails/mappers/stickyBar', () => {
  it('returns parsed sticky bar props for tire line', () => {
    expect(
      mapDataToStickyBar({
        quantity: { front: 4 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: null,
          siteProductLineRearSizeDetail: null,
        },
      }),
    ).toStrictEqual({
      brandLogo: {
        altText: 'Achilles',
        height: 20,
        src:
          'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
        type: 'SiteImage',
        width: 120,
      },
      productLine: 'DH2',
      rearPrice: null,
      rearSize: null,
      roadHazard: null,
      sizesAvailable: 3,
      startingPrice: '4999',
      tirePrice: null,
      tireSize: null,
    });
  });

  it('returns parsed sticky bar props for front size only', () => {
    expect(
      mapDataToStickyBar({
        quantity: { front: 4 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineRearSizeDetail: null,
        },
      }),
    ).toStrictEqual({
      brandLogo: {
        altText: 'Achilles',
        height: 20,
        src:
          'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
        type: 'SiteImage',
        width: 120,
      },
      productLine: 'DH2',
      rearPrice: null,
      rearSize: null,
      roadHazard: {
        durationLabel: '3 years',
        price: '5208',
      },
      sizesAvailable: 3,
      startingPrice: '4999',
      tirePrice: '13296',
      tireSize: '215/50 R17 91H',
    });
  });

  it('returns parsed sticky bar props for front and rear', () => {
    expect(
      mapDataToStickyBar({
        quantity: { front: 4 },
        siteProduct: siteProductMock,
      }),
    ).toStrictEqual({
      brandLogo: {
        altText: 'Achilles',
        height: 20,
        src:
          'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
        type: 'SiteImage',
        width: 120,
      },
      productLine: 'DH2',
      rearPrice: '12099',
      rearSize: '215/50 R19 91J',
      roadHazard: {
        durationLabel: '3 years',
        price: '5208',
      },
      sizesAvailable: 3,
      startingPrice: '4999',
      tirePrice: '13296',
      tireSize: '215/50 R17 91H',
    });
  });
});
