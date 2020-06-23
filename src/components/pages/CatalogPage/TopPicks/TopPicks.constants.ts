import { Breakpoint } from '~/lib/constants';

export const NB_SLIDES_PER_BP: Record<Breakpoint, number> = {
  S: 1,
  M: 1,
  L: 1,
  XL: 4,
};

export const SPEED_PER_BP: Record<Breakpoint, number> = {
  S: 3,
  M: 5,
  L: 6,
  XL: 6,
};
