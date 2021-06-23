import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ContentModalProps } from '~/components/global/Modal/Modal.types';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import PromoTagCarousel from '~/components/global/PromoTag/PromoTagCarousel';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SitePrice } from '~/data/models/SitePrice';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, THEME } from '~/lib/constants';
import { getParameterByNameFromUrl } from '~/lib/utils/string';
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
  isBestPriceGuarantee?: boolean;
  isTireLine: boolean;
  loadRange?: string | null;
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
  sameSearchLabel?: string | null;
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
  loadRange,
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
  isBestPriceGuarantee,
}: Props) {
  const {
    isLoading,
    currentSizeIndex,
    showSelectError,
    productCount,
    productPrice,
    getProductCount,
    setShowSelectError,
  } = useProductDetailContext();
  const { bk } = useBreakpoints();

  useEffect(() => {
    if (currentSizeIndex > -1) {
      setShowSelectError(false);
    }
  }, [currentSizeIndex, setShowSelectError]);

  const isOutOfStock = (!price || callForPricing) && size;
  const shouldShowSizeSelector = !isLoading || isTireLine || size;
  const queryString = useRouter();
  const IsPDP = getParameterByNameFromUrl('tireSize', queryString.asPath);

  function renderPrice() {
    const handleClickBestPrice = () => {
      //open up the modal
    };
    return (
      <div css={[styles.pricesWrapper]}>
        <Price
          price={price}
          priceLabel={priceLabel}
          startingPrice={isTireLine ? startingPrice : undefined}
          volatileAvailability={volatileAvailability}
          isPdp={!!IsPDP}
          handleClickBestPrice={
            isBestPriceGuarantee ? handleClickBestPrice : undefined
          }
        />
      </div>
    );
  }

  function rendePriceOnLoad() {
    return (
      <div css={[styles.pricesWrapper]}>
        <Price
          price={productPrice}
          priceLabel={priceLabel}
          startingPrice={null}
          volatileAvailability={volatileAvailability}
          isPdp={!!IsPDP}
        />
      </div>
    );
  }

  const brandName = brand.label.toLocaleLowerCase();

  if (
    (!IsPDP && !startingPrice && !price) ||
    (!IsPDP && startingPrice === '0' && !price)
  ) {
    if (!productCount) {
      getProductCount(brandName);
    }
    return (
      <div css={styles.crossSellWrapper}>
        <OutOfStock
          callForPricing={callForPricing}
          sameSizeSearchResults={productCount}
          sameSizeSearchURL={brandURL}
          size={brand.label}
          sameSearchLabel={'brand'}
        />
      </div>
    );
  }

  function renderPromotags() {
    if (!promoTags) {
      return null;
    }

    const shouldLoad =
      (!isLoading && !!promoTags?.length) || !!promoTags?.length;

    return (
      <>
        {shouldLoad && (
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
            </div>
            {shouldShowSizeSelector ? (
              <>
                <div css={styles.selectorWrapper}>
                  <div>
                    <DynamicSizeButton
                      availableSizes={availableSizes}
                      size={size}
                      loadRange={loadRange}
                      loadSpeedRating={loadSpeedRating}
                      sizeFinder={sizeFinder}
                    />
                  </div>
                  <div css={styles.ratingWrapper}>
                    <Rating reviews={reviews} rating={rating} />
                  </div>
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
            bk !== BREAKPOINT_SIZES.M &&
            (productPrice ? rendePriceOnLoad() : <div css={styles.loading} />)
          ) : (
            <div css={styles.priceAndActionBarWrapper}>
              {!isOutOfStock && renderPrice()}
              <div css={styles.ratingWrapper}>
                <Rating reviews={reviews} rating={rating} />
              </div>
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
        {renderPromotags()}
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
          </div>
          {shouldShowSizeSelector ? (
            <>
              <div css={styles.selectorWrapper}>
                <div>
                  <DynamicSizeButton
                    availableSizes={availableSizes}
                    size={size}
                    loadSpeedRating={loadSpeedRating}
                    loadRange={loadRange}
                    sizeFinder={sizeFinder}
                  />
                </div>
                <div css={styles.rating}>
                  <Rating reviews={reviews} rating={rating} />
                </div>
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
          bk !== BREAKPOINT_SIZES.M &&
          (productPrice ? rendePriceOnLoad() : <div css={styles.loading} />)
        ) : (
          <div css={styles.priceAndActionBarWrapper}>
            {!isOutOfStock && renderPrice()}
            <div css={styles.ratingWrapper}>
              <Rating reviews={reviews} rating={rating} />
            </div>
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
      {renderPromotags()}
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
