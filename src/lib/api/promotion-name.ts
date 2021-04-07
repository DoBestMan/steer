import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiPromotionName(query: Record<string, string>) {
  return await fetchWithErrorHandling<{ promotionName: string }>({
    endpoint: '/promotion',
    includeAuthorization: true,
    query,
    method: 'get',
  });
}
