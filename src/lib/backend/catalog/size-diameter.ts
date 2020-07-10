import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetch } from '~/lib/fetch';

export async function backendGetTireSizeDiameterSummary({
  category,
  diameter,
  query,
}: {
  category: string | string[];
  diameter: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetch<{
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    endpoint: `/v1/site/catalog/tire-sizes-landing/${diameter}/${category}/summary`,
    query,
    includeAuthorization: true,
    method: 'get',
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
  const response = await fetch<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: `/v1/site/catalog/tire-sizes-landing/${diameter}/${category}/products`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
