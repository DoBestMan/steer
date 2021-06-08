import { ICONS } from '~/components/global/Icon/Icon.constants';
import { mockProduct } from '~/components/modules/Compare/ProductToCompare/ProductToCompare.data';
import { SiteCompareTableColumn } from '~/data/models/SiteCompareTableColumn';
import { SiteCompareTableRow } from '~/data/models/SiteCompareTableRow';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const columns: Array<SiteCompareTableColumn> = [
  {
    label: 'Price',
    type: 'text',
    description:
      'Low rolling resistance tires are designed to reduce the energy loss as a tire rolls, decreasing the required rolling effort, improving vehicle fuel efficiency.',
  },
  {
    label: 'Warranty (miles)',
    type: 'text',
  },
  {
    label: 'Overall customer rating',
    type: 'rating',
  },
  {
    label: 'Comfort4',
    type: 'bar',
  },
  {
    label: 'Price with tag',
    type: 'priceWithPromotion',
  },
];

export const data: Array<SiteCompareTableRow> = [
  [
    { value: '$130' },
    { value: '$125' },
    { value: '$114.0' },
    { value: '$154.0' },
  ],

  [
    { value: '65000' },
    { value: '1355' },
    { value: 'No warranty' },
    { value: 'No warranty' },
  ],
  [
    { value: 4.5, quantity: 128 },
    { value: 4.3, quantity: 28 },
    { value: 2, quantity: 18 },
    { value: 4, quantity: 12 },
  ],
  [{ value: 4.5 }, { value: 4 }, { value: 4 }, { value: 2 }],
  [
    {
      value: ['$156', '$149'],
      promotion: {
        style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
        label: 'Installation included',
        icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
      },
    },
    {
      value: ['$156'],
      promotion: {
        style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
        label: 'Installation included',
        icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
      },
    },
    {
      value: ['$156'],
      promotion: {
        style: SitePromotionStyleEnum.SitePromotionItemDefault,
        label: 'Spring Sale',
        icon: {
          svgId: ICONS.TAG_SMALL,
          type: ICON_IMAGE_TYPE.ICON,
        } as SiteIcon,
      },
    },
    {
      value: ['$156', '$149'],
      promotion: {
        style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
        label: 'Installation included',
        icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
      },
    },
  ],
];

export const ratingColumns: Array<SiteCompareTableColumn> = [
  {
    label: 'Overall customer rating',
    type: 'rating',
  },
  {
    label: 'Comfort1',
    type: 'bar',
  },
  {
    label: 'Comfort2',
    type: 'bar',
  },
  {
    label: 'Comfort3',
    type: 'bar',
  },
];

export const ratingData: Array<SiteCompareTableRow> = [
  [
    { value: 4.5, quantity: 128 },
    { value: 4.3, quantity: 28 },
    { value: 2, quantity: 18 },
    { value: 4, quantity: 12 },
  ],
  [{ value: 4.5 }, { value: 4.3 }, { value: 2 }, { value: 4 }],
  [{ value: 3.5 }, { value: 4.5 }, { value: 4.2 }, { value: 4 }],
  [{ value: 3.2 }, { value: 4.3 }, { value: 2 }, { value: 4.5 }],
];

export const techSpecsColumns: Array<SiteCompareTableColumn> = [
  {
    label: 'Vehicle',
    type: 'text',
    description: 'Description',
  },
  {
    label: 'Run flat',
    type: 'text',
    description: 'Description',
  },
  {
    label: '3PMS',
    type: 'text',
    description: 'Description',
  },
  {
    label: 'Noise Reduction tech',
    type: 'text',
    description: 'Description',
  },
];

export const techSpecsData: Array<SiteCompareTableRow> = [
  [
    { value: 'Passenger' },
    { value: 'Passenger' },
    { value: 'Passenger' },
    { value: 'Passenger' },
  ],

  [{ value: 'Yes' }, { value: 'Yes' }, { value: 'Yes' }, { value: 'No' }],
  [{ value: 'Yes' }, { value: 'Yes' }, { value: 'Yes' }, { value: 'No' }],

  [{ value: 'Yes' }, { value: 'Yes' }, { value: 'Yes' }, { value: 'No' }],
];

export const mockServerData = {
  siteCatalogCompareList: Array(4).fill(mockProduct),
};
