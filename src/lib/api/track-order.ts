import { Order } from '~/data/models/Order';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { fetch } from '~/lib/fetch';

export async function apiGetOrderTracking({
  orderId,
  zip,
}: OrderTrackingInput) {
  return await fetch<{ order: Order }>({
    endpoint: '/order-tracking',
    includeAuthorization: true,
    query: { orderId, zip },
    method: 'get',
  });
}
