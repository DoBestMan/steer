import { SiteDynamicModal } from './SiteDynamicModal';
import { SitePromotion } from './SitePromotion';

/**
 *
 * @export
 * @interface SiteProductPromotion
 */
export interface SiteProductPromotion {
  /**
   *
   * @type {SitePromotion}
   * @memberof SiteProductPromotion
   */
  sitePromotion: SitePromotion;
  /**
   *
   * @type {SiteDynamicModal}
   * @memberof SiteProductPromotion
   */
  siteDynamicModal: SiteDynamicModal;
}
