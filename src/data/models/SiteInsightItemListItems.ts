import { SiteLink } from './SiteLink';
import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';

export interface SiteInsightItemListItems {
  icon: SiteIcon | SiteImage;

  /**
   * Item display text
   */
  label: string;

  link: SiteLink;
}
