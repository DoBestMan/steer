import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import ProductInfo from './ProductInfo';

export default {
  component: ProductInfo,
  title: 'PDP/Product Info',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
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
const mockSizeLoadSpeedRating = '91H';
const mockRearSizeLabel = '215/65R17';
const mockRearLoadSpeedRating = '91H';
const mockPromoTags: PromoTagProps[] = [
  {
    style: SitePromotionStyleEnum.SitePromotionItemBlackPill,
    icon: {
      svgId: ICONS.LIGHTNING_SMALL,
      type: ICON_IMAGE_TYPE.ICON,
    },
    label: 'Black Friday',
    handleClick: action('click-black-friday'),
  },
  {
    style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
    icon: {
      svgId: ICONS.WRENCH,
      type: ICON_IMAGE_TYPE.ICON,
    },
    label: 'Free installation',
    handleClick: action('click-free-instalation'),
  },
];

const handleChangeQuantity = (position: 'front' | 'rear') =>
  action(`click-change-position-${position}`);

const handleChangeSize = action('click-change-size');

export function ProductInfoWithKnobs() {
  const tireLineGroupId = 'tire line';
  const priceGroupId = 'price';
  const sizeGroupId = 'size';
  const ratingGroupId = 'rating';
  const promoTagsGroupId = 'promo tags';

  const showBrandLogo = boolean('Show brand logo', true, tireLineGroupId);
  const productName = text('Product name', mockProductName, tireLineGroupId);

  const availableSizes = number(
    'Available sizes in the tire line',
    38,
    {},
    sizeGroupId,
  );
  const sizeSelected = boolean('Is size selected?', true, sizeGroupId);
  const sizeLabel = text('Size name', mockSizeLabel, sizeGroupId);
  const loadSpeedRating = text(
    'Load index',
    mockSizeLoadSpeedRating,
    sizeGroupId,
  );
  const hasRearSize = boolean('Has rear size?', false, sizeGroupId);
  const rearSizeLabel = text('Rear size name', mockRearSizeLabel, sizeGroupId);
  const rearLoadSpeedRating = text(
    'Rear load index',
    mockRearLoadSpeedRating,
    sizeGroupId,
  );

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
  const priceLabel = text('Price label', '60% off', priceGroupId);
  const volatileAvailability = boolean(
    'Volatile availability (4 items left)',
    false,
    priceGroupId,
  );
  const callForPricing = boolean('Call for price?', false, priceGroupId);
  const outOfStock = boolean('Out of stock?', false, priceGroupId);
  const sameSizeSearchResults = number(
    'Same size search results (cross-sell)',
    232,
    {},
    priceGroupId,
  );

  const showPromoTags = boolean('Show promo tags?', false, promoTagsGroupId);

  return (
    <ProductInfo
      brand={{
        image: showBrandLogo ? mockLogo : undefined,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      productName={productName}
      price={!callForPricing && !outOfStock ? price : undefined}
      customerServiceNumber={customerServiceNumber}
      callForPricing={callForPricing && !outOfStock}
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
      loadSpeedRating={sizeSelected ? loadSpeedRating : undefined}
      rearSize={hasRearSize ? rearSizeLabel : undefined}
      rearLoadSpeedRating={hasRearSize ? rearLoadSpeedRating : undefined}
      rearPrice={price}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      priceLabel={priceLabel ? priceLabel : undefined}
      volatileAvailability={volatileAvailability}
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
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
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
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
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
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
      customerServiceNumber={customerServiceNumber}
      productName="Assurance Comfort Tred Touring Lorem ipsum dolor"
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      size={mockSizeLabel}
      loadSpeedRating={mockSizeLoadSpeedRating}
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
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
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      priceLabel="60% off!"
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
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
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      volatileAvailability
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
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
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      priceLabel="60% off!"
      volatileAvailability
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
      callForPricing
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
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
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
      price={{
        salePriceInCents: '13296',
        estimatedRetailPriceInCents: '15099',
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadSpeedRating={mockSizeLoadSpeedRating}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
    />
  );
}

export function ProductInfoMultiSize() {
  return (
    <ProductInfo
      brand={{
        image: mockLogo,
        label: 'Continental',
      }}
      brandURL={mockLogoURL}
      customerServiceNumber={customerServiceNumber}
      productName={mockProductName}
      price={{
        estimatedRetailPriceInCents: '13296',
        salePriceInCents: '15099',
      }}
      rating={{
        quantity: 115,
        value: 4.8,
      }}
      availableSizes={32}
      size={mockSizeLabel}
      loadSpeedRating={mockSizeLoadSpeedRating}
      rearSize={mockRearSizeLabel}
      rearLoadSpeedRating={mockRearLoadSpeedRating}
      rearPrice={{
        estimatedRetailPriceInCents: '15486',
        salePriceInCents: '19000',
      }}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeSize={handleChangeSize}
    />
  );
}
