import { css } from '@emotion/core';

import { fonts, globalFont } from '~/styles/document/fonts.styles';
import { gliderjs } from '~/styles/document/gliderjs.styles';
import { modal } from '~/styles/document/modal.styles';
import { reset } from '~/styles/document/reset.styles';

export const global = css`
  ${reset}
  ${fonts}
  ${globalFont}
  ${gliderjs}
  ${modal}
`;
