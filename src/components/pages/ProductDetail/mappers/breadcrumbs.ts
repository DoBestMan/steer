import { NextRouter } from 'next/router';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { SiteProduct } from '~/data/models/SiteProduct';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';

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
  const { asPath, pathname, query } = router;
  const tireSizeLabel =
    siteProductLineSizeDetail &&
    `${siteProductLineSizeDetail.size} ${siteProductLineSizeDetail.loadSpeedRating}`;
  const rearSizeLabel =
    siteProductLineRearSizeDetail &&
    `${siteProductLineRearSizeDetail.size} ${siteProductLineRearSizeDetail.loadSpeedRating}`;

  return mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brandName: siteProductLine.brand.label,
      productLine: siteProductLine.name,
    },
    pathname,
    query,
    querystringNodeLabel:
      tireSizeLabel &&
      [tireSizeLabel, rearSizeLabel].filter(Boolean).join(' & '),
  });
}
