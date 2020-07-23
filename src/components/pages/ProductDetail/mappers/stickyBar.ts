import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';

import { ParsedStickyBarProps } from '../ProductDetail.hooks';
import { mapDataToRoadHazard } from './roadHazard';

export function mapDataToStickyBar({
  quantity,
  siteProduct,
}: {
  quantity: { front: number; rear?: number };
  siteProduct: SiteProduct;
}): ParsedStickyBarProps | null {
  const {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
    siteProductLineAvailableSizeList,
  } = siteProduct;
  const outOfStock =
    siteProductLineSizeDetail?.productStatus ===
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusOutOfStock ||
    siteProductLineRearSizeDetail?.productStatus ===
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusOutOfStock;
  const callForPricing =
    siteProductLineSizeDetail?.productStatus ===
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusCallForPricing ||
    siteProductLineRearSizeDetail?.productStatus ===
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusCallForPricing;

  if (outOfStock || callForPricing) {
    return null;
  }

  const brandLogo = siteProductLine.brand.image || null;
  const productLine = siteProductLine.name;

  const rearSize =
    siteProductLineRearSizeDetail &&
    `${siteProductLineRearSizeDetail.size} ${siteProductLineRearSizeDetail.loadSpeedRating}`;
  const rearPrice =
    siteProductLineRearSizeDetail?.price?.salePriceInCents || null;
  const sizesAvailable = siteProductLineAvailableSizeList.length;
  const startingPrice = Math.min(
    ...siteProductLineAvailableSizeList.map((item) =>
      parseInt(item.priceInCents),
    ),
  ).toString();
  const tireSize =
    siteProductLineSizeDetail &&
    `${siteProductLineSizeDetail.size} ${siteProductLineSizeDetail.loadSpeedRating}`;
  const tirePrice = siteProductLineSizeDetail?.price?.salePriceInCents || null;

  const roadHazard = mapDataToRoadHazard({
    siteProduct,
    quantity,
  });

  return {
    brandLogo,
    productLine,
    rearPrice,
    rearSize,
    roadHazard,
    sizesAvailable,
    startingPrice,
    tirePrice,
    tireSize,
  };
}
