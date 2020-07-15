import { NextRouter } from 'next/router';

import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { SiteProduct } from '~/data/models/SiteProduct';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';

import { CONSTANTS } from '../ProductDetail.hooks';

export function mapDataToInsights({
  router: { query },
  siteProduct: { siteProductInsights, siteProductLineAvailableSizeList },
  vehicleMetadata,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
  vehicleMetadata?: VehicleMetadata;
}): Omit<InsightsProps, 'handleChangeLocation'> {
  const tireSize = query?.tireSize;
  const rearSize = query?.rearSize;
  const showFitBar = !!tireSize;
  const sizeProps = tireSize
    ? siteProductLineAvailableSizeList.find(
        (item) => item.siteQueryParams.tireSize === tireSize,
      )
    : null;
  const rearProps = rearSize
    ? siteProductLineAvailableSizeList.find((item) => item.size === rearSize)
    : null;
  const doesItFit = sizeProps
    ? sizeProps.isFitForCurrentVehicle &&
      (!rearProps || rearProps?.isFitForCurrentVehicle)
    : null;

  // TODO: Add handlers
  const handleChangeVehicle = () => {};

  return {
    delivery: siteProductInsights.delivery,
    doesItFit,
    handleChangeVehicle,
    insightItems: siteProductInsights.siteProductInsightList,
    rebate: siteProductInsights.rebate,
    showFitBar,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
    vehicle: vehicleMetadata
      ? `${vehicleMetadata.vehicleMake} ${vehicleMetadata.vehicleModel} ${vehicleMetadata.vehicleYear} ${vehicleMetadata.vehicleTrim}`
      : null,
  };
}
