import { SiteCompareProductsResult } from '~/data/models/SiteCompareProductsResult';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetSiteCompareProductsResult({
  query,
  signal,
  includeUserRegion,
  includeUserZip,
  ...rest
}: {
  includeUserRegion: boolean;
  includeUserZip: boolean;
  query: Record<string, string>;
  signal?: AbortSignal;
}) {
  return await fetchWithErrorHandling<
    SiteCompareProductsResult,
    SiteCompareProductsResult
  >({
    endpoint: '/compare-products',
    includeUserRegion,
    includeUserZip,
    method: 'get',
    query,
    signal,
    ...rest,
  });
}
