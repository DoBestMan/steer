import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';

import HomePageContainer, {
  HomeServeData,
} from '~/components/pages/HomePage/HomePage.container';
import { backendGetSiteHome, backendGetSiteReviews } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';

function Home(props: HomeServeData) {
  return <HomePageContainer {...props} />;
}

export const getServerSideProps: GetServerSideProps<HomeServeData> = async (context: {
  req: IncomingMessage;
}) => {
  backendBootstrap({ request: context.req });

  const [{ siteHero, siteInsights }, { siteReviews }] = await Promise.all([
    backendGetSiteHome(),
    backendGetSiteReviews(),
  ]);

  const props: HomeServeData = {
    serverData: {
      siteHero,
      siteInsights,
      siteReviews,
    },
  };

  return {
    props,
  };
};

export default Home;
