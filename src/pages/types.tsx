import { GetStaticProps } from 'next';

import TypeHubPage from '~/components/pages/SEOPage/TypeHubPage/TypeHubPage';
import { SiteTypes } from '~/data/models/SiteTypes';
import { backendGetSiteTypes } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

interface TypesServeData {
  serverData: SiteTypes;
}

function Types(props: TypesServeData) {
  return <TypeHubPage types={props.serverData.types} />;
}
export const getStaticProps: GetStaticProps<TypesServeData> = async () => {
  backendBootstrap();

  const siteTypes = await backendGetSiteTypes();

  const props: TypesServeData = {
    serverData: {
      types: siteTypes.types,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};
export default Types;
