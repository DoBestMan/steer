import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { validateColSpan } from './GridItem.utils';

import { MQ } from '~/styles/constants/breakpoints';

interface ContainerProps {
  gridColumn?: string;
  gridColumnL?: string;
  gridColumnM?: string;
  gridColumnS?: string;
  gridColumnXL?: string;
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

function gridColumnProperty(value = 'start/end'): object {
  return {
    gridColumn: value,
  };
}

function styledContainer(props: ContainerProps) {
  const {
    gridColumn,
    gridColumnS,
    gridColumnM,
    gridColumnL,
    gridColumnXL,
  } = props;

  return {
    ...gridColumnProperty(gridColumn),
    [MQ.S]: {
      ...(gridColumnS && gridColumnProperty(gridColumnS)),
    },
    [MQ.M]: {
      ...(gridColumnM && gridColumnProperty(gridColumnM)),
    },
    [MQ.L]: {
      ...(gridColumnL && gridColumnProperty(gridColumnL)),
    },
    [MQ.XL]: {
      ...(gridColumnXL && gridColumnProperty(gridColumnXL)),
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const Container = styled('div')<ContainerProps>(styledContainer);

function GridItem(props: Props) {
  const {
    fullbleed = false,
    fullbleedS,
    fullbleedM,
    fullbleedL,
    fullbleedXL,
    children,
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

  // Doesn't stop the rendering but triggers info in the console if any issue
  /* eslint sort-keys: 0 */
  validateColSpan({
    gridColumn,
    gridColumnS,
    gridColumnM,
    gridColumnL,
    gridColumnXL,
  });

  return (
    <Container
      gridColumn={gridColumn}
      gridColumnS={gridColumnS}
      gridColumnM={gridColumnM}
      gridColumnL={gridColumnL}
      gridColumnXL={gridColumnXL}
      {...props}
    >
      {children}
    </Container>
  );
}

export default GridItem;
