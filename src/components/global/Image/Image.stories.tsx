import { css } from '@emotion/core';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SPACING } from '~/lib/constants';

import Image from './Image';

export default {
  component: Image,
  title: 'Image',
};

const styles = {
  paddingBottom: css({
    paddingBottom: SPACING.SIZE_50,
  }),
  paddingTop: css({
    paddingTop: SPACING.SIZE_50,
  }),
};

export function Images() {
  return (
    <div>
      <Grid>
        <GridItem gridColumn="2/8" css={styles.paddingTop}>
          <Image
            altText="test"
            srcSet="https://picsum.photos/600/300"
            height="300"
            width="600"
          />
        </GridItem>

        <GridItem gridColumn="2/8" css={styles.paddingTop}>
          <Image
            altText="test"
            srcSet="https://picsum.photos/400/200"
            height="200"
            width="400"
          />
        </GridItem>

        <GridItem gridColumn="2/8" css={styles.paddingTop}>
          <Image
            altText="test"
            srcSet="https://picsum.photos/500/400"
            height="400"
            width="500"
          />
        </GridItem>

        <GridItem gridColumn="2/8" css={styles.paddingTop}>
          <Image
            altText="test"
            srcSet="https://picsum.photos/600/600"
            height="600"
            width="600"
          />
        </GridItem>

        <GridItem
          gridColumn="2/8"
          css={[styles.paddingTop, styles.paddingBottom]}
        >
          <Image
            altText="test"
            srcSet="https://picsum.photos/600/300"
            height="300"
            width="600"
          />
        </GridItem>
      </Grid>
    </div>
  );
}
