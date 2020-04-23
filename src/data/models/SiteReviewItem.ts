import { SiteImage } from './SiteImage';

/**
 * SimpleTire website review, used on the homepage.
 */
export interface SiteReviewItem {
  /**
   *
   * @type {SiteImage}
   * @memberof SiteReviewItem
   */
  authorImage: SiteImage;

  /**
   * Name of the review author to display
   * @type {string}
   * @memberof SiteReviewItem
   */
  authorName: string;
  /**
   * Content of the review
   * @type {string}
   * @memberof SiteReviewItem
   */

  body: string;
  /**
   * Unique identifier
   * @type {string}
   * @memberof SiteReviewItem
   */
  id: string;

  /**
   * Title of the review
   * @type {string}
   * @memberof SiteReviewItem
   */
  title: string;
}
