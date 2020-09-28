import { NewsletterSubscriptionInput } from '~/data/models/NewsletterSubscriptionInput';

import { fetchWithErrorHandling } from '../fetch';

export async function backendSubscribeNewsletter(
  input: NewsletterSubscriptionInput,
) {
  const response = await fetchWithErrorHandling<
    null,
    NewsletterSubscriptionInput
  >({
    endpoint: '/v1/newsletter/subscribe',
    includeAuthorization: true,
    jsonBody: input,
    method: 'post',
  });

  return response;
}
