import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { Product as ProductLinkingData } from 'schema-dts';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { MetaProps } from '~/components/global/Meta/Meta';
import { FAQProps } from '~/components/modules/PDP/FAQ/FAQ';
import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { ReviewsProps } from '~/components/modules/PDP/Reviews/Reviews';
import { SizeFinderProps } from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { PDPStickyBarProps } from '~/components/modules/PDP/StickyBar/StickyBar';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { useGlobalsContext } from '~/context/Globals.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { omit } from '~/lib/utils/object';
import { getStringifiedParams, interpolateRoute } from '~/lib/utils/routes';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToBreadcrumbs } from './mappers/breadcrumbs';
import { mapDataToFAQ } from './mappers/faq';
import { mapDataToInsights } from './mappers/insights';
import { mapDataToInstallation } from './mappers/installation';
import { mapDataToLinkingData } from './mappers/linkingData';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToProductInfo } from './mappers/productInfo';
import { mapDataToRecirculation } from './mappers/recirculation';
import {
  mapDataToRecirculationSize,
  RecirculationSize,
} from './mappers/recirculationSize';
import { mapDataToReviews } from './mappers/reviews';
import { mapDataToSizeFinder } from './mappers/sizeFinder';
import { mapDataToStickyBar } from './mappers/stickyBar';
import { mapDataToTechnicalSpecs } from './mappers/technicalSpecs';
import { useProductDetailContext } from './ProductDetail.context';

export type QueryParams = Record<string, string>;

interface ProductDetailData {
  serverData: ProductDetailResponse;
}

export type ParsedProductInfoProps = Omit<
  ProductInfoProps,
  | 'onChangeSize'
  | 'onClickChangeSize'
  | 'onCloseSizeSelector'
  | 'handleChangeSize'
  | 'sizeFinder'
  | 'isSizeSelectorOpen'
>;

export type ParsedSizeFinderProps = Omit<SizeFinderProps, 'onChange'>;

export type ParsedStickyBarProps = Omit<
  PDPStickyBarProps,
  'avoidSection' | 'darkSection' | 'onClickFindYourSize'
>;

interface ResponseProps extends Pick<SiteProductLine, 'assetList'> {
  breadcrumbs: BreadcrumbsItem[];
  closeSizeSelector: () => void;
  currentPath: string;
  faq: FAQProps;
  insights: Omit<InsightsProps, 'handleChangeLocation'>;
  installation: InstallationProps | null;
  isPLA: boolean;
  isSizeSelectorOpen: boolean;
  linkingData: ProductLinkingData | null;
  meta: MetaProps;
  onChangeSize: (value: string) => void;
  onClickChangeSize: () => void;
  onClickFindYourSize: () => void;
  onCloseSizeSelector: () => void;
  productInfo: ParsedProductInfoProps;
  recirculation: SiteCatalogProductGroupList | null;
  recirculationSize: RecirculationSize | null;
  reviews: ReviewsProps;
  reviewsAnchor: string;
  sizeFinder: ParsedSizeFinderProps | null;
  stickyBar: ParsedStickyBarProps | null;
  technicalSpecs: TechnicalSpecsProps | null;
  technicalSpecsAnchor: string;
}

export const CONSTANTS = {
  DEFAULT_QUANTITY: 4,
  DEFAULT_FRONT_AND_REAR_QUANTITY: 2,
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

function useProductDetail({ serverData }: ProductDetailData): ResponseProps {
  const { quantity, setQuantity } = useProductDetailContext();
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const userPersonalization = useUserPersonalizationContext();
  const { vehicle } = userPersonalization;
  const globals = useSiteGlobalsContext();
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const queryParams = getStringifiedParams(Object.assign(query, vehicle));
  const { hostUrl } = useGlobalsContext();
  const isPLA = !!router.route.match(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);

  const { data, error, isValidating } = useApiDataWithDefault<
    ProductDetailResponse
  >({
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

  const assetList = siteProductLine.assetList;

  useEffect(() => {
    if (!query.tireSize || quantity.front) {
      return;
    }

    if (query.rearSize) {
      setQuantity({
        front: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
        rear: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
      });
      return;
    }

    setQuantity({
      front: CONSTANTS.DEFAULT_QUANTITY,
    });
  }, [quantity, query, setQuantity]);

  // Size selector
  const toggleSizeSelector = useCallback(() => {
    setIsSizeSelectorOpen(!isSizeSelectorOpen);
  }, [isSizeSelectorOpen, setIsSizeSelectorOpen]);

  const closeSizeSelector = useCallback(() => {
    setIsSizeSelectorOpen(false);
  }, [setIsSizeSelectorOpen]);

  const handleClickChangeSize = () => {
    toggleSizeSelector();
  };

  const handleChangeSize = useCallback(
    (value) => {
      const querystring = queryString.stringify({
        ...omit(queryParams, ['brandName', 'productLine']),
        tireSize: value,
      });
      const interpolatedRoute = interpolateRoute(router.pathname, query);

      router.push(
        `${pathname}?${querystring}`,
        `${interpolatedRoute}?${querystring}`,
        {
          shallow: true,
        },
      );
      closeSizeSelector();
    },
    [query, queryParams, pathname, router, closeSizeSelector],
  );

  const handleCloseSizeSelector = useCallback(() => {
    closeSizeSelector();
  }, [closeSizeSelector]);

  // TODO: Integrate sticky bar
  const handleClickFindYourSize = () => {};

  const productInfo = mapDataToProductInfo({
    globals,
    quantity,
    router,
    siteProduct,
    siteProductReviews,
  });

  return {
    assetList,
    breadcrumbs: mapDataToBreadcrumbs({
      siteProduct,
      router,
    }),
    closeSizeSelector,
    currentPath: asPath,
    faq: mapDataToFAQ({ siteProduct, globals }),
    insights: mapDataToInsights({
      handleChangeSize,
      isLoadingData: isValidating,
      router,
      siteProduct,
      userPersonalization,
    }),
    installation: mapDataToInstallation({ siteProduct }),
    isPLA,
    isSizeSelectorOpen,
    linkingData: mapDataToLinkingData({
      hostUrl,
      router,
      siteProduct,
      siteProductReviews,
    }),
    meta: mapDataToMeta({
      brand: productInfo.brand.label,
      productLine: productInfo.productName,
      tireSize: productInfo.size,
    }),
    onChangeSize: handleChangeSize,
    onClickChangeSize: handleClickChangeSize,
    onClickFindYourSize: handleClickFindYourSize,
    onCloseSizeSelector: handleCloseSizeSelector,
    productInfo,
    recirculation: mapDataToRecirculation({ siteProduct }),
    recirculationSize: mapDataToRecirculationSize({ siteProduct, router }),
    reviews: mapDataToReviews({ siteProductReviews, router }),
    reviewsAnchor: CONSTANTS.REVIEWS_ANCHOR,
    sizeFinder: mapDataToSizeFinder({
      siteProduct,
      router,
    }),
    stickyBar: mapDataToStickyBar({ quantity, siteProduct }),
    technicalSpecs: mapDataToTechnicalSpecs({ siteProduct, router }),
    technicalSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

export default useProductDetail;
