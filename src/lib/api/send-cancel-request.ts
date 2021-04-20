import { ReturnRequestFormInput } from '~/data/models/ReturnRequestFormInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { fetchWithErrorHandling } from '~/lib/fetch';
export async function apiSendCancelRequest({
  orderId,
  zip,
  productId,
  body,
}: ReturnRequestInput) {
  return await fetchWithErrorHandling<null, ReturnRequestFormInput>({
    endpoint: '/cancel-request',
    query: { orderId, zip, productId },
    jsonBody: body,
    method: 'delete',
  });
}
