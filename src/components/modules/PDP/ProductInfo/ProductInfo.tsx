import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { SiteProductLineSizeDetailRoadHazard } from '~/data/models/SiteProductLineSizeDetailRoadHazard';
import { THEME } from '~/lib/constants';

import PDPActionBar from '../ActionBar/ActionBar';
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
  roadHazard: SiteProductLineSizeDetailRoadHazard | null;
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
  customerServiceNumber,
  volatileAvailability,
  isSizeSelectorOpen,
  loadSpeedRating,
  onChangeSize,
  onClickChangeSize,
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
  const shouldShowCrossSell =
    !price && !callForPricing && size && sameSizeSearchResults;
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
              isSizeSelectorOpen={isSizeSelectorOpen}
              sizeFinder={sizeFinder}
              onChangeSize={onChangeSize}
              onClickChangeSize={onClickChangeSize}
            />
          </div>
          <Rating rating={rating} />
        </div>
        <div css={styles.pricesWrapper}>
          <Price
            customerServiceNumber={customerServiceNumber}
            price={price}
            priceLabel={priceLabel}
            startingPrice={isTireLine ? startingPrice : undefined}
            callForPricing={callForPricing}
            volatileAvailability={volatileAvailability}
          />
        </div>
        <div css={styles.actionBar}>
          <PDPActionBar
            roadHazard={roadHazard}
            theme={THEME.LIGHT}
            tirePrice={price?.salePriceInCents}
            tireSize={size}
          />
        </div>
      </div>
      {promoTags && (
        <div css={styles.promoTags}>
          <PromoTagCarousel
            tags={promoTags}
            openDynamicModal={openDynamicModal}
          />
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
