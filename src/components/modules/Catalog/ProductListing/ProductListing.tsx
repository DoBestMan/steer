import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import Stars from '~/components/global/Stars/Stars';
import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ProductListing.styles';
import { ProductListingProps } from './ProductListing.types';

const MAX_PROMOS = 2;

function ProductListing({
  activeFilterValueList,
  gridAttribute,
  brand,
  defaultImage,
  highlight,
  priceList,
  siteCatalogPromotionInfo,
  imageList,
  isHighlighted,
  link,
  loadSpeedRating,
  name,
  rating,
}: ProductListingProps) {
  const displayedImage =
    imageList.find((image) => image.productImageType === defaultImage) ||
    imageList[0];

  const numberOfPromosToDisplay =
    siteCatalogPromotionInfo && siteCatalogPromotionInfo.count > MAX_PROMOS
      ? 1
      : MAX_PROMOS;

  return (
    <div css={[styles.root, isHighlighted && styles.rootHighlighted]}>
      <div css={styles.imageWrapper}>
        {highlight && <div css={styles.promoDisc}>{highlight}</div>}
        <Image
          css={[styles.image, isHighlighted && styles.imageHighlighted]}
          {...displayedImage.image}
        />
      </div>
      <div css={[styles.info, isHighlighted && styles.infoHighlighted]}>
        {brand.image ? (
          <Image css={styles.brand} {...brand.image} />
        ) : (
          <span css={[styles.brand, styles.brandLabel]}>{brand.label}</span>
        )}
        <Prices priceList={priceList} />
        {gridAttribute && <span css={styles.attribute}>{gridAttribute}</span>}
        <h3 css={styles.subcopy}>
          <BaseLink css={styles.linkText} href={link.href}>
            {name} {loadSpeedRating}
          </BaseLink>
        </h3>
        {rating && (
          <div css={styles.rating}>
            <Stars isSmall color={COLORS.GLOBAL.BLACK} number={rating.value} />
            <span css={styles.subcopy}>({rating.quantity})</span>
          </div>
        )}
        {activeFilterValueList?.map((filter) => (
          <div css={styles.filterItem} key={filter}>
            {filter}
          </div>
        ))}

        {siteCatalogPromotionInfo && siteCatalogPromotionInfo.count > 0 && (
          <>
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
