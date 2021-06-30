import { OrderReciept } from '~/data/models/OrderReciept';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetOrderReciept({
  orderId,
  zip,
}: OrderTrackingInput) {
  const response = await fetchWithErrorHandling<null, OrderReciept>({
    endpoint: '/v1/orders/{orderId}/{zip}/receipt/',
    includeAuthorization: true,
    method: 'get',
    params: {
      orderId,
      zip,
    },
  });
  return response;
}
