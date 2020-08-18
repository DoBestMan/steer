import dynamic from 'next/dynamic';

import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { THEME } from '~/lib/constants';

import { SizeFinderProps } from '../SizeFinder/SizeFinder';
import OutOfStock from './OutOfStock';
import Price from './Price';
import styles from './ProductInfo.styles';
import ProductLine from './ProductLine';
import Rating from './Rating';

const DynamicPDPActionBar = dynamic(() => import('../ActionBar/ActionBar'));
const DynamicSizeButton = dynamic(() => import('./SizeButton'));
const DynamicMultiSizeButton = dynamic(() => import('./MultiSizeButton'));

export interface ProductInfoProps {
  availableSizes?: number;
  brand: SiteCatalogBrand;
  brandURL?: string;
  callForPricing?: boolean;
  isTireLine: boolean;
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
  isTireLine,
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
  const { isLoading } = useProductDetailContext();
  const isOutOfStock = (!price || callForPricing) && size;

  if (rearSize && rearPrice) {
    return (
      <>
        <ProductLine
          productName={productName}
          brand={brand}
          brandURL={brandURL}
        />
        <Rating rating={rating} />
        <DynamicMultiSizeButton
          size={size}
          loadSpeedRating={loadSpeedRating}
          price={price}
          rearSize={rearSize}
          rearLoadSpeedRating={rearLoadSpeedRating}
          rearPrice={rearPrice}
        />
        <div css={[styles.actionBar, styles.actionBarMultiple]}>
          <DynamicPDPActionBar
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

  const shouldShowSizeSelector = !isLoading || isTireLine || size;

  return (
    <>
      <div css={styles.wrapper}>
        <div css={styles.nameWrapper}>
          <ProductLine
            productName={productName}
            brand={brand}
            brandURL={brandURL}
          />
          {shouldShowSizeSelector ? (
            <div css={!rating && styles.sizeNoRating}>
              <DynamicSizeButton
                availableSizes={availableSizes}
                size={size}
                loadSpeedRating={loadSpeedRating}
                sizeFinder={sizeFinder}
              />
            </div>
          ) : (
            <div css={styles.loadingSizeSelector} />
          )}
          <Rating rating={rating} />
        </div>
        {isLoading && !isTireLine ? (
          <div css={styles.loading} />
        ) : (
          <>
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
              <DynamicPDPActionBar
                roadHazard={roadHazard}
                theme={THEME.LIGHT}
                tirePrice={price?.salePriceInCents}
                tireSize={size}
              />
            </div>
          </>
        )}
      </div>
      {!isLoading && !!promoTags?.length && (
        <div css={styles.promoTags}>
          <PromoTagCarousel
            tags={promoTags}
            openDynamicModal={openDynamicModal}
          />
        </div>
      )}
      {!isLoading && isOutOfStock && (
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
