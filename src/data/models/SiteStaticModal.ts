/**
 * Content information for showing a static modal.
 * @export
 * @interface SiteStaticModal
 */
export interface SiteStaticModal {
  /**
   *
   * @type {string}
   * @memberof SiteStaticModal
   */
  type: SiteStaticModalTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SiteStaticModal
   */
  contentId: string;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteStaticModalTypeEnum {
  SiteStaticModal = 'SiteStaticModal',
}
