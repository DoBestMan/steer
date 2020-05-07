import { useEffect, useState } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';
import { Breakpoint } from '~/lib/constants';
import { getBreakpoint } from '~/lib/utils/breakpoints';

export function useBreakpoints(): Breakpoint {
  const windowSize = useWindowSize();
  const [bk, setBK] = useState<Breakpoint>(getBreakpoint(windowSize.width));

  useEffect(() => {
    setBK(getBreakpoint(windowSize.width));
  }, [windowSize]);

  return bk;
}
