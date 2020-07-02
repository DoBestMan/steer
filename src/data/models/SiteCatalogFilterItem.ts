/**
 * Filter item selection.
 * @export
 * @interface SiteCatalogFilterItem
 */
export interface SiteCatalogFilterItem {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterItem
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterItem
   */
  flair: string | null;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterItem
   */
  description: string | null;
  /**
   *
   * @type {number}
   * @memberof SiteCatalogFilterItem
   */
  count?: number;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterItem
   */
  state: SiteCatalogFilterItemStateEnum;
  /**
   * Object containing query params for front-end to append to current URL as a link destination
   * @type {{ [key: string]: string; }}
   * @memberof SiteCatalogFilterItem
   */
  value: { [key: string]: string };
}

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterItemStateEnum {
  Disabled = 'Disabled',
  Normal = 'Normal',
  Selected = 'Selected',
}
