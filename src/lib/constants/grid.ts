import { Breakpoint } from './breakpoints.types';

export const NB_COLUMNS: Record<Breakpoint, number> = {
  S: 4,
  M: 6,
  L: 12,
  XL: 12,
};

export const GRID_MARGIN: Record<Breakpoint, number> = {
  S: 20,
  M: 20,
  L: 60,
  XL: 60,
};

export const GAP_COLUMNS: Record<Breakpoint, number> = {
  S: 20,
  M: 20,
  L: 30,
  XL: 30,
};
