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
  productImageType: SiteCatalogProductImageProductImageTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogProductImageProductImageTypeEnum {
  Sidetread = 'sidetread',
  Sidewall = 'sidewall',
  Treadfull = 'treadfull',
  Treadonly = 'treadonly',
  Unavailable = 'unavailable',
}
