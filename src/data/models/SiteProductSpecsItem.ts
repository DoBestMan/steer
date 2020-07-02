import { SiteProductSpecsItemCta } from './SiteProductSpecsItemCta';

/**
 * One instance of technical specs
 * @export
 * @interface SiteProductSpecsItem
 */
export interface SiteProductSpecsItem {
  /**
   *
   * @type {string}
   * @memberof SiteProductSpecsItem
   */
  name: string;
  /**
   *
   * @type {Array<string>}
   * @memberof SiteProductSpecsItem
   */
  values: Array<string>;
  /**
   *
   * @type {string}
   * @memberof SiteProductSpecsItem
   */
  description: string | null;
  /**
   *
   * @type {SiteProductSpecsItemCta}
   * @memberof SiteProductSpecsItem
   */
  cta?: SiteProductSpecsItemCta | null;
}
