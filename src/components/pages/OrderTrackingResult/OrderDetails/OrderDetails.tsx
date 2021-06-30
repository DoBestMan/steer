import React from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Image from '~/components/global/Image/Image';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteImage } from '~/data/models/SiteImage';
import { PRODUCT } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderDetails.styles';

interface Props {
  brand: SiteCatalogBrand;
  image: SiteImage;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderDetails({
  brand,
  name,
  quantity,
  price,
  image,
}: Props) {
  const tireQuantity = ui('account.orderQuantity', { quantity });

  return (
    <div css={[styles.tireContainer]}>
      <div css={styles.imageContainer}>
        <Image customContainerStyles={styles.image} {...image} />
        <div>
          <BrandLogoOrLabel
            brand={brand}
            widths={PRODUCT.BRAND_IMAGE_WIDTHS}
            customLabelStyles={styles.brandLabel}
          />
          <div css={styles.detailsContainer}>
            <h1 css={styles.tireHeader}>{name}</h1>
            <h1 css={styles.tireQuantity}>{tireQuantity}</h1>
          </div>
        </div>
      </div>
      <h1 css={styles.priceText}>${price}</h1>
    </div>
  );
}
