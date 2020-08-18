import { NextRouter } from 'next/router';

import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { SIZE_CHECK_STATES } from '~/components/modules/PDP/Insights/Insights.types';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';

import { ProductDetailContextProps } from '../ProductDetail.context';
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
  const doesFitTireLine =
    !!vehicle &&
    siteProductLineAvailableSizeList.some(
      (item) => item.isFitForCurrentVehicle,
    );
  const sizeProps = tireSize
    ? siteProductLineAvailableSizeList.find(
        (item) => item.siteQueryParams.tireSize === tireSize,
      )
    : null;
  const rearProps = rearSize
    ? siteProductLineAvailableSizeList.find((item) => item.size === rearSize)
    : null;

  if (tireSize && !vehicle) {
    return SIZE_CHECK_STATES.UNKNOWN;
  }

  if (!tireSize && doesFitTireLine) {
    return SIZE_CHECK_STATES.TIRE_LINE_FITS;
  }

  if (!tireSize && !doesFitTireLine) {
    return SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT;
  }

  const doesItFit =
    sizeProps?.isFitForCurrentVehicle &&
    (!rearProps || rearProps?.isFitForCurrentVehicle);

  if (doesItFit) {
    return SIZE_CHECK_STATES.SIZE_FITS;
  }

  if (!doesFitTireLine) {
    return SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT;
  }

  return SIZE_CHECK_STATES.DOES_NOT_FIT;
}

export function mapDataToInsights({
  isLoadingData,
  productDetail,
  rearSize,
  router,
  siteProduct: {
    siteProductInsights,
    siteProductLineAvailableSizeList,
    siteProductLineSizeDetail,
  },
  tireSize,
  userPersonalization,
}: {
  isLoadingData: boolean;
  productDetail: ProductDetailContextProps;
  rearSize?: string;
  router: NextRouter;
  siteProduct: SiteProduct;
  tireSize?: string;
  userPersonalization: UserPersonalizationProps;
}): Omit<InsightsProps, 'handleChangeLocation'> {
  const { changeSize } = productDetail;
  const { vehicle, unselectVehicle } = userPersonalization;
  const hasVehicle =
    !!vehicle &&
    !!Object.keys(vehicle)?.length &&
    vehicle.constructor === Object;
  const showFitBar =
    (!!tireSize && !!siteProductLineSizeDetail) ||
    (hasVehicle && !isLoadingData);
  const sizeCheckState = getSizeCheckState({
    rearSize,
    siteProductLineAvailableSizeList,
    tireSize,
    vehicle: hasVehicle ? vehicle : null,
  });
  const insightItems = siteProductInsights.siteProductInsightList.map(
    (item) => ({
      ...item,
      label: item.label.replace(/([\\]+n)|↵/g, '\n'),
    }),
  );

  const onSelectAvailableOption = () => {
    const firstAvailableSize = siteProductLineAvailableSizeList.findIndex(
      (item) => item.isFitForCurrentVehicle,
    );

    if (firstAvailableSize === -1) {
      return;
    }

    changeSize(firstAvailableSize);
  };

  const onFindTiresThatFit = () => {
    if (!vehicle) {
      return;
    }

    const interpolatedRoute = interpolateRoute(
      ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
      {
        make: vehicle.vehicleMake,
        model: vehicle.vehicleModel,
        year: vehicle.vehicleYear,
      },
    );

    router
      .push(
        ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
        `${interpolatedRoute}?trim=${vehicle.vehicleTrim}`,
      )
      .then(() => window.scrollTo(0, 0));
  };

  return {
    delivery: siteProductInsights.delivery,
    insightItems,
    make: vehicle?.vehicleMake,
    onFindTiresThatFit,
    onSelectAvailableOption,
    onUnselectVehicle: unselectVehicle,
    rebate: siteProductInsights.rebate,
    showFitBar,
    sizeCheckState,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
    vehicle: hasVehicle
      ? `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`
      : null,
  };
}
