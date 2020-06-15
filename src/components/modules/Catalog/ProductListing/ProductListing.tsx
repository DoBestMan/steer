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
  activeFilterPropertyList,
  attribute,
  brand,
  defaultImage,
  highlight,
  priceList,
  promotionList,
  images,
  isHighlighted,
  link,
  loadSpeedRating,
  name,
  rating,
}: ProductListingProps) {
  const displayedImage =
    images.find((image) => image.productImageType === defaultImage) ||
    images[0];

  const noOfPromosToDisplay = promotionList.count > MAX_PROMOS ? 1 : MAX_PROMOS;
  const displayedPromos = promotionList.list.slice(0, noOfPromosToDisplay);
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
        {attribute && <span css={styles.attribute}>{attribute}</span>}
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
        {activeFilterPropertyList &&
          activeFilterPropertyList.map((filter) => (
            <div css={styles.filterItem} key={filter}>
              {filter}
            </div>
          ))}
        {promotionList.count > 0 && (
          <>
            {displayedPromos.map((promo) => (
              <PromoTag
                key={promo.label}
                icon={promo.icon}
                label={promo.label}
                style={promo.style}
              />
            ))}
            {promotionList.count > MAX_PROMOS && (
              <span css={styles.morePromos}>
                {ui('catalog.productListing.morePromos', {
                  number: promotionList.count - 1,
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
