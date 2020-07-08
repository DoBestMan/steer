import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import placeholders from '~/styles/placeholders';

import styles from './AdvancedListing.styles';

function AdvancedListingPlaceholder() {
  return (
    <Grid css={styles.root}>
      <GridItem css={styles.imageWrapper} gridColumnM="2/5" gridColumnL="2/7">
        <div css={styles.image}>
          <div css={[styles.imageContainer, { minHeight: 200 }]} />
        </div>
      </GridItem>
      <GridItem css={styles.info} isGrid gridColumnM="5/8" gridColumnL="7/14">
        <GridItem
          css={styles.leftSection}
          gridColumnS="1/3"
          gridColumnM="1/3"
          gridColumnL="1/4"
        >
          <div>
            <div css={[placeholders.text, { height: 20, width: 145 }]} />
            <div css={[placeholders.text, { height: 20, width: 130 }]} />
            <div css={[placeholders.text, { height: 20, width: 75 }]} />
          </div>
        </GridItem>
        <GridItem
          css={styles.rightSection}
          gridColumnS="3/5"
          gridColumnM="3/4"
          gridColumnL="4/8"
        >
          <div css={styles.reviews}>
            <div css={styles.rating}>
              <div css={[placeholders.text, { height: 30, width: 100 }]} />
            </div>
          </div>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default AdvancedListingPlaceholder;
