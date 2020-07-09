import { SiteCatalogFilterHeaderNullable } from './SiteCatalogFilterHeaderNullable';
import { SiteProductReviewsListingFilterGroup } from './SiteProductReviewsListingFilterGroup';

/**
 *
 * @export
 * @interface SiteProductReviewsListingFilter
 */
export interface SiteProductReviewsListingFilter {
  /**
   *
   * @type string
   * @memberof SiteProductReviewsListingFilter
   */
  id: string;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteProductReviewsListingFilter
   */
  header: SiteCatalogFilterHeaderNullable | null;
  /**
   *
   * @type {Array<SiteProductReviewsListingFilterGroup>}
   * @memberof SiteProductReviewsListingFilter
   */
  filterGroups: Array<SiteProductReviewsListingFilterGroup>;
}
