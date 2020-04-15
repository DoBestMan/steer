import { Breakpoint } from './breakpoints.types';

/* eslint sort-keys: 0 */
export const BREAKPOINT_SIZES: Record<Breakpoint, Breakpoint> = {
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
};

/* eslint sort-keys: 0 */
export const BREAKPOINTS: Record<Breakpoint, number> = {
  S: 0,
  M: 600,
  L: 976,
  XL: 1200,
};

// Generates an object such as
// { SMALL: `min-width: ${Breakpoints.SMALL}px`, ... }
export const MQ = Object.fromEntries(
  new Map(
    Object.entries(BREAKPOINTS).map(([mq, value]) => [
      mq,
      `@media(min-width: ${value}px)`,
    ]),
  ),
);
