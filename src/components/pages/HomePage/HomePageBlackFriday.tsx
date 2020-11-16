import { useEffect, useRef, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import PromotionCardCarousel from '~/components/global/PromotionCardCarousel/PromotionCardCarousel';
import PromotionHeader from '~/components/global/PromotionHeader/PromotionHeader';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
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
import { ui } from '~/lib/utils/ui-dictionary';

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

export interface Props {
  siteDealsCarousel: SiteDealsCarousel;
  siteReviews: SiteReviews;
  siteTheme: SiteGlobals['siteTheme'];
}

export interface HomeData {
  siteHero: SiteHero;
  siteInsights: SiteInsights;
}

function HomePageBlackFriday({
  siteDealsCarousel,
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

  const {
    carousel: promotionCarousel,
    header: promotionHeader,
  } = siteDealsCarousel;

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

      <div css={searchButtonContainerStyles} ref={buttonRef}>
        <SearchByBoard title={ui('searchByBoard.title')} />
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

export default HomePageBlackFriday;
