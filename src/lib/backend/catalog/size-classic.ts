import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetTireSizeClassicSummary({
  query,
  size,
}: {
  query?: Record<string, string>;
  size: string | string[];
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: '/v1/site/catalog/tire-sizes/{size}/summary',
    includeAuthorization: true,
    method: 'get',
    params: {
      size,
    },
    query,
  });

  return response;
}

export async function backendGetTireSizeClassicProducts({
  query,
  size,
}: {
  query?: Record<string, string>;
  size: string | string[];
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: '/v1/site/catalog/tire-sizes/{size}/products',
    includeAuthorization: true,
    method: 'get',
    params: {
      size,
    },
    query,
  });

  return response;
}
