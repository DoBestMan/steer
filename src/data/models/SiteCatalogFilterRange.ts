import { SiteCatalogFilterHeaderNullable } from './SiteCatalogFilterHeaderNullable';

/**
 * Filter which can apply a range from min and max values. It will be translated into a query like "id=currentMinValue,currentMaxValue".
 * @export
 * @interface SiteCatalogFilterRange
 */
export interface SiteCatalogFilterRange {
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterRange
   */
  type: SiteCatalogFilterRangeTypeEnum;
  /**
   * Values for param name on query
   * @type {string}
   * @memberof SiteCatalogFilterRange
   */
  id: string;
  /**
   *
   * @type {SiteCatalogFilterHeaderNullable}
   * @memberof SiteCatalogFilterRange
   */
  header: SiteCatalogFilterHeaderNullable | null;
  /**
   *
   * @type {string}
   * @memberof SiteCatalogFilterRange
   */
  unit: SiteCatalogFilterRangeUnitEnum;
  /**
   *
   * @type {number}
   * @memberof SiteCatalogFilterRange
   */
  minValue: number;
  /**
   *
   * @type {number}
   * @memberof SiteCatalogFilterRange
   */
  maxValue: number;
  /**
   *
   * @type {number}
   * @memberof SiteCatalogFilterRange
   */
  step: number;
  /**
   * First param value
   * @type {number}
   * @memberof SiteCatalogFilterRange
   */
  currentMinValue: number | null;
  /**
   * Second param value
   * @type {number}
   * @memberof SiteCatalogFilterRange
   */
  currentMaxValue: number | null;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterRangeTypeEnum {
  SiteCatalogFilterRange = 'SiteCatalogFilterRange',
}
/**
 * @export
 * @enum {string}
 */
export enum SiteCatalogFilterRangeUnitEnum {
  UnitMiles = 'UnitMiles',
  UnitUSD = 'UnitUSD',
}
