import { useEffect, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { Breakpoint, BREAKPOINT_SIZES, BREAKPOINTS } from '~/lib/constants';
import { getBreakpoint } from '~/lib/utils/breakpoints';

export function useBreakpoints() {
  const windowSize = useWindowSize();
  const [bk, setBK] = useState<Breakpoint>(BREAKPOINT_SIZES.S);
  useEffect(() => {
    setBK(getBreakpoint(windowSize.width));
  }, [windowSize]);

  return {
    bk,
    is: {
      /* eslint-disable sort-keys */
      S: bk === BREAKPOINT_SIZES.S,
      M: bk === BREAKPOINT_SIZES.M,
      L: bk === BREAKPOINT_SIZES.L,
      XL: bk === BREAKPOINT_SIZES.XL,
      /* eslint-enable sort-keys */
    },
    isMobile: bk === BREAKPOINT_SIZES.S,
    lessThan: {
      /* eslint-disable sort-keys */
      M: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.M],
      L: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.L],
      XL: BREAKPOINTS[bk] < BREAKPOINTS[BREAKPOINT_SIZES.XL],
      /* eslint-enable sort-keys */
    },
  };
}
