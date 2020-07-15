import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { TIME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { fetch } from '~/lib/fetch';
import { getParam, getStringifiedParams } from '~/lib/utils/routes';

import CatalogPage from './CatalogPage';

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
  hasTopPicks?: boolean;
  pageParams?: Record<string, string>;
}

function CatalogPageContainer({
  endpoints,
  hasTopPicks = true,
  serverData,
  pageParams = {},
}: Props) {
  const { query, push, pathname, asPath } = useRouter();
  const { isSearchOpen } = useSearchContext();

  const catalogGridRef = useRef<HTMLDivElement | null>(null);

  // begin fetching data from /summary and /products
  const queryParams = getStringifiedParams({ ...query, ...pageParams });
  const apiArgs = {
    defaultData: serverData,
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  };

  // fetch site catalog summary
  const {
    data: { siteCatalogSummary },
    error: summaryError,
    hasLocalData,
  } = useApiDataWithDefault<CatalogPageData['serverData']>({
    ...apiArgs,
    endpoint: endpoints.summary,
  });

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

  return (
    <CatalogPageContextProvider
      handleUpdateFilters={handleUpdateFilters}
      showCatalogGridInit={isSearchOpen}
    >
      <CatalogPage
        onPreviewFilters={onPreviewFilters}
        comesFromSearch={isSearchOpen}
        hasLocalData={hasLocalData}
        hasTopPicks={hasTopPicks}
        siteCatalogProducts={siteCatalogProducts}
        siteCatalogSummary={siteCatalogSummary}
        previewFiltersData={previewFiltersData}
        scrollToGrid={scrollToGrid}
        catalogGridRef={catalogGridRef}
      />
    </CatalogPageContextProvider>
  );
}

export default CatalogPageContainer;
