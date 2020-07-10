import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { fetch } from '~/lib/fetch';

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
    endpoint: `/v1/site/catalog/brands/${brand}/${category}/summary`,
    query,
    includeAuthorization: true,
    method: 'get',
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
  const response = await fetch<{
    siteCatalogProducts: SiteCatalogProducts;
  }>({
    endpoint: `/v1/site/catalog/brands/${brand}/${category}/products`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
