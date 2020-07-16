import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useState } from 'react';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { FAQProps } from '~/components/modules/PDP/FAQ/FAQ';
import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { ReviewsProps } from '~/components/modules/PDP/Reviews/Reviews';
import { SizeFinderProps } from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { PDPStickyBarProps } from '~/components/modules/PDP/StickyBar/StickyBar';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { omit } from '~/lib/utils/object';
import { getStringifiedParams, interpolateRoute } from '~/lib/utils/routes';
import { ProductDetailResponse } from '~/pages/api/product-detail';

import { mapDataToBreadcrumbs } from './mappers/breadcrumbs';
import { mapDataToFAQ } from './mappers/faq';
import { mapDataToInsights } from './mappers/insights';
import { mapDataToInstallation } from './mappers/installation';
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

export type QueryParams = Record<string, string>;

interface ProductDetailData {
  serverData: ProductDetailResponse;
}

export type ParsedProductInfoProps = Omit<
  ProductInfoProps,
  | 'onChangeSize'
  | 'onClickChangeQuantity'
  | 'onClickChangeSize'
  | 'onCloseSizeSelector'
  | 'handleChangeSize'
  | 'sizeFinder'
  | 'isSizeSelectorOpen'
>;

export type ParsedSizeFinderProps = Omit<SizeFinderProps, 'onChange'>;

export type ParsedStickyBarProps = Omit<
  PDPStickyBarProps,
  | 'avoidSection'
  | 'darkSection'
  | 'onClickAddToCart'
  | 'onClickChangeQuantity'
  | 'onClickFindYourSize'
>;

interface ResponseProps extends Pick<SiteProductLine, 'assetList'> {
  breadcrumbs: BreadcrumbsItem[];
  closeSizeSelector: () => void;
  currentPath: string;
  faq: FAQProps | null;
  insights: Omit<InsightsProps, 'handleChangeLocation'>;
  installation: InstallationProps | null;
  isSizeSelectorOpen: boolean;
  onChangeSize: (value: string) => void;
  onClickAddToCart: () => void;
  onClickChangeQuantity: (position: 'front' | 'rear') => () => void;
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
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

function useProductDetail({ serverData }: ProductDetailData): ResponseProps {
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const search = useSearchContext();
  const userPersonalization = useUserPersonalizationContext();
  const { vehicle } = userPersonalization;
  const globals = useSiteGlobalsContext();
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const queryParams = getStringifiedParams(Object.assign(query, vehicle));

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

  const assetList = siteProductLine.assetList;

  // Size selector
  const toggleSizeSelector = useCallback(() => {
    setIsSizeSelectorOpen(!isSizeSelectorOpen);
  }, [isSizeSelectorOpen, setIsSizeSelectorOpen]);

  const closeSizeSelector = useCallback(() => {
    setIsSizeSelectorOpen(false);
  }, [setIsSizeSelectorOpen]);

  const handleClickChangeQuantity = (_: 'front' | 'rear') => () => {};
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
  const handleClickAddToCart = () => {};
  const handleClickFindYourSize = () => {};

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
      siteProduct,
      userPersonalization,
      router,
      search,
    }),
    installation: mapDataToInstallation({ siteProduct }),
    isSizeSelectorOpen,
    onChangeSize: handleChangeSize,
    onClickAddToCart: handleClickAddToCart,
    onClickChangeQuantity: handleClickChangeQuantity,
    onClickChangeSize: handleClickChangeSize,
    onClickFindYourSize: handleClickFindYourSize,
    onCloseSizeSelector: handleCloseSizeSelector,
    productInfo: mapDataToProductInfo({
      siteProduct,
      siteProductReviews,
      router,
      globals,
    }),
    recirculation: mapDataToRecirculation({ siteProduct }),
    recirculationSize: mapDataToRecirculationSize({ siteProduct, router }),
    reviews: mapDataToReviews({ siteProductReviews, router }),
    reviewsAnchor: CONSTANTS.REVIEWS_ANCHOR,
    sizeFinder: mapDataToSizeFinder({
      siteProduct,
      router,
    }),
    stickyBar: mapDataToStickyBar({ siteProduct }),
    technicalSpecs: mapDataToTechnicalSpecs({ siteProduct, router }),
    technicalSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

export default useProductDetail;
