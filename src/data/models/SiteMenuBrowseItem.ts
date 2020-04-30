import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteMenuBrowseGroupItem } from './SiteMenuBrowseGroupItem';

/**
 * Browse item in the site menu
 */
export interface SiteMenuBrowseItem {
  icon: SiteIcon | SiteImage | null;

  info: {
    body: string;
    title: string;
  } | null;

  /**
   * List of group items
   */
  siteMenuBrowseGroupList: Array<SiteMenuBrowseGroupItem>;

  /**
   * Item display text
   */
  title: string;
}
