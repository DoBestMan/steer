import { SiteProductLineAvailableSizeItemSpecList } from './SiteProductLineAvailableSizeItemSpecList';

/**
 * Available size for a product line with vehicle fit information (if known)
 * @export
 * @interface SiteProductLineAvailableSizeItem
 */
export interface SiteProductLineAvailableSizeItem {
  /**
   *
   * @type {string}
   * @memberof SiteProductLineAvailableSizeItem
   */
  size: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineAvailableSizeItem
   */
  loadSpeedRating: string;
  /**
   * True if current vehicle info provided and tire is a fit
   * @type {boolean}
   * @memberof SiteProductLineAvailableSizeItem
   */
  isFitForCurrentVehicle: boolean;
  /**
   *
   * @type {Array<SiteProductLineAvailableSizeItemSpecList>}
   * @memberof SiteProductLineAvailableSizeItem
   */
  specList: Array<SiteProductLineAvailableSizeItemSpecList>;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineAvailableSizeItem
   */
  priceInCents: string;
  /**
   *
   * @type {number}
   * @memberof SiteProductLineAvailableSizeItem
   */
  radius: number;
  /**
   * Object containing query params for front-end to append to current URL as a link destination
   * @type {{ [key: string]: string; }}
   * @memberof SiteProductLineAvailableSizeItem
   */
  siteQueryParams: { [key: string]: string };
}
