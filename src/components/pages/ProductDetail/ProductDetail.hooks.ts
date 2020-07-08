import { NextRouter, useRouter } from 'next/router';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { PromoTagProps } from '~/components/global/PromoTag/PromoTag';
import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogProductImage } from '~/data/models/SiteCatalogProductImage';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductInstallationStatusEnum } from '~/data/models/SiteProductInstallation';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { interpolateRoute } from '~/lib/utils/routes';
import { keyToCamel } from '~/lib/utils/string';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToTechnicalSpecs } from './mappers/technicalSpecs';

type QueryParams = Record<string, string>;

interface ProductDetailData {
  serverData: ProductDetailResponse;
}

interface ResponseProps {
  breadcrumbs: BreadcrumbsItem[];
  currentPath: string;
  imageList: SiteCatalogProductImage[];
  insights: InsightsProps;
  installation: InstallationProps | null;
  productInfo: ProductInfoProps;
  recirculation: SiteCatalogProductGroupList | null;
  technicalSpecs: TechnicalSpecsProps | null;
  technicalSpecsAnchor: string;
}

const CONSTANTS = {
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

function mapDataToBreadcrumbs({
  data: {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
  },
  router,
}: {
  data: SiteProduct;
  router: NextRouter;
}): BreadcrumbsItem[] {
  const { asPath, pathname, query } = router;
  const tireSizeLabel =
    siteProductLineSizeDetail &&
    `${siteProductLineSizeDetail.size} ${siteProductLineSizeDetail.loadSpeedRating}`;
  const rearSizeLabel =
    siteProductLineRearSizeDetail &&
    `${siteProductLineRearSizeDetail.size} ${siteProductLineRearSizeDetail.loadSpeedRating}`;

  return mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brandName: siteProductLine.brand.label,
      productLine: siteProductLine.name,
    },
    pathname,
    query,
    querystringNodeLabel:
      tireSizeLabel &&
      [tireSizeLabel, rearSizeLabel].filter(Boolean).join(' & '),
  });
}

function mapDataToProductInfo({
  globals: { customerServiceNumber },
  siteProduct: {
    siteProductLine,
    siteProductLineSizeDetail,
    siteProductLineRearSizeDetail,
    siteProductLineAvailableSizeList,
    siteProductPromotions,
  },
  siteProductReviews: { performanceRating, reviewsSource },
  queryParams: { brandName },
}: {
  globals: SiteGlobals;
  queryParams: QueryParams;
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
  const parsedSizeInfo = `p${size?.replace(' ', '-').replace('/', '-')}`;
  const sameSizeSearchResults =
    siteProductLineSizeDetail?.outOfStockTireSizeResultCount;
  const sameSizeSearchURL = interpolateRoute(ROUTE_MAP[ROUTES.TIRE_CATEGORY], {
    sizeInfo: parsedSizeInfo,
  });

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

function mapDataToInsights({
  siteProduct: { siteProductInsights },
}: {
  siteProduct: SiteProduct;
}): InsightsProps {
  // TOOD: Integrate fits your vehicle functionality
  const doesItFit = false;

  // TODO: Add handlers
  const handleChangeLocation = () => {};
  const handleChangeVehicle = () => {};
  const handleOpenRebate = () => {};

  return {
    delivery: siteProductInsights.delivery,
    doesItFit,
    handleChangeLocation,
    handleChangeVehicle,
    handleOpenRebate,
    insightItems: siteProductInsights.siteProductInsightList,
    rebateLabel: siteProductInsights.rebate?.label,
    techSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

function mapDataToInstallation({
  siteProduct: { siteProductInstallation },
}: {
  siteProduct: SiteProduct;
}): InstallationProps | null {
  const isAvailable =
    siteProductInstallation?.status ===
    SiteProductInstallationStatusEnum.SiteProductInstallationAvailable;

  if (!isAvailable || !siteProductInstallation) {
    return null;
  }

  return siteProductInstallation.installationMeta;
}

function mapDataToRecirculation({
  siteProduct: { siteProductRecirculation },
}: {
  siteProduct: SiteProduct;
}): SiteCatalogProductGroupList | null {
  if (!siteProductRecirculation?.length) {
    return null;
  }

  return siteProductRecirculation;
}

function useProductDetail({ serverData }: ProductDetailData): ResponseProps {
  const router = useRouter();
  const { query, asPath } = router;
  const globals = useSiteGlobalsContext();

  const queryParams: QueryParams = {};

  Object.entries(query).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[keyToCamel(key)] = value;
    }
  });

  const { data, error } = useApiDataWithDefault<ProductDetailResponse>({
    defaultData: serverData,
    endpoint: '/product-detail',
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  const { siteProduct, siteProductReviews } = data;

  const { siteProductLine } = siteProduct;

  const imageList = siteProductLine.imageList;

  return {
    breadcrumbs: mapDataToBreadcrumbs({
      data: siteProduct,
      router,
    }),
    currentPath: asPath,
    imageList,
    insights: mapDataToInsights({ siteProduct }),
    installation: mapDataToInstallation({ siteProduct }),
    productInfo: mapDataToProductInfo({
      siteProduct,
      siteProductReviews,
      queryParams,
      globals,
    }),
    recirculation: mapDataToRecirculation({ siteProduct }),
    technicalSpecs: mapDataToTechnicalSpecs({ siteProduct, globals, router }),
    technicalSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

export default useProductDetail;
