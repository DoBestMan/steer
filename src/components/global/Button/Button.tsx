import { MouseEventHandler, ReactChild } from 'react';

import {
  BUTTON_STYLE,
  BUTTON_THEME,
  LINK_BUTTON_TYPE,
  LINK_TYPE,
  LINK_TYPES,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';

import BaseLink from '../Link/BaseLink';
import styles from './Button.styles';

interface Props {
  as?: LINK_TYPE;
  children: ReactChild;
  isDisabled?: boolean;
  onClick: MouseEventHandler;
  style?: BUTTON_STYLE;
  tabIndex?: number;
  theme?: BUTTON_THEME;
}

export interface AnchorProps extends Props {
  href: string;
}

export interface ButtonElementProps extends Props {
  type?: LINK_BUTTON_TYPE;
}

export type ButtonProps = AnchorProps | ButtonElementProps;

function Button({
  as = LINK_TYPES.BUTTON,
  children,
  isDisabled,
  style = BUTTON_STYLE.SOLID,
  theme = BUTTON_THEME.LIGHT,
  ...rest
}: ButtonProps) {
  const buttonStyles = [
    disableGlobalFocus,
    styles.root,
    styles[style][theme],
    isDisabled && styles.disabled,
  ];
  const isAnchor = as === LINK_TYPES.A;
  const Container = as;

  if (isAnchor && 'href' in rest) {
    <BaseLink css={buttonStyles} {...rest}>
      {children}
    </BaseLink>;
  }

  return (
    <Container css={buttonStyles} {...rest}>
      {children}
    </Container>
  );
}

export default Button;
