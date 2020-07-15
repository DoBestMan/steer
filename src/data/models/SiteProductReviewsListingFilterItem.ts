/**
 * Review listing filter item
 * @export
 * @interface SiteProductReviewsListingFilterItem
 */
export interface SiteProductReviewsListingFilterItem {
  /**
   *
   * @type {string}
   * @memberof SiteProductReviewsListingFilterItem
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductReviewsListingFilterItem
   */
  flair: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductReviewsListingFilterItem
   */
  description: string | null;
  /**
   *
   * @type {boolean}
   * @memberof SiteProductReviewsListingFilterItem
   */
  isSelected: boolean;
  /**
   *
   * @type {number}
   * @memberof SiteProductReviewsListingFilterItem
   */
  count?: number;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterItem
   */
  value: string;
}
