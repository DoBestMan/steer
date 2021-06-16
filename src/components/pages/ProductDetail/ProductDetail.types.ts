import { SiteModuleProductLineFAQs } from '~/data/models/SiteModules';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';

export interface ProductDetailResponse {
  siteFaqs: SiteModuleProductLineFAQs;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}
