import { GetServerSideProps } from 'next';

import WriteAReviewPage, {
  WriteAReviewServerData,
} from '~/components/pages/WriteAReviewPage/WriteAReviewPage';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetProductDetail } from '~/lib/backend/product-detail';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function WriteAReview(props: WriteAReviewServerData) {
  return <WriteAReviewPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<WriteAReviewServerData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brand, productLine } = context.query;
  const brandName = removeTireFromQueryParam(brand);

  const siteProduct = await backendGetProductDetail({
    brand: brandName,
    productLine,
  });

  const props: WriteAReviewServerData = {
    serverData: { tire: siteProduct.siteProductLine.name },
  };

  return {
    props,
  };
};

export default WriteAReview;
