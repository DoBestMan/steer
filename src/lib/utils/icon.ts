import { IconOrImage } from '~/data/models/IconOrImage';

export function isVehicleSvg(icon: IconOrImage) {
  return 'svgId' in icon && icon.svgId.includes('vehicle');
}
