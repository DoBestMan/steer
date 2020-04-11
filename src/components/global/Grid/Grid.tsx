import React, { ReactNode, ReactType } from 'react';
import { styles } from './Grid.styles';

interface Props {
  children: ReactNode;
  as?: ReactType;
}

function Grid({ as = 'div', children, ...rest }: Props) {
  const Container: ReactType = as;

  return (
    <Container css={styles.container} {...rest}>
      {children}
    </Container>
  );
}

export default Grid;
