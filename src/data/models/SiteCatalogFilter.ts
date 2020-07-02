import { SiteCatalogFilterList } from './SiteCatalogFilterList';
import { SiteCatalogFilterRange } from './SiteCatalogFilterRange';
import { SiteCatalogFilterToggle } from './SiteCatalogFilterToggle';

/**
 * @type SiteCatalogFilter
 * Union type for catalog filter.
 * @export
 */
export type SiteCatalogFilter =
  | SiteCatalogFilterList
  | SiteCatalogFilterRange
  | SiteCatalogFilterToggle;
