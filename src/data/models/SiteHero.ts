/**
 * Hero information for the homepage
 */
export interface SiteHero {
  /**
   * Hero body, below the title
   */
  body: string;

  /**
   * Optional eyebrow to display above the title, useful for promotions.
   */
  eyebrow: string | null;

  /**
   * Hero title
   */
  title: string;
}
