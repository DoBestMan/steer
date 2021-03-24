import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import {
  LINK_BUTTON_TYPE,
  LINK_ICON_POSITION,
  LINK_THEME,
  LINK_TYPE,
  LINK_TYPES,
  THEME,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

import BaseLink, { BaseLinkProps } from './BaseLink';
import styles, { themedStyles } from './Link.styles';

interface Props {
  as?: LINK_TYPE;
  borderless?: boolean;
  children?: ReactNode;
  className?: string;
  icon?: IconType;
  iconPosition?: LINK_ICON_POSITION;
  isDisabled?: boolean;
  ssr?: boolean;
  testId?: string;
  theme?: THEME.DARK | THEME.LIGHT | THEME.ORANGE | LINK_THEME;
}

export interface AnchorProps extends BaseLinkProps, Props {}

export interface ButtonProps extends Props {
  onClick?: () => void;
  type?: LINK_BUTTON_TYPE;
}

export type LinkProps = AnchorProps | ButtonProps;

function Link({
  as = LINK_TYPES.A,
  borderless,
  children,
  icon,
  iconPosition = LINK_ICON_POSITION.RIGHT,
  isDisabled,
  ssr,
  testId,
  theme = THEME.DARK,
  ...rest
}: LinkProps) {
  const linkStyles = [
    typography.bodyCopy,
    !!children && disableGlobalFocus,
    !children && icon && styles.iconOnly,
    themedStyles[theme],
    styles.root,
    isDisabled && styles.disabled,
  ];
  const isAnchor = as === LINK_TYPES.A;
  const Container = as;

  const inlineIcon = icon && (
    <Icon
      aria-hidden={!!children}
      css={children && styles[iconPosition]}
      name={icon}
      ssr={ssr}
      theme={THEME.LIGHT}
    />
  );

  const leftIcon = iconPosition === LINK_ICON_POSITION.LEFT && inlineIcon;
  const linkText = children && (
    <span css={styles.linkContainer}>
      <span
        css={[
          styles.link,
          (borderless || icon) && styles.linkBorderless,
          icon && styles.linkWithIcon,
        ]}
      >
        {children}
      </span>
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
    <Container css={linkStyles} data-testid={testId} {...rest}>
      {leftIcon}
      {linkText}
      {rightIcon}
    </Container>
  );
}

export default Link;
