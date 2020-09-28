import { GetStaticProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { REVALIDATE } from '~/lib/constants';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getStaticProps: GetStaticProps<PageResponse<
  ReviewListingServerData
>> = async () => {
  backendBootstrap();

  const tireReviewsRes = await backendGetReviewListing({});

  if (!tireReviewsRes.isSuccess) {
    return { props: { errorStatusCode: tireReviewsRes.error.statusCode } };
  }

  const props: ReviewListingServerData = {
    serverData: {
      tireReviews: tireReviewsRes.data,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default WithErrorPageHandling(Reviews);
