const zIndexBase = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
  10: 1000,
  behind: -1,
};

export enum Z_INDEX {
  // common
  BEHIND = zIndexBase.behind,
  ZERO = zIndexBase['0'],
  FRONT = zIndexBase['1'],
  TOP = zIndexBase['2'],
  // custom
  NAV = zIndexBase['5'],
  GLOBAL_TOAST = zIndexBase['6'],
  MODAL = zIndexBase['9'],
  GRID_HELPER = zIndexBase['10'],
  LOADING_BAR = zIndexBase['10'],
  SKIP_LINK = zIndexBase['10'],
}
