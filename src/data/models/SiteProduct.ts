import { SiteCatalogProductGroupList } from './SiteCatalogProductGroupList';
import { SiteProductInsights } from './SiteProductInsights';
import { SiteProductInstallation } from './SiteProductInstallation';
import { SiteProductLine } from './SiteProductLine';
import { SiteProductLineAvailableSizeItem } from './SiteProductLineAvailableSizeItem';
import { SiteProductLineSizeDetail } from './SiteProductLineSizeDetail';
import { SiteProductPromotion } from './SiteProductPromotion';
import { SiteProductSpecsItem } from './SiteProductSpecsItem';

/**
 *
 * @export
 * @interface SiteProduct
 */
export interface SiteProduct {
  /**
   *
   * @type {SiteProductLine}
   * @memberof SiteProduct
   */
  siteProductLine: SiteProductLine;
  /**
   *
   * @type {Array<SiteProductLineAvailableSizeItem>}
   * @memberof SiteProduct
   */
  siteProductLineAvailableSizeList: Array<SiteProductLineAvailableSizeItem>;
  /**
   *
   * @type {SiteProductLineSizeDetail}
   * @memberof SiteProduct
   */
  siteProductLineSizeDetail: SiteProductLineSizeDetail | null;
  /**
   *
   * @type {SiteProductLineSizeDetail}
   * @memberof SiteProduct
   */
  siteProductLineRearSizeDetail: SiteProductLineSizeDetail | null;
  /**
   *
   * @type {SiteProductInstallation}
   * @memberof SiteProduct
   */
  siteProductInstallation: SiteProductInstallation | null;
  /**
   *
   * @type {Array<SiteProductPromotion>}
   * @memberof SiteProduct
   */
  siteProductPromotions: Array<SiteProductPromotion>;
  /**
   * List of curated catalog results. Optionally links to catalog page with more products.
   * @type {Array<object>}
   * @memberof SiteProduct
   */
  siteProductRecirculation: SiteCatalogProductGroupList;
  /**
   * Technical specs for products
   * @type {Array<SiteProductSpecsItem>}
   * @memberof SiteProduct
   */
  siteProductSpecs: Array<SiteProductSpecsItem>;
  /**
   *
   * @type {SiteProductInsights}
   * @memberof SiteProduct
   */
  siteProductInsights: SiteProductInsights;
}
