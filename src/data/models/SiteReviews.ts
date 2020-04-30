import { SiteIcon } from './SiteIcon';
import { SiteLink } from './SiteLink';
import { SiteReviewItem } from './SiteReviewItem';

/**
 * SimpleTire website reviews module, used on the homepage.
 */
export interface SiteReviews {
  /**
   * Content text displayed below the rating label
   */
  body: string;

  link: SiteLink;

  /**
   * Text for the link displayed below the body
   */
  linkLabel: string;

  /**
   * Text displayed below the rating stars
   */
  ratingLabel: string;

  ratingLabelIcon: SiteIcon | null;

  /**
   * Average rating stars, displayed below the module title
   */
  ratingStars: number;

  /**
   * List of website reviews
   */
  siteReviewList: Array<SiteReviewItem>;

  /**
   * Module title, displayed above or to the left of the reviews list
   */
  title: string;
}
