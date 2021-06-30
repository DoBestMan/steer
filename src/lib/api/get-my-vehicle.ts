import { MyVehicleList } from '~/data/models/MyVehicle';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiGetMyVehicle() {
  const response = await fetchWithErrorHandling<null, MyVehicleList>({
    endpoint: '/my-vehicle',
    method: 'get',
  });
  return response;
}
