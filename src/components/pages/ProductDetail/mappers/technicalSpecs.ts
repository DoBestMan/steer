import { NextRouter } from 'next/router';
import queryString from 'query-string';

import {
  Size,
  TechnicalSpecsProps,
} from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteProduct } from '~/data/models/SiteProduct';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { interpolateRoute } from '~/lib/utils/routes';
import { formatDollars, keyToCamel } from '~/lib/utils/string';

type QueryParams = Record<string, string>;

export function mapDataToTechnicalSpecs({
  siteProduct: {
    siteProductLine,
    siteProductSpecs,
    siteProductLineAvailableSizeList,
  },
  globals,
  router,
}: {
  globals: SiteGlobals;
  router: NextRouter;
  siteProduct: SiteProduct;
}): TechnicalSpecsProps | null {
  const {
    pathname,
    query: { brandName, productLine, ...queryParams },
  } = router;
  const baseLink = interpolateRoute(pathname, { brandName, productLine });
  const {
    customerServiceNumber,
    customerServiceEnabled: isCustomerServiceEnabled,
  } = globals;

  const description = siteProductLine.overview || '';

  const treadOnlyImage = siteProductLine.imageList.find(
    (item) => item.productImageType === PRODUCT_IMAGE_TYPES.TREADONLY,
  );

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
        const link = `${baseLink}?${querystring}`;

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
    customerServiceNumber,
    description,
    image: treadOnlyImage && treadOnlyImage.image,
    isCustomerServiceEnabled,
    sizes,
    specs,
  };
}
