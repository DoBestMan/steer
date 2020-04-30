import { backendBootstrap } from './bootstrap';
import { BackendEndpoints } from './constants/endpoints';
import * as FetchModule from './fetch';

describe('backendBootstrap', () => {
  beforeEach(() => {
    jest.spyOn(FetchModule, 'backendSetApiUrlBase').mockImplementation();
  });

  it('configures the mock server by default', () => {
    backendBootstrap();

    const expectedEnvironment = BackendEndpoints['main-api-mock'].apiBaseUrl;

    expect(FetchModule.backendSetApiUrlBase).toHaveBeenCalledWith(
      expectedEnvironment,
    );
  });

  it("configures the local server if environment STEER_BACKEND is 'local'", () => {
    const originalValue = process.env.STEER_BACKEND;

    process.env.STEER_BACKEND = 'local';

    backendBootstrap();

    const expectedEnvironment = BackendEndpoints['main-api-local'].apiBaseUrl;

    expect(FetchModule.backendSetApiUrlBase).toHaveBeenCalledWith(
      expectedEnvironment,
    );

    process.env.STEER_BACKEND = originalValue;
  });
});
