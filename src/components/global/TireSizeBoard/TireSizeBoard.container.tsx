import TireSizeBoard from '~/components/global/TireSizeBoard/TireSizeBoard';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
export interface TireSizeBoardContainerProps {
  params: Record<string, string>;
  title: string;
}
export default function TireSizeBoardContainer({
  title,
  params,
}: TireSizeBoardContainerProps) {
  const {
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
    setRouteQueryParamOptions,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const onVehicleInfoCTAClick = () => {
    setRouteQueryParamOptions({
      routes: [ROUTE_MAP[ROUTES.VEHICLE_CATALOG]],
      params,
    });
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  };
  const onTireSizeCTAClick = () => {
    setRouteQueryParamOptions({
      routes: [ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY]],
      params,
    });
    lockSearchStateToTireSize();
    setIsSearchOpen(true);
  };
  return (
    <TireSizeBoard
      tireSizeBoardTitle={title}
      onVehicleInfoCTAClick={onVehicleInfoCTAClick}
      onTireSizeCTAClick={onTireSizeCTAClick}
    />
  );
}
