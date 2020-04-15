import { css } from '@emotion/core';

import GridHelper from './GridHelper';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import { typography } from '~/styles/global/typography.styles';
import { MQ, SPACING } from '~/lib/constants';

export default {
  component: GridHelper,
  title: 'GridHelper',
};

const styles = {
  container: css({
    paddingBottom: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_20,
  }),
  displayedOnL: css({
    display: 'none',
    [MQ.L]: {
      display: 'block',
    },
  }),
  displayedOnM: css({
    display: 'none',
    [MQ.M]: {
      display: 'block',
    },
  }),
  item: css({
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    height: 100,
    marginTop: SPACING.SIZE_20,
  }),
  subItem: css({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100px',
  }),
  subgrid: css({
    outline: '1px solid red',
  }),
  title: css({
    marginTop: SPACING.SIZE_20,
  }),
};

export function ShowGridHelper() {
  return (
    <div css={styles.container}>
      <GridHelper show />
      <Grid>
        <GridItem as="h2" css={[typography.primaryHeadline, styles.title]}>
          Grid
        </GridItem>
        {/* Row 1 */}
        <GridItem css={styles.item} />

        {/* Row 2 */}
        <GridItem
          css={styles.item}
          gridColumn={'2/4'}
          gridColumnM={'2/5'}
          gridColumnL={'2/8'}
        />
        <GridItem
          css={styles.item}
          gridColumn={'4/6'}
          gridColumnM={'5/8'}
          gridColumnL={'8/14'}
        />

        {/* Row 3 */}
        <GridItem css={[styles.item, styles.displayedOnM]} gridColumn={'2/4'} />
        <GridItem css={[styles.item, styles.displayedOnM]} gridColumn={'4/6'} />
        <GridItem
          css={[styles.item, styles.displayedOnM]}
          gridColumnM={'6/8'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumnM={'8/10'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumnM={'10/12'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumnM={'12/14'}
        />

        {/* Row 4 */}
        <GridItem css={styles.item} gridColumn={'2/3'} />
        <GridItem css={styles.item} gridColumn={'3/4'} />
        <GridItem css={styles.item} gridColumn={'4/5'} />
        <GridItem css={styles.item} gridColumn={'5/6'} />
        <GridItem css={[styles.item, styles.displayedOnM]} gridColumn={'6/7'} />
        <GridItem css={[styles.item, styles.displayedOnM]} gridColumn={'7/8'} />
        <GridItem css={[styles.item, styles.displayedOnL]} gridColumn={'8/9'} />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumn={'9/10'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumn={'10/11'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumn={'11/12'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumn={'12/13'}
        />
        <GridItem
          css={[styles.item, styles.displayedOnL]}
          gridColumn={'13/14'}
        />

        <GridItem as="h2" css={[typography.primaryHeadline, styles.title]}>
          SubGrid
        </GridItem>

        <GridItem
          css={[styles.item, styles.subgrid]}
          gridColumn={'3/5'}
          gridColumnM={'3/7'}
          gridColumnL={'3/13'}
          isGrid
        >
          <GridItem
            css={styles.subItem}
            gridColumn={'1/2'}
            gridColumnM={'1/3'}
            gridColumnL={'1/6'}
          />
        </GridItem>
      </Grid>
    </div>
  );
}
