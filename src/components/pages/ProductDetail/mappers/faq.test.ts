import { mapDataToFAQ } from './faq';
import { globalsMock, siteProductMock } from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/faq', () => {
  it('returns parsed FAQ props', () => {
    expect(
      mapDataToFAQ({
        siteProduct: siteProductMock,
        globals: globalsMock,
      }),
    ).toStrictEqual({
      isCustomerServiceEnabled: globalsMock.customerServiceEnabled,
      customerServiceNumber: globalsMock.customerServiceNumber,
      questions: siteProductMock.siteProductLine.faqList,
    });
  });
});
