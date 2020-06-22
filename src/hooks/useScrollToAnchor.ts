import { useCallback } from 'react';

import { isBrowser } from '~/lib/utils/browser';

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

      const targetId = e.currentTarget.getAttribute('href')?.slice(1);
      const elementToScroll = targetId && document.getElementById(targetId);

      if (!targetId || !elementToScroll) {
        return;
      }

      e.preventDefault();

      const elementOffset =
        elementToScroll.getBoundingClientRect().top + window.pageYOffset;

      window.scroll({
        top: elementOffset - offset,
        behavior: 'smooth',
      });

      history.pushState(null, '', `#${targetId}`);
    },
    [offset],
  );

  return {
    scrollToAnchor,
  };
}
