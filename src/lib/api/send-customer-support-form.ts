import { SiteCustomerSupportFormInput } from '~/data/models/SiteCustomerSupportFormInput';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSendCustomerSupportForm(
  input: SiteCustomerSupportFormInput,
) {
  return await fetchWithErrorHandling<null, SiteCustomerSupportFormInput>({
    endpoint: '/customer-support',
    jsonBody: input,
    method: 'post',
  });
}
