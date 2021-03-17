/**
 * Add a customer review for a product line.
 * @export
 * @interface SiteProductLineReviewItemInput
 */
export interface SiteProductLineReviewItemInput {
  /**
   *
   * @type {SiteProductPerformanceRatingObject}
   * @memberof SiteProductLineReviewItemInput
   */
  performanceRating: {
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    dry: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    wet: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    winter: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    comfort: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    noise: number | null;
    /**
     *
     * @type {number}
     * @memberof SiteProductPerformanceRatingObject
     */
    treadwear: number | null;
  };
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  additionalComments: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  name: string;
  /**
   * Format email@email.com
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  source: string;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  sourceURL: string;
  /**
   * Format MM/DD/YYYY
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  purchaseDate: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  vehicle: string;
  /**
   *
   * @type {SiteProductLineReviewItemInputAverageMilesDriven}
   * @memberof SiteProductLineReviewItemInput
   */
  averageMilesDriven: SiteProductLineReviewItemInputAverageMilesDriven;
  /**
   *
   * @type {SiteProductLineReviewItemInputDrivingStyle}
   * @memberof SiteProductLineReviewItemInput
   */
  drivingStyle: SiteProductLineReviewItemInputDrivingStyle;
  /**
   *
   * @type {SiteProductLineReviewItemInputDrivingLocation}
   * @memberof SiteProductLineReviewItemInput
   */
  drivingLocation: SiteProductLineReviewItemInputDrivingLocation;
  /**
   *
   * @type {boolean}
   * @memberof SiteProductLineReviewItemInput
   */
  wouldBuyAgain: boolean;
  /**
   *
   * @type {string}
   * @memberof SiteProductLineReviewItemInput
   */
  token: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductLineReviewItemInputAverageMilesDriven {
  Miles5000 = '5000',
  Miles9999 = '9999',
  Miles14999 = '14999',
  Miles19999 = '19999',
  Miles29999 = '29999',
  Miles39999 = '39999',
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductLineReviewItemInputDrivingStyle {
  Cautious = 'Cautious',
  Confident = 'Confident',
  Aggressive = 'Aggressive',
  Extreme = 'Extreme (racing)',
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductLineReviewItemInputDrivingLocation {
  AllHighway = 'All Highway',
  MostlyCity = 'Mostly City',
  CombinedHighwayCity = 'Combined Highway and City',
  TrackAutocross = 'Track and Autocross',
  RuralRoads = 'Rural Roads',
  OffRoad = 'Off-Road',
}
