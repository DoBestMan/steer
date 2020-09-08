import { NextRouter } from 'next/router';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { SiteProduct } from '~/data/models/SiteProduct';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { appendTiresToString } from '~/lib/utils/string';

export function mapDataToBreadcrumbs({
  siteProduct: {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
  },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
}): BreadcrumbsItem[] {
  const { asPath, query } = router;

  // Force as a string
  let brand = query.brand as string;

  // Make sure 'brand' includes '-tires'
  if (!brand.match(/-tires$/)) {
    brand = appendTiresToString(brand);
  }

  const finalQuery = {
    ...query,
    ...{
      brand,
    },
  };

  const tireSizeLabel =
    siteProductLineSizeDetail &&
    `${siteProductLineSizeDetail.size} ${siteProductLineSizeDetail.loadSpeedRating}`;
  const rearSizeLabel =
    siteProductLineRearSizeDetail &&
    `${siteProductLineRearSizeDetail.size} ${siteProductLineRearSizeDetail.loadSpeedRating}`;

  return mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brand: siteProductLine.brand.label,
      productLine: siteProductLine.name,
    },
    pathname: ROUTE_MAP[ROUTES.PRODUCT_DETAIL],
    query: finalQuery,
    querystringNodeLabel:
      tireSizeLabel &&
      [tireSizeLabel, rearSizeLabel].filter(Boolean).join(' + '),
  });
}
