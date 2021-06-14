export interface BestPriceModalData {
  buttonTitle: string;
  descriptions: Array<string>;
  subTitle: string;
  title: string;
}

export const BEST_PRICE_MODAL_DATA: BestPriceModalData = {
  title: 'Our best price guarantee.',
  subTitle:
    "If you find a lower price somewhere else, use our chat feature to send us a link and we'll match it!",
  buttonTitle: 'Request a price match',
  descriptions: [
    'Can not be applied to existing or past orders',
    'Applicable to identical items only (brand, model, size)',
    'Competitor product must be new, in stock, and ready for immediate shipping',
    'Cannot match the price on sale pricing, clearance items, promotional codes, or instant rebates',
    'If minimum purchase quantity is required to reach a lower price, you must purchase the same minimum quantity from SimpleTire',
    "SimpleTire reserves the right to review any competitor's advertisement for accuracy of the price and stock availability",
    'Price matching is limited to select, pre-approved qualifying competitors only',
  ],
};
