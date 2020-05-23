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
   * Type of scenery, supported by the front-end
   */
  sceneryType: string | null;

  /**
   * Hero title
   */
  title: string;

  /**
   * Vehicle types: List of Cars
   */
  vehicleTypes: Array<string>;

  /**
   * Type of the current weather
   */
  weatherType: string | null;
}
