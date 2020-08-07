import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { validBrandQuery as validTiresQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  redirectToNotFound,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ReviewListingServerData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { category, ...params } = context.query;

  validateOrRedirectToNotFound({
    param: category,
    pattern: validTiresQuery,
    response: context.res,
  });

  // Category tire reviews accept params for sort, order and page
  const queryParams = getStringifiedParams(params);

  // tireCategory acts as a query param for the tire reviews end point so add it to the query params
  queryParams.tireCategory = removeTireFromQueryParam(category);

  const tireReviews = await backendGetReviewListing({ query: queryParams });

  if (!tireReviews.reviewsList.length) {
    redirectToNotFound(context.res);
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
