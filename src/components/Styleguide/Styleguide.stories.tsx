import { ReactChild } from 'react';

import { styles } from './styleguide.styles';

import { typography } from '~/styles/global/typography.styles';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { backgroundColors } from '~/styles/global/colors.styles';

export default {
  title: 'Styleguide',
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
        <p css={typography.primaryHeadline}>Primary Headline</p>
        <p css={typography.secondaryHeadline}>Secondary Headline</p>
        <p css={typography.tertiaryHeadline}>Tertiary Headline</p>
        <p css={typography.subhead}>Subhead</p>
        <p css={typography.eyebrow}>Eyebrow</p>
        <p css={typography.bodyCopy}>Body Copy</p>
        <p css={typography.smallCopy}>Small Copy</p>
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
  return (
    <div css={[styles.colors, backgroundColors.GLOBAL[theme]]}>
      <div css={styles.colorsContainer}>{children}</div>
    </div>
  );
}

export function ColorsGlobal() {
  return (
    <div
      css={[
        styles.colors,
        styles.colorsContainer,
        backgroundColors.LIGHT.GRAY_70,
      ]}
    >
      <div css={backgroundColors.GLOBAL.BLACK} />
      <div css={backgroundColors.GLOBAL.WHITE} />
      <div css={backgroundColors.GLOBAL.ORANGE} />
    </div>
  );
}

export function ColorsDark() {
  return (
    <ColorContainer theme={Theme.BLACK}>
      <div css={backgroundColors.DARK.GRAY_90} />
      <div css={backgroundColors.DARK.GRAY_80} />
      <div css={backgroundColors.DARK.GRAY_40} />
    </ColorContainer>
  );
}

export function ColorsLight() {
  return (
    <ColorContainer theme={Theme.WHITE}>
      <div css={backgroundColors.LIGHT.GRAY_70} />
      <div css={backgroundColors.LIGHT.GRAY_20} />
      <div css={backgroundColors.LIGHT.GRAY_10} />
      <div css={backgroundColors.LIGHT.OFF_WHITE} />
    </ColorContainer>
  );
}

export function ColorsOrange() {
  return (
    <ColorContainer theme={Theme.ORANGE}>
      <div css={backgroundColors.ORANGE.SHADE_15} />
      <div css={backgroundColors.ORANGE.SHADE_30} />
      <div css={backgroundColors.ORANGE.TINT_30} />
    </ColorContainer>
  );
}
