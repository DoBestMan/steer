import { css } from '@emotion/core';

import { fonts } from '~/styles/global/fonts.styles';
import { reset } from '~/styles/global/reset.styles';

export const global = css`
  ${reset}
  ${fonts}
`;
