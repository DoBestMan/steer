/**
 * A local site link, or an external link.
 */
export interface SiteLink {
  /**
   * Link HREF, can be an complete URL, or just the pathname and query string to enable client-side navigation
   */
  href: string;

  /**
   * Opens the link on a new window and prevents SEO following
   */
  isExternal: boolean;
}
