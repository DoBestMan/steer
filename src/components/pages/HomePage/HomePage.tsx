import React, { useEffect, useRef, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import PromotionCardCarousel from '~/components/global/PromotionCardCarousel/PromotionCardCarousel';
import PromotionHeader from '~/components/global/PromotionHeader/PromotionHeader';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import HomeReviews from '~/components/pages/HomePage/HomeReviews/HomeReviews';
import { SiteDealsCarousel } from '~/data/models/SiteDealsCarousel';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSupportsPositionSticky } from '~/hooks/useSupportsPositionSticky';
import { COLORS, TIME } from '~/lib/constants';
import { getScroll, scrollTo, scrollToRef } from '~/lib/helpers/scroll';

import {
  useChangeBackgroundColor,
  useContentSpacerHeight,
  useIsFallbackSticky,
} from './HomePage.hooks';
import styles, { CONTENT_TRANSITION } from './HomePage.styles';
import {
  getBgColorFromScrollState,
  getTextColorFromScrollState,
} from './HomePage.utils';
import SearchButton from './SearchButton/SearchButton';
import { CONSTANTS as BUTTON_CONSTANTS } from './SearchButton/SearchButton.styles';

const THEME_COLOR_MAP: Record<string, string> = {
  promotion: COLORS.GLOBAL.BLACK,
};

export interface Props {
  siteDealsCarousel: SiteDealsCarousel;
  siteReviews: SiteReviews;
  siteTheme: SiteGlobals['siteTheme'];
}

export interface HomeData {
  siteHero: SiteHero;
  siteInsights: SiteInsights;
}

function HomePage({
  siteDealsCarousel,
  siteReviews,
  siteHero,
  siteInsights,
  siteTheme,
}: Props & HomeData) {
  const { isMobile } = useBreakpoints();
  const { supportsPositionSticky } = useSupportsPositionSticky();

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [shouldCancelColorChange, setShouldCancelColorChange] = useState(false);
  const [searchButtonYPos, setSearchButtonYPos] = useState(0);

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
    getBgColorFromScrollState(thresholdCrossed);

  const color = getTextColorFromScrollState(thresholdCrossed);

  const { isSearchOpen, toggleIsSearchOpen } = useSearchModalContext();

  const {
    carousel: promotionCarousel,
    header: promotionHeader,
  } = siteDealsCarousel;

  function handleOpenModal() {
    // Store the current y pos to return to later
    // when the modal closes
    setSearchButtonYPos(getScroll().y);

    const scrollToCallback = () =>
      toggleIsSearchOpen(() => setShouldCancelColorChange(true));

    setIsContentVisible(false);
    scrollToRef(contentRef, TIME.MS400, scrollToCallback);
  }

  // Display hidden content after search modal is closed
  useEffect(() => {
    if (!isSearchOpen && shouldCancelColorChange) {
      setIsContentVisible(true);
      setShouldCancelColorChange(false);

      setTimeout(() => {
        scrollTo(searchButtonYPos, TIME.MS400 / 1000);
      }, CONTENT_TRANSITION);
    }
  }, [isSearchOpen, searchButtonYPos, shouldCancelColorChange]);

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

  const { spacerHeight, buttonRef } = useContentSpacerHeight({
    CONTENT_PEEKING_AMOUNT,
    isMobile,
    supportsPositionSticky,
  });

  const searchButtonContainerStyles = [
    { backgroundColor, color },
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

      <div css={searchButtonContainerStyles} ref={buttonRef}>
        <SearchButton onClick={handleOpenModal} />
      </div>

      <div
        css={(promotionHeader || promotionCarousel) && styles.promotionSection}
      >
        {promotionHeader && (
          <div css={styles.promotionSectionHeader}>
            <PromotionHeader
              iconName={promotionHeader.icon.svgId}
              promoTagLabel={promotionHeader.pill}
              subTitle={promotionHeader.subtitle}
              title={promotionHeader.title}
            />
          </div>
        )}
        {promotionCarousel && promotionCarousel.dealsCards.length && (
          <PromotionCardCarousel cards={promotionCarousel.dealsCards} />
        )}
      </div>
      <div
        css={[styles.scrollColorContainer, { backgroundColor }]}
        ref={contentRef}
      >
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

export default HomePage;
