import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import ProductInfo from './ProductInfo';

export default {
  component: ProductInfo,
  title: 'PDP/Product Info',
};

const mockLogo = {
  altText: 'Brand logo',
  src: 'https://via.placeholder.com/140x20',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockLogoURL = '/';

const mockSameSizeSearchURL = '/';

const ratingOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

const mockProductName = 'ProContact';
const mockSizeLabel = '215/55R16';
const mockSizeLoadIndex = '91H';
const mockPromoTags: PromoTagProps[] = [
  {
    style: PROMO_STYLES.BLACK_PILL,
    icon: {
      svgId: ICONS.LIGHTNING,
      type: ICON_IMAGE_TYPE.ICON,
    },
    label: 'Black Friday',
    handleClick: action('click-black-friday'),
  },
  {
    style: PROMO_STYLES.WHITE_PILL,
    icon: {
      svgId: ICONS.WRENCH,
      type: ICON_IMAGE_TYPE.ICON,
    },
    label: 'Free installation',
    handleClick: action('click-free-instalation'),
  },
];

export function ProductInfoWithKnobs() {
  const tireLineGroupId = 'tire line';
  const priceGroupId = 'price';
  const sizeGroupId = 'size';
  const ratingGroupId = 'rating';
  const promoTagsGroupId = 'promo tags';

  const showBrandLogo = boolean('Show brand logo', true, tireLineGroupId);
  const productName = text('Product name', mockProductName, tireLineGroupId);

  const sizeSelected = boolean('Is size selected?', true, sizeGroupId);
  const sizeLabel = text('Size name', mockSizeLabel, sizeGroupId);
  const loadIndex = text('Load index', mockSizeLoadIndex, sizeGroupId);
  const availableSizes = number('Available sizes', 38, {}, sizeGroupId);

  const showRatings = boolean('Show ratings', true, ratingGroupId);
  const ratingQuantity = number('Rating quantity', 113, {}, ratingGroupId);
  const ratingValue = number('Rating', 4.3, ratingOptions, ratingGroupId);
  const price = {
    salePriceInCents: text('Current price (cents)', '7699', priceGroupId),
    estimatedRetailPriceInCents: text(
      'Original price (cents)',
      '12000',
      priceGroupId,
    ),
  };
  const discount = text('Discount', '60%', priceGroupId);
  const itemsLeft = number('Items left', 4, {}, priceGroupId);
  const callForPrice = boolean('Call for price?', false, priceGroupId);
  const outOfStock = boolean('Out of stock?', false, priceGroupId);
  const sameSizeSearchResults = number(
    'Same size search results (cross-sell)',
    232,
    {},
    priceGroupId,
  );

  const showPromoTags = boolean('Show promo tags?', false, promoTagsGroupId);

  const handleChangeSize = action('click-change-size');

  return (
    <ProductInfo
      brand={{
        image: showBrandLogo ? mockLogo : undefined,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={productName}
      price={!callForPrice ? price : undefined}
      callForPrice={callForPrice && !outOfStock}
      rating={
        showRatings
          ? {
              quantity: ratingQuantity,
              value: ratingValue,
            }
          : undefined
      }
      availableSizes={availableSizes}
      size={sizeSelected ? sizeLabel : undefined}
      loadIndex={sizeSelected ? loadIndex : undefined}
      handleChangeSize={handleChangeSize}
      discount={discount ? discount : undefined}
      itemsLeft={itemsLeft ? itemsLeft : undefined}
      sameSizeSearchResults={sameSizeSearchResults}
      sameSizeSearchURL={mockSameSizeSearchURL}
      promoTags={showPromoTags ? mockPromoTags : undefined}
    />
  );
}

export function ProductInfoDefault() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
    />
  );
}

export function ProductInfoPromoTags() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      promoTags={mockPromoTags}
    />
  );
}

export function ProductInfoTireLine() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      handleChangeSize={action('click-change-size')}
    />
  );
}

export function ProductInfoLongNameNoBrandLogo() {
  return (
    <ProductInfo
      brand={{
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name="Assurance Comfort Tred Touring Lorem ipsum dolor"
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      handleChangeSize={action('click-change-size')}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
    />
  );
}

export function ProductInfoDiscountBadge() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      discount="60%"
    />
  );
}

export function ProductInfoOnly4LeftBadge() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      itemsLeft={4}
    />
  );
}

export function ProductInfoBothBadges() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      discount="60%"
      itemsLeft={4}
    />
  );
}

export function ProductInfoCallForPricing() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      callForPrice
    />
  );
}

export function ProductInfoOutOfStock() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
      sameSizeSearchResults={232}
      sameSizeSearchURL="/"
    />
  );
}

export function ProductInfoNoReviews() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      name={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadIndex={mockSizeLoadIndex}
      handleChangeSize={action('click-change-size')}
    />
  );
}
