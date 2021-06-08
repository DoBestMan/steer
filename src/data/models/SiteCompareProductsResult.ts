import { SiteCatalogProductItem } from './SiteCatalogProductItem';

/**
 *
 * @export
 * @interface SiteCompareProducts
 */
export interface SiteCompareProductsResult {
  /**
   *
   * @type {siteCatalogCompareList}
   * @memberof SiteCompareProducts
   */
  siteCatalogCompareList: Array<SiteCatalogProductItem>;
}
