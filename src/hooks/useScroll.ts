import { useEffect, useState } from 'react';

import { isBrowser } from '~/lib/utils/browser';

enum SCROLL_DIRECTION {
  DOWN = 'down',
  NONE = '',
  UP = 'up',
}

export function useScroll() {
  const [lastScroll, setLastScroll] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [scrollDirection, setDirection] = useState<SCROLL_DIRECTION>(
    SCROLL_DIRECTION.NONE,
  );

  function scrollListener() {
    setScroll(window.scrollY);
  }

  useEffect(() => {
    if (scroll !== lastScroll && lastScroll !== window.scrollY) {
      setLastScroll(scroll);
      setDirection(
        lastScroll > scroll ? SCROLL_DIRECTION.UP : SCROLL_DIRECTION.DOWN,
      );
    }
  }, [lastScroll, scroll]);

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener('scroll', scrollListener);
    }

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return {
    scrollDirection,
    scrollY: scroll,
  };
}
