import React, { ReactNode } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS, SPACING } from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

import { styles } from './styleguide.styles';

export default {
  title: 'Global/Typography',
};

enum Theme {
  BLACK = 'BLACK',
  ORANGE = 'ORANGE',
  WHITE = 'WHITE',
}

export function Text() {
  return (
    <Grid as="section">
      <GridItem css={styles.containerText}>
        <p css={typography.jumboHeadline}>Jumbo Headline</p>
        <p css={typography.modalHeadline}>Modal Headline</p>
        <p css={typography.primaryHeadline}>Primary Headline</p>
        <p css={typography.secondaryHeadline}>Secondary Headline</p>
        <p css={typography.tertiaryHeadline}>Tertiary Headline</p>
        <p css={typography.labelHeadlineLarge}>Label Headline Large</p>
        <p css={typography.labelHeadline}>LabelHeadline</p>
        <p css={typography.primarySubhead}>Primary Subhead</p>
        <p css={typography.secondarySubhead}>Secondary Subhead</p>
        <p css={typography.filterItemLabel}>Filter Item Label</p>
        <p css={typography.eyebrow}>Eyebrow</p>
        <p css={typography.largeCopy}>Large Copy</p>
        <p css={typography.bodyCopy}>Body Copy</p>
        <p css={typography.bodyCopyTight}>Body Copy Tight</p>
        <p css={typography.labelCopy}>Label Copy</p>
        <p css={typography.labelCopyTight}>Label Copy Tight</p>
        <p css={typography.smallCopy}>Small Copy</p>
        <p css={typography.smallCopyTight}>Small Copy Tight</p>
      </GridItem>
      <GridItem
        fullbleed
        css={[styles.containerFullbleed, typography.bodyCopy]}
        as="p"
      >
        Full-bleed item
      </GridItem>
    </Grid>
  );
}

function ColorContainer({
  theme,
  children,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  const backgroundColor = COLORS.GLOBAL[theme];
  return (
    <div
      css={[
        {
          backgroundColor,
          padding: SPACING.SIZE_50,
        },
      ]}
    >
      <div css={styles.colorsContainer}>{children}</div>
    </div>
  );
}

export function ColorsGlobal() {
  const backgroundColor = COLORS.LIGHT.GRAY_70;
  return (
    <div
      css={[
        styles.colors,
        styles.colorsContainer,
        {
          backgroundColor,
        },
      ]}
    >
      {Object.values(COLORS.GLOBAL).map((backgroundColor) => (
        <div css={{ backgroundColor }} key={backgroundColor} />
      ))}
    </div>
  );
}

export function ColorsDark() {
  return (
    <ColorContainer theme={Theme.BLACK}>
      {Object.values(COLORS.DARK).map((backgroundColor) => (
        <div css={{ backgroundColor }} key={backgroundColor} />
      ))}
    </ColorContainer>
  );
}

export function ColorsLight() {
  return (
    <ColorContainer theme={Theme.WHITE}>
      {Object.values(COLORS.LIGHT).map((backgroundColor) => (
        <div css={{ backgroundColor }} key={backgroundColor} />
      ))}
    </ColorContainer>
  );
}

export function ColorsOrange() {
  return (
    <ColorContainer theme={Theme.ORANGE}>
      {Object.values(COLORS.ORANGE).map((backgroundColor) => (
        <div css={{ backgroundColor }} key={backgroundColor} />
      ))}
    </ColorContainer>
  );
}

export function Links() {
  const baseCSS = [
    typography.primarySubhead,
    { '&:not(:last-of-type)': { marginBottom: 30 } },
  ];

  return (
    <>
      <ColorContainer theme={Theme.WHITE}>
        <div
          css={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <a href="/" css={[baseCSS, links.light]}>
            Light
          </a>
          <a href="/" css={[baseCSS, links.lightHighlighted]}>
            Light Hightlighted
          </a>
          <a href="/" css={[baseCSS, links.light, links.borderless]}>
            Light Borderless
          </a>
          <a href="/" css={[baseCSS, links.lightHighlighted, links.borderless]}>
            Light Highlighted Borderless
          </a>
        </div>
      </ColorContainer>
      <ColorContainer theme={Theme.BLACK}>
        <div
          css={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <a href="/" css={[baseCSS, links.dark]}>
            Dark
          </a>
          <a href="/" css={[baseCSS, links.darkHighlighted]}>
            Dark Hightlighted
          </a>
          <a href="/" css={[baseCSS, links.dark, links.borderless]}>
            Dark Borderless
          </a>
          <a href="/" css={[baseCSS, links.darkHighlighted, links.borderless]}>
            Dark Highlighted Borderless
          </a>
        </div>
      </ColorContainer>
    </>
  );
}
