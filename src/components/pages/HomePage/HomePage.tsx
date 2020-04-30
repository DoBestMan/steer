import Grid from '~/components/global/Grid/Grid';
import Image from '~/components/global/Image/Image';
import Layout from '~/components/global/Layout/Layout';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { LOADING_OPTIONS } from '~/lib/constants';
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
        {false && (
          <>
            <HomeHeader {...siteHero} />
            <Grid css={[backgroundColors.GLOBAL.BLACK, styles.content]}>
              <DriverInsights {...siteInsights} />
              <Reviews {...siteReviews} />
            </Grid>
          </>
        )}
        <div style={{ height: 4000 }}></div>

        <Image
          loading={LOADING_OPTIONS.LAZY}
          altText="test"
          srcSet="https://picsum.photos/600/300"
          height="300"
          width="600"
        />
      </>
    </Layout>
  );
}

export default HomePage;
