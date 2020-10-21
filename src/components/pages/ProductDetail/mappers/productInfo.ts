import { NextRouter } from 'next/router';

import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLineAvailableSizeItem } from '~/data/models/SiteProductLineAvailableSizeItem';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { transformSrcLogoToBlack } from '~/lib/utils/cloudinary/cloudinary';
import { interpolateRoute } from '~/lib/utils/routes';

import { mapDataToRoadHazard } from './roadHazard';

export function mapDataToProductInfo({
  currentSizeIndex,
  error,
  quantity,
  siteProduct,
  siteProductReviews: { performanceRating, reviewsSource },
  rearSize,
  router: {
    query: { brand },
  },
  tireSize,
}: {
  currentSizeIndex: number;
  error?: Error;
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
    brand: brand || '',
  });
  const productName = siteProductLine.name;
  const startingPrice = siteProductLine.startingPriceInCents;

  const volatileAvailability =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusAvailableVolatile;
  const outOfStock =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusOutOfStock;
  const callForPricing =
    siteProductLineSizeDetail?.productStatus ===
    SiteProductLineSizeDetailProductStatusEnum.ProductStatusCallForPricing;

  const listingSize: SiteProductLineAvailableSizeItem | null | undefined =
    currentSizeIndex >= 0
      ? siteProductLineAvailableSizeList[currentSizeIndex]
      : siteProductLineAvailableSizeList.find((item) => item.isSelected);

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

  const isTireLine = !tireSize;

  if (error) {
    return {
      availableSizes,
      brand: {
        image:
          (brandName.image && {
            ...brandName.image,
            src: transformSrcLogoToBlack(brandName.image.src),
          }) ||
          null,
        label: brandName.label,
      },
      brandURL,
      hasError: true,
      isTireLine,
      loadSpeedRating,
      productName,
      rating,
      rearLoadSpeedRating,
      rearPrice,
      rearSize: rearSizeLabel,
      roadHazard,
      size: tireSizeLabel,
      startingPrice,
    };
  }

  return {
    availableSizes,
    brand: {
      image:
        (brandName.image && {
          ...brandName.image,
          src: transformSrcLogoToBlack(brandName.image.src),
        }) ||
        null,
      label: brandName.label,
    },
    brandURL,
    callForPricing,
    isTireLine,
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
