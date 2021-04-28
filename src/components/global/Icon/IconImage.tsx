import React from 'react';

import { ICON_SPRITE_STACK_URL } from '~/lib/constants/icon-name';
import { THEME } from '~/lib/constants/theme';

import { iconThemeStyles } from './Icon.styles';

interface IconImageProps {
  iconName: string;
  ssHeight?: number | string;
  ssWidth?: number;
  theme?: THEME | false | null;
}

function IconImage({
  iconName,
  ssHeight = 'auto',
  ssWidth = 30,
  theme,
  ...rest
}: IconImageProps) {
  const overrideHeight =
    typeof ssHeight === 'string' ? ssHeight : `${ssHeight}px`;
  return (
    <>
      <img
        alt={`${iconName} icon`}
        aria-label={iconName}
        css={theme && iconThemeStyles[theme]}
        src={`${ICON_SPRITE_STACK_URL}${iconName}`}
        style={{ height: overrideHeight, width: `${ssWidth}px` }}
        {...rest}
      />
    </>
  );
}

export default IconImage;
