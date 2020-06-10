import HomePage, { HomeData } from '~/components/pages/HomePage/HomePage';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';

export interface HomeServeData {
  serverData: {
    siteHero: SiteHero;
    siteInsights: SiteInsights;
    siteReviews: SiteReviews;
  };
}

function HomePageContainer({ serverData }: HomeServeData) {
  const {
    data: { siteHero, siteInsights },
    error,
  } = useApiDataWithDefault<HomeData>({
    defaultData: serverData,
    endpoint: '/home',
    includeUserRegion: true,
    includeUserZip: true,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  const { siteReviews } = serverData;
  const { siteTheme } = useSiteGlobalsContext();

  return (
    <HomePage
      siteReviews={siteReviews}
      siteHero={siteHero}
      siteTheme={siteTheme}
      siteInsights={siteInsights}
    />
  );
}

export default HomePageContainer;
