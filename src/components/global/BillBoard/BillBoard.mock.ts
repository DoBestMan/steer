import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { BillboardProps } from './BillBoard.types';

const billBoard: BillboardProps = {
  eyebrow: 'Search By',
  icon: {
    svgId: ICONS.TIRE,
    type: ICON_IMAGE_TYPE.ICON,
  },
  onBrandCTAClick: () => {},
  onTireSizeCTAClick: () => {},
  onVehicleCTAClick: () => {},
  title: 'Ready to find the perfect tires?',
};

export default billBoard;
