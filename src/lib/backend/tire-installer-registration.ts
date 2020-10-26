import { RegistrationFormRequestObj } from '~/components/pages/TireInstallerRegistrationPage/TireInstallerRegistrationForm/TireInstallerRegistrationForm.types';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSendTireInstallerForm(
  reqObj: RegistrationFormRequestObj,
) {
  return await fetchWithErrorHandling<null, RegistrationFormRequestObj>({
    endpoint: '/v1/site/installer-registration',
    includeAuthorization: true,
    jsonBody: reqObj,
    method: 'post',
  });
}
