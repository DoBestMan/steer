import { ICONS } from '~/components/global/Icon/Icon.constants';

const freeShippingModalData = {
  content:
    '* Estimated delivery in 2-4 business days\n\n * Tires delivered by Fedex, UPS & Local Drivers\n\nAt SimpleTire, keeping our customers and employees safe is a top priority. As an e-commerce company we’ve taken measures to protect against the spread of COVID-19 (Coronavirus) and ensure that we’re 100% operational and so are our suppliers and distributors.\n\nThere has been no impact to our supply and we’re also delivering almost 100% of our orders in 2-4 days to our customers.',
  image: {
    src: 'https://dummyimage.com/1600x900/000/f00.jpg',
    altText: 'Free shipping',
  },
  subtitle: 'Tires shipped for free to anywhere in the U.S.',
  title: 'Free shipping',
};

export const everyPurchaseIncludesData = [
  {
    description: 'Fast, free shipping on every tire we sell.',
    icon: ICONS.FREE_SHIPPING,
    linkLabel: '2 days to Brooklyn, NY',
    modalData: freeShippingModalData,
    title: 'Free Shipping',
  },
  {
    description: 'Found a better price after you bought? We match it.',
    icon: ICONS.BEST_PRICE,
    linkLabel: '30 day guarantee',
    modalData: freeShippingModalData,
    title: 'Best price guarantee',
  },
  {
    description: 'Buy from local distributores, install in local stores.',
    icon: ICONS.LOCAL_BUSINESS,
    linkLabel: 'How it works',
    modalData: freeShippingModalData,
    title: 'Support to local business',
  },
  {
    description: "Don't like it? Unmounted tires can be sent back.",
    icon: ICONS.FREE_RETURNS,
    linkLabel: '30 day free return',
    modalData: freeShippingModalData,
    title: 'Free, easy returns',
  },
  {
    description: 'Unmounted tires will be refunded in full.',
    icon: ICONS.MONEY_BACK,
    linkLabel: 'How it works',
    modalData: freeShippingModalData,
    title: 'Money-back guarantee',
  },
  {
    description: 'Tire specialists are here to assist you with any doubt.',
    icon: ICONS.CUSTOMER_SUPPORT,
    linkLabel: 'Contact us',
    modalData: freeShippingModalData,
    title: 'Live customer support',
  },
];
