import { SiteCompareProductsResult } from '~/data/models/SiteCompareProductsResult';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { AsyncResponse } from '~/lib/fetch/index.types';

export async function backendGetSiteCompareProductsResult({
  productId,
  query,
}: {
  productId: string;
  query: Record<string, string>;
}): Promise<AsyncResponse<SiteCompareProductsResult>> {
  return await fetchWithErrorHandling<SiteCompareProductsResult>({
    endpoint: `/v2/site/products/${productId}/compare`,
    includeAuthorization: true,
    includeUserRegion: true,
    includeUserZip: true,
    method: 'get',
    query,
  });
}
