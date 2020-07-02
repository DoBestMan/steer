import { SitePrice } from './SitePrice';
import { SiteProductLineSizeDetailRoadHazard } from './SiteProductLineSizeDetailRoadHazard';

/**
 * Details specific to a specific product line size
 * @export
 * @interface SiteProductLineSizeDetail
 */
export interface SiteProductLineSizeDetail {
  /**
   *
   * @type {string}
   * @memberof SiteProductLineSizeDetail
   */
  loadSpeedRating: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineSizeDetail
   */
  size: string;
  /**
   *
   * @type {SitePrice}
   * @memberof SiteProductLineSizeDetail
   */
  price: SitePrice | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineSizeDetail
   */
  productStatus: SiteProductLineSizeDetailProductStatusEnum;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineSizeDetail
   */
  priceLabel: string | null;
  /**
   *
   * @type {number}
   * @memberof SiteProductLineSizeDetail
   */
  outOfStockTireSizeResultCount: number | null;
  /**
   *
   * @type {SiteProductLineSizeDetailRoadHazard}
   * @memberof SiteProductLineSizeDetail
   */
  roadHazard: SiteProductLineSizeDetailRoadHazard | null;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductLineSizeDetailProductStatusEnum {
  ProductStatusAvailable = 'ProductStatusAvailable',
  ProductStatusOutOfStock = 'ProductStatusOutOfStock',
  ProductStatusAvailableVolatile = 'ProductStatusAvailableVolatile',
  ProductStatusCallForPricing = 'ProductStatusCallForPricing',
}
