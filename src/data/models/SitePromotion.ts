import { SiteIcon } from './SiteIcon';

/**
 *
 * @export
 * @interface SitePromotion
 */
export interface SitePromotion {
  /**
   *
   * @type {string}
   * @memberof SitePromotion
   */
  label: string;
  /**
   *
   * @type {SiteIcon}
   * @memberof SitePromotion
   */
  icon: SiteIcon;
  /**
   *
   * @type {string}
   * @memberof SitePromotion
   */
  style: SitePromotionStyleEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SitePromotionStyleEnum {
  SitePromotionItemDefault = 'SitePromotionItemDefault',
  SitePromotionItemBlackPill = 'SitePromotionItemBlackPill',
  SitePromotionItemWhitePill = 'SitePromotionItemWhitePill',
  SitePromotionItemOrangePill = 'SitePromotionItemOrangePill',
}
