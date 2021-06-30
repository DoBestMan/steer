import {
  CarInput,
  UpdateVehicleInput,
} from '~/components/modules/Account/Account.types';
import { MyVehicleList } from '~/data/models/MyVehicle';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function backendGetMyVehicle(userId: string) {
  const response = await fetchWithErrorHandling<null, MyVehicleList>({
    endpoint: `/v2/users/${userId}/vehicles`,
    method: 'get',
    includeAuthorization: true,
  });
  return response;
}

export async function backendUpdateMyVehicle(userId: string, body: CarInput) {
  const response = await fetchWithErrorHandling({
    endpoint: `/v2/users/${userId}/vehicles`,
    method: 'post',
    includeAuthorization: true,
    jsonBody: body,
  });
  if (response.isSuccess) {
    const updatedVehicleList = await backendGetMyVehicle(userId);
    return updatedVehicleList;
  }
  return response;
}

export async function backendDeleteMyVehicle({
  userId,
  vehicleId,
}: UpdateVehicleInput) {
  const response = await fetchWithErrorHandling({
    endpoint: `/v2/users/${userId}/vehicles/${vehicleId}`,
    method: 'delete',
    includeAuthorization: true,
  });
  if (response.isSuccess) {
    const updatedVehicleList = await backendGetMyVehicle(userId);
    return updatedVehicleList;
  }
  return response;
}
