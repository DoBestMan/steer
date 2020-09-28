import { SiteTireSalesFormInput } from '~/data/models/SiteTireSalesFormInput';
import { fetch } from '~/lib/fetch';

export async function apiTireSalesForm(input: SiteTireSalesFormInput) {
  return await fetch<null, SiteTireSalesFormInput>({
    endpoint: '/v1/site/tire-sales',
    includeAuthorization: true,
    jsonBody: input,
    method: 'post',
  });
}
