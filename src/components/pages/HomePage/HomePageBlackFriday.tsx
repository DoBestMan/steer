import { useEffect, useRef, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import HomeReviews from '~/components/pages/HomePage/HomeReviews/HomeReviews';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSupportsPositionSticky } from '~/hooks/useSupportsPositionSticky';
import { COLORS, TIME } from '~/lib/constants';

import {
  useChangeBackgroundColor,
  useContentSpacerHeight,
  useIsFallbackSticky,
} from './HomePage.hooks';
import styles from './HomePage.styles';
import { CONSTANTS as BUTTON_CONSTANTS } from './SearchButton/SearchButton.styles';

const THEME_COLOR_MAP: Record<string, string> = {
  promotion: COLORS.GLOBAL.BLACK,
};

const SEARCH_BY_BOARD_TITLE = 'shop tires by';

export interface Props {
  siteReviews: SiteReviews;
  siteTheme: SiteGlobals['siteTheme'];
}

export interface HomeData {
  siteHero: SiteHero;
  siteInsights: SiteInsights;
}

function HomePageBlackFriday({
  siteReviews,
  siteHero,
  siteInsights,
}: Props & HomeData) {
  const { isMobile } = useBreakpoints();
  const { supportsPositionSticky } = useSupportsPositionSticky();

  const [isContentVisible, setIsContentVisible] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const CONTENT_PEEKING_AMOUNT = isMobile
    ? BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.S
    : BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.M;

  const { contentContainerRef, thresholdCrossed } = useChangeBackgroundColor({
    CONTENT_PEEKING_AMOUNT,
    isContentVisible,
    shouldCancelColorChange: false,
  });

  const backgroundColor = THEME_COLOR_MAP['promotion'];

  const { heroRef, isFallbackSticky } = useIsFallbackSticky({
    supportsPositionSticky,
  });

  const { spacerHeight, buttonRef } = useContentSpacerHeight({
    CONTENT_PEEKING_AMOUNT,
    isMobile,
    supportsPositionSticky,
  });

  const searchButtonContainerStyles = [
    styles.searchButtonContainer,
    supportsPositionSticky && styles.searchButtonStickySupport,
    !supportsPositionSticky && styles.searchButtonStickyFallback,
    !supportsPositionSticky &&
      isFallbackSticky &&
      styles.searchButtonStickyFallbackFixed,
  ];

  useEffect(() => {
    // Hiding the content and preventing the scroll color
    // change while the localized data loads
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, TIME.MS1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div css={styles.root} ref={heroRef}>
        <HomeHeader {...siteHero} />
      </div>

      <div
        css={[styles.scrollColorContainer, { backgroundColor }]}
        ref={contentRef}
      >
        <div css={searchButtonContainerStyles} ref={buttonRef}>
          <SearchByBoard title={SEARCH_BY_BOARD_TITLE} />
        </div>

        <div css={[styles.contentSpacer, spacerHeight]}></div>
        <div ref={contentContainerRef}>
          <Grid
            css={[
              styles.contentContainer,
              thresholdCrossed && styles.contentFull,
              !isContentVisible && styles.contentHidden,
            ]}
          >
            <DriverInsights {...siteInsights} />
            <HomeReviews {...siteReviews} />
          </Grid>
        </div>
      </div>
    </>
  );
}

export default HomePageBlackFriday;
