import React from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import { typography } from '~/styles/global/typography.styles';
import { styles } from './styleguide.styles';

function Styleguide() {
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

export default Styleguide;
