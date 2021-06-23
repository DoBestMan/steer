import isStrictEqual from 'fast-deep-equal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Product as ProductLinkingData } from 'schema-dts';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { MetaProps } from '~/components/global/Meta/Meta';
import { tableContentFactory } from '~/components/modules/Compare/Compare.utils';
import { FAQProps } from '~/components/modules/PDP/FAQ/FAQ';
import { InsightsRebateProps } from '~/components/modules/PDP/InsightRebate/InsightRebate';
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
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCompareProductsResult } from '~/data/models/SiteCompareProductsResult';
import { SiteCompareTable } from '~/data/models/SiteCompareTable';
import { SiteModuleProductLineFAQs } from '~/data/models/SiteModules';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { FetchError } from '~/lib/fetch/FetchError';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { interpolateRoute } from '~/lib/utils/routes';

import { Anchor, mapDataToAnchorList } from './mappers/anchorList';
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
import { ProductDetailData } from './ProductDetail.types';

export type QueryParams = Record<string, string>;

export type ParsedProductInfoProps = Omit<ProductInfoProps, 'sizeFinder'>;

export type ParsedSizeFinderProps = Omit<SizeFinderProps, 'onChange'>;

export type ParsedStickyBarProps = Omit<
  PDPStickyBarProps,
  'avoidSection' | 'darkSection'
>;
interface Quantity {
  front: number;
  rear?: number;
}
interface ResponseProps extends Pick<SiteProductLine, 'assetList'> {
  addToCartFromCompareList: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  anchorList: Anchor[];
  breadcrumbs: BreadcrumbsItem[];
  currentPath: string;
  faq: FAQProps;
  insights: Omit<InsightsProps, 'handleChangeLocation'> | null;
  installation: InstallationProps | null;
  instantRebateInsight?: InsightsRebateProps[];
  isLoading: boolean;
  isPLA: boolean;
  linkingData: ProductLinkingData | null;
  meta: MetaProps;
  popularCompareList: SiteCatalogProductItem[] | undefined;
  popularTableData: Array<SiteCompareTable> | null;
  productInfo: ParsedProductInfoProps;
  recirculation: SiteCatalogProductGroupList | null;
  recirculationSize: RecirculationSize | null;
  reviews: ReviewsProps;
  siteFaqs: SiteModuleProductLineFAQs;
  sizeFinder: ParsedSizeFinderProps | null;
  statusCode: number | undefined | null;
  stickyBar: ParsedStickyBarProps | null;
  technicalSpecs: TechnicalSpecsProps | null;
}

const POPULAR_IDs = ['most-popular', 'most-popular-category'];
function useProductDetail({ serverData }: ProductDetailData): ResponseProps {
  const productDetail = useProductDetailContext();
  const {
    currentSizeIndex,
    data: contextData,
    quantity,
    queryParams,
    isLoading,
    setData,
    setIsLoading,
  } = productDetail;
  const router = useRouter();
  const { asPath } = router;
  const userPersonalization = useUserPersonalizationContext();
  const globals = useSiteGlobalsContext();

  const { hostUrl } = useGlobalsContext();
  const isPLA = !!router.pathname.match(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);

  const { data: siteProduct, error, isValidating } = useApiDataWithDefault<
    SiteProduct
  >({
    defaultData: contextData?.siteProduct || serverData.siteProduct,
    endpoint: '/product-detail',
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  let statusCode = null;
  if (error) {
    console.error(error);
    statusCode = (error as FetchError).statusCode;
  }

  const { siteProductReviews, siteFaqs } = serverData;
  const { siteProductLine } = siteProduct;
  const recirculation = mapDataToRecirculation({ siteProduct });

  const popularProductList = recirculation?.find((item) =>
    POPULAR_IDs.includes(item.id),
  );

  const recirculationNoPopular =
    recirculation?.filter((item) => !POPULAR_IDs.includes(item.id)) || null;

  const productIds =
    popularProductList &&
    popularProductList.productList.map((item) => item.productId);

  const compareProductIds = productIds?.slice(1).join(',') as string;

  const { data: compareData, error: compareError } = useApiDataWithDefault<
    SiteCompareProductsResult
  >({
    defaultData: { siteCatalogCompareList: [] },
    endpoint: '/compare-products',
    includeUserRegion: true,
    includeUserZip: true,
    query: {
      compareProductIds,
      productId: (productIds && productIds[0]) as string,
    },
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (compareError) {
    console.error(compareError);
  }

  const popularCompareList = popularProductList?.productList.map(
    (product, index) => {
      const tempProduct = {
        ...product,
        siteProductLineSizeDetailRoadHazard: compareData.siteCatalogCompareList[
          index
        ]
          ? compareData.siteCatalogCompareList[index]
              .siteProductLineSizeDetailRoadHazard
          : null,
      };

      return tempProduct;
    },
  );

  const assetList = siteProductLine.assetList;
  const clonedAssetList = JSON.parse(JSON.stringify(assetList));
  const metaImage = clonedAssetList.length
    ? clonedAssetList[0].image
    : undefined;
  const instantRebateInsight = siteProductLine.instantRebateInsight;
  useEffect(() => {
    if (isValidating) {
      return;
    }

    if (
      isStrictEqual({ siteProduct, siteProductReviews, siteFaqs }, contextData)
    ) {
      return;
    }

    setData({ siteProduct, siteProductReviews, siteFaqs });
  }, [
    isValidating,
    siteProduct,
    siteProductReviews,
    contextData,
    setData,
    siteFaqs,
  ]);

  useEffect(() => {
    if (isPLA) {
      return;
    }

    setIsLoading(isValidating);
  }, [isValidating, setIsLoading, isPLA]);

  /**
   * Reroute query parameters to hash parameters on the client
   * `?tireSize=235-40r15` => `#tireSize=235-40r15`
   */
  useEffect(() => {
    if (isPLA || !asPath.includes('?')) {
      return;
    }
    const interpolatedRoute = interpolateRoute(router.pathname, queryParams);
    const [queryFromPath] = asPath.match(/[^?]*$/g) || [];

    router.replace(
      `${router.pathname}#${queryFromPath}`,
      `${interpolatedRoute}#${queryFromPath}`,
      {
        shallow: true,
      },
    );
  }, [asPath, isPLA, router, queryParams]);

  const insights = mapDataToInsights({
    error,
    isLoadingData: isLoading,
    productDetail,
    rearSize: queryParams.rearSize,
    router,
    siteProduct,
    tireSize: queryParams.tireSize,
    userPersonalization,
  });

  const installation = mapDataToInstallation({ siteProduct });

  const productInfo = mapDataToProductInfo({
    currentSizeIndex,
    error,
    quantity,
    rearSize: queryParams.rearSize,
    router,
    siteProduct,
    siteProductReviews,
    tireSize: queryParams.tireSize,
  });

  const technicalSpecs = mapDataToTechnicalSpecs({ siteProduct, router });

  const addToCartFromCompareList = ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => {
    if (!product || !quantity) {
      return;
    }

    const checkoutURL = getLegacyCheckoutURL({
      front: product.productId as string,
      quantity,
      rear: product.productId as string,
      roadHazard: shouldAddCoverage,
      userZip:
        userPersonalization.userPersonalizationData?.userLocation?.zip ||
        undefined,
    });

    window.location.href = checkoutURL;
  };
  return {
    addToCartFromCompareList,
    anchorList: mapDataToAnchorList({
      insights,
      installation,
      isPLA,
      technicalSpecs,
    }),
    assetList,
    breadcrumbs: mapDataToBreadcrumbs({
      siteProduct,
      router,
    }),
    currentPath: asPath,
    faq: mapDataToFAQ({ siteProduct, globals }),
    insights,
    installation,
    instantRebateInsight,
    isLoading,
    isPLA,
    linkingData: mapDataToLinkingData({
      hostUrl,
      isPLA,
      router,
      siteProduct,
      siteProductReviews,
    }),
    meta: {
      ...mapDataToMeta({
        brand: productInfo.brand.label,
        productLine: productInfo.productName,
        tireSize: productInfo.size,
      }),
      shareImage: metaImage,
    },
    popularCompareList,
    popularTableData: tableContentFactory(
      compareData.siteCatalogCompareList,
      true,
    ),
    productInfo,
    recirculation: recirculationNoPopular,
    recirculationSize: mapDataToRecirculationSize({
      siteProduct,
      rearSize: queryParams.rearSize,
      tireSize: queryParams.tireSize,
    }),
    reviews: mapDataToReviews({ siteProductReviews, router }),
    siteFaqs,
    sizeFinder: mapDataToSizeFinder({
      currentSizeIndex,
      isFrontAndRear: !!queryParams.rearSize,
      siteProduct,
    }),
    statusCode,
    stickyBar: mapDataToStickyBar({ quantity, siteProduct }),
    technicalSpecs,
  };
}

export default useProductDetail;
