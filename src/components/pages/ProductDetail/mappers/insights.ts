import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { SiteProduct } from '~/data/models/SiteProduct';

import { CONSTANTS } from '../ProductDetail.hooks';

export function mapDataToInsights({
  siteProduct: { siteProductInsights },
}: {
  siteProduct: SiteProduct;
}): Omit<InsightsProps, 'handleChangeLocation'> {
  // TOOD: Integrate fits your vehicle functionality
  const doesItFit = false;

  // TODO: Add handlers
  const handleChangeVehicle = () => {};

  return {
    delivery: siteProductInsights.delivery,
    doesItFit,
    handleChangeVehicle,
    insightItems: siteProductInsights.siteProductInsightList,
    rebate: siteProductInsights.rebate,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}
