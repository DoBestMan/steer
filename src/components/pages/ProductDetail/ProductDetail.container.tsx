import ProductDetail from './ProductDetail';
import { ProductDetailContextProvider } from './ProductDetail.context';
import { ProductDetailData } from './ProductDetail.types';

function ProductDetailContainer({ serverData }: ProductDetailData) {
  return (
    <ProductDetailContextProvider serverData={serverData}>
      <ProductDetail serverData={serverData} />
    </ProductDetailContextProvider>
  );
}

export default ProductDetailContainer;
