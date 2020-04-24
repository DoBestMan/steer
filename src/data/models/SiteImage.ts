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
   * HTML `img` [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) attribute
   */
  srcSet: string;

  /**
   * Discriminator when icons and images are used with oneOf
   */
  type: ICON_IMAGE_TYPE.IMAGE;
}
