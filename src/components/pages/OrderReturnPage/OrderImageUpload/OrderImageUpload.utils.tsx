import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
const CONSTANTS = {
  IMAGE_SIZE: 50,
  ALT_TEXT: 'N/A',
};

export function createSiteImage(imageFile: string) {
  const image = {
    altText: CONSTANTS.ALT_TEXT,
    height: CONSTANTS.IMAGE_SIZE,
    src: imageFile,
    type: ICON_IMAGE_TYPE.IMAGE,
    width: CONSTANTS.IMAGE_SIZE,
  } as SiteImage;
  return image;
}
