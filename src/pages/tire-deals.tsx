import { GetStaticProps } from 'next';

import DealsPage from '~/components/pages/SEOPage/DealsPage/DealsPage';
import { SiteDeals } from '~/data/models/SiteDeals';
import { backendGetSiteDeals } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

interface DealsServeData {
  serverData: SiteDeals;
}

function TireDeals(props: DealsServeData) {
  return (
    <DealsPage
      topGraphicGrid={props.serverData.topGraphicGrid}
      deals={props.serverData.deals}
    />
  );
}

export const getStaticProps: GetStaticProps<DealsServeData> = async () => {
  backendBootstrap();

  const siteDeals = await backendGetSiteDeals();

  const props: DealsServeData = {
    serverData: {
      deals: siteDeals.deals,
      topGraphicGrid: siteDeals.topGraphicGrid,
    },
  };

  return {
    props,
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};
export default TireDeals;
