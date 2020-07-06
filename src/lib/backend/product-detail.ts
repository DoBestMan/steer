import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';

import { fetch } from '../fetch';

export async function backendGetProductDetail({
  brand,
  productLine,
  query,
}: {
  brand: string | string[];
  productLine: string | string[];
  query?: Record<string, string>;
}) {
  const response = await fetch<SiteProduct>({
    endpoint: `/v1/site/products/${brand}/${productLine}`,
    query,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}

export async function backendGetProductReviews({
  brand,
  productLine,
}: {
  brand: string | string[];
  productLine: string | string[];
}) {
  const response = await fetch<SiteProductReviews>({
    endpoint: `/v1/site/products/${brand}/${productLine}/reviews`,
    includeAuthorization: true,
    method: 'get',
  });

  return response;
}
