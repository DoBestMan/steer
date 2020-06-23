import { ReactChild } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { COLORS } from '~/lib/constants';
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
  children: ReactChild[];
  theme: Theme;
}) {
  const backgroundColor = COLORS.GLOBAL[theme];
  return (
    <div css={[styles.colors, { backgroundColor }]}>
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
