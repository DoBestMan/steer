import { RefObject, useEffect, useRef, useState } from 'react';

import { hasIntersectionObserver, isBrowser } from '~/lib/utils/browser';

interface UseInViewport {
  shouldUnsubscribeInViewport?: boolean; // If set true, it will keep isInViewport true even when element leaves the viewport
}

interface UseInViewportResponse {
  isInViewport: boolean;
  targetRef: RefObject<HTMLDivElement>; // Use with a div element for better control
}

export function useInViewport({
  shouldUnsubscribeInViewport,
}: UseInViewport = {}): UseInViewportResponse {
  const [isInViewport, setIsInViewport] = useState(!hasIntersectionObserver());
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBrowser || !targetRef.current || !hasIntersectionObserver()) {
      return;
    }

    const rootObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInViewport(entry.isIntersecting);

        entry.isIntersecting &&
          shouldUnsubscribeInViewport &&
          rootObserver.disconnect();
      });
    });

    rootObserver.observe(targetRef.current);

    return () => {
      rootObserver.disconnect();
    };
  }, [targetRef, isInViewport, setIsInViewport, shouldUnsubscribeInViewport]);

  return {
    isInViewport,
    targetRef,
  };
}
