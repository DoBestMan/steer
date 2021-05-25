import { IconOrImage } from './IconOrImage';

/**
 *
 * @export
 * @interface SiteProductInstantRebate
 */
export interface SiteProductInstantRebate {
  /**
   * Display text supporting line breaks
   * @type {string}
   * @memberof SiteProductInstantRebate
   */
  label: string;
  /**
   *
   * @type {SiteImage | SiteIcon}
   * @memberof SiteProductInstantRebate
   */
  icon: IconOrImage;
  /**
   *
   * @type {string}
   * @memberof SiteProductInstantRebate
   */
  couponCode: string;
}
