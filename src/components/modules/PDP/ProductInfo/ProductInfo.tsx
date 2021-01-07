import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

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
  hasError?: boolean;
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
  reviews?: {
    hasReviews: boolean;
    refId: string;
  };
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
  hasError,
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
  reviews,
  roadHazard,
  sameSizeSearchResults,
  sameSizeSearchURL,
  size,
  sizeFinder,
  startingPrice,
  volatileAvailability,
}: Props) {
  const {
    isLoading,
    currentSizeIndex,
    showSelectError,
    setShowSelectError,
  } = useProductDetailContext();

  const { bk } = useBreakpoints();

  useEffect(() => {
    if (currentSizeIndex > -1) {
      setShowSelectError(false);
    }
  }, [currentSizeIndex, setShowSelectError]);

  function renderPrice() {
    return (
      <div css={[styles.pricesWrapper]}>
        <Price
          callForPricing={callForPricing}
          price={price}
          priceLabel={priceLabel}
          startingPrice={isTireLine ? startingPrice : undefined}
          sameSizeSearchResults={sameSizeSearchResults}
          sameSizeSearchURL={sameSizeSearchURL}
          size={size}
          volatileAvailability={volatileAvailability}
        />
      </div>
    );
  }

  const isOutOfStock = (!price || callForPricing) && size;
  const shouldShowSizeSelector = !isLoading || isTireLine || size;

  if (!isLoading && hasError) {
    return (
      <>
        <div css={styles.wrapper}>
          <div css={styles.nameWrapper}>
            <div css={styles.topPart}>
              <div>
                <ProductLine
                  productName={productName}
                  brand={brand}
                  brandURL={brandURL}
                />
              </div>
              <Rating reviews={reviews} rating={rating} />
            </div>
            {shouldShowSizeSelector ? (
              <>
                <div css={styles.selectorWrapper}>
                  <div>
                    <DynamicSizeButton
                      availableSizes={availableSizes}
                      size={size}
                      loadSpeedRating={loadSpeedRating}
                      sizeFinder={sizeFinder}
                    />
                  </div>
                  {isLoading && !isTireLine
                    ? null
                    : [BREAKPOINT_SIZES.M, BREAKPOINT_SIZES.S].includes(bk) &&
                      !isOutOfStock &&
                      renderPrice()}
                </div>
                {showSelectError && (
                  <span role="alert" css={styles.errorMessage}>
                    <span css={styles.questionMark}>
                      {ui('pdp.productInfo.questionMark')}
                    </span>
                    {ui('pdp.productInfo.selectError')}
                  </span>
                )}
              </>
            ) : (
              <div css={styles.loadingSizeSelector} />
            )}
          </div>
          {isLoading && !isTireLine ? (
            bk !== BREAKPOINT_SIZES.M && <div css={styles.loading} />
          ) : (
            <div css={styles.priceAndActionBarWrapper}>
              {![BREAKPOINT_SIZES.M, BREAKPOINT_SIZES.S].includes(bk) &&
                !isOutOfStock &&
                renderPrice()}
              <div css={styles.actionBar}>
                <DynamicPDPActionBar
                  roadHazard={roadHazard}
                  theme={THEME.LIGHT}
                  startingPrice={startingPrice}
                  tirePrice={price?.salePriceInCents}
                  tireSize={size}
                  handleOnDisabled={setShowSelectError}
                />
              </div>
            </div>
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
      </>
    );
  }

  if (rearSize && rearPrice) {
    return (
      <>
        <ProductLine
          productName={productName}
          brand={brand}
          brandURL={brandURL}
        />
        <Rating reviews={reviews} rating={rating} />
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
            startingPrice={startingPrice}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div css={styles.wrapper}>
        <div css={styles.nameWrapper}>
          <div css={styles.topPart}>
            <div>
              <ProductLine
                productName={productName}
                brand={brand}
                brandURL={brandURL}
              />
            </div>
            <Rating reviews={reviews} rating={rating} />
          </div>
          {shouldShowSizeSelector ? (
            <>
              <div css={styles.selectorWrapper}>
                <div>
                  <DynamicSizeButton
                    availableSizes={availableSizes}
                    size={size}
                    loadSpeedRating={loadSpeedRating}
                    sizeFinder={sizeFinder}
                  />
                </div>
                {isLoading && !isTireLine
                  ? null
                  : [BREAKPOINT_SIZES.M, BREAKPOINT_SIZES.S].includes(bk) &&
                    !isOutOfStock &&
                    renderPrice()}
              </div>
              {showSelectError && (
                <span role="alert" css={styles.errorMessage}>
                  <span css={styles.questionMark}>
                    {ui('pdp.productInfo.questionMark')}
                  </span>
                  {ui('pdp.productInfo.selectError')}
                </span>
              )}
            </>
          ) : (
            <div css={styles.loadingSizeSelector} />
          )}
        </div>
        {isLoading && !isTireLine ? (
          bk !== BREAKPOINT_SIZES.M && <div css={styles.loading} />
        ) : (
          <div css={styles.priceAndActionBarWrapper}>
            {![BREAKPOINT_SIZES.M, BREAKPOINT_SIZES.S].includes(bk) &&
              !isOutOfStock &&
              renderPrice()}
            <div css={styles.actionBar}>
              <DynamicPDPActionBar
                roadHazard={roadHazard}
                theme={THEME.LIGHT}
                startingPrice={startingPrice}
                tirePrice={price?.salePriceInCents}
                tireSize={size}
                handleOnDisabled={setShowSelectError}
              />
            </div>
          </div>
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
