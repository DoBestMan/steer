import {
  Breakpoint,
  GAP_COLUMNS,
  GRID_MARGIN,
  NB_COLUMNS,
} from '~/lib/constants';

/**
 * Get a `calc` function with the number of columns based on the grid system
 *
 * @param breakpoint used to determine sizes and number of columns
 * @param columns number of columns
 * @param includeExtraGutter adds and extra gutter after last column
 * @param includeContainerMargin adds and extra margin to compensate container margin
 */
export function getColumnsCalc({
  breakpoint,
  columns = 1,
  includeContainerMargin,
  includeExtraGutter,
}: {
  breakpoint: Breakpoint;
  columns: number;
  includeContainerMargin?: boolean;
  includeExtraGutter?: boolean;
}): string {
  const container = `100vw - ${GRID_MARGIN[breakpoint]}px * 2`;
  const gutters = `${GAP_COLUMNS[breakpoint]}px * ${
    NB_COLUMNS[breakpoint] - 1
  }`;
  const intermediaryGutters =
    columns > 1 ? ` + ${GAP_COLUMNS[breakpoint]}px * ${columns - 1}` : '';
  const extraGutter = includeExtraGutter
    ? ` + ${GAP_COLUMNS[breakpoint]}px`
    : '';
  const extraContainerMargin = includeContainerMargin
    ? ` + ${GRID_MARGIN[breakpoint]}px`
    : '';

  return `calc((${container} - ${gutters}) / ${NB_COLUMNS[breakpoint]} * ${columns}${intermediaryGutters}${extraGutter}${extraContainerMargin})`;
}
