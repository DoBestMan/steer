import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { validTiresQuery } from '~/lib/utils/regex';
import { validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

const Reviews = WithErrorPageHandling(ReviewListingPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  ReviewListingServerData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { category } = context.query;
  const isRouteValid = validateRoute(category, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const tireCategory = removeTireFromQueryParam(category);
  const tireReviewsRes = await backendGetReviewListing({
    query: { tireCategory },
  });

  if (!tireReviewsRes.isSuccess) {
    context.res.statusCode = tireReviewsRes.error.statusCode;
    return { props: { errorStatusCode: tireReviewsRes.error.statusCode } };
  }

  if (!tireReviewsRes.data.reviewsList.length) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const props: ReviewListingServerData = {
    category: tireCategory,
    serverData: {
      tireReviews: tireReviewsRes.data,
    },
  };

  return {
    props,
  };
};

export default Reviews;
