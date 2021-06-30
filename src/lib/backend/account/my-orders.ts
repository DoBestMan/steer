import {
  DeleteOrdersInput,
  MyOrdersInput,
} from '~/components/modules/Account/Account.types';
import { MyOrders } from '~/data/models/MyOrders';
import { fetch, fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetMyOrders({ userId, page }: MyOrdersInput) {
  const response = await fetchWithErrorHandling<null, MyOrders>({
    endpoint: `/v2/users/${userId}/orders`,
    method: 'get',
    includeAuthorization: true,
    params: { page },
  });
  return response;
}

export async function backendDeleteMyOrder({
  userId,
  orderId,
}: DeleteOrdersInput) {
  try {
    const data = await fetch({
      endpoint: `/v2/users/${userId}/orders/${orderId}`,
      method: 'delete',
      includeAuthorization: true,
    });
    return {
      data,
      isSuccess: true,
    };
  } catch (e) {
    return {
      error: {
        code: e.code,
        message: e.data.errorMessage,
        statusCode: e.data.errorCode || 500,
      },
      isSuccess: false,
    };
  }
}
