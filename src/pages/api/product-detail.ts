import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetProductDetail,
  backendGetProductReviews,
} from '~/lib/backend/product-detail';

export interface ProductDetailResponse {
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<ProductDetailResponse>,
) => {
  backendBootstrap({ request });

  const { brandName, productLine, ...rest } = request.query;
  const brand = brandName.toString().replace(/-tire/g, '');

  const params: Record<string, string> = {};
  Object.entries(rest).map(([key, value]) => {
    if (typeof value === 'string') {
      params[key] = value;
    }
  });

  const [siteProduct, siteProductReviews] = await Promise.all([
    backendGetProductDetail({
      brand,
      productLine,
      query: params,
    }),
    backendGetProductReviews({
      brand,
      productLine,
    }),
  ]);

  response.json({ siteProduct, siteProductReviews });
};
