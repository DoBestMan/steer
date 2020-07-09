import { SiteCatalogFilterHeaderNullable } from './SiteCatalogFilterHeaderNullable';
import { SiteProductReviewsListingFilterItem } from './SiteProductReviewsListingFilterItem';

/**
 *
 * @export
 * @interface SiteProductReviewsListingFilterGroup
 */
export interface SiteProductReviewsListingFilterGroup {
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteProductReviewsListingFilterGroup
   */
  header: SiteCatalogFilterHeaderNullable | null;
  /**
   *
   * @type {Array<SiteProductReviewsListingFilterItem>}
   * @memberof SiteProductReviewsListingFilterGroup
   */
  items: Array<SiteProductReviewsListingFilterItem>;
}
