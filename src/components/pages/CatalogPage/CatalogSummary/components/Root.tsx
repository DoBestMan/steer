import styled from '@emotion/styled';

import { CSSStyles } from '~/lib/constants';

function styledRootContainer() {
  const base: CSSStyles = {
    display: 'block',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  return [base];
}

export default styled('div')(styledRootContainer);
