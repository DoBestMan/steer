/**
 * User location data, used for personalization
 */
export interface UserLocation {
  /**
   * City related to the entered ZIP code
   */
  cityName: string | null;

  /**
   * User global region
   */
  region: number | null;

  /**
   * State abbreviation to the entered ZIP code
   */
  stateAbbr: string | null;

  /**
   * User ZIP Code
   */
  zip: string | null;
}
