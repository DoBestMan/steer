import { CSSObject } from '@emotion/core';

import { CONTENT_LATERAL_PADDING } from '~/components/global/Modal/BottomCardModal.styles';
import { MQ } from '~/lib/constants';

export const getResponsiveModalStyles = (): CSSObject => {
  const reponsiveStyles: CSSObject = {};

  for (const key in CONTENT_LATERAL_PADDING) {
    const value: number = CONTENT_LATERAL_PADDING[key];

    reponsiveStyles[MQ[key]] = {
      marginLeft: `-${value}px`,
      marginRight: `-${value}px`,
    };
  }

  return reponsiveStyles;
};
