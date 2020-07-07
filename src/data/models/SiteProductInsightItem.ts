import { IconOrImage } from './IconOrImage';

/**
 *
 * @export
 * @interface SiteProductInsightItem
 */
export interface SiteProductInsightItem {
  /**
   * Display text supporting line breaks
   * @type {string}
   * @memberof SiteProductInsightItem
   */
  label: string;
  /**
   *
   * @type {SiteImage | SiteIcon}
   * @memberof SiteProductInsightItem
   */
  icon: IconOrImage;
  /**
   *
   * @type {string}
   * @memberof SiteProductInsightItem
   */
  sectionAnchor: string | null;
}
