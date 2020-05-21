import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import {
  LINK_BUTTON_TYPE,
  LINK_ICON_POSITION,
  LINK_THEME,
  LINK_TYPE,
  LINK_TYPES,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

import BaseLink, { BaseLinkProps } from './BaseLink';
import styles from './Link.styles';

interface Props {
  as?: LINK_TYPE;
  children?: ReactNode;
  icon?: IconType;
  iconPosition?: LINK_ICON_POSITION;
  isDisabled?: boolean;
  theme?: LINK_THEME;
}

export interface AnchorProps extends BaseLinkProps, Props {}

export interface ButtonProps extends Props {
  onClick?: () => void;
  type?: LINK_BUTTON_TYPE;
}

export type LinkProps = AnchorProps | ButtonProps;

function Link({
  as = LINK_TYPES.A,
  children,
  icon,
  iconPosition = LINK_ICON_POSITION.RIGHT,
  isDisabled,
  theme = LINK_THEME.DARK,
  ...rest
}: LinkProps) {
  const linkStyles = [
    typography.bodyCopy,
    !!children && disableGlobalFocus,
    !children && icon && styles.iconOnly,
    styles.root,
    styles[theme],
    isDisabled && styles.disabled,
  ];
  const isAnchor = as === LINK_TYPES.A;
  const Container = as;

  const inlineIcon = icon && (
    <Icon
      aria-hidden={!!children}
      name={icon}
      css={children && styles[iconPosition]}
    />
  );

  const leftIcon = iconPosition === LINK_ICON_POSITION.LEFT && inlineIcon;
  const linkText = children && (
    <span css={[styles.link, !icon && styles[`linkBorder${theme}`]]}>
      {children}
    </span>
  );
  const rightIcon = iconPosition === LINK_ICON_POSITION.RIGHT && inlineIcon;

  if (isAnchor && 'href' in rest) {
    return (
      <BaseLink css={linkStyles} {...rest}>
        {leftIcon}
        {linkText}
        {rightIcon}
      </BaseLink>
    );
  }

  return (
    <Container css={linkStyles} {...rest}>
      {leftIcon}
      {linkText}
      {rightIcon}
    </Container>
  );
}

export default Link;
