import { GetServerSideProps } from 'next';

import ProductDetailContainer, {
  ProductDetailData,
} from '~/components/pages/ProductDetail/ProductDetail.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';

function ProductLine(props: ProductDetailData) {
  return <ProductDetailContainer {...props} />;
}

export const getServerSideProps: GetServerSideProps<ProductDetailData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brandName, productLine } = context.query;

  const brand = brandName.toString().replace(/-tire/g, '');

  const serverData = await backendGetProductDetail({
    brand,
    productLine,
  });

  const props: ProductDetailData = {
    serverData,
  };

  return {
    props,
  };
};

export default ProductLine;
