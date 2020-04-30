import Grid from '~/components/global/Grid/Grid';
import Layout from '~/components/global/Layout/Layout';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { backgroundColors } from '~/styles/colors.styles';

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
  return (
    <Layout>
      <>
        <HomeHeader {...siteHero} />
        <Grid css={[backgroundColors.GLOBAL.BLACK, styles.content]}>
          <DriverInsights {...siteInsights} />
          <Reviews {...siteReviews} />
        </Grid>
      </>
    </Layout>
  );
}

export default HomePage;
