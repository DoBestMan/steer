import { BackendEndpoints } from './constants/endpoints';
import { backendSetApiUrlBase } from './fetch';

export function backendBootstrap() {
  if ('STEER_BACKEND' in process.env && process.env.STEER_BACKEND === 'local') {
    backendSetApiUrlBase(BackendEndpoints['main-api-local'].apiBaseUrl);
    return;
  }

  backendSetApiUrlBase(BackendEndpoints['main-api-mock'].apiBaseUrl);
}
