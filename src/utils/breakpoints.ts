import { BREAKPOINTS, BREAKPOINT_SIZES } from '~/styles/constants/breakpoints';
import { Breakpoint } from '~/styles/constants/breakpoints.types';

export function getBreakpoint(width = 0): Breakpoint {
  let breakpoint: Breakpoint = BREAKPOINT_SIZES.S;

  Object.entries(BREAKPOINTS).forEach(([key, value]) => {
    if (width >= value) {
      breakpoint = key as Breakpoint;
    }
  });

  return breakpoint;
}
