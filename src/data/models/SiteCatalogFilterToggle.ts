import { SiteCatalogFilterItem } from './SiteCatalogFilterItem';

/**
 * Toggle filter.
 * @export
 * @interface SiteCatalogFilterToggle
 */
export interface SiteCatalogFilterToggle {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterToggle
   */
  type: SiteCatalogFilterToggleTypeEnum;
  /**
   *
   * @type {SiteCatalogFilterItem}
   * @memberof SiteCatalogFilterToggle
   */
  item: SiteCatalogFilterItem;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterToggleTypeEnum {
  SiteCatalogFilterToggle = 'SiteCatalogFilterToggle',
}
