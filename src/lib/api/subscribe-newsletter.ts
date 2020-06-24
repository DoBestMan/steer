import { NewsletterSubscriptionInput } from '~/data/models/NewsletterSubscriptionInput';
import { fetch } from '~/lib/fetch';

export async function apiSubscribeToNewsletter(
  input: NewsletterSubscriptionInput,
) {
  return await fetch<null, NewsletterSubscriptionInput>({
    endpoint: '/subscribe-newsletter',
    jsonBody: input,
    method: 'post',
  });
}
