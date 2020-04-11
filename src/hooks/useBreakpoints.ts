import { useState, useEffect } from 'react';
import { useWindowSize } from '~/hooks/useWindowSize';

import { getBreakpoint } from '~/utils/breakpoints';
import { Breakpoint } from '~/styles/constants/breakpoints.types';
import { BREAKPOINT_SIZES } from '~/styles/constants/breakpoints';

export function useBreakpoints(): Breakpoint {
  const windowSize = useWindowSize();
  const [bk, setBK] = useState<Breakpoint>(BREAKPOINT_SIZES.S);

  useEffect(() => {
    setBK(getBreakpoint(windowSize.width));
  }, [windowSize]);

  return bk;
}
