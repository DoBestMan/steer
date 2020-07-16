import { NextRouter } from 'next/router';

import { SizeFinderProps } from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { SiteProduct } from '~/data/models/SiteProduct';

export function mapDataToSizeFinder({
  siteProduct: { siteProductLineAvailableSizeList },
  router,
}: {
  router: NextRouter;
  siteProduct: SiteProduct;
}): Omit<SizeFinderProps, 'onChange'> | null {
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
