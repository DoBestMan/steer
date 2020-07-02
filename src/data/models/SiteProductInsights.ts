import { SiteProductInsightItem } from './SiteProductInsightItem';
import { SiteProductInsightsRebate } from './SiteProductInsightsRebate';

/**
 *
 * @export
 * @interface SiteProductInsights
 */
export interface SiteProductInsights {
  /**
   *
   * @type {Array<SiteProductInsightItem>}
   * @memberof SiteProductInsights
   */
  siteProductInsightList: Array<SiteProductInsightItem>;
  /**
   *
   * @type {SiteProductInsightsRebate}
   * @memberof SiteProductInsights
   */
  rebate: SiteProductInsightsRebate | null;
  /**
   * Description of delivery, localized when possible
   * @type {string}
   * @memberof SiteProductInsights
   */
  delivery: string;
}
