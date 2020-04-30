import { INSIGHT_TYPE } from '~/lib/backend/insights.types';

import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';
import { SiteLink } from './SiteLink';

/**
 * Insight item, default style, used on the homepage.
 */
export interface SiteInsightItemDefault {
  body: string;

  eyebrow: string | null;

  eyebrowIcon: SiteIcon | null;

  /**
   * Figures to be displayed on the left of the text. Overlapped at the client-side if more than one provided.
   */
  figures: Array<
    | SiteIcon
    | SiteImage
    | {
        type: 'string';
        value: string;
      }
  > | null;

  /**
   * Unique identifier
   * @type {string}
   * @memberof SiteInsightItemDefault
   */
  id: string;

  link: SiteLink;

  linkLabel: string;

  title: string;

  /**
   * Discriminator when used with oneOf
   */
  type: INSIGHT_TYPE.DEFAULT;
}
