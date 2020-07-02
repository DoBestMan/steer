/**
 * Sort-by item selection.
 * @export
 * @interface SiteCatalogSortListItem
 */
export interface SiteCatalogSortListItem {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogSortListItem
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogSortListItem
   */
  description: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogSortListItem
   */
  state: SiteCatalogSortListItemStateEnum;
  /**
   * Object containing query params for front-end to append to current URL as a link destination
   * @type {{ [key: string]: string; }}
   * @memberof SiteCatalogSortListItem
   */
  value: { [key: string]: string };
}

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogSortListItemStateEnum {
  Disabled = 'Disabled',
  Normal = 'Normal',
  Selected = 'Selected',
}
