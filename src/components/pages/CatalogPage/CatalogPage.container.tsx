import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import Meta from '~/components/global/Meta/Meta';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { TIME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { fetch } from '~/lib/fetch';
import { getParam, getStringifiedParams } from '~/lib/utils/routes';

import CatalogPage from './CatalogPage';
import { mapDataToMeta, SearchBy, SearchByParams } from './mapppers/meta';

export const CATALOG_PARAMS = ['group', 'skipGroups'];

export interface CatalogPageData {
  serverData: {
    siteCatalogProducts: SiteCatalogProducts;
    siteCatalogSummary: SiteCatalogSummary;
  };
}

interface Props extends CatalogPageData {
  endpoints: {
    products: string;
    summary: string;
  };
  pageParams?: Record<string, string>;
  searchBy: SearchBy;
  searchByParams: SearchByParams;
}

function CatalogPageContainer({
  endpoints,
  serverData,
  pageParams = {},
  searchBy,
  searchByParams,
}: Props) {
  const { query, push, pathname, asPath } = useRouter();
  const { isSearchOpen } = useSearchContext();
  const meta = mapDataToMeta({ searchBy, searchByParams });

  const catalogGridRef = useRef<HTMLDivElement | null>(null);

  // begin fetching data from /summary and /products
  const queryParams = getStringifiedParams({
    ...query,
    ...pageParams,
    page: '1',
  });
  const apiArgs = {
    defaultData: serverData,
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  };

  /**
   * Combine the `hasLocalData` and data states, so that they can be
   * set simultaneously on fetch success.
   */
  const [{ hasLocalData, siteCatalogSummary }, setSummaryState] = useState({
    hasLocalData: false,
    siteCatalogSummary: serverData.siteCatalogSummary,
  });

  /**
   * Fetch site catalog summary
   * Note that unusually this hook does not return the data directly,
   * but sets it to local state via the `onSuccess` callback. This was
   * done to solve an issue where the downstream components were
   * receiving the `hasLocalData: true` prop before the updated data.
   */
  const { error: summaryError } = useApiDataWithDefault<
    CatalogPageData['serverData']
  >({
    ...apiArgs,
    endpoint: endpoints.summary,
    options: {
      onSuccess: (data) => {
        setSummaryState({
          hasLocalData: true,
          siteCatalogSummary: data.siteCatalogSummary,
        });
      },
    },
  });

  useEffect(() => {
    const handleResetSummary = () => {
      // Reset hasLocalData state on `useApiData` hook
      setSummaryState((summaryState) => ({
        ...summaryState,
        hasLocalData: false,
      }));

      // Reset scroll position to top
      window.scrollTo(0, 0);
    };

    eventEmitters.newCatalogSearchQuery.on(handleResetSummary);

    return () => {
      eventEmitters.newCatalogSearchQuery.off(handleResetSummary);
    };
  }, []);

  // fetch site catalog products
  const {
    data: { siteCatalogProducts },
    error: productsError,
    revalidate: revalidateProducts,
  } = useApiDataWithDefault<CatalogPageData['serverData']>({
    ...apiArgs,
    endpoint: endpoints.products,
  });

  if (summaryError || productsError) {
    console.error(summaryError || productsError);
  }

  const scrollToGrid = () => {
    if (catalogGridRef && catalogGridRef.current) {
      catalogGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // appends filters to existing URL query params
  const handleUpdateFilters = useCallback(
    async (filters: Record<string, string>, withoutScroll) => {
      const route = asPath.split('?');
      const params: Record<string, string> = {};

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

      // revalidate with newly applied filters
      await revalidateProducts();
      if (!withoutScroll) {
        setTimeout(scrollToGrid, TIME.MS350);
      }
    },
    [asPath, pathname, query, pageParams, push, revalidateProducts],
  );

  // preview data and handler for open filter dropdowns
  const [previewFiltersData, setPreviewFiltersData] = useState(
    siteCatalogProducts.siteCatalogFilters,
  );

  const onPreviewFilters = useCallback(
    async (filters: Record<string, string>) => {
      const { siteCatalogProducts } = await fetch({
        endpoint: endpoints.products,
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        query: { ...filters, ...pageParams },
      });
      setPreviewFiltersData(siteCatalogProducts.siteCatalogFilters);
    },
    [endpoints.products, pageParams],
  );

  const fetchNewProducts = useCallback(
    async (page) => {
      const queryParams = getStringifiedParams({
        ...query,
        ...pageParams,
      });

      const { siteCatalogProducts } = await fetch({
        endpoint: endpoints.products,
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        query: { ...queryParams, page },
      });
      return siteCatalogProducts;
    },
    [pageParams, endpoints.products, query],
  );

  /**
   * TODO:
   * - Combine CatalogPageContextProvider & CatalogSummaryContextProvider
   *   into a single context instance
   */
  return (
    <>
      {meta && <Meta {...meta} />}
      <CatalogPageContextProvider handleUpdateFilters={handleUpdateFilters}>
        <CatalogSummaryContextProvider
          comesFromSearch={isSearchOpen}
          hasLocalData={hasLocalData}
          siteCatalogSummary={siteCatalogSummary}
        >
          <CatalogPage
            onPreviewFilters={onPreviewFilters}
            siteCatalogProducts={siteCatalogProducts}
            siteCatalogSummary={siteCatalogSummary}
            previewFiltersData={previewFiltersData}
            scrollToGrid={scrollToGrid}
            catalogGridRef={catalogGridRef}
            fetchNewProducts={fetchNewProducts}
          />
        </CatalogSummaryContextProvider>
      </CatalogPageContextProvider>
    </>
  );
}

export default CatalogPageContainer;
