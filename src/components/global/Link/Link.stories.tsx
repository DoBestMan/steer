import { ReactChild } from 'react';
import { text, select } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import FooterLink from './FooterLink';
import Link from './Link';

import NavLink from './NavLink';

import { LSize, LTheme, LWeight } from '~/lib/constants';
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
  theme: LTheme;
}) {
  return (
    <div
      css={[
        styles.root,
        theme === LTheme.DARK
          ? backgroundColors.GLOBAL.BLACK
          : backgroundColors.GLOBAL.WHITE,
      ]}
    >
      {children}
    </div>
  );
}

export function LightLinkWithKnobs() {
  const size = select('Size', [LSize.SM, LSize.REG], LSize.REG);
  const weight = select(
    'Weight',
    [LWeight.NORMAL, LWeight.BOLD],
    LWeight.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" theme={LTheme.LIGHT} {...{ icon, size, weight }}>
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegular() {
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" theme={LTheme.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBold() {
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" theme={LTheme.LIGHT} weight={LWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkRegularSmall() {
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" size={LSize.SM} theme={LTheme.LIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkBoldSmall() {
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" theme={LTheme.LIGHT} size={LSize.SM} weight={LWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function LightLinkInlineIcon() {
  return (
    <LinkContainer theme={LTheme.LIGHT}>
      <Link href="/" theme={LTheme.LIGHT} icon={ICONS.CHEVRON_RIGHT}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkWithKnobs() {
  const size = select('Size', [LSize.SM, LSize.REG], LSize.REG);
  const weight = select(
    'Weight',
    [LWeight.NORMAL, LWeight.BOLD],
    LWeight.NORMAL,
  );
  const icon = select('Icon Name', ICONS, ICONS.CHEVRON_RIGHT);
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" {...{ icon, size, weight }}>
        {text('Link Text', 'Link Example')}
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkRegular() {
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" theme={LTheme.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}
export function DarkLinkBold() {
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" theme={LTheme.DARK} weight={LWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkRegularSmall() {
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" size={LSize.SM} theme={LTheme.DARK}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkBoldSmall() {
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" theme={LTheme.DARK} size={LSize.SM} weight={LWeight.BOLD}>
        Link Example
      </Link>
    </LinkContainer>
  );
}

export function DarkLinkInlineIcon() {
  return (
    <LinkContainer theme={LTheme.DARK}>
      <Link href="/" icon={ICONS.CHEVRON_RIGHT}>
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
