import { SiteTireSalesFormInput } from '~/data/models/SiteTireSalesFormInput';
import { fetch } from '~/lib/fetch';

export async function apiSendTireSalesForm(input: SiteTireSalesFormInput) {
  return await fetch<null, SiteTireSalesFormInput>({
    endpoint: '/tire-sales',
    jsonBody: input,
    method: 'post',
  });
}
