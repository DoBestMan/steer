import { SiteProductPerformanceRating } from './SiteProductPerformanceRating';

/**
 * A review entry for a specific product line.
 * @export
 * @interface SiteProductLineReviewItem
 */
export interface SiteProductLineReviewItem {
  /**
   * Format MM/DD/YYYY
   * @type {string}
   * @memberof SiteProductLineReviewItem
   */
  purchaseDate: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItem
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItem
   */
  vehicle: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItem
   */
  address: string | null;
  /**
   *
   * @type {boolean}
   * @memberof SiteProductLineReviewItem
   */
  verifiedCustomer: boolean;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItem
   */
  additionalComments: string | null;
  /**
   *
   * @type {Array<InlineResponse20011DataMomentList>}
   * @memberof SiteProductLineReviewItem
   */
  dataMomentList: Array<{
    /**
     *
     * @type {string}
     * @memberof InlineResponse20011DataMomentList
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof InlineResponse20011DataMomentList
     */
    value: string;
  }>;
  /**
   *
   * @type {SiteProductPerformanceRating}
   * @memberof SiteProductLineReviewItem
   */
  performanceRating: SiteProductPerformanceRating;
}
