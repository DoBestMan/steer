import { GetServerSideProps } from 'next';

import LearnCategoryPage from '~/components/pages/LearnCategoryPage/LearnCategoryPage';
import { SitePageByLearnCategoryResponse } from '~/data/models/SitePageByLearnCategory';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetLearnCategory } from '~/lib/backend/learn-category-slug';
import { getStringifiedParams, redirectToNotFound } from '~/lib/utils/routes';

const LearnCategory = WithErrorPageHandling(LearnCategoryPage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  SitePageByLearnCategoryResponse
>> = async (context) => {
  backendBootstrap({ request: context.req });

  const { category, slug } = getStringifiedParams(context.query);

  if ((!category && !slug) || !category || !slug) {
    redirectToNotFound(context.res);
  }

  const learnCategory = await backendGetLearnCategory(category, slug);

  if (!learnCategory.isSuccess) {
    const errorStatusCode = learnCategory.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      ...learnCategory.data,
    },
  };
};

export default LearnCategory;
