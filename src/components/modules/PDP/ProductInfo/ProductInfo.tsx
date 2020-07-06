import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';

import CrossSell from './CrossSell';
import MultiSizeButton from './MultiSizeButton';
import Price from './Price';
import styles from './ProductInfo.styles';
import ProductLine from './ProductLine';
import Rating from './Rating';
import SizeButton from './SizeButton';

export interface ProductInfoProps {
  availableSizes?: number;
  brand: SiteCatalogBrand;
  brandURL?: string;
  callForPrice?: boolean;
  customerServiceNumber: { display: string; value: string };
  discount?: string;
  handleChangeQuantity: (position: 'front' | 'rear') => () => void;
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
  rearLoadIndex?: string;
  rearPrice?: SitePrice;
  rearSize?: string;
  sameSizeSearchResults?: number;
  sameSizeSearchURL?: string;
  size?: string;
}

function ProductInfo({
  availableSizes,
  brand,
  brandURL,
  callForPrice,
  customerServiceNumber,
  discount,
  handleChangeQuantity,
  handleChangeSize,
  itemsLeft,
  loadIndex,
  name,
  price,
  promoTags,
  rating,
  rearLoadIndex,
  rearPrice,
  rearSize,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
}: ProductInfoProps) {
  const shouldShowCrossSell =
    !price && !callForPrice && size && sameSizeSearchResults;

  if (rearSize && rearPrice) {
    return (
      <>
        <ProductLine name={name} brand={brand} brandURL={brandURL} />
        <Rating rating={rating} />
        <MultiSizeButton
          size={size}
          loadIndex={loadIndex}
          price={price}
          rearSize={rearSize}
          rearLoadIndex={rearLoadIndex}
          rearPrice={rearPrice}
          handleChangeQuantity={handleChangeQuantity}
        />
      </>
    );
  }

  return (
    <>
      <div css={styles.wrapper}>
        <div css={styles.nameWrapper}>
          <ProductLine name={name} brand={brand} brandURL={brandURL} />
          <div css={!rating && styles.sizeNoRating}>
            <SizeButton
              availableSizes={availableSizes}
              size={size}
              loadIndex={loadIndex}
              handleChangeSize={handleChangeSize}
            />
          </div>
          <Rating rating={rating} />
        </div>
        {size && (
          <div css={styles.pricesWrapper}>
            <Price
              customerServiceNumber={customerServiceNumber}
              price={price}
              callForPrice={callForPrice}
              discount={discount}
              itemsLeft={itemsLeft}
            />
          </div>
        )}
      </div>
      {promoTags && (
        <div css={styles.promoTags}>
          <PromoTagCarousel tags={promoTags} />
        </div>
      )}
      {shouldShowCrossSell && (
        <div css={styles.crossSellWrapper}>
          <CrossSell
            sameSizeSearchResults={sameSizeSearchResults}
            sameSizeSearchURL={sameSizeSearchURL}
            size={size}
          />
        </div>
      )}
    </>
  );
}

export default ProductInfo;
