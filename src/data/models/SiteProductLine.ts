import { SiteCatalogBrand } from './SiteCatalogBrand';
import { SiteCatalogProductImage } from './SiteCatalogProductImage';
import { SiteProductLineFaqList } from './SiteProductLineFaqList';
import { SiteYouTubeVideo } from './SiteYouTubeVideo';
/**
 * Data for product line (not specific to a size)
 * @export
 * @interface SiteProductLine
 */
export interface SiteProductLine {
  /**
   *
   * @type {string}
   * @memberof SiteProductLine
   */
  name: string;
  /**
   *
   * @type {SiteCatalogBrand}
   * @memberof SiteProductLine
   */
  brand: SiteCatalogBrand;
  /**
   *
   * @type {Array<SiteCatalogProductImage | SiteYouTubeVideo>}
   * @memberof SiteProductLine
   */
  assetList: Array<SiteCatalogProductImage | SiteYouTubeVideo>;
  /**
   * Starting price of product line
   * @type {string}
   * @memberof SiteProductLine
   */
  startingPriceInCents: string;
  /**
   * Long description about the product line
   * @type {string}
   * @memberof SiteProductLine
   */
  overview: string;
  /**
   *
   * @type {Array<SiteProductLineFaqList>}
   * @memberof SiteProductLine
   */
  faqList: Array<SiteProductLineFaqList>;
  /**
   * Has been renamed to assetList
   * @type {Array<object>}
   * @memberof SiteProductLine
   */
  imageList?: Array<object>;
}
