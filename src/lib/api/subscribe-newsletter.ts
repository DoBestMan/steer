import { NewsletterSubscriptionInput } from '~/data/models/NewsletterSubscriptionInput';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiSubscribeToNewsletter(
  input: NewsletterSubscriptionInput,
) {
  return await fetchWithErrorHandling<null, NewsletterSubscriptionInput>({
    endpoint: '/subscribe-newsletter',
    jsonBody: input,
    method: 'post',
  });
}
