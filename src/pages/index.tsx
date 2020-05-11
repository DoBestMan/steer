import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';

import HomePage from '~/components/pages/HomePage/HomePage';
import ScrollContextProvider from '~/context/Scroll.context';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { backendGetSiteHome, backendGetSiteReviews } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';

interface Props {
  serverData: {
    siteHero: SiteHero;
    siteInsights: SiteInsights;
    siteReviews: SiteReviews;
  };
}

function Home(props: Props) {
  return (
    <ScrollContextProvider>
      <HomePage {...props} />
    </ScrollContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context: {
  req: IncomingMessage;
}) => {
  backendBootstrap({ request: context.req });

  const { siteHero, siteInsights } = await backendGetSiteHome();
  const { siteReviews } = await backendGetSiteReviews();

  return {
    props: {
      serverData: {
        siteHero,
        siteInsights,
        siteReviews,
      },
    },
  };
};

export default Home;
