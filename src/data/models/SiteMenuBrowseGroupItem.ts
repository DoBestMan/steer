import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';

/**
 * Group of browse links
 */
export interface SiteMenuBrowseGroupItem {
  header: {
    icon: SiteIcon | SiteImage | null;

    /**
     * Group display title
     */
    title: string;
  } | null;

  /**
   * List of displayed items
   */
  items: Array<{
    /**
     * Accent property for list item
     */
    flair: SiteIcon | SiteImage | object | null;

    icon: SiteIcon | SiteImage | null;
    /**
     * Item display text
     */
    label: string;

    link: SiteLink;
  }>;

  more: {
    label: string;

    link: SiteLink;
  } | null;
}
