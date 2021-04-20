import { ReturnReason } from '~/data/models/ReturnReason';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetReturnReasons() {
  return await fetchWithErrorHandling<null, Array<ReturnReason>>({
    endpoint: '/return-reasons',
    method: 'get',
  });
}
