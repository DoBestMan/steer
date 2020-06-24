import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Button from '~/components/global/Button/Button';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import Stars from '~/components/global/Stars/Stars';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { COLORS, RATINGS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import Price from './Price';
import styles from './ProductInfo.styles';
import SizeButton from './SizeButton';

export interface ProductInfoProps {
  availableSizes?: number;
  brand: SiteCatalogBrand;
  brandURL?: string;
  callForPrice?: boolean;
  discount?: string;
  handleChangeSize: () => void;
  itemsLeft?: number;
  loadIndex?: string;
  name: string;
  price?: SitePrice;
  promoTags?: PromoTagProps[];
  rating?: {
    quantity: number;
    value: number;
  };
  sameSizeSearchResults?: number;
  sameSizeSearchURL?: string;
  size?: string;
}

function ProductInfo({
  availableSizes,
  brand,
  brandURL,
  callForPrice,
  discount,
  handleChangeSize,
  itemsLeft,
  loadIndex,
  name,
  price,
  promoTags,
  rating,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
}: ProductInfoProps) {
  const shouldShowCrossSell =
    !price && !callForPrice && size && sameSizeSearchResults;

  return (
    <>
      <a href={brandURL} css={styles.brand}>
        <BrandLogoOrLabel brand={brand} widths={[200, 400, 600]} />
      </a>
      <div css={styles.wrapper}>
        <div css={styles.nameWrapper}>
          <h1
            css={[
              name.length < 16 ? styles.productName : styles.productNameLong,
            ]}
          >
            {name}
          </h1>
          <div css={!rating && styles.sizeNoRating}>
            <SizeButton
              availableSizes={availableSizes}
              size={size}
              loadIndex={loadIndex}
              handleChangeSize={handleChangeSize}
            />
          </div>
          {rating && (
            <div
              css={styles.reviews}
              aria-label={ui('ratings.fullRatingWithReviews', {
                rating: rating.value,
                maxRating: RATINGS.MAX_RATING,
                reviews: rating.quantity,
              })}
            >
              <>
                <span aria-hidden>
                  <Stars
                    isSmall
                    bgColor={COLORS.LIGHT.GRAY_20}
                    color={COLORS.GLOBAL.BLACK}
                    number={rating.value}
                  />
                </span>
                <span css={styles.ratingValue} aria-hidden>
                  {rating.value}{' '}
                  <span css={styles.ratingQuantity}>({rating.quantity})</span>
                </span>
              </>
            </div>
          )}
        </div>
        {size && (
          <div css={styles.pricesWrapper}>
            {price && (
              <>
                {discount && (
                  <p css={styles.priceFeature}>
                    {ui('pdp.productInfo.discount', { discount })}
                  </p>
                )}
                {itemsLeft && (
                  <p css={styles.priceFeature}>
                    {ui('pdp.productInfo.itemsLeft', { itemsLeft })}
                  </p>
                )}
              </>
            )}
            <Price price={price} callForPrice={callForPrice} />
          </div>
        )}
      </div>
      {promoTags && (
        <div css={styles.promoTags}>
          <PromoTagCarousel tags={promoTags} />
        </div>
      )}
      {shouldShowCrossSell && (
        <div css={styles.crossSell}>
          <p>
            {ui('pdp.productInfo.crossSellTitle', {
              results: sameSizeSearchResults?.toString() || '',
            })}
          </p>
          <Button href={sameSizeSearchURL} as="a" css={styles.crossSellButton}>
            {ui('pdp.productInfo.crossSellButtonLabel', { size: size || '' })}
          </Button>
        </div>
      )}
    </>
  );
}

export default ProductInfo;
