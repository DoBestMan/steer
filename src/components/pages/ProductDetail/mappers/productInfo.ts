import { NextRouter } from 'next/router';

import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';

export function mapDataToProductInfo({
  globals: { customerServiceNumber },
  siteProduct: {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
    siteProductLineAvailableSizeList,
    siteProductPromotions,
  },
  siteProductReviews: { performanceRating, reviewsSource },
  router: {
    query: { brandName },
  },
}: {
  globals: SiteGlobals;
  router: NextRouter;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}): ProductInfoProps {
  const brand = siteProductLine.brand;
  const brandURL = interpolateRoute(ROUTE_MAP[ROUTES.BRAND_DETAIL], {
    brandName,
  });
  const productName = siteProductLine.name;

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

  // TODO: Add modals handlers
  const promoTags: PromoTagProps[] = siteProductPromotions.map((item) => ({
    label: item.sitePromotion.label,
    icon: item.sitePromotion.icon,
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
  const sameSizeSearchURL = interpolateRoute(ROUTE_MAP[ROUTES.TIRE_CATEGORY], {
    size: parsedSize,
  });

  // TODO: Implement tire and quantity changers
  const handleChangeQuantity = (_: 'front' | 'rear') => () => {};
  const handleChangeSize = () => {};

  return {
    availableSizes,
    brand,
    brandURL,
    callForPricing,
    customerServiceNumber,
    handleChangeQuantity,
    handleChangeSize,
    loadSpeedRating,
    price,
    priceLabel,
    productName,
    promoTags,
    rating,
    rearLoadSpeedRating,
    rearPrice,
    rearSize,
    sameSizeSearchResults,
    sameSizeSearchURL,
    size,
    volatileAvailability,
  };
}
