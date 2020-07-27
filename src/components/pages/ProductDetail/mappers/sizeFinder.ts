import { SiteProduct } from '~/data/models/SiteProduct';

import { ParsedSizeFinderProps } from '../ProductDetail.hooks';

export function mapDataToSizeFinder({
  rearSize,
  siteProduct: { siteProductLineAvailableSizeList },
  tireSize,
}: {
  rearSize?: string;
  siteProduct: SiteProduct;
  tireSize?: string;
}): ParsedSizeFinderProps | null {
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
