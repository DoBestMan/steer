import { useEffect, useRef, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSupportsPositionSticky } from '~/hooks/useSupportsPositionSticky';
import { COLORS, TIME } from '~/lib/constants';
import { scrollToRef } from '~/lib/helpers/scroll';

import {
  useButtonHeight,
  useChangeBackgroundColor,
  useIsFallbackSticky,
} from './HomePage.hooks';
import styles from './HomePage.styles';
import { getColorFromScrollState } from './HomePage.utils';
import SearchButton from './SearchButton/SearchButton';
import { CONSTANTS as BUTTON_CONSTANTS } from './SearchButton/SearchButton.styles';

const THEME_COLOR_MAP: Record<string, string> = {
  promotion: COLORS.GLOBAL.BLACK,
};

export interface Props {
  siteReviews: SiteReviews;
  siteTheme: SiteGlobals['siteTheme'];
}

export interface HomeData {
  siteHero: SiteHero;
  siteInsights: SiteInsights;
}

function HomePage({
  siteReviews,
  siteHero,
  siteInsights,
  siteTheme,
}: Props & HomeData) {
  const { isMobile } = useBreakpoints();
  const { supportsPositionSticky } = useSupportsPositionSticky();

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [shouldCancelColorChange, setShouldCancelColorChange] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const CONTENT_PEEKING_AMOUNT = isMobile
    ? BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.S
    : BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.M;

  const { contentContainerRef, thresholdCrossed } = useChangeBackgroundColor({
    CONTENT_PEEKING_AMOUNT,
    isContentVisible,
    shouldCancelColorChange,
  });

  const backgroundColor =
    (siteTheme && THEME_COLOR_MAP[siteTheme]) ||
    getColorFromScrollState(thresholdCrossed);

  const { isSearchOpen, toggleIsSearchOpen } = useSearchContext();

  function handleOpenModal() {
    const scrollToCallback = () =>
      toggleIsSearchOpen(() => setShouldCancelColorChange(true));

    setIsContentVisible(false);
    scrollToRef(contentRef, TIME.MS400, scrollToCallback);
  }

  // Display hidden content after search modal is closed
  useEffect(() => {
    if (!isSearchOpen && shouldCancelColorChange) {
      setShouldCancelColorChange(false);
      setIsContentVisible(true);
    }
  }, [isSearchOpen, shouldCancelColorChange]);

  useEffect(() => {
    // Hiding the content and preventing the scroll color
    // change while the localized data loads
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, TIME.MS1000);
    return () => clearTimeout(timer);
  }, []);

  const { heroRef, isFallbackSticky } = useIsFallbackSticky({
    supportsPositionSticky,
  });

  const { buttonHeight, buttonRef } = useButtonHeight({
    CONTENT_PEEKING_AMOUNT,
    isMobile,
    supportsPositionSticky,
  });

  const searchButtonContainerStyles = [
    { backgroundColor },
    styles.searchButtonContainer,
    supportsPositionSticky && styles.searchButtonStickySupport,
    !supportsPositionSticky && styles.searchButtonStickyFallback,
    !supportsPositionSticky &&
      isFallbackSticky &&
      styles.searchButtonStickyFallbackFixed,
  ];

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
          <SearchButton onClick={handleOpenModal} />
        </div>

        <div css={[styles.contentSpacer, buttonHeight]}></div>
        <div ref={contentContainerRef}>
          <Grid
            css={[
              styles.contentContainer,
              isContentVisible && styles.contentVisible,
            ]}
          >
            <DriverInsights {...siteInsights} />
            <Reviews {...siteReviews} />
          </Grid>
        </div>
      </div>
    </>
  );
}

export default HomePage;
