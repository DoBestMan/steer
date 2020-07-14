import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';

import { SizeFinderProps } from '../SizeFinder/SizeFinder';
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
  callForPricing?: boolean;
  customerServiceNumber: { display: string; value: string };
  isSizeSelectorOpen?: boolean;
  loadSpeedRating?: string;
  onChangeSize: (value: string) => void;
  onClickChangeQuantity: (position: 'front' | 'rear') => () => void;
  onClickChangeSize: () => void;
  onCloseSizeSelector: () => void;
  price?: SitePrice | null;
  priceLabel?: string | null;
  productName: string;
  promoTags?: PromoTagProps[];
  rating?: {
    quantity: number;
    value: number;
  };
  rearLoadSpeedRating?: string;
  rearPrice?: SitePrice | null;
  rearSize?: string;
  sameSizeSearchResults?: number | null;
  sameSizeSearchURL?: string | null;
  size?: string;
  sizeFinder?: Omit<SizeFinderProps, 'onChange'> | null;
  volatileAvailability?: boolean;
}

function ProductInfo({
  availableSizes,
  brand,
  brandURL,
  callForPricing,
  customerServiceNumber,
  volatileAvailability,
  isSizeSelectorOpen,
  loadSpeedRating,
  onChangeSize,
  onClickChangeQuantity,
  onClickChangeSize,
  price,
  priceLabel,
  productName,
  promoTags,
  rating,
  rearLoadSpeedRating,
  rearPrice,
  rearSize,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
  sizeFinder,
}: ProductInfoProps) {
  const shouldShowCrossSell =
    !price && !callForPricing && size && sameSizeSearchResults;

  if (rearSize && rearPrice) {
    return (
      <>
        <ProductLine
          productName={productName}
          brand={brand}
          brandURL={brandURL}
        />
        <Rating rating={rating} />
        <MultiSizeButton
          size={size}
          loadSpeedRating={loadSpeedRating}
          price={price}
          rearSize={rearSize}
          rearLoadSpeedRating={rearLoadSpeedRating}
          rearPrice={rearPrice}
          onClickChangeQuantity={onClickChangeQuantity}
        />
      </>
    );
  }

  return (
    <>
      <div css={styles.wrapper}>
        <div css={styles.nameWrapper}>
          <ProductLine
            productName={productName}
            brand={brand}
            brandURL={brandURL}
          />
          <div css={!rating && styles.sizeNoRating}>
            <SizeButton
              availableSizes={availableSizes}
              size={size}
              loadSpeedRating={loadSpeedRating}
              isSizeSelectorOpen={isSizeSelectorOpen}
              sizeFinder={sizeFinder}
              onChangeSize={onChangeSize}
              onClickChangeSize={onClickChangeSize}
            />
          </div>
          <Rating rating={rating} />
        </div>
        {size && (
          <div css={styles.pricesWrapper}>
            <Price
              customerServiceNumber={customerServiceNumber}
              price={price}
              priceLabel={priceLabel}
              callForPricing={callForPricing}
              volatileAvailability={volatileAvailability}
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
