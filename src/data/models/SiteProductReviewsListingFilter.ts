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
   * @type SiteProductLineReviewsListingFilterType
   * @memberof SiteProductReviewsListingFilter
   */
  id: SiteProductLineReviewsListingFilterType;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteProductReviewsListingFilter
   */
  header: SiteCatalogFilterHeaderNullable;
  /**
   *
   * @type {Array<SiteProductReviewsListingFilterGroup>}
   * @memberof SiteProductReviewsListingFilter
   */
  filterGroups: Array<SiteProductReviewsListingFilterGroup>;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductLineReviewsListingFilterType {
  Brand = 'brand',
  TireCategory = 'tireCategory',
  TireType = 'tireType',
}
