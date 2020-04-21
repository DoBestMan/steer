import { useState, useEffect } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';

import { getBreakpoint } from '~/lib/constants/utils/breakpoints';
import { Breakpoint, BREAKPOINT_SIZES } from '~/lib/constants';

export function useBreakpoints(): Breakpoint {
  const windowSize = useWindowSize();
  const [bk, setBK] = useState<Breakpoint>(BREAKPOINT_SIZES.S);

  useEffect(() => {
    setBK(getBreakpoint(windowSize.width));
  }, [windowSize]);

  return bk;
}
