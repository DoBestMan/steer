import { SiteInsightItemListItems } from './SiteInsightItemListItems';
import { SiteLink } from './SiteLink';

import { INSIGHT_TYPE } from '~/lib/backend/insights.types';

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

  more: {
    label: string;

    link: SiteLink;
  };

  title: string;

  /**
   * Discriminator when used with oneOf
   */
  type: INSIGHT_TYPE.LIST;
}
