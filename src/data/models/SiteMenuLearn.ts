import { SiteLink } from './SiteLink';

export interface SiteMenuLearn {
  /**
   * List of links of resources
   */
  list: Array<{
    /**
     * Link display text
     */
    label: string;

    link: SiteLink;
  }>;
}
