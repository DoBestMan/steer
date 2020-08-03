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

// This function runs at build time on the build server
export const getStaticProps: GetServerSideProps<HomeServeData> = async (context: {
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // See https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta
    // TODO: use `revalidate` instead when switching to next > 9.5.x
    // eslint-disable-next-line @typescript-eslint/camelcase
    unstable_revalidate: 60, // In seconds
  };
};

export default Home;
