import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { validateColSpan } from './GridItem.utils';

interface ContainerProps {
  gridColumn?: string;
  gridColumnS?: string;
  gridColumnM?: string;
  gridColumnL?: string;
  gridColumnXL?: string;
}

interface Props extends ContainerProps {
  fullbleed?: boolean;
  fullbleedS?: boolean;
  fullbleedM?: boolean;
  fullbleedL?: boolean;
  fullbleedXL?: boolean;
  as?: string;
  children?: ReactNode;
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
    ...(gridColumnS && gridColumnProperty(gridColumnS)),
    ...(gridColumnM && gridColumnProperty(gridColumnM)),
    ...(gridColumnL && gridColumnProperty(gridColumnL)),
    ...(gridColumnXL && gridColumnProperty(gridColumnXL)),
  };
}

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

  if (!!fullbleed) {
    gridColumn = 'wrapper-start/wrapper-end';
  }
  if (!!fullbleedS) {
    gridColumnS = 'wrapper-start/wrapper-end';
  }
  if (!!fullbleedM) {
    gridColumnM = 'wrapper-start/wrapper-end';
  }
  if (!!fullbleedL) {
    gridColumnL = 'wrapper-start/wrapper-end';
  }
  if (!!fullbleedXL) {
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
