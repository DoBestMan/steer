import { NextRouter } from 'next/router';

import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';

import { mapDataToRoadHazard } from './roadHazard';

export function mapDataToProductInfo({
  quantity,
  siteProduct,
  siteProductReviews: { performanceRating, reviewsSource },
  rearSize,
  router: {
    query: { brand },
  },
  tireSize,
}: {
  quantity: { front: number; rear?: number };
  rearSize?: string;
  router: NextRouter;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
  tireSize?: string;
}): Omit<ProductInfoProps, 'sizeFinder'> {
  const {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
    siteProductLineAvailableSizeList,
    siteProductPromotions,
  } = siteProduct;
  const brandName = siteProductLine.brand;
  const brandURL = interpolateRoute(ROUTE_MAP[ROUTES.BRAND_DETAIL], {
    brand,
  });
  const productName = siteProductLine.name;
  const startingPrice = Math.min(
    ...siteProductLineAvailableSizeList.map((item) =>
      parseInt(item.priceInCents),
    ),
  ).toString();

  const volatileAvailability =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusAvailableVolatile;
  const outOfStock =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusOutOfStock;
  const callForPricing =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusCallForPricing;

  const listingSize: SiteProductLineAvailableSizeItem | null =
    (tireSize &&
      siteProductLineAvailableSizeList.find(
        (item) => item.siteQueryParams.tireSize === tireSize,
      )) ||
    null;
  const tireSizeLabel = listingSize?.size;
  const loadSpeedRating = listingSize?.loadSpeedRating;
  const price =
    (!outOfStock && !callForPricing && siteProductLineSizeDetail?.price) ||
    null;
  const priceLabel = siteProductLineSizeDetail?.priceLabel;

  const listingRear: SiteProductLineAvailableSizeItem | null =
    (rearSize &&
      siteProductLineAvailableSizeList.find(
        (item) => item.siteQueryParams.tireSize === rearSize,
      )) ||
    null;
  const rearSizeLabel = listingRear?.size;
  const rearLoadSpeedRating = listingRear?.loadSpeedRating;
  const rearPrice = siteProductLineRearSizeDetail?.price;

  const availableSizes = siteProductLineAvailableSizeList?.length;

  const promoTags: PromoTagProps[] = siteProductPromotions.map((item) => ({
    icon: item.sitePromotion.icon,
    label: item.sitePromotion.label,
    siteDynamicModal: item.siteDynamicModal,
    style: item.sitePromotion.style,
  }));

  const rating = {
    quantity:
      (reviewsSource?.simpleTire || 0) + (reviewsSource?.googleShopping || 0),
    value: performanceRating.overall,
  };

  const sameSizeSearchResults =
    siteProductLineSizeDetail?.outOfStockTireSizeResultCount;
  const sameSizeSearchURL = interpolateRoute(
    ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
    {
      size: tireSize || '',
    },
  );

  const roadHazard = mapDataToRoadHazard({
    siteProduct,
    quantity,
  });

  return {
    availableSizes,
    brand: brandName,
    brandURL,
    callForPricing,
    loadSpeedRating,
    price,
    priceLabel,
    productName,
    promoTags,
    rating,
    rearLoadSpeedRating,
    rearPrice,
    rearSize: rearSizeLabel,
    roadHazard,
    sameSizeSearchResults,
    sameSizeSearchURL,
    size: tireSizeLabel,
    startingPrice,
    volatileAvailability,
  };
}
