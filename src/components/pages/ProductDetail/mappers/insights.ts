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
  const handleOpenRebate = () => {};

  return {
    delivery: siteProductInsights.delivery,
    doesItFit,
    handleChangeVehicle,
    handleOpenRebate,
    insightItems: siteProductInsights.siteProductInsightList,
    rebateLabel: siteProductInsights.rebate?.label,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}
