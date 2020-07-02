import { SiteLink } from './SiteLink';

/**
 * Labeled resource link
 * @export
 * @interface SiteDynamicModalLink
 */
export interface SiteDynamicModalLink {
  /**
   *
   * @type {string}
   * @memberof SiteDynamicModalLink
   */
  label: string;
  /**
   *
   * @type {SiteLink}
   * @memberof SiteDynamicModalLink
   */
  link: SiteLink;
}
