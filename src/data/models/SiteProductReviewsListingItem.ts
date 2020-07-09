import { SiteLink } from './SiteLink';

/**
 * Entry for tire reviews hub.
 * @export
 * @interface SiteProductReviewsListingItem
 */
export interface SiteProductReviewsListingItem {
  /**
   *
   * @type {string}
   * @memberof SiteProductReviewsListingItem
   */
  label: string;
  /**
   *
   * @type {number}
   * @memberof SiteProductReviewsListingItem
   */
  overallRating: number;
  /**
   *
   * @type {number}
   * @memberof SiteProductReviewsListingItem
   */
  ratingsCount: number;
  /**
   *
   * @type {SiteLink}
   * @memberof SiteProductReviewsListingItem
   */
  link: SiteLink;
}
