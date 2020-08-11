import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';

export interface ProductDetailResponse {
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}
