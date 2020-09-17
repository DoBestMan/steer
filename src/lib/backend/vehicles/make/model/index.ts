import { SiteVehicleMakeModelList } from '~/data/models/SiteVehicleMakeModelList';
import { fetchWithErrorHandling } from '~/lib/fetch';
import { AsyncResponse } from '~/lib/fetch/index.types';

export async function backendGetSiteVehicleMakeModelList(
  makeName: string,
  modelName: string,
): Promise<AsyncResponse<SiteVehicleMakeModelList>> {
  return await fetchWithErrorHandling<SiteVehicleMakeModelList>({
    endpoint: `/v1/site/vehicles/${makeName}/${modelName}`,
    includeAuthorization: true,
    method: 'get',
  });
}
