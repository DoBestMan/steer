import { useRouter } from 'next/router';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogProductImage } from '~/data/models/SiteCatalogProductImage';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { keyToCamel } from '~/lib/utils/string';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToBreadcrumbs } from './mappers/breadcrumbs';
import { mapDataToInsights } from './mappers/insights';
import { mapDataToInstallation } from './mappers/installation';
import { mapDataToProductInfo } from './mappers/productInfo';
import { mapDataToRecirculation } from './mappers/recirculation';
import {
  mapDataToRecirculationSize,
  RecirculationSize,
} from './mappers/recirculationSize';
import { mapDataToTechnicalSpecs } from './mappers/technicalSpecs';

export type QueryParams = Record<string, string>;

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
  recirculationSize: RecirculationSize | null;
  technicalSpecs: TechnicalSpecsProps | null;
  technicalSpecsAnchor: string;
}

export const CONSTANTS = {
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

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
      siteProduct,
      router,
    }),
    currentPath: asPath,
    imageList,
    insights: mapDataToInsights({ siteProduct }),
    installation: mapDataToInstallation({ siteProduct }),
    productInfo: mapDataToProductInfo({
      siteProduct,
      siteProductReviews,
      router,
      globals,
    }),
    recirculation: mapDataToRecirculation({ siteProduct }),
    recirculationSize: mapDataToRecirculationSize({ siteProduct, router }),
    technicalSpecs: mapDataToTechnicalSpecs({ siteProduct, globals, router }),
    technicalSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

export default useProductDetail;
