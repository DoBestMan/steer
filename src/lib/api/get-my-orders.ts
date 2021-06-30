import { MyOrders } from '~/data/models/MyOrders';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetMyOrders(page: string) {
  const response = await fetchWithErrorHandling<null, MyOrders>({
    endpoint: '/my-orders',
    method: 'get',
    query: { page },
  });
  return response;
}
