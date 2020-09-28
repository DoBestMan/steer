import { GetStaticProps } from 'next';

import HomePageContainer, {
  HomeServeData,
} from '~/components/pages/HomePage/HomePage.container';
import { PageResponse } from '~/hocs/WithPageErrorHandling';
import { backendGetSiteHome, backendGetSiteReviews } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { REVALIDATE } from '~/lib/constants';

function Home(props: HomeServeData) {
  return <HomePageContainer {...props} />;
}

// This function runs at build time on the build server
export const getStaticProps: GetStaticProps<PageResponse<
  HomeServeData
>> = async () => {
  backendBootstrap();

  const [{ siteHero, siteInsights }, siteReviewsRes] = await Promise.all([
    backendGetSiteHome(),
    backendGetSiteReviews(),
  ]);

  if (!siteReviewsRes.isSuccess) {
    return { props: { errorStatusCode: siteReviewsRes.error.statusCode } };
  }

  const props: HomeServeData = {
    serverData: {
      siteHero,
      siteInsights,
      siteReviews: siteReviewsRes.data.siteReviews,
    },
  };

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every minute
    // See https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration
    revalidate: REVALIDATE.EVERY_MINUTE,
  };
};

export default Home;
