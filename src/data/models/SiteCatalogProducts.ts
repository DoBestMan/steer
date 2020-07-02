import { ListResultMetadata } from './ListResultMetadata';
import { SiteCatalogFilters } from './SiteCatalogFilters';
import { SiteCatalogProductGroup } from './SiteCatalogProductGroupList';
import { SiteCatalogProductItem } from './SiteCatalogProductItem';
import { SiteCatalogProductsMeta } from './SiteCatalogProductsMeta';

/**
 * Catalog endpoint hit on initial page visit, filter/category select, pagination
 * @export
 * @interface SiteCatalogProducts
 */
export interface SiteCatalogProducts {
  /**
   *
   * @type {Array}
   * @memberof SiteCatalogProducts
   */
  siteCatalogProductsResultList: Array<
    SiteCatalogProductGroup | SiteCatalogProductItem
  >;
  /**
   *
   * @type {ListResultMetadata}
   * @memberof SiteCatalogProducts
   */
  listResultMetadata: ListResultMetadata;
  /**
   *
   * @type {SiteCatalogProductsMeta}
   * @memberof SiteCatalogProducts
   */
  siteCatalogProductsMeta: SiteCatalogProductsMeta;
  /**
   *
   * @type {SiteCatalogFilters}
   * @memberof SiteCatalogProducts
   */
  siteCatalogFilters: SiteCatalogFilters;
}
