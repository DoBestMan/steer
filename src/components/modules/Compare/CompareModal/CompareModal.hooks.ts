import { useEffect, useRef } from 'react';

import { getScroll, setScroll, subscribeScroll } from '~/lib/helpers/scroll';

export function useSyncScroll(isLoadingModalData: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const copyRef = ref;

    if (!ref || !ref.current) {
      return;
    }

    const onScroll = () => {
      const x = ref.current?.scrollLeft || 0;
      const { y } = getScroll();
      setScroll({ x, y });
    };

    ref.current?.addEventListener('scroll', onScroll);

    return () => {
      copyRef.current?.removeEventListener('scroll', onScroll);
    };
  }, [isLoadingModalData]);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const setLeftScrollPosition = () => {
      const { x } = getScroll();
      ref.current && (ref.current.scrollLeft = x);
    };

    const subscription = subscribeScroll(setLeftScrollPosition);

    return () => {
      subscription();
    };
  }, []);

  return ref;
}
