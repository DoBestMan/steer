import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { fetch } from '~/lib/fetch';
import { getStringifiedParams } from '~/lib/utils/routes';

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
  pageParams,
}: Props) {
  // TEMP: use route params for testing flows
  const { query, push, pathname, asPath } = useRouter();
  const { isSearch } = query;

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

  // appends filters to existing URL query params
  const handleUpdateFilters = useCallback(
    async (filters: Record<string, string>) => {
      const route = asPath.split('?');
      const params: Record<string, string> = {};
      const searchString = new URLSearchParams({
        ...params,
        ...filters,
      }).toString();

      push(`${pathname}?${searchString}`, `${route[0]}?${searchString}`, {
        shallow: true,
      });

      // revalidate with newly applied filters
      await revalidateProducts();
    },
    [asPath, pathname, push, revalidateProducts],
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
      showCatalogGridInit={isSearch !== 'true'}
    >
      <CatalogPage
        onPreviewFilters={onPreviewFilters}
        comesFromSearch={isSearch === 'true'}
        hasTopPicks={hasTopPicks}
        siteCatalogProducts={siteCatalogProducts}
        siteCatalogSummary={siteCatalogSummary}
        previewFiltersData={previewFiltersData}
      />
    </CatalogPageContextProvider>
  );
}

export default CatalogPageContainer;
