import { SiteLink } from './SiteLink';

/**
 * Optional CTA link for SEO purposes
 * @export
 * @interface SiteProductSpecsItemCta
 */
export interface SiteProductSpecsItemCta {
  /**
   *
   * @type {string}
   * @memberof SiteProductSpecsItemCta
   */
  label: string;
  /**
   *
   * @type {SiteLink}
   * @memberof SiteProductSpecsItemCta
   */
  link: SiteLink;
}
