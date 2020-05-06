import { UserLocation } from './UserLocation';

/**
 * User personalization data
 */
export interface UserPersonalization {
  /**
   * User Google Analytics Client ID
   */
  gaClientId: string | null;

  userLocation: UserLocation | null;
}
