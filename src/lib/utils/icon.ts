import { IconOrImage } from '~/data/models/IconOrImage';

import { ICON_IMAGE_TYPE } from '../backend/icon-image.types';

export function isVehicleSvg(icon: IconOrImage) {
  return icon.type === ICON_IMAGE_TYPE.ICON && icon.svgId.includes('vehicle');
}
