import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ReviewListingServerData> = async (context: {
  req: IncomingMessage;
}) => {
  backendBootstrap({ request: context.req });
  const tireReviews = await backendGetReviewListing();

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
