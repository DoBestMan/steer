import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import { SiteImage } from './SiteImage';

/**
 *
 * @export
 * @interface SiteCatalogProductImage
 */
export interface SiteCatalogProductImage {
  /**
   *
   * @type {SiteImage}
   * @memberof SiteCatalogProductImage
   */
  image: SiteImage;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogProductImage
   */
  productImageType: PRODUCT_IMAGE_TYPES;
}
