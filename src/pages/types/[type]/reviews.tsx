import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ReviewListingServerData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const queryParams: Record<string, string> = {};
  const { type, ...params } = context.query;

  // Type tire reviews accept params for sort, order and page
  Object.entries(params).map(([key, value]) => {
    if (typeof value === 'string') {
      queryParams[key] = value;
    }
  });

  // tireType acts as a query param for the tire reviews end point so add it to the query params
  queryParams.tireType = type.toString();

  const tireReviews = await backendGetReviewListing({ query: queryParams });

  const props: ReviewListingServerData = {
    serverData: {
      tireReviews,
    },
  };

  return {
    props,
  };
};

export default Reviews;