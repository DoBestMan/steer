/**
 * Update payload for user personalization
 */
export interface UserPersonalizationUpdate {
  /**
   * User Google Analytics Client ID
   */
  gaClientId?: string | null;

  /**
   * User Google Places ID
   */
  userLocationGooglePlacesId?: string | null;

  /**
   * User ZIP Code
   */
  userLocationZip?: string | null;

  /**
   * User ZIP Code
   */
  regionId?: string | null;
}
