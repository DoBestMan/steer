import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';

import ProductDetail from './ProductDetail';
import { ProductDetailContextProvider } from './ProductDetail.context';

export interface ProductDetailResponse {
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  return (
    <ProductDetailContextProvider serverData={serverData}>
      <ProductDetail serverData={serverData} />
    </ProductDetailContextProvider>
  );
}

export default ProductDetailContainer;
