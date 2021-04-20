import { ReturnReason } from '~/data/models/ReturnReason';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetReturnReasons() {
  const response = await fetchWithErrorHandling<null, Array<ReturnReason>>({
    endpoint: '/v1/orders/return-reasons/',
    includeAuthorization: true,
    method: 'get',
  });
  return response;
}
