import { ReactNode } from 'react';

import styles from './Link.styles';

import BaseLink from './BaseLink';

import {
  LINK_BUTTON_TYPE,
  LINK_ICON_POSITION,
  LINK_SIZE,
  LINK_THEME,
  LINK_TYPE,
  LINK_TYPES,
  LINK_WEIGHT,
} from '~/lib/constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Icon from '~/components/global/Icon/Icon';

export interface Props {
  as?: LINK_TYPE;
  children?: ReactNode;
  icon?: IconType;
  iconPosition?: LINK_ICON_POSITION;
  size?: LINK_SIZE;
  theme?: LINK_THEME;
  weight?: LINK_WEIGHT;
}

export interface AnchorProps extends Props {
  href: string;
}

export interface ButtonProps extends Props {
  type?: LINK_BUTTON_TYPE;
}

export type LinkProps = AnchorProps | ButtonProps;

function Link({
  as = LINK_TYPES.A,
  children,
  icon,
  iconPosition = LINK_ICON_POSITION.RIGHT,
  size = LINK_SIZE.REG,
  theme = LINK_THEME.DARK,
  weight = LINK_WEIGHT.NORMAL,
  ...rest
}: LinkProps) {
  const linkStyles = [styles.root, styles[theme], styles[size], styles[weight]];
  const isAnchor = as === LINK_TYPES.A;
  const Container = as;

  const inlineIcon = icon && (
    <Icon
      aria-hidden={!!children}
      fill="currentColor"
      name={icon}
      css={children && styles[iconPosition]}
    />
  );

  const leftIcon = iconPosition === LINK_ICON_POSITION.LEFT && inlineIcon;
  const linkText = children && <span css={styles.link}>{children}</span>;
  const rightIcon = iconPosition === LINK_ICON_POSITION.RIGHT && inlineIcon;

  if (isAnchor && 'href' in rest) {
    <BaseLink css={linkStyles} {...rest}>
      {leftIcon}
      {linkText}
      {rightIcon}
    </BaseLink>;
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