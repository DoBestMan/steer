import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';

import { fetchWithErrorHandling } from '../fetch';

export async function backendGetProductDetail({
  brand,
  productLine,
  query,
}: {
  brand: string;
  productLine: string;
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteProduct>({
    endpoint: '/v1/site/products/{brand}/{productLine}',
    includeAuthorization: true,
    method: 'get',
    params: {
      brand,
      productLine,
    },
    query,
  });

  return response;
}

export async function backendGetProductReviews({
  brand,
  productLine,
  query,
}: {
  brand: string;
  productLine: string;
  query?: Record<string, string>;
}) {
  const response = await fetchWithErrorHandling<SiteProductReviews>({
    endpoint: '/v1/site/products/{brand}/{productLine}/reviews',
    includeAuthorization: true,
    method: 'get',
    params: {
      brand,
      productLine,
    },
    query,
  });

  return response;
}
