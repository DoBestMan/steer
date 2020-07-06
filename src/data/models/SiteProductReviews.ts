import { ListResultMetadata } from './ListResultMetadata';
import { SiteProductLineReviewItem } from './SiteProductLineReviewItem';
import { SiteProductPerformanceRating } from './SiteProductPerformanceRating';

/**
 *
 * @export
 * @interface SiteProductReviews
 */
export interface SiteProductReviews {
  /**
   *
   * @type {ListResultMetadata}
   * @memberof SiteProductReviews
   */
  listResultMetadata: ListResultMetadata;
  /**
   *
   * @type {SiteProductReviewsObject}
   * @memberof SiteProductReviews
   */
  reviewsSource: {
    /**
     *
     * @type {number}
     * @memberof SiteProductReviewsObject
     */
    simpleTire: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductReviewsObject
     */
    googleShopping: number | null;
  };
  /**
   *
   * @type {Array<Object>}
   * @memberof SiteProductReviews
   */
  dataMomentList: Array<{
    /**
     *
     * @type {string}
     * @memberof Object
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof Object
     */
    value: string;
  }>;
  /**
   *
   * @type {Array<SiteProductLineReviewItem>}
   * @memberof SiteProductReviews
   */
  reviewsList: Array<SiteProductLineReviewItem>;
  /**
   *
   * @type {SiteProductPerformanceRating}
   * @memberof SiteProductReviews
   */
  performanceRating: SiteProductPerformanceRating;
}
