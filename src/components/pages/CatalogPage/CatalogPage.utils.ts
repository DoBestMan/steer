import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteImage } from '~/data/models/SiteImage';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { getRandomInteger } from '~/lib/utils/number';

/*
 * Splits diameter/category string at second `-` to get content on either side
 * eg: size: `12-inch-winter-tires`
 * returns {
 *   diameter: '12-inch',
 *   category: 'winter-tires'
 * }
 */
export function getDiameterCategory(size: string | string[]) {
  if (!size || typeof size !== 'string') {
    console.warn('Tire size must be a string');
    return {
      category: '',
      diameter: '',
    };
  }

  const regexArr = size.split(/(\d+-\w+)(-)(.*)/);
  return {
    category: regexArr[3],
    diameter: regexArr[1],
  };
}

/*
 * Selects a random image type to use as the default, and an alternative to be used on hover
 */
export function getProductDisplayImages(
  imageList: Array<{
    image: SiteImage;
    productImageType: PRODUCT_IMAGE_TYPES;
  }>,
) {
  const imageTypes = imageList
    .map((image) => image.productImageType)
    .filter(
      (imageType) =>
        imageType === PRODUCT_IMAGE_TYPES.SIDETREAD ||
        imageType === PRODUCT_IMAGE_TYPES.SIDEWALL,
    );
  const randomImageType = imageTypes[getRandomInteger(0, imageTypes.length)];
  const hoverImageType = imageTypes.find((type) => type !== randomImageType);
  return {
    default: randomImageType,
    hover: hoverImageType,
  };
}

// The determining factor for displaying products error is if `totalResults` from /summary is > 0
export function shouldDisplayProductsError(
  siteCatalogSummary: SiteCatalogSummary,
) {
  return (siteCatalogSummary.siteCatalogSummaryMeta?.totalResults || 0) > 0;
}
