import { NextRouter } from 'next/router';

import { SiteProduct } from '~/data/models/SiteProduct';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

export interface RecirculationSize {
  label: string;
  url: string;
}

export function mapDataToRecirculationSize({
  siteProduct: { siteProductLineSizeDetail, siteProductLineRearSizeDetail },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
}): RecirculationSize | null {
  const {
    query: { tireSize, rearSize },
  } = router;

  if (!tireSize || !siteProductLineSizeDetail) {
    return null;
  }

  if (!rearSize || !siteProductLineRearSizeDetail) {
    return {
      label: ui('pdp.recirculation.searchForTireSize', {
        size: siteProductLineSizeDetail.size,
      }),
      url: interpolateRoute(ROUTE_MAP[ROUTES.TIRE_CATEGORY], {
        size: tireSize,
      }),
    };
  }

  return {
    label: ui('pdp.recirculation.searchForTireFrontRear', {
      size: siteProductLineSizeDetail.size,
      rear: siteProductLineRearSizeDetail.size,
    }),
    url: `${interpolateRoute(ROUTE_MAP[ROUTES.TIRE_CATEGORY], {
      size: tireSize,
    })}?rear=${rearSize}`,
  };
}
