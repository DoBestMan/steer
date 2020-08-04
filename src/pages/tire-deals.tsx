import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';

import DealsPage from '~/components/pages/SEOPage/DealsPage/DealsPage';
import { SiteDeals } from '~/data/models/SiteDeals';
import { backendGetSiteDeals } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';

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

export const getServerSideProps: GetServerSideProps<DealsServeData> = async (context: {
  req: IncomingMessage;
}) => {
  backendBootstrap({ request: context.req });

  const siteDeals = await backendGetSiteDeals();

  const props: DealsServeData = {
    serverData: {
      deals: siteDeals.deals,
      topGraphicGrid: siteDeals.topGraphicGrid,
    },
  };

  return {
    props,
  };
};
export default TireDeals;
