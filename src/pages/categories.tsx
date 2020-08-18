import { GetStaticProps } from 'next';

import CategoryHubPage from '~/components/pages/SEOPage/CategoryHubPage/CategoryHubPage';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { backendGetSiteCategories } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

interface CategoryServeData {
  serverData: {
    categories: Array<SiteGraphicTile>;
  };
}
function Categories(props: CategoryServeData) {
  return <CategoryHubPage categories={props.serverData.categories} />;
}
export const getStaticProps: GetStaticProps<CategoryServeData> = async () => {
  backendBootstrap();

  const siteCategories = await backendGetSiteCategories();

  const props: CategoryServeData = {
    serverData: {
      categories: siteCategories.categories,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};
export default Categories;
