import { SiteCatalogFilterHeaderNullable } from './SiteCatalogFilterHeaderNullable';
import { SiteCatalogFilterItem } from './SiteCatalogFilterItem';

/**
 * Items group selection.
 * @export
 * @interface SiteCatalogFilterGroup
 */
export interface SiteCatalogFilterGroup {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterGroup
   */
  groupType: SiteCatalogFilterGroupGroupTypeEnum;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteCatalogFilterGroup
   */
  header: SiteCatalogFilterHeaderNullable | null;
  /**
   *
   * @type {Array<SiteCatalogFilterItem>}
   * @memberof SiteCatalogFilterGroup
   */
  items: Array<SiteCatalogFilterItem>;
}
/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterGroupGroupTypeEnum {
  Checklist = 'Checklist',
  Radio = 'Radio',
}
