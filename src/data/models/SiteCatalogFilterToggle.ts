import { FilterContentTypes } from '~/components/modules/Catalog/Filters/Filter.types';

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
  type: FilterContentTypes.SiteCatalogFilterToggle;
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
