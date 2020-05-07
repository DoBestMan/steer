import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';

export function isVehicleSvg(icon: SiteIcon | SiteImage) {
  return 'svgId' in icon && icon.svgId.includes('vehicle');
}
