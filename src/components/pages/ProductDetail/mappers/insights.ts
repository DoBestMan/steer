import { NextRouter } from 'next/router';

import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { SIZE_CHECK_STATES } from '~/components/modules/PDP/Insights/Insights.types';
import { SearchContextProps } from '~/components/modules/Search/Search.context';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';

import { CONSTANTS } from '../ProductDetail.hooks';

function getSizeCheckState({
  rearSize,
  siteProductLineAvailableSizeList,
  tireSize,
  vehicle,
}: {
  rearSize?: string | string[];
  siteProductLineAvailableSizeList: SiteProductLineAvailableSizeItem[];
  tireSize?: string | string[];
  vehicle?: VehicleMetadata | null;
}) {
  const sizeProps = tireSize
    ? siteProductLineAvailableSizeList.find(
        (item) => item.siteQueryParams.tireSize === tireSize,
      )
    : null;
  const rearProps = rearSize
    ? siteProductLineAvailableSizeList.find((item) => item.size === rearSize)
    : null;

  if (!tireSize || !vehicle) {
    return SIZE_CHECK_STATES.UNKNOWN;
  }

  const doesItFit =
    sizeProps?.isFitForCurrentVehicle &&
    (!rearProps || rearProps?.isFitForCurrentVehicle);

  if (doesItFit) {
    return SIZE_CHECK_STATES.SIZE_FITS;
  }

  const hasSizeThatFits = siteProductLineAvailableSizeList.some(
    (item) => item.isFitForCurrentVehicle,
  );

  if (!hasSizeThatFits) {
    return SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT;
  }

  return SIZE_CHECK_STATES.DOES_NOT_FIT;
}

export function mapDataToInsights({
  router: { query },
  search: {
    lockSearchStateToVehicle,
    setIsSearchOpen,
    setShouldPreventLinkNavigation,
  },
  siteProduct: {
    siteProductInsights,
    siteProductLineAvailableSizeList,
    siteProductLineSizeDetail,
  },
  userPersonalization,
}: {
  router: NextRouter;
  search: SearchContextProps;
  siteProduct: SiteProduct;
  userPersonalization: UserPersonalizationProps;
}): Omit<InsightsProps, 'handleChangeLocation'> {
  const { vehicle, unselectVehicle } = userPersonalization;
  const tireSize = query?.tireSize;
  const rearSize = query?.rearSize;
  const showFitBar = !!tireSize && !!siteProductLineSizeDetail;
  const sizeCheckState = getSizeCheckState({
    rearSize,
    siteProductLineAvailableSizeList,
    tireSize,
    vehicle,
  });

  const onSearchVehicle = () => {
    lockSearchStateToVehicle();
    setShouldPreventLinkNavigation(true);

    setIsSearchOpen(true);
  };

  return {
    delivery: siteProductInsights.delivery,
    insightItems: siteProductInsights.siteProductInsightList,
    onSearchVehicle,
    onUnselectVehicle: unselectVehicle,
    rebate: siteProductInsights.rebate,
    showFitBar,
    sizeCheckState,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
    vehicle: vehicle
      ? `${vehicle.vehicleMake} ${vehicle.vehicleModel} ${vehicle.vehicleYear} ${vehicle.vehicleTrim}`
      : null,
  };
}
