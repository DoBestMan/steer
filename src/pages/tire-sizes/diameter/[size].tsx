import { GetStaticProps } from 'next';

import OpenTemplatePage from '~/components/pages/OpenTemplatePage/OpenTemplatePage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetPageSlug } from '~/lib/backend/page-slug';
import { backendGetPageSlugList } from '~/lib/backend/page-slug-list';
import { REVALIDATE } from '~/lib/constants';
import { slugListBasePath } from '~/lib/constants/slugListBasePath';

type OpenTemplatePageProps = {
  pageData: PageData;
};

const SizeListPageTemplate = WithErrorPageHandling(OpenTemplatePage);

export async function getStaticPaths() {
  backendBootstrap();
  const res = await backendGetPageSlugList(slugListBasePath.sizeListingPage);

  if (!res.isSuccess) {
    return { props: { errorStatusCode: res.error.statusCode } };
  }
  const paths = res.data.slugs.map((data) => ({
    params: {
      size: data.slug,
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
  const size =
    context && context.params && context.params.size
      ? context.params.size
      : null;

  if (!size) {
    const errorStatusCode = 500;
    return { props: { errorStatusCode } };
  }

  const res = await backendGetPageSlug(size);

  if (!res.isSuccess) {
    return { props: { errorStatusCode: res.error.statusCode } };
  }

  return {
    props: {
      pageData: res.data,
    },
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default WithErrorPageHandling(SizeListPageTemplate);
