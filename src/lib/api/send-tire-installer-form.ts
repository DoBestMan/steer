import { RegistrationFormRequestObj } from '~/components/pages/TireInstallerRegistrationPage/TireInstallerRegistrationForm/TireInstallerRegistrationForm.types';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSendCustomerSupportForm(
  reqObj: RegistrationFormRequestObj,
) {
  return await fetchWithErrorHandling<null, RegistrationFormRequestObj>({
    endpoint: '/tire-installer-registration',
    jsonBody: reqObj,
    method: 'post',
  });
}
