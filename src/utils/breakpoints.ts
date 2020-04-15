import { Breakpoint, BREAKPOINTS, BREAKPOINT_SIZES } from '~/lib/constants';

export function getBreakpoint(width = 0): Breakpoint {
  let breakpoint: Breakpoint = BREAKPOINT_SIZES.S;

  Object.entries(BREAKPOINTS).forEach(([key, value]) => {
    if (width >= value) {
      breakpoint = key as Breakpoint;
    }
  });

  return breakpoint;
}
