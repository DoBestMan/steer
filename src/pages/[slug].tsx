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

type OpenTemplatePageProps = {
  pageData: PageData;
};

const OpenTemplate = WithFallbackPageHandling(
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
  const { slug } = getStringifiedParams(params);

  if (!slug) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  const res = await backendGetPageSlug(slug);

  if (!res.isSuccess) {
    return {
      props: { errorStatusCode: res.error.statusCode },
      revalidate: REVALIDATE.EVERY_MINUTE,
    };
  }

  return {
    props: {
      pageData: res.data,
    },
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default OpenTemplate;
