import { CarInput } from '~/components/modules/Account/Account.types';
import { MyVehicleList } from '~/data/models/MyVehicle';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiAddMyVehicle(body: CarInput) {
  const response = await fetchWithErrorHandling({
    endpoint: '/add-my-vehicle',
    method: 'post',
    jsonBody: body,
  });
  return response;
}

export async function apiDeleteMyVehicle(vehicleId: string) {
  const response = await fetchWithErrorHandling<null, MyVehicleList>({
    endpoint: '/delete-my-vehicle',
    method: 'delete',
    query: { vehicleId },
  });
  return response;
}
