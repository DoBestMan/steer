import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

/**
 * General image implementation for the site
 */
export interface SiteImage {
  /**
   * Alternative text that describes the content of this image. Required for images that have no caption surrounding them.
   */
  altText: string;

  /**
   * Height
   */
  height?: number;

  /**
   * HTML `img` src
   * TODO: When final endpoints added `src` on Siteimage, make src mandatory (remove '?')
   */
  src?: string;

  /**
   * HTML `img` [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) attribute
   * TODO: When final endpoints removed `srcset` on Siteimage, remove `srcset` from here
   */
  srcSet?: string;

  /**
   * Discriminator when icons and images are used with oneOf
   */
  type: ICON_IMAGE_TYPE.IMAGE;

  /**
   * Width
   */
  width?: number;
}
