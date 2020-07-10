import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetch } from '~/lib/fetch';

export async function backendGetTireSizeClassicSummary({
  query,
  size,
}: {
  query?: Record<string, string>;
  size: string | string[];
}) {
  const response = await fetch<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: `/v1/site/catalog/tire-sizes/${size}/summary`,
    query,
    includeAuthorization: true,
    method: 'get',
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
  const response = await fetch<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: `/v1/site/catalog/tire-sizes/${size}/products`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
