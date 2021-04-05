import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';

import { fetchWithErrorHandling } from '../fetch';

export async function backendSendEmailReciept({
  orderId,
  zip,
}: OrderTrackingInput) {
  const response = await fetchWithErrorHandling<null, OrderTrackingInput>({
    endpoint: '/v1/orders/{orderId}/{zip}/email-receipt/',
    includeAuthorization: true,
    method: 'get',
    params: {
      orderId,
      zip,
    },
  });
  return response;
}
