import { SiteInsightItemListItems } from './SiteInsightItemListItems';
import { SiteLink } from './SiteLink';

/**
 * Insight item, list of links style, used on the homepage.
 */
export interface SiteInsightItemList {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * List of displayed items
   */
  items: Array<SiteInsightItemListItems>;

  moreLink: SiteLink;

  moreLinkLabel: string;

  title: string;

  /**
   * Discriminator when used with oneOf
   */
  type: 'SiteInsightItemList';
}
