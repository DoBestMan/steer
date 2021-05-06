import { GetServerSideProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { getStringifiedParams, redirectToNotFound } from '~/lib/utils/routes';

type OpenTemplatePageProps = {
  pageData: PageData;
};

const BASE_PATH = 'press/';
const PressCategory = WithErrorPageHandling(OpenTemplatePage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  OpenTemplatePageProps
>> = async (context) => {
  backendBootstrap({ request: context.req });

  const { category, slug } = getStringifiedParams(context.query);

  if ((!category && !slug) || !category || !slug) {
    redirectToNotFound(context.res);
  }

  const pressCategory = await backendGetPageSlug(slug);

  if (!pressCategory.isSuccess) {
    const errorStatusCode = pressCategory.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  if (!pressCategory.data.basePath?.includes(BASE_PATH)) {
    const statusCode = 410;
    context.res.statusCode = statusCode;
    return {
      props: { errorStatusCode: statusCode },
    };
  }

  return {
    props: {
      pageData: pressCategory.data,
    },
  };
};

export default PressCategory;
