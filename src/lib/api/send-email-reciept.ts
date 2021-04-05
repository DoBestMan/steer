import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSendEmailReciept({
  orderId,
  zip,
}: OrderTrackingInput) {
  return await fetchWithErrorHandling<null, OrderTrackingInput>({
    endpoint: '/email-reciept',
    query: { orderId, zip },
    method: 'get',
  });
}
