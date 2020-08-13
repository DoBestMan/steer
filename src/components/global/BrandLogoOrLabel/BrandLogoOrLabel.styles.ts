import { PRODUCT, StylesMap } from '~/lib/constants';

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
};
