import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { ReactChild } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import {
  COLORS,
  LINK_ICON_POSITION,
  LINK_THEME,
  LINK_TYPES,
} from '~/lib/constants';

import FooterLink from './FooterLink';
import IconCTA from './IconCTA';
import Link from './Link';
import NavLink from './NavLink';

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
  const backgroundColor =
    theme === LINK_THEME.DARK ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.WHITE;

  return <div css={[styles.root, { backgroundColor }]}>{children}</div>;
}

export function LightLinkWithKnobs() {
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
        isDisabled={boolean('Disabled', false)}
        {...{ as, icon, iconPosition }}
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
        isDisabled={boolean('Disabled', false)}
        {...{ as, icon, iconPosition }}
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
  return (
    <NavLink {...{ href: '/', isExternal: false, text: 'Link Example' }} />
  );
}

export function ButtonNav() {
  return (
    <NavLink
      {...{
        onClick: action('Nav link click'),
        target: NAV_TARGETS.BROWSE_TIRES,
        text: 'Link Example',
      }}
    />
  );
}

export function LinkNavActive() {
  return (
    <NavLink
      isActive
      {...{ href: '/', isExternal: false, text: 'Link Example' }}
    />
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
