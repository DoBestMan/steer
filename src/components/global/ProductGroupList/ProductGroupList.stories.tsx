import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { SiteCatalogProductGroupItemEnum } from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import ProductGroupList from './ProductGroupList';

export default {
  component: ProductGroupList,
  title: 'Global/Product Group List',
};

const mockLogo = {
  altText: '45x45 image',
  src: 'https://via.placeholder.com/45x45',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

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
        salePriceInCents: '7699',
        estimatedRetailPriceInCents: '12000',
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

export function ProductGroupListWithKnobs() {
  const isLinked = boolean('Is linked', false);
  const hasIcon = boolean('Has icon', false);
  const productList = Array(10).fill(mockProduct);
  function onClick() {
    return () => action('Heading click');
  }
  return (
    <ProductGroupList
      onClick={onClick}
      name={text('Title', 'Most popular in Brooklyn')}
      icon={hasIcon ? mockLogo : null}
      description={text(
        'Description',
        'Top choices from Civic drivers near you.',
      )}
      productList={productList}
      siteQueryParams={isLinked ? { group: 'curatedGroup1' } : null}
      id="curatedGroup1"
      type={SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem}
    />
  );
}

export function ProductGroupListStartAtPrices() {
  const productList = Array(10).fill({
    ...mockProduct,
    size: null,
  });
  function onClick() {
    return () => action('Heading click');
  }
  return (
    <ProductGroupList
      onClick={onClick}
      name="Most popular in Brooklyn"
      description="Top choices from Civic drivers near you."
      productList={productList}
      id="curatedGroup1"
      icon={null}
      type={SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem}
      siteQueryParams={null}
    />
  );
}
