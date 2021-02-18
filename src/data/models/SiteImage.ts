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
   */
  src: string;

  /**
   * Discriminator when icons and images are used with oneOf
   */
  type: ICON_IMAGE_TYPE.IMAGE;

  /**
   * Width
   */
  width?: number;
}
