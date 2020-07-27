import { NextRouter } from 'next/router';
import queryString from 'query-string';

import {
  Size,
  TechnicalSpecsProps,
} from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import {
  SiteCatalogProductImage,
  SiteCatalogProductImageProductImageTypeEnum,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteProduct } from '~/data/models/SiteProduct';
import { interpolateRoute } from '~/lib/utils/routes';
import { formatDollars, keyToCamel } from '~/lib/utils/string';

type QueryParams = Record<string, string>;

export function mapDataToTechnicalSpecs({
  siteProduct: {
    siteProductLine,
    siteProductSpecs,
    siteProductLineAvailableSizeList,
  },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
}): TechnicalSpecsProps | null {
  const {
    pathname,
    query: { brand, productLine, ...queryParams },
  } = router;
  const baseLink = interpolateRoute(pathname, { brand, productLine });

  const description = siteProductLine.overview || '';

  const treadOnlyImage = siteProductLine.assetList.find(
    (item) =>
      item.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
      item.productImageType ===
        SiteCatalogProductImageProductImageTypeEnum.Treadonly,
  ) as SiteCatalogProductImage;

  const specs = siteProductSpecs.map((item) => ({
    label: item.name,
    value: item.values,
    content: item.cta
      ? `${item.description}\n\n[${item.cta.label}](${item.cta.link.href})`
      : item.description,
  }));

  const tireRims = siteProductLineAvailableSizeList
    .map((item) => item.rim)
    .filter((item, index, array) => array.indexOf(item) === index);
  const sizes: Size[] = tireRims.map((rim) => {
    const tires = siteProductLineAvailableSizeList.filter(
      (item) => item.rim === rim,
    );

    return {
      label: `${rim}''`,
      options: tires.map((item) => {
        const itemQueryParams: QueryParams = {};

        Object.entries(item.siteQueryParams).map(([key, value]) => {
          if (typeof value === 'string') {
            itemQueryParams[keyToCamel(key)] = value;
          }
        });
        const querystring = queryString.stringify(
          Object.assign(queryParams, itemQueryParams),
        );
        const link = `${baseLink}#${querystring}`;

        return {
          label: `${item.size} ${item.loadSpeedRating}`,
          link,
          price: formatDollars(item.priceInCents),
          specs: item.specList,
        };
      }),
    };
  });

  if (!specs.length || !sizes.length) {
    return null;
  }

  return {
    description,
    image: treadOnlyImage && treadOnlyImage.image,
    sizes,
    specs,
  };
}
