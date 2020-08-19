import { PRODUCT, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  brandImage: {
    maxHeight: PRODUCT.BRAND_IMAGE_HEIGHT,
    maxWidth: PRODUCT.BRAND_IMAGE_MAX_WIDTH,
    img: {
      height: PRODUCT.BRAND_IMAGE_HEIGHT,
      width: 'auto',
      maxWidth: PRODUCT.BRAND_IMAGE_MAX_WIDTH,
    },
  },
  centered: {
    margin: '0 auto',
  },
  label: [
    typography.secondaryHeadline,
    {
      display: 'inline-block',
      height: PRODUCT.BRAND_IMAGE_HEIGHT,
    },
  ],
};
