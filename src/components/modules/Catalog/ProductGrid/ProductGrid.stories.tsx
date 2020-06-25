import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import ProductGrid from './ProductGrid';

export default {
  component: ProductGrid,
  title: 'Catalog/Grid/Product Grid',
};

const mockProduct = {
  activeFilterValueList: null,
  brand: {
    label: 'Firestone',
  },
  dataMomentList: null,
  deliveryInfo: null,
  gridAttribute: null,
  highlight: null,
  imageList: [
    {
      image: {
        altText: '300x300 image',
        src: 'https://via.placeholder.com/300',
        type: ICON_IMAGE_TYPE.IMAGE,
      } as SiteImage,
      productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    },
  ],
  link: { href: '/', isExternal: false },
  loadSpeedRating: '91H',
  name: 'Turanza',
  performanceRatingList: [
    {
      label: 'Dry',
      value: 5,
    },
  ],
  priceList: [
    {
      label: null,
      price: {
        currentInCents: '7699',
        originalInCents: '12000',
      },
    },
  ],
  rating: {
    quantity: 113,
    value: 4.3,
  },
  siteCatalogPromotionInfo: null,
  size: '215/50 R17',
  specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
  topPicksAttribute: null,
} as SiteCatalogProductItem;

export function ProductGridWithKnobs() {
  return <ProductGrid productList={Array(35).fill(mockProduct)} />;
}
