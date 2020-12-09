import { useMemo, useState } from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import Stars, { HALF_WIDTH_STARS } from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { STICKER_SIZES } from '~/components/global/Sticker/Sticker.styles';
import { getProductDisplayImages } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { useInViewport } from '~/hooks/useInViewport';
import { COLORS, PRODUCT } from '~/lib/constants';
import { SHADOW_SRC } from '~/lib/constants/image';
import { isBrowser } from '~/lib/utils/browser';
import { getSquareImageTransformations } from '~/lib/utils/cloudinary/cloudinary';
import { ui } from '~/lib/utils/ui-dictionary';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import styles from './ProductListing.styles';
import { ProductListingProps } from './ProductListing.types';
import ProductListingPlaceholder from './ProductListingPlaceholder';

const MAX_PROMOS = 2;

function ProductListing({
  product,
  isHighlighted,
  imageList,
  isGrouped,
  testId,
}: {
  imageList: ProductListingProps['imageList'];
  isGrouped?: boolean;
  isHighlighted?: boolean;
  product: ProductListingProps | null;
  testId?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [shouldDisplayAsset, setShouldDisplayAsset] = useState(true);
  const { isInViewport, targetRef } = useInViewport({
    shouldUnsubscribeInViewport: true,
  });
  const displayImages = useMemo(() => getProductDisplayImages(imageList), [
    imageList,
  ]);

  const imageWidths = useMemo(
    () => (isHighlighted ? [250, 250, 300] : [140, 180, 200]),
    [isHighlighted],
  );

  const imageTransformations = useMemo(
    () => getSquareImageTransformations(imageWidths),
    [imageWidths],
  );

  if ((!isInViewport && isBrowser) || product === null) {
    return (
      <div ref={targetRef} data-testid="product-placeholder">
        <ProductListingPlaceholder />
      </div>
    );
  }

  const {
    activeFilterValueList,
    gridAttribute,
    brand,
    deliveryInfo,
    dataMomentList,
    highlight,
    priceList,
    siteCatalogPromotionInfo,
    link,
    loadSpeedRating,
    name,
    rating,
    size,
  } = product;

  const standardImage =
    imageList.find(
      (image) => image.productImageType === displayImages.default,
    ) || imageList[0];

  const hoveredImage =
    imageList.find((image) => image.productImageType === displayImages.hover) ||
    standardImage;

  const displayedImage = isHovered ? hoveredImage : standardImage;

  const numberOfPromosToDisplay =
    siteCatalogPromotionInfo && siteCatalogPromotionInfo.count > MAX_PROMOS
      ? 1
      : MAX_PROMOS;

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const handleImageLoad = () => {
    setHasImageLoaded(true);
  };
  function onImageError() {
    setShouldDisplayAsset(false);
  }

  return (
    <div
      css={[
        styles.root,
        isHighlighted && styles.rootHighlighted,
        isGrouped && styles.rootGrouped,
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={targetRef}
      data-testid={testId}
    >
      <div css={[styles.image, isHighlighted && styles.imageHighlighted]}>
        {highlight && (
          <div
            css={[styles.sticker, isHighlighted && styles.stickerHighlighted]}
          >
            <Sticker
              label={highlight}
              size={isHighlighted ? STICKER_SIZES.X_LARGE : STICKER_SIZES.SMALL}
            />
          </div>
        )}
        {shouldDisplayAsset && (
          <>
            <Image
              widths={imageWidths}
              altText={displayedImage.image.altText}
              src={displayedImage.image.src}
              srcTransformationArgs={imageTransformations}
              noPlaceholder
              onError={onImageError}
              onLoad={handleImageLoad}
            />

            <div
              css={[
                styles.shadow,
                isHighlighted && styles.shadowHighlighted,
                hasImageLoaded && styles.shadowLoaded,
              ]}
            >
              <Image
                width={1400}
                height={800}
                widths={imageWidths}
                altText={''}
                responsive
                aria-hidden
                src={SHADOW_SRC}
                noPlaceholder
              />
            </div>
          </>
        )}
      </div>
      <div css={[styles.info, isHighlighted && styles.infoHighlighted]}>
        {brand && (
          <span css={[styles.brand]}>
            <BrandLogoOrLabel
              brand={brand}
              widths={PRODUCT.BRAND_IMAGE_WIDTHS}
              isCentered={!isHighlighted}
              customLabelStyles={styles.brandLabel}
            />
          </span>
        )}
        <Prices priceList={priceList} isStartingAtPrice={!size} />
        {gridAttribute && <span css={styles.attribute}>{gridAttribute}</span>}
        <h3 css={styles.subcopy}>
          <BaseLink css={styles.linkText} href={link.href}>
            {name} {loadSpeedRating}
          </BaseLink>
        </h3>
        {deliveryInfo && (
          <span
            css={[
              styles.subcopy,
              isHighlighted && styles.deliveryInfoHighlighted,
            ]}
          >
            {deliveryInfo.value}
          </span>
        )}
        {rating && (
          <div css={styles.rating}>
            <Stars
              color={COLORS.LIGHT.GRAY_70}
              number={rating.value}
              width={HALF_WIDTH_STARS}
            />
            <span css={styles.ratingQuantity}>({rating.quantity})</span>
          </div>
        )}

        {!!activeFilterValueList?.length && (
          <div css={styles.filterItemContainer}>
            {activeFilterValueList?.map((filter) => (
              <div css={styles.filterItem} key={filter}>
                {filter}
              </div>
            ))}
          </div>
        )}
        {isHighlighted && (dataMomentList || deliveryInfo?.value) && (
          <ul css={styles.momentList}>
            {deliveryInfo && (
              <li css={styles.moment}>
                <Icon
                  css={[styles.momentIcon, styles.deliveryIcon]}
                  name={ICONS.SHIPPING_TRUCK}
                />
                {deliveryInfo.value}
              </li>
            )}
            {dataMomentList?.map((item) => (
              <li css={styles.moment} key={item.label}>
                <Icon css={styles.momentIcon} name={item.icon.svgId} />
                {item.label}
              </li>
            ))}
          </ul>
        )}

        {siteCatalogPromotionInfo && siteCatalogPromotionInfo.count > 0 && (
          <>
            <span css={styles.promos}>
              {siteCatalogPromotionInfo.list
                .slice(0, numberOfPromosToDisplay)
                .map((promo) => (
                  <PromoTag
                    key={promo.label}
                    icon={promo.icon}
                    label={promo.label}
                    style={promo.style}
                  />
                ))}
            </span>
            {siteCatalogPromotionInfo.count > MAX_PROMOS && (
              <span css={styles.morePromos}>
                {ui('catalog.productListing.morePromos', {
                  number: siteCatalogPromotionInfo.count - 1,
                })}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
