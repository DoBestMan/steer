import { css } from '@emotion/core';

import { fonts } from '~/styles/document/fonts.styles';
import { reset } from '~/styles/document/reset.styles';

export const global = css`
  ${reset}
  ${fonts}
`;
