import Grid from '~/components/global/Grid/Grid';
import Layout from '~/components/global/Layout/Layout';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { COLORS } from '~/lib/constants';

import styles from './HomePage.styles';
import SearchButton from './SearchButton/SearchButton';

interface Props {
  serverData: {
    siteHero: SiteHero;
    siteInsights: SiteInsights;
    siteReviews: SiteReviews;
  };
}

interface HomeData {
  siteHero: SiteHero;
  siteInsights: SiteInsights;
}

function HomePage({ serverData }: Props) {
  const { siteReviews } = serverData;

  const {
    data: { siteHero, siteInsights },
    error,
  } = useApiDataWithDefault<HomeData>({
    defaultData: serverData,
    endpoint: '/v1/home',
    includeUserRegion: true,
  });

  if (error) {
    console.error(error);
  }

  const backgroundColor = COLORS.GLOBAL.BLACK;
  const { siteTheme } = useSiteGlobalsContext();

  function handleSearchClick() {
    // TODO Wire up homepage search https://simpletire.atlassian.net/browse/WCS-216
    console.info('Search button click');
  }

  return (
    <Layout>
      <>
        <HomeHeader {...siteHero} />
        <SearchButton onClick={handleSearchClick} theme={siteTheme} />
        <Grid css={[{ backgroundColor }, styles.content]}>
          <DriverInsights {...siteInsights} />
          <Reviews {...siteReviews} />
        </Grid>
      </>
    </Layout>
  );
}

export default HomePage;
