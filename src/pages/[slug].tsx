import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';

type OpenTemplatePageProps = {
  pageData: PageData;
};

function OpenTemplate({ pageData }: OpenTemplatePageProps) {
  return <OpenTemplatePage pageData={pageData} />;
}
export const getServerSideProps: GetServerSideProps<OpenTemplatePageProps> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { slug } = context && context.query;
  try {
    const pageData = await backendGetPageSlug(slug);

    if (!pageData) {
      context.res.setHeader('location', '/not-found');
      context.res.statusCode = 302;
      context.res.end;
      return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
    }

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    context.res.setHeader('location', '/not-found');
    context.res.statusCode = 302;
    context.res.end;
    return {} as GetServerSidePropsResult<OpenTemplatePageProps>;
  }
};

export default OpenTemplate;
