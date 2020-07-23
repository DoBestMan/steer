import { SiteCatalogSortListItem } from './SiteCatalogSortListItem';
import { SiteProductReviewsListingFilter } from './SiteProductReviewsListingFilter';

/**
 *
 * @export
 * @interface SiteProductReviewsListingFilters
 */
export interface SiteProductReviewsListingFilters {
  /**
   *
   * @type {Array<SiteProductReviewsListingFilter>}
   * @memberof SiteProductReviewsListingFilters
   */
  filtersList: Array<SiteProductReviewsListingFilter>;
  /**
   *
   * @type {Array<SiteCatalogSortListItem>}
   * @memberof SiteProductReviewsListingFilters
   */
  sortList: Array<SiteCatalogSortListItem>;
}
