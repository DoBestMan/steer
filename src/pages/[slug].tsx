import { GetServerSidePropsResult, GetStaticProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { backendGetPageSlugList } from '~/lib/backend/page-slug-list';
import { REVALIDATE } from '~/lib/constants';

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

export const getStaticProps: GetStaticProps<OpenTemplatePageProps> = async (
  context,
) => {
  backendBootstrap();
  const slug =
    context && context.params && context.params.slug
      ? context.params.slug
      : null;

  if (!slug) {
    // Return 404?
    return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
  }

  try {
    const pageData = await backendGetPageSlug(slug);

    if (!pageData) {
      // Return 404?
      return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
    }

    return {
      props: {
        pageData,
      },
      revalidate: REVALIDATE.EVERY_MINUTE,
    };
  } catch (error) {
    // Return 404?
    return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
  }
};

export default OpenTemplate;
