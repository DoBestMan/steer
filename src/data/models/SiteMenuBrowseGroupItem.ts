import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';

export type FlairType =
  | SiteIcon
  | SiteImage
  | {
      type: 'string';
      value: string;
    };

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
    flair: FlairType;

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
