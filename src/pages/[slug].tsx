import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { backendGetPageSlugList } from '~/lib/backend/page-slug-list';
import { REVALIDATE } from '~/lib/constants';
import { redirectToNotFound } from '~/lib/utils/routes';

type OpenTemplatePageProps = {
  pageData: PageData;
};

function OpenTemplate({ pageData }: OpenTemplatePageProps) {
  return <OpenTemplatePage pageData={pageData} />;
}

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

export const getStaticProps: GetServerSideProps<OpenTemplatePageProps> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const slug =
    context && context.params && context.params.slug
      ? context.params.slug
      : null;

  if (!slug) {
    redirectToNotFound(context.res);
    return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
  }

  try {
    const pageData = await backendGetPageSlug(slug);

    if (!pageData) {
      redirectToNotFound(context.res);
      return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
    }

    return {
      props: {
        pageData,
      },
      revalidate: REVALIDATE.EVERY_MINUTE,
    };
  } catch (error) {
    redirectToNotFound(context.res);
    return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
  }
};

export default OpenTemplate;
