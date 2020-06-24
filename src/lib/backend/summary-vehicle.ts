import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import { fetch } from '../fetch';

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
    endpoint: `/v1/site/catalog/vehicles/${make}/${model}/${year}/summary`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
