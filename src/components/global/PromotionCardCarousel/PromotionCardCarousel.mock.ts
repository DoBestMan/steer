import { ICONS } from '~/components/global/Icon/Icon.constants';
import { PromotionCardProps } from '~/components/global/PromotionCard/PromotionCard';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const mockDataCards: PromotionCardProps[] = [
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.ARROW_DOWN, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody:
      'Promotion valid Nov 01 - Nov 30, 2020\n\nComplete the mail in form or submit your claim at www.continentaltire-rebates.com. See program terms and conditions on submission form or visit www.continentaltire-rebates.com. Valid only with qualified purchase made in the 50 United States, D.C., or Puerto Rico between 11/1/2020 and 11/30/2020 or while supplies last. Void where prohibited by law. No rain checks. Valid with the copy or original, dated, paid, itemized receipt and invoice for the purchase of four (4) new qualifying CONTINENTAL TIRES from a participating retail dealer and a completed redemption form. Offer may not be combined with any other offer, discount, rebate, or promotion. Tires must be purchased in a single transaction. Offer form must be postmarked or submitted online by 12/31/2020.',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: '$80 Cash Back',
    eyebrowIcon: { svgId: ICONS.FIRE, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody:
      'Complete the mail in form or submit your claim at www.continentaltire-rebates.com. See program terms and conditions on submission form or visit www.continentaltire-rebates.com.',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'Purchase a set of Pirelli winter tires and get an $80 rebate.',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Installation',
    eyebrowIcon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: '50% off professional installation on any set of Nitto tires.',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: '$70 Cash Back',
    eyebrowIcon: { svgId: ICONS.FIRE, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image  on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.CHECKMARK, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.MONEY_BACK, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.PRO_TIP_SMALL, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.REBATE, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.RUN_FLAT, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
  {
    body: 'Promotion valid May 20-June 20, 2020.',
    eyebrow: 'Price drop',
    eyebrowIcon: { svgId: ICONS.SHIPPING_TRUCK, type: ICON_IMAGE_TYPE.ICON },
    handlePromotionClick: () => ({}),
    links: [
      {
        type: 'SiteCTAOpenCatalog',
        label: 'View tires on promotion',
        catalogParams: {
          promotion: '2',
        },
      },
    ],
    moreBody: 'Additional promotion details',
    promoImage: {
      altText: 'Header image on Promotions',
      src:
        'https://images.simpletire.com/image/upload/v1594254784/steer/home/promotions.png',
      type: ICON_IMAGE_TYPE.IMAGE,
    },
    title: 'June flash sale! Save up to 20% on thousands of tires instantly!',
  },
];
