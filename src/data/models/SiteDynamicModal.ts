import { SiteDynamicModalLink } from './SiteDynamicModalLink';
import { SiteImageNullable } from './SiteImageNullable';

/**
 * Dynamic content presented in the UI's modal template. Distinct from SiteStaticModal, which contains an ID corresponding to hardcoded UI content.
 * @export
 * @interface SiteDynamicModal
 */
export interface SiteDynamicModal {
  /**
   *
   * @type {string}
   * @memberof SiteDynamicModal
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof SiteDynamicModal
   */
  subtitle: string | null;
  /**
   * Modal content supporting Markdown lists and line breaks
   * @type {string}
   * @memberof SiteDynamicModal
   */
  content: string;
  /**
   *
   * @type {SiteImageNullable}
   * @memberof SiteDynamicModal
   */
  image: SiteImageNullable | null;
  /**
   *
   * @type {SiteDynamicModalLink}
   * @memberof SiteDynamicModal
   */
  link: SiteDynamicModalLink | null;
  /**
   * Indicates whether customer support information should be shown below modal content
   * @type {boolean}
   * @memberof SiteDynamicModal
   */
  showSupportSection: boolean;
  /**
   *
   * @type {string}
   * @memberof SiteDynamicModal
   */
  type: string;
}
