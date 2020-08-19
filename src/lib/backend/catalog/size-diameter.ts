import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetTireSizeDiameterSummary({
  category,
  diameter,
  query,
}: {
  category: string | string[];
  diameter: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint:
      '/v1/site/catalog/tire-sizes-landing/{diameter}/{category}/summary',
    includeAuthorization: true,
    method: 'get',
    params: {
      category,
      diameter,
    },
    query,
  });

  return response;
}

export async function backendGetTireSizeDiameterProducts({
  category,
  diameter,
  query,
}: {
  category: string | string[];
  diameter: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint:
      '/v1/site/catalog/tire-sizes-landing/{diameter}/{category}/products',
    includeAuthorization: true,
    method: 'get',
    params: {
      category,
      diameter,
    },
    query,
  });

  return response;
}
