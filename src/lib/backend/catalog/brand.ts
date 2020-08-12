import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetch, fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetBrandSummary({
  brand,
  category,
  query,
}: {
  brand: string | string[];
  category: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetch<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: '/v1/site/catalog/brands/{brand}/{category}/summary',
    includeAuthorization: true,
    method: 'get',
    params: {
      brand,
      category,
    },
    query,
  });

  return response;
}

export async function backendGetBrandProducts({
  brand,
  category,
  query,
}: {
  brand: string | string[];
  category: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: '/v1/site/catalog/brands/{brand}/{category}/products',
    includeAuthorization: true,
    method: 'get',
    params: {
      brand,
      category,
    },
    query,
  });

  return response;
}
