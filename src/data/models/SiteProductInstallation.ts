import { SiteProductInstallationInstallationMeta } from './SiteProductInstallationInstallationMeta';

/**
 * Installation availability for current product size and location
 * @export
 * @interface SiteProductInstallation
 */
export interface SiteProductInstallation {
  /**
   *
   * @type {string}
   * @memberof SiteProductInstallation
   */
  status: SiteProductInstallationStatusEnum;
  /**
   *
   * @type {SiteProductInstallationInstallationMeta}
   * @memberof SiteProductInstallation
   */
  installationMeta: SiteProductInstallationInstallationMeta | null;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteProductInstallationStatusEnum {
  SiteProductInstallationAvailable = 'SiteProductInstallationAvailable',
  SiteProductInstallationUnavailable = 'SiteProductInstallationUnavailable',
}
