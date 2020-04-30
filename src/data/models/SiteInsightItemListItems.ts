import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';

export interface SiteInsightItemListItems {
  icon: SiteIcon | SiteImage;

  /**
   * Item display text
   */
  label: string;

  link: SiteLink;
}
