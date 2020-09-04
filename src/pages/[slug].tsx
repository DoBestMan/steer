import { GetServerSidePropsResult, GetStaticProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { backendGetPageSlugList } from '~/lib/backend/page-slug-list';
import { REVALIDATE } from '~/lib/constants';

type OpenTemplatePageProps = {
  pageData: PageData;
};

const OpenTemplate = WithErrorPageHandling(OpenTemplatePage);

export async function getStaticPaths() {
  backendBootstrap();
  const pageListData = await backendGetPageSlugList();

  const paths = pageListData.slugs.map((data) => ({
    params: {
      ...data,
    },
  }));

  return {
    paths,
    fallback: false, // fallback is false so a wrong slug leads to a 404
  };
}

export const getStaticProps: GetStaticProps<PageResponse<
  OpenTemplatePageProps
>> = async (context) => {
  backendBootstrap();
  const slug =
    context && context.params && context.params.slug
      ? context.params.slug
      : null;

  if (!slug) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  try {
    const pageData = await backendGetPageSlug(slug);

    if (!pageData) {
      const errorStatusCode = 404;
      return { props: { errorStatusCode } };
    }

    return {
      props: {
        pageData,
      },
      revalidate: REVALIDATE.EVERY_MINUTE,
    };
  } catch (error) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }
};

export default OpenTemplate;
