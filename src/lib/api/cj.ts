import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiCjToSetCookie(cjevent: string) {
  return await fetchWithErrorHandling<{ cjevent: string }>({
    endpoint: '/cj',
    includeAuthorization: true,
    method: 'get',
    query: { cjevent },
  });
}
