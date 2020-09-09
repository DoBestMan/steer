import { RefObject, useCallback, useEffect, useState } from 'react';

function useScrollBack(element: RefObject<HTMLDivElement | HTMLSpanElement>) {
  const [timer, setTimer] = useState<number>(-1);

  useEffect(() => {
    return () => {
      if (timer > 0) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const scrollToViewElement = useCallback(() => {
    if (!element || !element.current) {
      return;
    }

    const timer = setTimeout(() => {
      element.current?.scrollIntoView({
        behavior: 'smooth',
      });
    });

    setTimer(timer);
  }, [element]);

  return scrollToViewElement;
}

export default useScrollBack;
