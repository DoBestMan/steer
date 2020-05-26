import { useEffect, useRef, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import NavContainer from '~/components/modules/Nav/Nav.container';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import DriverInsights from '~/components/pages/HomePage/DriverInsights/DriverInsights';
import HomeHeader from '~/components/pages/HomePage/HomeHeader/HomeHeader';
import Reviews from '~/components/pages/HomePage/Reviews/Reviews';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useSupportsPositionSticky } from '~/hooks/useSupportsPositionSticky';
import { COLORS, TIME } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { getScroll, scrollToRef } from '~/lib/helpers/scroll';
import { hasIntersectionObserver } from '~/lib/utils/browser';

import styles from './HomePage.styles';
import SearchButton from './SearchButton/SearchButton';
import { CONSTANTS as BUTTON_CONSTANTS } from './SearchButton/SearchButton.styles';

const THEME_COLOR_MAP: Record<string, string> = {
  promotion: COLORS.GLOBAL.BLACK,
};

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
  const { siteTheme } = useSiteGlobalsContext();
  const { isMobile } = useBreakpoints();
  const { supportsPositionSticky } = useSupportsPositionSticky();

  const [thresholdCrossed, setThresholdCrossed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [shouldCancelColorChange, setShouldCancelColorChange] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const SCROLL_THRESHOLD_BELOW_FOLD = 40;
  const CONTENT_PEEKING_AMOUNT = isMobile
    ? BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.S
    : BUTTON_CONSTANTS.CONTENT_PEEKING_AMOUNT.M;
  const SCROLL_THRESHOLD = CONTENT_PEEKING_AMOUNT + SCROLL_THRESHOLD_BELOW_FOLD;

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

  // Scroll Effect : Changes background color
  useEffect(() => {
    if (
      !contentContainerRef.current ||
      !isContentVisible ||
      shouldCancelColorChange
    ) {
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
        rootMargin: `-${SCROLL_THRESHOLD}px`,
      },
    );

    observer.observe(contentContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    contentContainerRef,
    isContentVisible,
    SCROLL_THRESHOLD,
    shouldCancelColorChange,
  ]);

  const [isFallbackSticky, setIsFallbackSticky] = useState(false);

  useEffect(() => {
    if (!heroRef.current || supportsPositionSticky) {
      return;
    }

    const searchButtonObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFallbackSticky(false);
        } else {
          setIsFallbackSticky(true);
        }
      });
    });

    searchButtonObserver.observe(heroRef.current);

    return () => {
      searchButtonObserver.disconnect();
    };
  }, [heroRef, supportsPositionSticky]);

  const [buttonHeight, setButtonHeight] = useState({});

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonHeight = supportsPositionSticky ? buttonRect.height : 0;

    setButtonHeight({
      minHeight: `calc(33.333vh - ${CONTENT_PEEKING_AMOUNT + buttonHeight}px)`,
    });
  }, [CONTENT_PEEKING_AMOUNT, isMobile, supportsPositionSticky]);

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
        <NavContainer isHomepage />
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
            css={[styles.content, isContentVisible && styles.contentVisible]}
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
