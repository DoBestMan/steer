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
   * Optional end date-time for a countdown inside the eyebrow
   */
  eyebrowCountdownEnd: Date | null;

  /**
   * Type of scenery, supported by the front-end
   */
  sceneryType: string | null;

  /**
   * Hero title
   */
  title: string;

  /**
   * Type of vehicle, supported by the front-end
   */
  vehicleType: string | null;

  /**
   * Type of the current weather
   */
  weatherType: string | null;
}
