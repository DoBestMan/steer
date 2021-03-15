import { GetServerSideProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { getStringifiedParams } from '~/lib/utils/routes';

type OpenTemplatePageProps = {
  pageData: PageData;
};

const OpenTemplate = WithErrorPageHandling(OpenTemplatePage);

export const getServerSideProps: GetServerSideProps<PageResponse<
  OpenTemplatePageProps
>> = async ({ query, res, req }) => {
  backendBootstrap({ request: req });
  const { slug } = getStringifiedParams(query);

  if (!slug) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  const apiResponse = await backendGetPageSlug(slug);

  if (!apiResponse.isSuccess) {
    res.statusCode = apiResponse.error.statusCode;
    return {
      props: { errorStatusCode: apiResponse.error.statusCode },
    };
  }

  if (apiResponse.data.isBasePath) {
    const statusCode = 410;
    res.statusCode = statusCode;
    return {
      props: { errorStatusCode: statusCode },
    };
  }

  return {
    props: {
      pageData: apiResponse.data,
    },
  };
};

export default OpenTemplate;
