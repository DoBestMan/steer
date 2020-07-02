import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';

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
  icon: SiteImage | SiteIcon;
  /**
   *
   * @type {string}
   * @memberof SiteProductInsightItem
   */
  sectionAnchor: string | null;
}
