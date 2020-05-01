import Grid from '~/components/global/Grid/Grid';
import Layout from '~/components/global/Layout/Layout';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { COLORS } from '~/lib/constants';

import styles from './HomePage.styles';

interface Props {
  serverData: {
    siteHero: SiteHero;
    siteInsights: SiteInsights;
    siteReviews: SiteReviews;
  };
}

function HomePage({ serverData }: Props) {
  // TODO: Request from client with personalization data
  // https://simpletire.atlassian.net/browse/WCS-92
  const { siteHero, siteInsights, siteReviews } = serverData;
  const backgroundColor = COLORS.GLOBAL.BLACK;
  return (
    <Layout>
      <>
        <HomeHeader {...siteHero} />
        <Grid css={[{ backgroundColor }, styles.content]}>
          <DriverInsights {...siteInsights} />
          <Reviews {...siteReviews} />
        </Grid>
      </>
    </Layout>
  );
}

export default HomePage;
