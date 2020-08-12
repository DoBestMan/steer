import { useMemo, useState } from 'react';

import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import Stars, { HALF_WIDTH_STARS } from '~/components/global/Stars/Stars';
import Sticker from '~/components/global/Sticker/Sticker';
import { STICKER_SIZES } from '~/components/global/Sticker/Sticker.styles';
import { getProductDisplayImages } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { COLORS } from '~/lib/constants';
import { SHADOW_SRC } from '~/lib/constants/image';
import { getSquareImageTransformations } from '~/lib/utils/cloudinary/cloudinary';
import { ui } from '~/lib/utils/ui-dictionary';

import Icon from '../Icon/Icon';
import { ICONS } from '../Icon/Icon.constants';
import styles from './ProductListing.styles';
import { ProductListingProps } from './ProductListing.types';

const MAX_PROMOS = 2;

function ProductListing({
  activeFilterValueList,
  gridAttribute,
  brand,
  deliveryInfo,
  dataMomentList,
  highlight,
  priceList,
  siteCatalogPromotionInfo,
  imageList,
  isHighlighted,
  link,
  loadSpeedRating,
  name,
  rating,
  size,
  isGrouped,
}: ProductListingProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayImages = useMemo(() => getProductDisplayImages(imageList), [
    imageList,
  ]);
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

  const imageWidths = useMemo(
    () => (isHighlighted ? [250, 250, 300] : [140, 180, 200]),
    [isHighlighted],
  );

  const imageTransformations = useMemo(
    () => getSquareImageTransformations(imageWidths),
    [imageWidths],
  );

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
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
        <Image
          widths={imageWidths}
          altText={displayedImage.image.altText}
          src={displayedImage.image.src}
          srcTransformationArgs={imageTransformations}
          noPlaceholder
        />
        <div css={[styles.shadow, isHighlighted && styles.shadowHighlighted]}>
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
      </div>
      <div css={[styles.info, isHighlighted && styles.infoHighlighted]}>
        {brand.image ? (
          <div css={[styles.brand, styles.brandImage]}>
            <Image
              as="span"
              src={brand.image.src}
              altText={brand.image.altText}
            />
          </div>
        ) : (
          <span css={[styles.brand, styles.brandLabel]}>{brand.label}</span>
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
        {isHighlighted && (dataMomentList || deliveryInfo) && (
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
