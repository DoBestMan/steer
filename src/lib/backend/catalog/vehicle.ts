import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetch } from '~/lib/fetch';

export async function backendGetVehicleSummary({
  make,
  model,
  query,
  year,
}: {
  make: string | string[];
  model: string | string[];
  query?: Record<string, string>;
  year: string | string[];
}) {
  const response = await fetch<{
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
  year,
}: {
  make: string | string[];
  model: string | string[];
  query?: Record<string, string>;
  year: string | string[];
}) {
  const response = await fetch<{
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
