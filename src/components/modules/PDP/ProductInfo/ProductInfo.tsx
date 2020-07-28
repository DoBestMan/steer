import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { THEME } from '~/lib/constants';

import PDPActionBar from '../ActionBar/ActionBar';
import { SizeFinderProps } from '../SizeFinder/SizeFinder';
import MultiSizeButton from './MultiSizeButton';
import OutOfStock from './OutOfStock';
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
  loadSpeedRating?: string;
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
  roadHazard: {
    durationLabel: string;
    price: string;
  } | null;
  sameSizeSearchResults?: number | null;
  sameSizeSearchURL?: string | null;
  size?: string;
  sizeFinder?: Omit<SizeFinderProps, 'onChange'> | null;
  startingPrice?: string | null;
  volatileAvailability?: boolean;
}

interface Props extends ProductInfoProps {
  openDynamicModal: (modalData: ContentModalProps) => void;
}

function ProductInfo({
  availableSizes,
  brand,
  brandURL,
  callForPricing,
  volatileAvailability,
  loadSpeedRating,
  openDynamicModal,
  price,
  priceLabel,
  productName,
  promoTags,
  rating,
  rearLoadSpeedRating,
  rearPrice,
  rearSize,
  roadHazard,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
  sizeFinder,
  startingPrice,
}: Props) {
  const isOutOfStock = (!price || callForPricing) && size;
  const isTireLine = !size;

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
        />
        <div css={[styles.actionBar, styles.actionBarMultiple]}>
          <PDPActionBar
            roadHazard={roadHazard}
            theme={THEME.LIGHT}
            tirePrice={price?.salePriceInCents}
            tireSize={size}
            rearSize={rearSize}
            rearPrice={rearPrice?.salePriceInCents}
          />
        </div>
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
              sizeFinder={sizeFinder}
            />
          </div>
          <Rating rating={rating} />
        </div>
        {!isOutOfStock && (
          <div css={styles.pricesWrapper}>
            <Price
              price={price}
              priceLabel={priceLabel}
              startingPrice={isTireLine ? startingPrice : undefined}
              volatileAvailability={volatileAvailability}
            />
          </div>
        )}
        <div css={styles.actionBar}>
          <PDPActionBar
            roadHazard={roadHazard}
            theme={THEME.LIGHT}
            tirePrice={price?.salePriceInCents}
            tireSize={size}
          />
        </div>
      </div>
      {!!promoTags?.length && (
        <div css={styles.promoTags}>
          <PromoTagCarousel
            tags={promoTags}
            openDynamicModal={openDynamicModal}
          />
        </div>
      )}
      {isOutOfStock && (
        <div css={styles.crossSellWrapper}>
          <OutOfStock
            callForPricing={callForPricing}
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
