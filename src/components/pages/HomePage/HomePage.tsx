import { useEffect, useRef, useState } from 'react';

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
import { getScroll } from '~/lib/helpers/scroll';
import { hasIntersectionObserver } from '~/lib/utils/browser';

import styles from './HomePage.styles';
import SearchButton from './SearchButton/SearchButton';

const SCROLL_THRESHOLD = 80;

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

function getColorFromScrollState(thresholdCrossed: boolean) {
  return thresholdCrossed ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.ORANGE;
}

function HomePage({ serverData }: Props) {
  const { siteReviews } = serverData;
  const [thresholdCrossed, setThresholdCrossed] = useState(false);
  const { siteTheme } = useSiteGlobalsContext();
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: { siteHero, siteInsights },
    error,
  } = useApiDataWithDefault<HomeData>({
    defaultData: serverData,
    endpoint: '/home',
    includeUserRegion: true,
  });

  if (error) {
    console.error(error);
  }

  const backgroundColor = !siteTheme
    ? getColorFromScrollState(thresholdCrossed)
    : COLORS.GLOBAL.BLACK;

  function handleSearchClick() {
    // TODO Wire up homepage search https://simpletire.atlassian.net/browse/WCS-216
    console.info('Search button click');
  }

  // Scroll Effect : Changes background color
  useEffect(() => {
    if (!contentContainerRef.current) {
      return;
    }

    // if no IO, no scroll animation.
    if (!hasIntersectionObserver()) {
      setThresholdCrossed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setThresholdCrossed(true);
          } else {
            if (getScroll().y < entry.boundingClientRect.top) {
              setThresholdCrossed(false);
            } else {
              setThresholdCrossed(true);
            }
          }
        });
      },
      {
        rootMargin: `${SCROLL_THRESHOLD}px`,
      },
    );

    observer.observe(contentContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [contentContainerRef]);

  return (
    <Layout>
      <HomeHeader {...siteHero} />
      <div css={[styles.scrollColorContainer, { backgroundColor }]}>
        <SearchButton onClick={handleSearchClick} />
        <div ref={contentContainerRef}>
          <Grid css={styles.content}>
            <DriverInsights {...siteInsights} />
            <Reviews {...siteReviews} />
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
