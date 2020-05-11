import { useEffect } from 'react';

import {
  getScroll,
  SCROLL_DIRECTION,
  subscribeScroll,
} from '~/lib/helpers/scroll';
import { isBrowser } from '~/lib/utils/browser';

type UseScroll = {
  direction: SCROLL_DIRECTION;
  scrollX: number;
  scrollY: number;
};

type UseScrollCallback = (props: UseScroll) => void;

/*
 * How to use
 *
 * Using scroll value in a "normal" way (reading values on render)
 * would trigger a render on every new scroll value
 *
 * Pass a callback to `useScroll()` to read the values,
 * and change the render the way you want
 *
 * useScroll((scroll) => {
 *  console.log('scrollY', scroll.scrollY);
 * });
 */
export function useScroll(callback?: UseScrollCallback): UseScroll {
  useEffect(() => {
    if (!isBrowser || !callback) {
      return;
    }

    function cb() {
      if (callback) {
        callback({
          direction: getScroll().direction,
          scrollX: getScroll().x,
          scrollY: getScroll().y,
        });
      }
    }

    const subScroll = subscribeScroll(cb);

    return () => {
      subScroll();
    };
  }, [callback]);

  return {
    direction: getScroll().direction,
    scrollX: getScroll().x,
    scrollY: getScroll().y,
  };
}
