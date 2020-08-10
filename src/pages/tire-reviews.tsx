import { GetStaticProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { REVALIDATE } from '~/lib/constants';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getStaticProps: GetStaticProps<ReviewListingServerData> = async () => {
  backendBootstrap();

  const tireReviews = await backendGetReviewListing({});

  const props: ReviewListingServerData = {
    serverData: {
      tireReviews,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default Reviews;
