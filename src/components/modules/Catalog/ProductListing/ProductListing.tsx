import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import Prices from '~/components/global/Prices/Prices';
import Stars from '~/components/global/Stars/Stars';
import { COLORS } from '~/lib/constants';

import styles from './ProductListing.styles';
import { ProductListingProps } from './ProductListing.types';

function ProductListing({
  activeFilterPropertyList,
  attribute,
  brand,
  defaultImage,
  priceList,
  images,
  isHighlighted,
  link,
  name,
  rating,
}: ProductListingProps) {
  const displayedImage =
    images.find((image) => image.productImageType === defaultImage) ||
    images[0];
  return (
    <div css={[styles.root, isHighlighted && styles.rootHighlighted]}>
      <Image
        css={[styles.image, isHighlighted && styles.imageHighlighted]}
        {...displayedImage.image}
      />
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
            {name}
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
      </div>
    </div>
  );
}

export default ProductListing;
