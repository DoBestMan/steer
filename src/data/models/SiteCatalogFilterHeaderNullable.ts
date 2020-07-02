import { SiteCatalogFilterHeaderNullableInfoLink } from './SiteCatalogFilterHeaderNullableInfoLink';

/**
 * Header for a filter modal or filter group.
 * @export
 * @interface SiteCatalogFilterHeaderNullable
 */
export interface SiteCatalogFilterHeaderNullable {
  /**
   * Text for modal or group header
   * @type {string}
   * @memberof SiteCatalogFilterHeaderNullable
   */
  title: string;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullableInfoLink}
   * @memberof SiteCatalogFilterHeaderNullable
   */
  infoLink: SiteCatalogFilterHeaderNullableInfoLink | null;
}
