import { ReturnRequestFormInput } from '~/data/models/ReturnRequestFormInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';

import { fetchWithErrorHandling } from '../fetch';

export async function backendSendCancelRequest({
  orderId,
  zip,
  productId,
  body,
}: ReturnRequestInput) {
  const response = await fetchWithErrorHandling<null, ReturnRequestFormInput>({
    endpoint: '/v1/orders/{orderId}/{zip}/{productId}/return',
    includeAuthorization: true,
    jsonBody: body,
    method: 'delete',
    params: {
      orderId,
      zip,
      productId,
    },
  });

  return response;
}
