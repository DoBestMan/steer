import { ReactChild } from 'react';
import { text, select } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import FooterLink from './FooterLink';
import Link from './Link';

import NavLink from './NavLink';

import IconCTA from './IconCTA';

import {
  LinkIconPosition,
  LinkSize,
  LinkTheme,
  LinkWeight,
} from '~/lib/constants';
import { backgroundColors } from '~/styles/global/colors.styles';
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
  theme: LinkTheme;
}) {
  return (
    <div
      css={[
        styles.root,
        theme === LinkTheme.DARK
          ? backgroundColors.GLOBAL.BLACK
          : backgroundColors.GLOBAL.WHITE,
      ]}
    >
      {children}
    </div>
  );
}

export function LightLinkWithKnobs() {
  const size = select('Size', [LinkSize.SM, LinkSize.REG], LinkSize.REG);
  const weight = select(
    'Weight',
    [LinkWeight.NORMAL, LinkWeight.BOLD],
    LinkWeight.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  const iconPosition = select(
    'Icon Position',
    [LinkIconPosition.LEFT, LinkIconPosition.RIGHT],
    LinkIconPosition.RIGHT,
  );
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link
        href="/"
        theme={LinkTheme.LIGHT}
        {...{ icon, iconPosition, size, weight }}
      >
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegular() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link href="/" theme={LinkTheme.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBold() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link href="/" theme={LinkTheme.LIGHT} weight={LinkWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegularSmall() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link href="/" size={LinkSize.SM} theme={LinkTheme.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBoldSmall() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link
        href="/"
        theme={LinkTheme.LIGHT}
        size={LinkSize.SM}
        weight={LinkWeight.BOLD}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkInlineIconRight() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link href="/" theme={LinkTheme.LIGHT} icon={ICONS.CHEVRON_RIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkInlineIconLeft() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <Link
        href="/"
        theme={LinkTheme.LIGHT}
        iconPosition={LinkIconPosition.LEFT}
        icon={ICONS.YOUTUBE}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkWithKnobs() {
  const size = select('Size', [LinkSize.SM, LinkSize.REG], LinkSize.REG);
  const weight = select(
    'Weight',
    [LinkWeight.NORMAL, LinkWeight.BOLD],
    LinkWeight.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  const iconPosition = select(
    'Icon Position',
    [LinkIconPosition.LEFT, LinkIconPosition.RIGHT],
    LinkIconPosition.RIGHT,
  );
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" {...{ icon, iconPosition, size, weight }}>
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkRegular() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" theme={LinkTheme.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkBold() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" theme={LinkTheme.DARK} weight={LinkWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkRegularSmall() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" size={LinkSize.SM} theme={LinkTheme.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkBoldSmall() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link
        href="/"
        theme={LinkTheme.DARK}
        size={LinkSize.SM}
        weight={LinkWeight.BOLD}
      >
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkInlineIconRight() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" icon={ICONS.CHEVRON_RIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkInlineIconLeft() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <Link href="/" iconPosition={LinkIconPosition.LEFT} icon={ICONS.YOUTUBE}>
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

export function IconCTALight() {
  return (
    <LinkContainer theme={LinkTheme.LIGHT}>
      <IconCTA theme={LinkTheme.LIGHT} icon={ICONS.PHONE} href="/">
        Link Example
      </IconCTA>
    </LinkContainer>
  );
}

export function IconCTADark() {
  return (
    <LinkContainer theme={LinkTheme.DARK}>
      <IconCTA icon={ICONS.PHONE} href="/">
        Link Example
      </IconCTA>
    </LinkContainer>
  );
}
