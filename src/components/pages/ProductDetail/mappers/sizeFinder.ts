import { SiteProduct } from '~/data/models/SiteProduct';

import { ParsedSizeFinderProps } from '../ProductDetail.hooks';

export function mapDataToSizeFinder({
  currentSizeIndex,
  isFrontAndRear,
  siteProduct: { siteProductLineAvailableSizeList },
}: {
  currentSizeIndex: number;
  isFrontAndRear?: boolean;
  siteProduct: SiteProduct;
}): ParsedSizeFinderProps | null {
  if (isFrontAndRear) {
    return null;
  }

  const sizes = siteProductLineAvailableSizeList;

  if (sizes?.length <= 1) {
    return null;
  }

  /**
   * If currentSizeIndex is set, then we use it since new data could be still loading.
   * If currentSizeIndex is not set yet (first load of the page), search for isSelected
   * in the data (which could be not found '-1').
   */
  const currentIndex =
    currentSizeIndex >= 0
      ? currentSizeIndex
      : siteProductLineAvailableSizeList.findIndex((item) => item.isSelected);

  return {
    currentIndex,
    sizes,
  };
}
