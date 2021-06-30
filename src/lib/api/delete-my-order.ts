import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiDeleteMyOrder(orderId: string) {
  const response = await fetchWithErrorHandling({
    endpoint: '/delete-my-order',
    method: 'delete',
    includeAuthorization: true,
    query: { orderId },
  });
  return response;
}
