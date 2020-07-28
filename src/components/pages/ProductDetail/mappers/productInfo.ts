import { NextRouter } from 'next/router';

import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';

import { mapDataToRoadHazard } from './roadHazard';

export function mapDataToProductInfo({
  quantity,
  siteProduct,
  siteProductReviews: { performanceRating, reviewsSource },
  router: {
    query: { brand },
  },
}: {
  quantity: { front: number; rear?: number };
  router: NextRouter;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
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

  const size = siteProductLineSizeDetail?.size;
  const loadSpeedRating = siteProductLineSizeDetail?.loadSpeedRating;
  const price =
    (!outOfStock && !callForPricing && siteProductLineSizeDetail?.price) ||
    null;
  const priceLabel = siteProductLineSizeDetail?.priceLabel;

  const rearSize = siteProductLineRearSizeDetail?.size;
  const rearLoadSpeedRating = siteProductLineRearSizeDetail?.loadSpeedRating;
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

  // TODO: use tire size parsed name from API
  const parsedSize = `p${size?.replace(' ', '-').replace('/', '-')}`;
  const sameSizeSearchResults =
    siteProductLineSizeDetail?.outOfStockTireSizeResultCount;
  const sameSizeSearchURL = interpolateRoute(
    ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
    {
      size: parsedSize,
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
    rearSize,
    roadHazard,
    sameSizeSearchResults,
    sameSizeSearchURL,
    size,
    startingPrice,
    volatileAvailability,
  };
}
