import { SiteCatalogFilter } from './SiteCatalogFilter';
import { SiteCatalogSortListItem } from './SiteCatalogSortListItem';

/**
 * Groups available filters and sort list for a catalog.
 * @export
 * @interface SiteCatalogFilters
 */
export interface SiteCatalogFilters {
  /**
   *
   * @type {Array<SiteCatalogFilter>}
   * @memberof SiteCatalogFilters
   */
  filtersList: Array<SiteCatalogFilter>;
  /**
   * Entries for sorting selection
   * @type {Array<SiteCatalogSortListItem>}
   * @memberof SiteCatalogFilters
   */
  sortList: Array<SiteCatalogSortListItem>;
  /**
   * Number of items matched with this filter
   * @type {number}
   * @memberof SiteCatalogFilters
   */
  totalMatches: number;
}
