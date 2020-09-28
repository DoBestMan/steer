import { Order } from '~/data/models/Order';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetOrderTracking({
  orderId,
  zip,
}: OrderTrackingInput) {
  const response = await fetchWithErrorHandling<{ order: Order }>({
    endpoint: '/v1/orders/{orderId}/{zip}',
    includeAuthorization: true,
    method: 'get',
    params: {
      orderId,
      zip,
    },
  });

  return response;
}
