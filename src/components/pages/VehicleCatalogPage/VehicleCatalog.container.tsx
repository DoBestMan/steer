import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';

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
    revalidate,
  } = useApiDataWithDefault<VehicleCatalogData['serverData']>({
    ...apiArgs,
    endpoint: '/summary-vehicle',
  });
  // fetch site catalog products -- called when filters change
  const {
    data: { siteCatalogProducts },
    error: productsError,
  } = useApiDataWithDefault<VehicleCatalogData['serverData']>({
    ...apiArgs,
    endpoint: '/products-vehicle',
  });

  if (summaryError || productsError) {
    console.error(summaryError || productsError);
  }

  // appends filters to existing URL query params
  const handleUpdateFilters = useCallback(
    (filters: Record<string, string>) => {
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
    },
    [asPath, queryParams, pathname, push],
  );

  useEffect(() => {
    revalidate();
  }, [revalidate, asPath]);

  return (
    <CatalogPageContainer
      handleUpdateResults={handleUpdateFilters}
      siteCatalogProducts={siteCatalogProducts}
      siteCatalogSummary={siteCatalogSummary}
    />
  );
}

export default VehicleCatalogContainer;
