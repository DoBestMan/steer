import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import { PageResponse } from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { validTiresQuery } from '~/lib/utils/regex';
import { getStringifiedParams, validateRoute } from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  ReviewListingServerData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { category, ...params } = context.query;
  const isRouteValid = validateRoute(category, validTiresQuery);

  if (!isRouteValid) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  // Category tire reviews accept params for sort, order and page
  const queryParams = getStringifiedParams(params);

  // tireCategory acts as a query param for the tire reviews end point so add it to the query params
  queryParams.tireCategory = removeTireFromQueryParam(category);

  const tireReviews = await backendGetReviewListing({ query: queryParams });

  if (!tireReviews.reviewsList.length) {
    context.res.statusCode = 404;
    return { props: { errorStatusCode: 404 } };
  }

  const props: ReviewListingServerData = {
    category: queryParams.tireCategory,
    serverData: {
      tireReviews,
    },
  };

  return {
    props,
  };
};

export default Reviews;
