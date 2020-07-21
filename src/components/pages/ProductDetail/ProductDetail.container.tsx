import { ProductDetailResponse } from '~/pages/api/product-detail';

import ProductDetail from './ProductDetail';
import { ProductDetailContextProvider } from './ProductDetail.context';

export interface ProductDetailData {
  serverData: ProductDetailResponse;
}

function ProductDetailContainer({ serverData }: ProductDetailData) {
  return (
    <ProductDetailContextProvider>
      <ProductDetail serverData={serverData} />
    </ProductDetailContextProvider>
  );
}

export default ProductDetailContainer;
