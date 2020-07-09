import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { fetch } from '~/lib/fetch';

export interface VehicleCatalogData {
  serverData: {
    siteCatalogProducts: SiteCatalogProducts;
    siteCatalogSummary: SiteCatalogSummary;
  };
}

export const VEHICLE_PARAMS = [
  'trim',
  'tireSize',
  'loadIndex',
  'speedRating',
  'oem',
  'group',
  'skipGroups',
];

function VehicleCatalogContainer({ serverData }: VehicleCatalogData) {
  const { query, push, pathname, asPath } = useRouter();
  const { make: _make, model: _model, year: _year, ...rest } = query;
  const queryParams: Record<string, string> = {};

  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[key] = value;
    }
  });

  const apiArgs = {
    defaultData: serverData,
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  };
  // fetch site catalog summary -- only called once
  const {
    data: { siteCatalogSummary },
    error: summaryError,
  } = useApiDataWithDefault<VehicleCatalogData['serverData']>({
    ...apiArgs,
    endpoint: '/summary-vehicle',
  });
  // fetch site catalog products -- called when filters change
  const {
    data: { siteCatalogProducts },
    error: productsError,
    revalidate: revalidateProducts,
  } = useApiDataWithDefault<VehicleCatalogData['serverData']>({
    ...apiArgs,
    endpoint: '/products-vehicle',
  });

  if (summaryError || productsError) {
    console.error(summaryError || productsError);
  }

  // appends filters to existing URL query params
  const handleUpdateFilters = useCallback(
    async (filters: Record<string, string>) => {
      const route = asPath.split('?');
      const params: Record<string, string> = {};
      Object.keys(queryParams).forEach((k) => {
        if (VEHICLE_PARAMS.includes(k)) {
          // filter out stale filter keys if they have been removed
          params[k] = queryParams[k];
        }
      });
      const searchString = new URLSearchParams({
        ...params,
        ...filters,
      }).toString();

      push(`${pathname}?${searchString}`, `${route[0]}?${searchString}`, {
        shallow: true,
      });
      await revalidateProducts();
    },
    [asPath, queryParams, pathname, push, revalidateProducts],
  );

  const [previewFiltersData, setPreviewFiltersData] = useState(
    siteCatalogProducts.siteCatalogFilters,
  );
  const onPreviewFilters = useCallback(
    async (filters: Record<string, string>) => {
      const { siteCatalogProducts } = await fetch({
        endpoint: '/products-vehicle',
        includeUserRegion: true,
        includeUserZip: true,
        method: 'get',
        query: filters,
      });
      setPreviewFiltersData(siteCatalogProducts.siteCatalogFilters);
    },
    [],
  );

  return (
    <CatalogPageContainer
      onPreviewFilters={onPreviewFilters}
      handleUpdateFilters={handleUpdateFilters}
      siteCatalogProducts={siteCatalogProducts}
      siteCatalogSummary={siteCatalogSummary}
      previewFiltersData={previewFiltersData}
    />
  );
}

export default VehicleCatalogContainer;
