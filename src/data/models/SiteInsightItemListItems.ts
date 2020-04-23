import { SiteLink } from './SiteLink';
import { SiteIcon } from './SiteIcon';

export interface SiteInsightItemListItems {
  icon: SiteIcon;

  /**
   * Item display text
   */
  label: string;

  link: SiteLink;
}
