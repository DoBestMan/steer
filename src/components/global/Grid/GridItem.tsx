import styled from '@emotion/styled';
import { ReactNode } from 'react';

import {
  Breakpoint,
  BREAKPOINT_SIZES,
  GAP_COLUMNS,
  GRID_MARGIN,
  MQ,
  NB_COLUMNS,
} from '~/lib/constants';

interface ContainerProps {
  gridColumn?: string;
  gridColumnL?: string;
  gridColumnM?: string;
  gridColumnS?: string;
  gridColumnXL?: string;
  gridRow?: string;
  gridRowL?: string;
  gridRowM?: string;
  gridRowS?: string;
  gridRowXL?: string;
  isGrid?: boolean;
}

interface Props extends ContainerProps {
  as?: string;
  children?: ReactNode;
  fullbleed?: boolean;
  fullbleedL?: boolean;
  fullbleedM?: boolean;
  fullbleedS?: boolean;
  fullbleedXL?: boolean;
}

function gridColumnByMQ(
  mq: Breakpoint,
  nbColumn: number,
  isWrapperStart: boolean,
  isWrapperEnd: boolean,
): Record<string, unknown> {
  const fullbleedStart = isWrapperStart
    ? `[wrapper-start] ${GRID_MARGIN[mq] - GAP_COLUMNS[mq]}px`
    : '';
  const fullbleedEnd = isWrapperEnd
    ? `${GRID_MARGIN[mq] - GAP_COLUMNS[mq]}px [wrapper-end]`
    : '';
  return {
    gridColumnGap: `${GAP_COLUMNS[mq]}px`,
    gridTemplateColumns: `${fullbleedStart} [start] repeat(${nbColumn}, 1fr) [end] ${fullbleedEnd}`,
  };
}

function getSubgridTemplate(mq: Breakpoint, gridColumn: string) {
  /*
   * Calculate part of the grid-template property for the current <GridItem>,
   * based on the "width" the current <GridItem> takes on the <Grid>.
   *
   * The number of clumn of that subgrid should be equal to the "width" the current <GridItem>
   * Therefore, we're also converting '[start]' and '[end]' to actual column index for calculation.
   */
  // Extract current grid-column value
  const aGridColumn = gridColumn && gridColumn.split('/');
  const gridColumnStartStr = aGridColumn && aGridColumn[0].replace(/ /g, '');
  const gridColumnEndStr = aGridColumn && aGridColumn[1].replace(/ /g, '');

  // Gets start and end
  const isWrapperStart = gridColumnStartStr === 'wrapper-start';
  const isWrapperEnd = gridColumnEndStr === 'wrapper-end';
  const isStart = gridColumnStartStr === 'start';
  const isEnd = gridColumnEndStr === 'end';

  // Converts it to column index if needed
  const gridColumnStart = isStart || isWrapperStart ? 0 : +gridColumnStartStr;
  const gridColumnEnd =
    isEnd || gridColumnEndStr === 'wrapper-end'
      ? NB_COLUMNS[mq]
      : +gridColumnEndStr;

  // Calculate the number of column, for the grid-template property for the current <GridItem>
  const nbColumn = gridColumnEnd - gridColumnStart;
  return {
    display: 'grid',
    gridTemplateRows: 'auto',
    width: '100%',
    ...gridColumnByMQ(mq, nbColumn, isWrapperStart, isWrapperEnd),
  };
}

function gridColumnProperty(value = 'start/end'): Record<string, unknown> {
  return {
    gridColumn: value,
  };
}

function gridRowProperty(value?: string): Record<string, unknown> {
  if (!value) {
    return {};
  }

  return {
    gridRow: value,
  };
}

function styledContainer(props: ContainerProps) {
  const {
    gridColumn = 'start/end',
    gridColumnS,
    gridColumnM,
    gridColumnL,
    gridColumnXL,
    gridRow,
    gridRowS,
    gridRowM,
    gridRowL,
    gridRowXL,
    isGrid,
  } = props;

  const gridColumnSForGrid = gridColumnS || gridColumn;
  const gridColumnMForGrid = gridColumnM || gridColumnSForGrid;
  const gridColumnLForGrid = gridColumnL || gridColumnMForGrid;
  const gridColumnXLForGrid = gridColumnXL || gridColumnLForGrid;

  return {
    ...(isGrid && getSubgridTemplate(BREAKPOINT_SIZES.S, gridColumn)),
    ...gridColumnProperty(gridColumn),
    ...gridRowProperty(gridRow),

    [MQ.S]: {
      ...(gridColumnS && gridColumnProperty(gridColumnS)),
      ...(gridRowS && gridRowProperty(gridRowS)),
      ...(isGrid && getSubgridTemplate(BREAKPOINT_SIZES.S, gridColumnSForGrid)),
    },
    [MQ.M]: {
      ...(gridColumnM && gridColumnProperty(gridColumnM)),
      ...(gridRowM && gridRowProperty(gridRowM)),
      ...(isGrid && getSubgridTemplate(BREAKPOINT_SIZES.M, gridColumnMForGrid)),
    },
    [MQ.L]: {
      ...(gridColumnL && gridColumnProperty(gridColumnL)),
      ...(gridRowL && gridRowProperty(gridRowL)),
      ...(isGrid && getSubgridTemplate(BREAKPOINT_SIZES.L, gridColumnLForGrid)),
    },
    [MQ.XL]: {
      ...(gridColumnXL && gridColumnProperty(gridColumnXL)),
      ...(gridRowXL && gridRowProperty(gridRowXL)),
      ...(isGrid &&
        getSubgridTemplate(BREAKPOINT_SIZES.XL, gridColumnXLForGrid)),
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Container = styled('div')<ContainerProps>(styledContainer);

function GridItem(props: Props) {
  const {
    fullbleed = false,
    fullbleedS,
    fullbleedM,
    fullbleedL,
    fullbleedXL,
    isGrid = false,
    children,
    gridRow,
    gridRowS,
    gridRowM,
    gridRowL,
    gridRowXL,
  } = props;

  let {
    gridColumn = 'start/end',
    gridColumnS,
    gridColumnM,
    gridColumnL,
    gridColumnXL,
  } = props;

  if (fullbleed) {
    gridColumn = 'wrapper-start/wrapper-end';
  }
  if (fullbleedS) {
    gridColumnS = 'wrapper-start/wrapper-end';
  }
  if (fullbleedM) {
    gridColumnM = 'wrapper-start/wrapper-end';
  }
  if (fullbleedL) {
    gridColumnL = 'wrapper-start/wrapper-end';
  }
  if (fullbleedXL) {
    gridColumnXL = 'wrapper-start/wrapper-end';
  }

  return (
    <Container
      gridColumn={gridColumn}
      gridColumnS={gridColumnS}
      gridColumnM={gridColumnM}
      gridColumnL={gridColumnL}
      gridColumnXL={gridColumnXL}
      gridRow={gridRow}
      gridRowS={gridRowS}
      gridRowM={gridRowM}
      gridRowL={gridRowL}
      gridRowXL={gridRowXL}
      isGrid={isGrid}
      {...props}
    >
      {children}
    </Container>
  );
}

export default GridItem;
