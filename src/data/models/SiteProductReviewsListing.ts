import { ListResultMetadata } from './ListResultMetadata';
import { SiteProductReviewsListingFilters } from './SiteProductReviewsListingFilters';
import { SiteProductReviewsListingInfo } from './SiteProductReviewsListingInfo';
import { SiteProductReviewsListingItem } from './SiteProductReviewsListingItem';

/**
 * Product reviews hub payload.
 * @export
 * @interface SiteProductReviewsListing
 */
export interface SiteProductReviewsListing {
  /**
   *
   * @type {ListResultMetadata}
   * @memberof SiteProductReviewsListing
   */
  listResultMetadata: ListResultMetadata;
  /**
   *
   * @type {Array<SiteProductReviewsListingItem>}
   * @memberof SiteProductReviewsListing
   */
  reviewsList: Array<SiteProductReviewsListingItem>;
  /**
   *
   * @type {SiteProductReviewsListingInfo}
   * @memberof SiteProductReviewsListing
   */
  siteInfo: SiteProductReviewsListingInfo;
  /**
   *
   * @type {SiteProductReviewsListingFilters}
   * @memberof SiteProductReviewsListing
   */
  siteProductReviewsFilters: SiteProductReviewsListingFilters;
}
