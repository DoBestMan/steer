import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export interface SiteIcon {
  /**
   * Front-end specific ID that defines which SVG to load and display
   */
  svgId: IconType;

  /**
   * Discriminator when icons and images are used with oneOf
   */
  type: ICON_IMAGE_TYPE.ICON;

  /**
   * Determines if icon should be loaded server side
   */
  ssr?: boolean;
}

export function isSiteIcon(arg: SiteIcon): arg is SiteIcon {
  return arg && typeof arg === 'object' && !!arg.svgId;
}
