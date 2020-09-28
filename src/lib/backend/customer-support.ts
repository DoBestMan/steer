import { SiteCustomerSupportFormInput } from '~/data/models/SiteCustomerSupportFormInput';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSendCustomerSupportForm(
  input: SiteCustomerSupportFormInput,
) {
  return await fetchWithErrorHandling<null, SiteCustomerSupportFormInput>({
    endpoint: '/v1/site/customer-support',
    includeAuthorization: true,
    jsonBody: input,
    method: 'post',
  });
}
