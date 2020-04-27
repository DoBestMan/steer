import { ReactChild } from 'react';
import { text, select } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import FooterLink from './FooterLink';
import Link from './Link';

import NavLink from './NavLink';

import IconCTA from './IconCTA';

import {
  LINK_ICON_POSITION,
  LINK_SIZE,
  LINK_THEME,
  LINK_WEIGHT,
  LINK_TYPES,
} from '~/lib/constants';
import { backgroundColors } from '~/styles/colors.styles';
import { ICONS } from '~/components/global/Icon/Icon.constants';

export default {
  component: Link,
  title: 'Link',
};

const styles = {
  root: css({
    minHeight: '100vh',
  }),
};

function LinkContainer({
  theme,
  children,
}: {
  children: ReactChild;
  theme: LINK_THEME;
}) {
  return (
    <div
      css={[
        styles.root,
        theme === LINK_THEME.DARK
          ? backgroundColors.GLOBAL.BLACK
          : backgroundColors.GLOBAL.WHITE,
      ]}
    >
      {children}
    </div>
  );
}

export function LightLinkWithKnobs() {
  const size = select('Size', [LINK_SIZE.SM, LINK_SIZE.REG], LINK_SIZE.REG);
  const weight = select(
    'Weight',
    [LINK_WEIGHT.NORMAL, LINK_WEIGHT.BOLD],
    LINK_WEIGHT.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  const iconPosition = select(
    'Icon Position',
    [LINK_ICON_POSITION.LEFT, LINK_ICON_POSITION.RIGHT],
    LINK_ICON_POSITION.RIGHT,
  );

  const as = select('As', [LINK_TYPES.A, LINK_TYPES.BUTTON], LINK_TYPES.A);

  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link
        theme={LINK_THEME.LIGHT}
        href={as === LINK_TYPES.A ? '/' : ''}
        {...{ as, icon, iconPosition, size, weight }}
      >
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegular() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link href="/" theme={LINK_THEME.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBold() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link href="/" theme={LINK_THEME.LIGHT} weight={LINK_WEIGHT.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegularSmall() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link href="/" size={LINK_SIZE.SM} theme={LINK_THEME.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBoldSmall() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link
        href="/"
        theme={LINK_THEME.LIGHT}
        size={LINK_SIZE.SM}
        weight={LINK_WEIGHT.BOLD}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkInlineIconRight() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link href="/" theme={LINK_THEME.LIGHT} icon={ICONS.CHEVRON_RIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkInlineIconLeft() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <Link
        href="/"
        theme={LINK_THEME.LIGHT}
        iconPosition={LINK_ICON_POSITION.LEFT}
        icon={ICONS.YOUTUBE}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkWithKnobs() {
  const size = select('Size', [LINK_SIZE.SM, LINK_SIZE.REG], LINK_SIZE.REG);
  const weight = select(
    'Weight',
    [LINK_WEIGHT.NORMAL, LINK_WEIGHT.BOLD],
    LINK_WEIGHT.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  const iconPosition = select(
    'Icon Position',
    [LINK_ICON_POSITION.LEFT, LINK_ICON_POSITION.RIGHT],
    LINK_ICON_POSITION.RIGHT,
  );

  const as = select('As', [LINK_TYPES.A, LINK_TYPES.BUTTON], LINK_TYPES.A);

  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link
        href={as === LINK_TYPES.A ? '/' : ''}
        {...{ as, icon, iconPosition, size, weight }}
      >
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkRegular() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link href="/" theme={LINK_THEME.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkBold() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link href="/" theme={LINK_THEME.DARK} weight={LINK_WEIGHT.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkRegularSmall() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link href="/" size={LINK_SIZE.SM} theme={LINK_THEME.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkBoldSmall() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link
        href="/"
        theme={LINK_THEME.DARK}
        size={LINK_SIZE.SM}
        weight={LINK_WEIGHT.BOLD}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkInlineIconRight() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link href="/" icon={ICONS.CHEVRON_RIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkInlineIconLeft() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <Link
        href="/"
        iconPosition={LINK_ICON_POSITION.LEFT}
        icon={ICONS.YOUTUBE}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LinkFooter() {
  return <FooterLink href="/">Link Example</FooterLink>;
}

export function LinkNav() {
  return <NavLink href="/">Link Example</NavLink>;
}

export function LinkNavActive() {
  return (
    <NavLink isActive href="/">
      Link Example
    </NavLink>
  );
}

export function IconCTALight() {
  return (
    <LinkContainer theme={LINK_THEME.LIGHT}>
      <IconCTA theme={LINK_THEME.LIGHT} icon={ICONS.PHONE} href="/">
        Link Example
      </IconCTA>
    </LinkContainer>
  );
}

export function IconCTADark() {
  return (
    <LinkContainer theme={LINK_THEME.DARK}>
      <IconCTA icon={ICONS.PHONE} href="/">
        Link Example
      </IconCTA>
    </LinkContainer>
  );
}
