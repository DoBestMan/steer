import { useSearchContext } from '~/components/modules/Search/Search.context';
import { SiteIcon } from '~/data/models/SiteIcon';

import BillBoard from './BillBoard';

export interface BillboardProps {
  eyebrow?: string;
  icon?: SiteIcon;
  title: string;
}

export default function BillBoardContainer(props: BillboardProps) {
  const {
    lockSearchStateToBrand,
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    setIsSearchOpen,
  } = useSearchContext();

  const onVehicleCTAClick = () => {
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  };

  const onTireSizeCTAClick = () => {
    lockSearchStateToTireSize();
    setIsSearchOpen(true);
  };

  const onBrandCTAClick = () => {
    lockSearchStateToBrand();
    setIsSearchOpen(true);
  };

  return (
    <BillBoard
      {...props}
      onVehicleCTAClick={onVehicleCTAClick}
      onTireSizeCTAClick={onTireSizeCTAClick}
      onBrandCTAClick={onBrandCTAClick}
    />
  );
}
