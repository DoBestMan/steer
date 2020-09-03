import { useRouter } from 'next/router';
import { ReactNode, RefObject, useCallback, useState } from 'react';

import {
  CatalogApiArgs,
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.types';
import { shouldDisplayProductsError } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { AsyncResponse } from '~/lib/fetch/index.types';
import { createContext } from '~/lib/utils/context';
import { getParam, getStringifiedParams } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

import { useCatalogSummaryContext } from './CatalogSummary.context';
import { useGlobalToastContext } from './GlobalToast.context';

export interface CatalogProductsContextProps {
  displayedProducts: SiteCatalogProductItem[];
  fetchNewProducts: (page: number) => Promise<SiteCatalogProducts | null>;
  handleUpdateResults: (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => Promise<void>;
  isAdvancedView: boolean;
  isLoading: boolean;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  scrollToGrid: () => void;
  setDisplayedProducts(products: SiteCatalogProductItem[]): void;
  setIsAdvancedView(isAdvancedView: boolean): void;
  setIsLoading(isLoading: boolean): void;
  siteCatalogProducts: SiteCatalogProducts | null;
}

interface SetupProps {
  apiArgs: CatalogApiArgs;
  catalogGridRef: RefObject<HTMLDivElement | null>;
  endpoint: string;
  pageParams: Record<string, string>;
}

const EMPTY_FILTERS = { filtersList: [], sortList: [] };

const CatalogProductsContext = createContext<CatalogProductsContextProps>();

function useContextSetup({
  apiArgs,
  catalogGridRef,
  endpoint,
  pageParams,
}: SetupProps) {
  const { setGlobalToastMessage } = useGlobalToastContext();
  const { query, push, pathname, asPath } = useRouter();
  const { siteCatalogSummary, stage } = useCatalogSummaryContext();

  const [isAdvancedView, setIsAdvancedView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<
    SiteCatalogProductItem[]
  >([]);
  const [productsData, setProductsData] = useState<
    CatalogPageData['serverData']['siteCatalogProducts']
  >(null);
  const [previewFiltersData, setPreviewFiltersData] = useState({
    totalMatches: 0,
    filters: EMPTY_FILTERS as SiteCatalogFilters,
  });

  const handleUpdateResults = async (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => {
    setIsLoading(true);
    const response = await handleUpdateFilters(filters, withoutScroll);
    if (!response.isSuccess) {
      setIsLoading(false);
      throw new Error(ui('error.generic'));
    } else {
      setDisplayedProducts([]);
      eventEmitters.setNavVisibility.emit({ isVisible: true });
      setIsLoading(false);
    }
  };

  // fetch site catalog products
  const { error: productsError, isValidating } = useApiDataWithDefault<
    CatalogPageData['serverData']
  >({
    ...apiArgs,
    endpoint,
    options: {
      onSuccess: (data) => {
        setProductsData(data?.siteCatalogProducts);
        setPreviewFiltersData({
          totalMatches:
            data?.siteCatalogProducts.listResultMetadata.pagination?.total || 0,
          filters:
            data?.siteCatalogProducts.siteCatalogFilters || EMPTY_FILTERS,
        });
      },
    },
  });

  if (productsError) {
    console.error(productsError);
  }
  if (
    stage === STAGES.RESULTS &&
    shouldDisplayProductsError(siteCatalogSummary) &&
    !productsData &&
    !isValidating
  ) {
    throw new Error(
      productsError
        ? productsError.message
        : 'An error occurred while fetching products',
    );
  }

  const scrollToGrid = useCallback(() => {
    if (catalogGridRef && catalogGridRef.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: catalogGridRef.current.offsetTop,
      });
    }
  }, [catalogGridRef]);

  // appends filters to existing URL query params
  const handleUpdateFilters = useCallback(
    async (filters: Record<string, string>, withoutScroll) => {
      if (!withoutScroll) {
        scrollToGrid();
      }

      const route = asPath.split('?');
      const params: Record<string, string> = {};

      // Skip page transition when updating filters
      eventEmitters.skipPageTransition.emit(null);

      Object.entries({ ...query, ...filters }).forEach(([k, v]) => {
        const stringifiedVal = getParam(v);
        if (!!stringifiedVal && !pageParams[k]) {
          params[k] = stringifiedVal;
        }
      });

      const searchString = new URLSearchParams(params).toString();
      push(`${pathname}?${searchString}`, `${route[0]}?${searchString}`, {
        shallow: true,
      });

      setIsLoading(true);

      const response: AsyncResponse<{
        siteCatalogProducts: SiteCatalogProducts;
      }> = await fetchWithErrorHandling({
        endpoint,
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        query: { ...params, ...pageParams },
      });

      if (response.isSuccess) {
        setIsLoading(false);
        setProductsData(response.data.siteCatalogProducts);
      }

      return response;
    },
    [asPath, pathname, query, pageParams, push, scrollToGrid, endpoint],
  );

  // preview data and handler for open filter dropdowns
  const onPreviewFilters = useCallback(
    async (filters?: Record<string, string>) => {
      // data was previewed but closed before applying - reset to initial state
      if (!filters) {
        setPreviewFiltersData({
          totalMatches: productsData?.listResultMetadata.pagination?.total || 0,
          filters: productsData?.siteCatalogFilters || EMPTY_FILTERS,
        });
      }

      const response: AsyncResponse<{
        siteCatalogProducts: SiteCatalogProducts;
      }> = await fetchWithErrorHandling({
        endpoint,
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        // order is important, `pageParams` needs to override `query` values
        query: { ...getStringifiedParams(query), ...filters, ...pageParams },
      });

      if (!response.isSuccess) {
        throw new Error(ui('error.generic'));
      }

      const { siteCatalogProducts: previewedProducts } = response.data;
      setPreviewFiltersData({
        totalMatches:
          previewedProducts.listResultMetadata.pagination?.total || 0,
        filters: previewedProducts.siteCatalogFilters,
      });
    },
    [productsData, endpoint, pageParams, query],
  );

  const fetchNewProducts = useCallback(
    async (page) => {
      const queryParams = getStringifiedParams({
        ...query,
        ...pageParams,
      });

      const response: AsyncResponse<{
        siteCatalogProducts: SiteCatalogProducts;
      }> = await fetchWithErrorHandling({
        endpoint,
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        query: { ...queryParams, page },
      });

      if (response.isSuccess) {
        return response.data.siteCatalogProducts;
      }

      setGlobalToastMessage(ui('error.generic'));
      return null;
    },
    [pageParams, setGlobalToastMessage, endpoint, query],
  );

  return {
    displayedProducts,
    fetchNewProducts,
    handleUpdateResults,
    isAdvancedView,
    isLoading,
    onPreviewFilters,
    previewFiltersData,
    scrollToGrid,
    setDisplayedProducts,
    setIsAdvancedView,
    setIsLoading,
    siteCatalogProducts: productsData,
  };
}

interface Props extends SetupProps {
  children: ReactNode;
}

export function CatalogProductsContextProvider({
  apiArgs,
  catalogGridRef,
  children,
  endpoint,
  pageParams,
}: Props) {
  const value = useContextSetup({
    apiArgs,
    catalogGridRef,
    endpoint,
    pageParams,
  });

  return (
    <CatalogProductsContext.Provider value={value}>
      {children}
    </CatalogProductsContext.Provider>
  );
}

export const useCatalogProductsContext = CatalogProductsContext.useContext;
