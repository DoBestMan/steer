import { NextRouter } from 'next/router';

import { SiteProduct } from '~/data/models/SiteProduct';

import { ParsedSizeFinderProps } from '../ProductDetail.hooks';

export function mapDataToSizeFinder({
  siteProduct: { siteProductLineAvailableSizeList },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
}): ParsedSizeFinderProps | null {
  const { query } = router;
  const { tireSize, rearSize } = query;

  if (rearSize) {
    return null;
  }

  const sizes = siteProductLineAvailableSizeList;

  if (sizes?.length <= 1) {
    return null;
  }

  return {
    sizes,
    value: tireSize?.toString(),
  };
}
