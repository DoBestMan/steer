import { useEffect, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { Breakpoint, BREAKPOINT_SIZES, BREAKPOINTS } from '~/lib/constants';
import { getBreakpoint } from '~/lib/utils/breakpoints';

type UseBreakpointsProps = {
  bk: Breakpoint;
  greaterThan: { [key: string]: boolean };
  is: {
    [key: string]: boolean;
  };
  isLoading: boolean;
  isMobile: boolean;
  lessThan: { [key: string]: boolean };
  windowHeight: number;
};

export function useBreakpoints(): UseBreakpointsProps {
  const windowSize = useWindowSize();
  const [bk, setBK] = useState<Breakpoint>(BREAKPOINT_SIZES.S);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!windowSize.width) {
      return;
    }
    setBK(getBreakpoint(windowSize.width));
    setIsLoading(false);
  }, [windowSize]);

  return {
    bk,
    greaterThan: {
      S: BREAKPOINTS[bk] > BREAKPOINTS[BREAKPOINT_SIZES.S],
      M: BREAKPOINTS[bk] > BREAKPOINTS[BREAKPOINT_SIZES.M],
      L: BREAKPOINTS[bk] > BREAKPOINTS[BREAKPOINT_SIZES.L],
    },
    is: {
      S: bk === BREAKPOINT_SIZES.S,
      M: bk === BREAKPOINT_SIZES.M,
      L: bk === BREAKPOINT_SIZES.L,
      XL: bk === BREAKPOINT_SIZES.XL,
    },
    isLoading,
    isMobile: bk === BREAKPOINT_SIZES.S,
    lessThan: {
      M: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.M],
      L: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.L],
      XL: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.XL],
    },
    windowHeight: windowSize.height,
  };
}
