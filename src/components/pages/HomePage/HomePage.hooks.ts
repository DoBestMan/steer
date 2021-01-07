import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { getScroll } from '~/lib/helpers/scroll';
import { hasIntersectionObserver } from '~/lib/utils/browser';

const CONSTANTS = {
  SCROLL_THRESHOLD_BELOW_FOLD: 40,
};

// useIsFallbackSticky Hook
interface UseIsFallbackStickyProps {
  supportsPositionSticky: boolean;
}

export function useIsFallbackSticky({
  supportsPositionSticky,
}: UseIsFallbackStickyProps) {
  const heroRef = useRef<HTMLDivElement>(null);
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

  return {
    heroRef,
    isFallbackSticky,
  };
}

// useButtonHeight Hook
interface UseContentSpacerHeightProps {
  CONTENT_PEEKING_AMOUNT: number;
  isMobile: boolean;
  supportsPositionSticky: boolean;
}

const MOBILE_SPACER_HEIGHT = '40vh';

export function useContentSpacerHeight({
  CONTENT_PEEKING_AMOUNT,
  isMobile,
  supportsPositionSticky,
}: UseContentSpacerHeightProps) {
  const [spacerHeight, setSpacerHeight] = useState({});
  const buttonRef = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowSize();

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonHeight = supportsPositionSticky ? buttonRect.height : 0;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = buttonRect.top + scrollTop;
    const responsiveSpacer = isMobile
      ? MOBILE_SPACER_HEIGHT
      : `${height - offsetTop}px`;
    const contentSpacerHeight = `calc(${responsiveSpacer} - ${
      CONTENT_PEEKING_AMOUNT + buttonHeight
    }px)`;

    setSpacerHeight({ minHeight: contentSpacerHeight });
  }, [
    buttonRef,
    CONTENT_PEEKING_AMOUNT,
    height,
    isMobile,
    supportsPositionSticky,
    width,
  ]);

  return { spacerHeight, buttonRef };
}

// useChangeBackgroundColor Hook
interface UseChangeBackgroundColorProps {
  CONTENT_PEEKING_AMOUNT: number;
  isContentVisible: boolean;

  shouldCancelColorChange: boolean;
}

export function useChangeBackgroundColor({
  isContentVisible,
  CONTENT_PEEKING_AMOUNT,

  shouldCancelColorChange,
}: UseChangeBackgroundColorProps) {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const SCROLL_THRESHOLD =
    CONTENT_PEEKING_AMOUNT + CONSTANTS.SCROLL_THRESHOLD_BELOW_FOLD;

  const [thresholdCrossed, setThresholdCrossed] = useState(false);

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

  return { contentContainerRef, thresholdCrossed };
}

interface UseStickySearchBar {
  searchBarRef: RefObject<HTMLDivElement>;
}

const SCROLL_Y_THRESHOLD = 265;

export function useStickySearchBar({ searchBarRef }: UseStickySearchBar) {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const scrollEventCallback = useCallback(() => {
    if (!searchBarRef.current) {
      return;
    }
    const searchBarYposition = searchBarRef.current.getBoundingClientRect().y;
    const isStickyPosition = searchBarYposition === -1;

    if (isStickyPosition && !isSticky && window.scrollY >= SCROLL_Y_THRESHOLD) {
      setIsSticky(true);
    } else if (
      !isStickyPosition &&
      window.scrollY <= SCROLL_Y_THRESHOLD &&
      isSticky
    ) {
      setIsSticky(false);
    }
  }, [isSticky, searchBarRef]);

  useEffect(() => {
    document.addEventListener('scroll', scrollEventCallback);
    return () => {
      document.removeEventListener('scroll', scrollEventCallback);
    };
  });

  return {
    isSticky,
  };
}
