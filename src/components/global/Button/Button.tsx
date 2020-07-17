import { MouseEventHandler, ReactNode } from 'react';

import {
  BUTTON_STYLE,
  LINK_BUTTON_TYPE,
  LINK_TYPE,
  LINK_TYPES,
  THEME,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';

import BaseLink from '../Link/BaseLink';
import styles, { buttonStyle, toggle } from './Button.styles';

interface Props {
  as?: LINK_TYPE;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isExternal?: boolean;
  isToggle?: boolean;
  isToggleActive?: boolean;
  onClick?: MouseEventHandler;
  style?: BUTTON_STYLE;
  tabIndex?: number;
  theme?: THEME.DARK | THEME.LIGHT | THEME.ORANGE;
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
  isToggle = false,
  isToggleActive = false,
  style = BUTTON_STYLE.SOLID,
  theme = THEME.LIGHT,
  ...rest
}: ButtonProps) {
  const toggleStyles = isToggleActive
    ? toggle.active[theme]
    : toggle.inactive[theme];

  const buttonStyles = [
    disableGlobalFocus,
    styles.root,
    isToggle && toggleStyles ? toggleStyles : buttonStyle[style][theme],
    isDisabled && styles.disabled,
  ];
  const isAnchor = as === LINK_TYPES.A;
  const Container = as;

  if (isAnchor && 'href' in rest) {
    return (
      <BaseLink css={buttonStyles} {...rest}>
        {children}
      </BaseLink>
    );
  }

  return (
    <Container css={buttonStyles} {...rest}>
      {children}
    </Container>
  );
}

export default Button;
