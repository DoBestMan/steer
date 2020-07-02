import { SiteProductPerformanceRatingRatingList } from './SiteProductPerformanceRatingRatingList';

/**
 * Performance rating for a product, from a review or a general information about a product.
 * @export
 * @interface SiteProductPerformanceRating
 */
export interface SiteProductPerformanceRating {
  /**
   *
   * @type {number}
   * @memberof SiteProductPerformanceRating
   */
  overall: number;
  /**
   *
   * @type {Array<SiteProductPerformanceRatingRatingList>}
   * @memberof SiteProductPerformanceRating
   */
  ratingList: Array<SiteProductPerformanceRatingRatingList>;
}
