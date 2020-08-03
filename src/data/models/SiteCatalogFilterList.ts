import { FilterContentTypes } from '~/components/modules/Catalog/Filters/Filter.types';

import { SiteCatalogFilterGroup } from './SiteCatalogFilterGroup';
import { SiteCatalogFilterHeaderNullable } from './SiteCatalogFilterHeaderNullable';

/**
 * Filter list with one or more filter groups.
 * @export
 * @interface SiteCatalogFilterList
 */
export interface SiteCatalogFilterList {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterList
   */
  type: FilterContentTypes.SiteCatalogFilterList;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteCatalogFilterList
   */
  header: SiteCatalogFilterHeaderNullable | null;
  /**
   * Defines how this list would be presented
   * @type {string}
   * @memberof SiteCatalogFilterList
   */
  presentationStyle: SiteCatalogFilterListPresentationStyleEnum;
  /**
   *
   * @type {Array<SiteCatalogFilterGroup>}
   * @memberof SiteCatalogFilterList
   */
  filterGroups: Array<SiteCatalogFilterGroup>;
}

/**
 * @export
 * @enum {string}
 */

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterListPresentationStyleEnum {
  Large = 'Large',
  Normal = 'Normal',
}
