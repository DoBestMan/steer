import { GetStaticProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import WithFallbackPageHandling from '~/hocs/WithFallbackPageHandling';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { REVALIDATE } from '~/lib/constants';
import { getStringifiedParams } from '~/lib/utils/routes';

const BASE_PATH = '/tire-sizes/diameter';
type OpenTemplatePageProps = {
  pageData: PageData;
};

const SizeListPageTemplate = WithFallbackPageHandling(
  WithErrorPageHandling(OpenTemplatePage),
);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<PageResponse<
  OpenTemplatePageProps
>> = async ({ params }) => {
  backendBootstrap();
  const { size } = getStringifiedParams(params);

  if (!size) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  const res = await backendGetPageSlug(size);

  if (!res.isSuccess) {
    return {
      props: { errorStatusCode: res.error.statusCode },
      revalidate: REVALIDATE.EVERY_MINUTE,
    };
  }

  if (!res.data.basePath?.includes(BASE_PATH)) {
    return {
      props: { errorStatusCode: 410 },
    };
  }

  return {
    props: {
      pageData: res.data,
    },
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default SizeListPageTemplate;
