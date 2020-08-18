import { SiteCustomerSupportFormInput } from '~/data/models/SiteCustomerSupportFormInput';
import { fetch } from '~/lib/fetch';

export async function apiSendCustomerSupportForm(
  input: SiteCustomerSupportFormInput,
) {
  return await fetch<null, SiteCustomerSupportFormInput>({
    endpoint: '/customer-support',
    jsonBody: input,
    method: 'post',
  });
}
