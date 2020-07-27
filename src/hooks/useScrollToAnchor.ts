import { useCallback } from 'react';

import { isBrowser } from '~/lib/utils/browser';
import { getParsedHash } from '~/lib/utils/routes';

const CONSTANTS = {
  SCROLL_OFFSET: -60,
};

interface UseScrollToAnchor {
  offset?: number;
}

interface UseScrollToAnchorResponse {
  scrollToAnchor: (e: React.MouseEvent) => void;
}

export function useScrollToAnchor({
  offset = 0,
}: UseScrollToAnchor = {}): UseScrollToAnchorResponse {
  const scrollToAnchor = useCallback(
    (e: React.MouseEvent) => {
      if (!isBrowser) {
        return;
      }

      const href = e.currentTarget.getAttribute('href');
      const parsedHash = getParsedHash(href || '');
      const targetId = parsedHash?.anchor?.toString();

      if (!targetId) {
        return;
      }
      const elementToScroll = targetId && document.getElementById(targetId);

      if (!targetId || !elementToScroll) {
        return;
      }

      e.preventDefault();

      const elementOffset =
        elementToScroll.getBoundingClientRect().top +
        window.pageYOffset +
        CONSTANTS.SCROLL_OFFSET;

      window.scroll({
        top: elementOffset - offset,
        behavior: 'smooth',
      });

      history.pushState(null, '', href);
    },
    [offset],
  );

  return {
    scrollToAnchor,
  };
}
