import { SiteProductLineReviewItemInput } from '~/data/models/SiteProductLineReviewItemInput';

import { fetch } from '../fetch';

export async function backendPostProductReview({
  brand,
  productLine,
  input,
}: {
  brand: string | string[];
  input: SiteProductLineReviewItemInput;
  productLine: string | string[];
}) {
  const response = await fetch<null, SiteProductLineReviewItemInput>({
    endpoint: `/v1/site/products/${brand}/${productLine}/reviews`,
    includeAuthorization: true,
    jsonBody: input,
    method: 'post',
  });

  return response;
}
