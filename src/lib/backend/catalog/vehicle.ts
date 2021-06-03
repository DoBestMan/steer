import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { getStringifiedParams } from '~/lib/utils/routes';

export async function backendGetVehicleSummary({
  make,
  model,
  query,
  trim,
  year,
}: {
  make: string | string[];
  model: string | string[];
  query?: Record<string, string>;
  trim?: string | string[];
  year: string | string[];
}) {
  query = trim ? getStringifiedParams() : query;
  const response = await fetchWithErrorHandling<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: '/v1/site/catalog/vehicles/{make}/{model}/{year}/summary',
    includeAuthorization: true,
    method: 'get',
    params: {
      make,
      model,
      year,
    },
    query,
  });

  return response;
}

export async function backendGetVehicleProducts({
  make,
  model,
  query,
  trim,
  year,
}: {
  make: string | string[];
  model: string | string[];
  query?: Record<string, string>;
  trim?: string | string[];
  year: string | string[];
}) {
  query = trim ? getStringifiedParams() : query;
  const response = await fetchWithErrorHandling<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: '/v1/site/catalog/vehicles/{make}/{model}/{year}/products',
    includeAuthorization: true,
    method: 'get',
    params: {
      make,
      model,
      year,
    },
    query,
  });

  return response;
}
