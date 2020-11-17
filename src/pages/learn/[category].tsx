import { GetServerSideProps } from 'next';

import LearnByCategoryPage from '~/components/pages/LearnByCategoryPage/LearnByCategoryPage';
import { SiteLearnByCategory } from '~/data/models/SiteLearnByCategory';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetLearnByCategory } from '~/lib/backend/learn-category';
import { AsyncResponse } from '~/lib/fetch/index.types';
import { getStringifiedParams } from '~/lib/utils/routes';

function LearnByCategory(props: SiteLearnByCategory) {
  return <LearnByCategoryPage pageData={props} />;
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  SiteLearnByCategory
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { category, page = 1 } = getStringifiedParams(context.query);

  const serverData: AsyncResponse<SiteLearnByCategory> = await backendGetLearnByCategory(
    {
      category,
      query: {
        page: page as string,
      },
    },
  );
  if (!serverData.isSuccess) {
    const errorStatusCode = !serverData.isSuccess
      ? serverData.error.statusCode
      : 500;

    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  if (!serverData.data) {
    return { props: { errorStatusCode: 404 } };
  }

  return {
    props: {
      ...serverData.data,
    },
  };
};
export default WithErrorPageHandling(LearnByCategory);
