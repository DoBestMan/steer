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
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import {
  appendTiresToString,
  formatDollars,
  keyToCamel,
} from '~/lib/utils/string';

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
    query: { brand, productLine, ...queryParams },
  } = router;
  const isPLA = !!router.pathname.match(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);
  const baseLink = interpolateRoute(ROUTE_MAP[ROUTES.PRODUCT_DETAIL], {
    brand: isPLA ? appendTiresToString(brand) : brand,
    productLine,
  });

  const description = siteProductLine.overview || '';
  const secondaryDescription = siteProductLine.secondaryDescription || '';
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

  if (!specs.length) {
    return null;
  }

  return {
    description,
    image: treadOnlyImage && treadOnlyImage.image,
    secondaryDescription,
    sizes,
    specs,
  };
}
