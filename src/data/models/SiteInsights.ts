import { SiteInsightItemDefault } from './SiteInsightItemDefault';
import { SiteInsightItemList } from './SiteInsightItemList';

/**
 * Insights module data, used on the homepage.  **Note:** `link` property is expected to be added below `linkLabel` in the future.
 * @interface SiteInsights
 */
export interface SiteInsights {
  /**
   * Content text displayed below the title
   */
  body: string;

  /**
   * Link displayed below the body
   */
  linkLabel: string | null;

  /**
   * List of insights
   */

  siteInsightList: Array<SiteInsightItemDefault | SiteInsightItemList>;

  /**
   * Insights module title, displayed above or to the left of the insight list
   */
  title: string;
}
